# README "last updated" line

The README shows when the benchmark results last changed as a `<relative-time>` element, so readers see "3 days ago" without the README needing a commit every day. [`getLastUpdated()`](../../packages/data/update-readme/index.ts) writes the element only when the hash of `data.json` changes. It keeps the old text when the hash matches.

## What GitHub keeps

GitHub's Markdown sanitizer keeps `<relative-time>` but removes most of its attributes. Verified Fri Nov 20 2026 with `gh api markdown -f mode=gfm -f text='<input>'` (the `markdown` mode gave the same output):

| Input | Output |
|---|---|
| `<relative-time datetime="…" format="relative" tense="past" precision="day" prefix="">x</relative-time>` | `<relative-time datetime="…">x</relative-time>` |
| `<relative-time datetime="…" class="a" style="color:red" title="t">x</relative-time>` | `<relative-time datetime="…" title="t">x</relative-time>` |
| `<time datetime="…">x</time>` | `x` |
| `<time-ago datetime="…">x</time-ago>`, `<local-time datetime="…">x</local-time>` | `x` |

So only `datetime` and `title` remain. The open-source [html-pipeline allowlist](https://github.com/gjtorikian/html-pipeline/blob/main/lib/html_pipeline/sanitization_filter.rb) allows `<time>`, so it does not describe GitHub's real sanitizer.

Real READMEs keep the element too. On Fri Nov 20 2026, the github.com HTML of [kasuncsb/Live-Malware-DB](https://github.com/kasuncsb/Live-Malware-DB) had `<relative-time datetime="2026-11-20T07:55:19Z">7m ago</relative-time>`. Its source has `tense="past"`, which GitHub removed.

## Consequences

- The element uses its [defaults](https://github.com/github/relative-time-element#readme): relative text such as "3 days ago" for up to 30 days, then `on <date>`. That date is in the reader's time zone and leaves out the year when it is the current year ([`get timeZone()`](https://github.com/github/relative-time-element/blob/5.3.1/src/relative-time-element.ts#L166-L172) and [`get year()`](https://github.com/github/relative-time-element/blob/5.3.1/src/relative-time-element.ts#L515-L524) in v5.3.1). GitHub removes the `time-zone` and `year` attributes, so these cannot be pinned.
- The fallback text is `on <date, year>` in UTC, so the sentence reads the same way before the script runs. It can differ from the upgraded text by the year, or by one day near midnight UTC.
- `tense="past"` cannot be set. A reader whose clock is behind the commit time can briefly see "in 1 minute".
- The README page needs github.com's script to show relative text. Renderers without that script show the fallback text.
