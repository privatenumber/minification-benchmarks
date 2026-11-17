# AI analysis

The README ends with commentary written by a language model. This note records how that commentary is produced, how the benchmark selects its champion, and why that selection is made in code.

## How it is generated

`pnpm update-readme` runs [`packages/data/update-readme/index.ts`](../../packages/data/update-readme/index.ts), which calls `getAiAnalysis()` in [`ai-analysis/index.ts`](../../packages/data/update-readme/ai-analysis/index.ts).

- **Model:** `glm-5.3` through the OpenCode Go endpoint `https://opencode.ai/zen/go/v1`, called with the AI SDK's `generateText()` and temperature 0. No seed is set.
- **System prompt:** [`ai-analysis/system-prompt.txt`](../../packages/data/update-readme/ai-analysis/system-prompt.txt), prefixed with today's date.
- **User message:** built by `getMessage()` in [`ai-analysis/get-message.ts`](../../packages/data/update-readme/ai-analysis/get-message.ts) from the benchmark data. It has four sections:
  - the minifier versions;
  - the benchmark's champion and runner-up by round wins;
  - per-artifact "rounds" listing the best gzip, fastest, most balanced and an honorable mention;
  - minifiers eliminated by a non-timeout failure.
- **Missing key:** in CI, `getAiAnalysis()` throws without `OPENCODE_GO_API_KEY`. Elsewhere it logs "Skipping AI analysis" and returns nothing. `comment-mark` leaves the `aiAnalysis` and `aiSystemPrompt` regions unchanged, so the rest of the README can update while the commentary still describes older data.
- **Published input:** the README embeds the full system prompt and message in the `aiSystemPrompt` region, so every published analysis can be traced to its exact input.

The system prompt directs the model to announce the champion provided in the data and use the measurements to explain it.

## Request headers

`createAnalysisProvider()` in [`ai-analysis/index.ts`](../../packages/data/update-readme/ai-analysis/index.ts) sends two headers on every Go request:

- `User-Agent: minification-benchmarks/1.0`
- `x-opencode-session: minification-benchmarks-ai-analysis`. The audit script uses one ID per model and prompt variant.

The [OpenCode Go docs](https://opencode.ai/docs/go/#where-can-i-use-it) (accessed Nov 9, 2026) say a client "should" identify itself with its own user agent "rather than a generic SDK or HTTP-library name", and should "Send a stable session ID in `x-opencode-session` for each conversation so we can optimize routing and prompt caching". They also say "Traffic is monitored for abuse".

Observed on Nov 9, 2026, with `glm-5.3-flash` and a one-line chat completion:

| Headers sent | Response |
| --- | --- |
| `User-Agent` only | HTTP 400, `{"type":"MissingSessionID","message":"Request is missing x-opencode-session and cannot be routed efficiently. ..."}` |
| `x-opencode-session` only | HTTP 200 |
| Both | HTTP 200 |

Go enforces the session header but not the user agent. Keep both: the session header is required to get a response at all, and the user agent is what the docs ask clients to send.

The session ID also enables prompt caching. In the model audit below, each model and prompt variant reused one session ID across its 10 requests, and most input tokens were cache reads. Across both variants' 20 requests, `glm-5.3` read 42,261 of 49,730 input tokens from cache, and `gpt-6-luna` read 44,055 of 49,010. Production makes one generation call per CI run; the AI SDK retries retryable failures up to twice by default. Evidence gap: whether its cache survives between runs is not measured.

## Usage limits

CI and local audit runs that use the project's OpenCode service-account key share one OpenCode Go allowance. The [Go docs](https://opencode.ai/docs/console/go/#usage-limits) (accessed Nov 9, 2026) define it this way:

- "Usage limits are defined as monthly dollar amounts."
- "Each model has the following usage limits: 5-hour — 20% of the monthly limit; weekly — 50%; and monthly — 100%. Each model's monthly limit below determines how its usage counts toward those allowances."
- Monthly limits on the Go plan include `glm-5.3` $15, `qwen3.8-max` $15, `kimi-k3.1-pro` $15, and `glm-5.3-flash` $60.
- "Extra Usage" can fall back to Console credits once a limit is reached, instead of blocking requests.

Observed on Nov 9, 2026 in the OpenCode Console, after the model audit below and a few CI runs (123 requests in total, all from the service account):

| Model | Requests | Cost |
| --- | --- | --- |
| `qwen3.8-max` | 21 | $1.20 |
| `kimi-k3.1-pro` | 12 | $0.92 |
| `glm-5.3` | 25 | $0.85 |
| `claude-haiku-5-5` | 20 | $0.04 |
| `gpt-6-luna` | 20 | $0.02 |
| `glm-5.3-flash` | 25 | $0.01 |

The meters read: 5-hour window "Limit reached", weekly 40% used, monthly 20% used. CI's "Update README" then failed with HTTP 429 `GoUsageLimitError` (`"limitName":"5 hour"`) and a `retry-after` of about 11,700 seconds.

Inference: the allowance is a single meter, and each model's spend counts in proportion to its own monthly limit. The three $15-limit models above spent $2.97, which is about 20% of $15. That reading matches the meters: the 5-hour cap is 20% of the monthly allowance, and 20% used is 40% of the 50% weekly cap. The cheap models barely registered.

Consequences:

- A full audit with the $15-limit models can use a whole 5-hour window, and block the README job until it resets. The audit script therefore has no default model list, prints its request count, and refuses more than 20 requests without `--yes`. Prefer cheap models such as `glm-5.3-flash` or `gpt-6-luna`, fewer runs, and running after CI has finished.
- The production model, `glm-5.3`, costs about $0.034 per request at the observed rate. The docs estimate 220 `glm-5.3` requests per 5-hour window on the Go plan, so a normal CI cadence stays well inside it.

## Champion selection

The benchmark selects the champion in [`analyzed-data.ts`](../../packages/data/update-readme/analyzed-data.ts), not through the model. A minifier that never completed a round, such as one that timed out on every artifact, is also left out of the standings. A minifier is eliminated from the standings if it has any non-timeout error in any artifact. Each artifact is one equally weighted round. Every successful minifier tied for the best score wins that round. The champion has the most round wins. Ties are broken by the lowest mean 1-based rank across artifacts where the minifier appears, then by name in ascending order using direct string comparison. Equal scores share the rank of the first entry with that score.

Equal weighting rewards consistency across all rounds rather than favoring larger artifacts. The earlier prompt rewarded large artifacts, and the November 9 analysis used that criterion to select `oxc-minify`; see the evidence below. On the current data, `@swc/core` wins 8 of 12 rounds and `oxc-minify` wins 4.

Temperature 0 reduces variation in the commentary, but it does not make model output deterministic. The benchmark supplies the winner as a fact rather than relying on the model to choose it.

The generator prepends a code-owned champion line to the model's commentary. The model's prose can still contradict the data. For example, the current README says the victory time difference costs "twenty-two seconds" where 5,712 ms minus 258 ms is about 5.5 seconds. It also says both eliminated minifiers never made it past the starting grid, although `tedivm/jshrink` completed earlier rounds, and says `google-closure-compiler` crossed every finish line, although it timed out on larger artifacts.

## Model and prompt audit

[`packages/data/scripts/audit-ai-analysis.ts`](../../packages/data/scripts/audit-ai-analysis.ts) (`pnpm audit-ai --models <ids>`) sends the analysis request to the given OpenCode Go models and scores every output. It compares two prompt variants built from the same `data.json`:

- `current`: today's system prompt and message, with the champion given as a fact;
- `baseline`: the prompt embedded in the README at `d489b93`, where the model picks the winner.

Each output is checked for:

- the champion named under "Best minifier";
- the required headings;
- figures that don't appear in the input;
- whether the "Eliminated" section matches the input.

The default runs only `current`. `--variants current,baseline` adds the historical comparison, which works only while `data.json` still matches `d489b93`; otherwise the script exits. The script reads `d489b93` from git history in either case, so it needs a checkout that includes that commit. The figure check only sees digits followed by a known unit (KB, MB, ms, s, %, or their spelled-out forms), so phrasings like "a minute and a half" go unchecked. Outputs go to the gitignored `results/ai-audit/`, and `--reanalyze <dir>` re-scores saved outputs without calling any model.

Run on Nov 9, 2026, with the champion-in-code prompt and the `master` data from Oct 10, 2026, using 5 runs per model, variant, and temperature setting (omitted, or 0). The scores below come from `--reanalyze` with the corrected champion classifier. The older saved inputs did not include a name list, so reanalysis derives it from the saved prompts:

| Model | `current`: champion matches code | `baseline`: champions chosen | Median latency (`current`, temperature omitted) | Mean words |
| --- | --- | --- | --- | --- |
| `glm-5.3` (production) | 10/10 | oxc-minify 9, @swc/core 1 | 49 s | 701 |
| `glm-5.3-flash` | 10/10 | oxc-minify 9, @swc/core 1 | 15 s | 529 |
| `kimi-k3.1-pro` | 5/5 | oxc-minify 5 | 212 s | 712 |
| `qwen3.8-max` | 10/10 | oxc-minify 10 | 237 s | 913 |
| `claude-haiku-5-5` | 10/10 | oxc-minify 10 | 16 s | 814 |
| `gpt-6-luna` | 10/10 | oxc-minify 5, @swc/core 5 | 14 s | 455 |

Findings:

- **The classifier found the given champion across models.** It identified the given champion in all 55 successful `current` runs. The prose classifier is heuristic and can misread a comparison as the verdict.
- **The old prompt mostly crowns oxc.** It picked `oxc-minify` in 48 of 55 runs. The Oct 10 README's `@swc/core` verdict was the minority outcome, which fits the "reward large artifacts" rule.
- **Temperature 0 does not fix the old prompt's choice.** At temperature 0, `gpt-6-luna` still split 2 to 3 between oxc and swc across five runs.
- **`kimi-k3.1-pro` rejects temperature 0** with "invalid temperature: only 1 is allowed for this model". Production's `temperature: 0` therefore ties the analysis to models that accept it. `glm-5.3` does.
- **Figures are mostly derived, not invented.** After matching seconds against input milliseconds, 43 of 55 successful `current` runs cite at least one figure absent from the input, with group averages between 0.8 and 4.8 per run. Every figure traced was arithmetic on input values, such as "0.26 KB" for 157.70 KB − 157.44 KB, or a truncation, such as "684 KB" for 684.61 KB. The count measures arithmetic and rounding more than fabrication.
- **The audit found an input bug.** For errors without a stage, `getEliminated()` wrote `Failed "react" in undefined stage`. It now omits the stage when there is none.

## Authentication in CI

Decision: the Benchmark workflow gets a short-lived OpenCode token through GitHub OIDC instead of storing an API key as a repository secret. The "Sign in to OpenCode" step in [`.github/workflows/benchmark.yml`](../../.github/workflows/benchmark.yml) does the exchange:

1. Request a GitHub OIDC token for the audience `https://opencode.ai/console`. This needs `id-token: write`.
2. Exchange it at `https://opencode.ai/console/auth/oauth/token` with an RFC 8693 token-exchange grant. The client ID is the OpenCode Console service account.
3. Export the result as `OPENCODE_GO_API_KEY`, the variable `ai-analysis/index.ts` reads.

Rationale:

- Console API keys can be set to expire, and "An expired key can't be renewed" ([OpenCode Console API docs](https://opencode.ai/docs/console/api/), accessed Nov 9, 2026).
- The stored key did expire. Every "Update README" step then failed with HTTP 401 and `"code":"api_key_expired"`, for example in [run 42505062767](https://github.com/privatenumber/minification-benchmarks/actions/runs/42505062767). After the secret was removed, runs such as [run 42552089991](https://github.com/privatenumber/minification-benchmarks/actions/runs/42552089991) passed while skipping the analysis, and committed a README with stale commentary.
- OIDC leaves no long-lived credential to rotate.

Evidence the exchange works: in [run 42551116484](https://github.com/privatenumber/minification-benchmarks/actions/runs/42551116484), both "Sign in to OpenCode" and "Update README" succeeded. The run committed a newly generated analysis, so the exchanged token is accepted by the Go endpoint `https://opencode.ai/zen/go/v1`.

Constraints:

- Declaring `permissions:` resets every unlisted configurable permission to none (GitHub still grants `metadata: read`), so the job also lists `contents: write` for its result commits.
- Fork pull requests cannot request an OIDC token, so the step only works on runs from this repository.
- The step fails before "Update README" when the exchange returns no string token (empty, `null`, or another JSON type). `set -o pipefail` also fails the step at a failed `curl` itself. Both requests time out after 60 s, so a stalled endpoint can't hold the job until its 60-minute limit.
- `id-token: write` applies to the whole job, not just this step. Code that runs earlier in the job can request its own OIDC token and exchange it for OpenCode access. That code includes the minifiers and artifact tests run by `pnpm bench-all`. Accepted risk: that code already runs with the job's `contents: write` token, which `actions/checkout` keeps available to later steps by default. Checkout v7 writes the credential to a file under `RUNNER_TEMP` and references it from the local git config with `includeIf`. OIDC adds the ability to spend the OpenCode account's model allowance. Removing the exposure would require running the benchmark in a separate job without either permission, and committing its results from a trusted job.

`getAiAnalysis()` also throws when the key is missing and `CI` is set, so a missing credential can't publish new tables beside an old analysis. Before that check, [run 42552233518](https://github.com/privatenumber/minification-benchmarks/actions/runs/42552233518) logged "Skipping AI analysis due to missing OPENCODE_GO_API_KEY" and still passed.

Evidence gap: the token-exchange endpoint is not described in OpenCode's public docs. The step's parameters come from the setup instructions in the OpenCode Console.

## The champion changed while the data didn't

Observed: two generations from the same benchmark data named different champions.

| Generation | Commit | Champion |
| --- | --- | --- |
| Oct 10, 2026 | [`d489b93` README.md](https://github.com/privatenumber/minification-benchmarks/blob/d489b93bfb2443882830363412674fe61071d7ac/README.md#L431) | "**@swc/core** takes the crown" |
| Nov 9, 2026 | [`6ae8603` README.md](https://github.com/privatenumber/minification-benchmarks/blob/6ae86039013c8705f0debbab0a521a05501a6110/README.md#L431) | "The crown goes to **oxc-minify**" |

The two inputs differ only in the date line. To reproduce, extract the `aiSystemPrompt` region from both commits and diff it:

```sh
extract() {
	curl -s "https://raw.githubusercontent.com/privatenumber/minification-benchmarks/$1/README.md" |
		sed -n '/aiSystemPrompt:start/,/aiSystemPrompt:end/p'
}
diff <(extract d489b93bfb2443882830363412674fe61071d7ac) <(extract 6ae86039013c8705f0debbab0a521a05501a6110)
```

`6ae8603` is a CI commit on the #871 branch, not on `master`, so the command reads both files from GitHub rather than from local history.

Output, checked on Nov 9, 2026:

```text
2c2
< Today&#39;s date is 2026-10-10
---
> Today&#39;s date is 2026-11-09
```

`packages/data/data/data.json` is also identical between the two commits.

Both winners are defensible from the input, but both justifications misstate it. In the message's "Most balanced" entries, `@swc/core` leads 8 of 12 rounds (react, moment, jquery, vue, lodash, d3, three, victory). `oxc-minify` leads the other 4 (terser, echarts, antd, typescript), three of which are among the four largest artifacts.

- The October text weighed consistency ("Consistency over twelve rounds beat brilliance in three"). It also says swc was "Most balanced" in nine of twelve rounds and took echarts' balance award. Its input gives swc eight, and gives echarts to oxc.
- The November text weighed the large-artifact rule. It also says oxc "took the smallest-and-quickest double" on terser. Its input lists `@cminify/cminify-linux-x64` as fastest on terser.

Both texts called the decision close.

Inference: the benchmark data did not decide the verdict. Between the two requests, the date line changed and a month passed, so the cause could be sampling, the date, or a provider-side model update. These two observations cannot separate those causes. Either way, a regeneration on unchanged benchmark data can produce a different champion, and the model's justification can contradict its own input.
