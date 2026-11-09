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
- **Published input:** the README embeds the full system prompt and message in the `aiSystemPrompt` region, so every published analysis can be traced to its exact input.

The system prompt asks the model to "Crown the winner" with judgment-based criteria. Among them: "Consider speed—especially where compression is close" and "Bigger source = harder challenge. Reward outstanding performance on large artifacts."

## The champion changes with identical input

Observed: two generations from the same data named different champions.

| Generation | Commit | Champion |
| --- | --- | --- |
| Oct 10, 2026 | [`d489b93` README.md](https://github.com/privatenumber/minification-benchmarks/blob/d489b93bfb2443882830363412674fe61071d7ac/README.md#L431) | "**@swc/core** takes the crown" |
| Nov 9, 2026 | [`6ae8603` README.md](https://github.com/privatenumber/minification-benchmarks/blob/6ae86039013c8705f0debbab0a521a05501a6110/README.md#L431) | "The crown goes to **oxc-minify**" |

The two inputs differ only in the date line. To reproduce, extract the `aiSystemPrompt` region from both commits and diff it:

```sh
extract() { git show "$1:README.md" | sed -n '/aiSystemPrompt:start/,/aiSystemPrompt:end/p'; }
diff <(extract d489b93) <(extract 6ae8603)
```

Output, checked on Nov 9, 2026:

```text
2c2
< Today&#39;s date is 2026-10-10
---
> Today&#39;s date is 2026-11-09
```

`packages/data/data/data.json` is also identical between the two commits.

Both readings fit the data. In the message's "Most balanced" entries, `@swc/core` leads 8 of 12 rounds (react, moment, jquery, vue, lodash, d3, three, victory). `oxc-minify` leads the other 4 (terser, echarts, antd, typescript), three of which are among the four largest artifacts. The October text weighed consistency ("Consistency over twelve rounds beat brilliance in three"). The November text weighed the large-artifact rule. Both called the decision close.

Inference: the headline verdict is decided by sampling, not by the data. Any regeneration can flip it, even when no measurement changed.
