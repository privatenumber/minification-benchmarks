# AI analysis

The README ends with commentary written by a language model. This note records how that commentary is produced, and the evidence that the model's choice of overall winner is not stable between runs.

## How it is generated

`pnpm update-readme` runs [`packages/data/update-readme/index.ts`](../../packages/data/update-readme/index.ts), which calls `getAiAnalysis()` in [`ai-analysis/index.ts`](../../packages/data/update-readme/ai-analysis/index.ts).

- **Model:** `glm-5.3` through the OpenCode Go endpoint `https://opencode.ai/zen/go/v1`, called with the AI SDK's `generateText()`. No temperature or seed is set.
- **System prompt:** [`ai-analysis/system-prompt.txt`](../../packages/data/update-readme/ai-analysis/system-prompt.txt), prefixed with today's date.
- **User message:** built by `getMessage()` in [`ai-analysis/get-message.ts`](../../packages/data/update-readme/ai-analysis/get-message.ts) from the benchmark data. It has three sections:
  - the minifier versions;
  - per-artifact "rounds" listing the best gzip, fastest, most balanced and an honorable mention;
  - minifiers eliminated by a non-timeout failure.
- **Missing key:** without `OPENCODE_GO_API_KEY`, `getAiAnalysis()` logs "Skipping AI analysis" and returns nothing. `comment-mark` leaves the `aiAnalysis` and `aiSystemPrompt` regions unchanged, so the rest of the README can update while the commentary still describes older data.
- **Published input:** the README embeds the full system prompt and message in the `aiSystemPrompt` region, so every published analysis can be traced to its exact input.

The system prompt asks the model to "Crown the winner" with judgment-based criteria. Among them: "Consider speed—especially where compression is close" and "Bigger source = harder challenge. Reward outstanding performance on large artifacts."

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
