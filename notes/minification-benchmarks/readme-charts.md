# README chart theming

Each benchmark chart in the README comes in two versions: dark text for GitHub's light theme, and near-white text for its dark theme. This note records how the README picks one, and why it uses linked images instead of the `<picture>` element that GitHub documents.

## Decision

[`generateBenchmarks()`](../../packages/data/update-readme/index.ts) writes each chart as two linked images:

```html
<a href="LIGHT_URL#gh-light-mode-only"><img src="LIGHT_URL"></a>
<a href="DARK_URL#gh-dark-mode-only"><img src="DARK_URL"></a>
```

GitHub hides the link for the other theme, so each reader sees one chart that matches their GitHub theme. The chart URLs come from `getBarChartUrl()` in [`bar-chart.ts`](../../packages/data/update-readme/bar-chart.ts), which sets the text color for each theme.

Tradeoff: renderers other than GitHub, such as npm or a local Markdown preview, don't have GitHub's CSS and show both charts.

## Why not `<picture>`

GitHub's documented method is `<picture>` with `<source media="(prefers-color-scheme: dark)">` ([changelog, May 2022](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/); the [current formatting docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#the-picture-element) say only "The `<picture>` HTML element is supported", accessed Nov 17, 2026). The README used it until this change.

Observed failure: GitHub serves the `<picture>` markup unchanged, and the browser evaluates `prefers-color-scheme` against the **OS** theme, not the GitHub theme. A reader with a dark OS and the light GitHub theme gets the near-white chart on a white page.

Evidence, Nov 17, 2026, on the live README at master commit `cb3f9c8294cf39844e3f333f5b4cbdd2313fff2f`, in desktop Chrome on macOS with a signed-in account set to the light GitHub theme and the OS set to dark:

```js
// document.documentElement.dataset.colorMode
'light'
// matchMedia('(prefers-color-scheme: dark)').matches
true
// For each `article picture`: img.currentSrc === source.srcset
true // the dark-mode chart was loaded
```

## Why the fragment must be on a link `href`

GitHub's older method appends `#gh-light-mode-only` or `#gh-dark-mode-only` to an image URL ([changelog, Nov 2021](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/)). The hiding is done by this CSS, read from the page's style sheets on Nov 17, 2026:

```css
:root[data-color-mode="light"] .entry-content [href$="#gh-dark-mode-only"],
:root[data-color-mode="light"] .comment-body [href$="#gh-dark-mode-only"],
:root[data-color-mode="light"] .readme [href$="#gh-dark-mode-only"] { display: none; }
```

There is a mirror rule for the dark theme, and rules for `data-color-mode="auto"` inside `prefers-color-scheme` media queries. The selector matches an `href`, not an `img` `src`. GitHub sends images through its camo proxy, which hex-encodes the original URL. So when GitHub wraps a Markdown image in a link, the fragment is no longer at the end of the `href`.

Experiment: the same environment as above, using the new-file editor's Preview (`/new/master?filename=theme-test.md`, not committed). Its output renders inside `.entry-content .readme .markdown-body`, like the README. Each variant used a small QuickChart image labeled with the variant's name:

| Markup | Dark-only variant hidden in the light theme? |
| --- | --- |
| `![M-DARK](url#gh-dark-mode-only)` | No. The wrapping link's `href` is the camo URL, so it ends in the hex-encoded fragment. |
| `<img src="url#gh-dark-mode-only">` | No. The element has no `href`. |
| `<a href="url#gh-dark-mode-only"><img src="url"></a>` | Yes. The `href` is not proxied and keeps the fragment. |

The issue-comment Preview is not a valid test environment: its output has none of the `.entry-content`, `.comment-body`, or `.readme` containers, so no variant is hidden there.

## When to re-evaluate

- GitHub makes `<picture>` follow the GitHub theme. Check this by repeating the live-README probe above.
- GitHub changes or removes the `[href$="#gh-*-mode-only"]` CSS, which this approach depends on. GitHub's current docs no longer mention it.
- The README needs to render well outside GitHub. One text color that is readable on both backgrounds would avoid duplicate charts, at the cost of lower contrast.
