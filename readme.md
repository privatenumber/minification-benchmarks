# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Dec 15, 2022<!-- lastUpdated:end -->._

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🙋‍♂️ Why?

1. To help you pick a minifier that fits your needs
2. To promote JS minifiers and document their performances
3. To encourage healthy competition and improvement amongst minifiers

## 👟 Methodology
- Each minifier is executed in its own process with a 20 second timeout
- Artifact integrity is verified by a test before and after minification
- Minifier upgrade PRs are automated via [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)
- Benchmarks are gathered on every PR via [GitHub Actions](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml) (verifiable minified artifacts are uploaded on each run)

## ⏱ Metrics
Minifiers are ranked by smallest minzipped size.

#### Minified size

Size of the minified output.

#### Minzipped size

Size of the minified output with [Gzip compression](https://en.wikipedia.org/wiki/Gzip).

For minifiers, this measures how compressable the output is.

For users, this measures network transfer size, which is usually the metric that matters most.

#### Time

How long minification took (average of 5 runs). Each time is annotated with a multiplier relative to the fastest minifier.

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.14 kB` |                      `19.41 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*154x* </sup>`4,002 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.19 kB` |    <sup>*37x* </sup>`968 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`22.89 kB` |       <sup>-58% </sup>`8.21 kB` |      <sup>*1x* </sup>`48 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*19x* </sup>`494 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.60 kB` |       <sup>-57% </sup>`8.43 kB` |  <sup>*60x* </sup>`1,565 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |    **<sup>🏆 </sup>`26 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.65 kB` |     <sup>*6x* </sup>`179 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*8x* </sup>`222 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                                       |                                — |                               — |                            — |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.46 kB`** |  <sup>*53x* </sup>`2,266 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.53 kB` |  <sup>*31x* </sup>`1,351 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.42 kB` |       <sup>-48% </sup>`18.70 kB` |      <sup>*1x* </sup>`84 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.75 kB` | <sup>*115x* </sup>`4,904 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.02 kB` |  <sup>*74x* </sup>`3,161 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.24 kB` |    **<sup>🏆 </sup>`42 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.44 kB` |     <sup>*9x* </sup>`416 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*13x* </sup>`560 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                           |                                — |                                — |                            — |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                             |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                             |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                    **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.54 kB`** | **<sup>🏆-63% </sup>`30.85 kB`** | <sup>*39x* </sup>`3,173 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.15 kB` |       <sup>-63% </sup>`30.89 kB` |    <sup>*2x* </sup>`161 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` | <sup>*24x* </sup>`1,939 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.44 kB` |    <sup>*6x* </sup>`537 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*9x* </sup>`747 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.75 kB` | <sup>*61x* </sup>`4,891 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.89 kB` |   **<sup>🏆 </sup>`80 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*68x* </sup>`5,452 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                             |                                — |                                — |                           — |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | --------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                             |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                    **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`115.34 kB` | **<sup>🏆-52% </sup>`42.53 kB`** |    <sup>*2x* </sup>`232 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.80 kB` |       <sup>-52% </sup>`42.85 kB` | <sup>*29x* </sup>`2,405 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.89 kB` | <sup>*50x* </sup>`4,095 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.83 kB` | <sup>*67x* </sup>`5,473 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*72x* </sup>`5,876 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.24 kB` |   **<sup>🏆 </sup>`81 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.36 kB` |    <sup>*7x* </sup>`624 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |   <sup>*11x* </sup>`915 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                    |                                 — |                                — |                           — |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                             |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                    **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-75% </sup>`24.56 kB`** | <sup>*56x* </sup>`3,310 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*97x* </sup>`5,706 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.84 kB` |       <sup>-74% </sup>`25.07 kB` |    <sup>*2x* </sup>`170 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.06 kB` |       <sup>-74% </sup>`25.09 kB` | <sup>*34x* </sup>`2,002 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.37 kB` | <sup>*75x* </sup>`4,421 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.76 kB` |   <sup>*10x* </sup>`599 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.06 kB` |   **<sup>🏆 </sup>`59 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |   <sup>*13x* </sup>`819 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                              |                                — |                                — |                           — |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | --------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                             |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                    **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-53% </sup>`263.91 kB`** | **<sup>🏆-33% </sup>`86.73 kB`** | <sup>*52x* </sup>`7,560 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-52% </sup>`265.54 kB` |       <sup>-33% </sup>`87.55 kB` |    <sup>*3x* </sup>`549 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`268.00 kB` |       <sup>-33% </sup>`87.67 kB` | <sup>*36x* </sup>`5,332 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.30 kB` |  <sup>*9x* </sup>`1,363 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` | <sup>*15x* </sup>`2,311 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.13 kB` |       <sup>-30% </sup>`90.41 kB` |  **<sup>🏆 </sup>`145 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*57x* </sup>`8,430 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                           — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>             |                                 — |                                — |                           — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser v5.16.1](https://www.npmjs.com/package/terser/v/5.16.1) ([Source](https://unpkg.com/terser@5.16.1/dist/bundle.min.js)) |                       `964.34 kB` |                       `184.19 kB` |                             |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                    **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`435.12 kB` | **<sup>🏆-36% </sup>`118.40 kB`** | <sup>*70x* </sup>`6,954 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`441.24 kB` |       <sup>-36% </sup>`118.56 kB` | <sup>*49x* </sup>`4,848 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-54% </sup>`438.92 kB` |       <sup>-36% </sup>`118.72 kB` |    <sup>*4x* </sup>`403 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-53% </sup>`456.23 kB` |       <sup>-35% </sup>`119.47 kB` | <sup>*20x* </sup>`1,974 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`453.98 kB` |       <sup>-35% </sup>`119.58 kB` | <sup>*13x* </sup>`1,321 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`423.46 kB`** |       <sup>-34% </sup>`120.88 kB` | <sup>*77x* </sup>`7,567 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`441.78 kB` |       <sup>-34% </sup>`121.22 kB` |   **<sup>🏆 </sup>`98 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                           — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                                    |                                 — |                                 — |                           — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`643.25 kB` | **<sup>🏆-36% </sup>`157.99 kB`** |      <sup>*4x* </sup>`687 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.26 kB` |   <sup>*64x* </sup>`9,523 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.37 kB` |       <sup>-36% </sup>`158.57 kB` |   <sup>*49x* </sup>`7,296 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`648.83 kB` |       <sup>-35% </sup>`161.70 kB` | <sup>*124x* </sup>`18,259 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` |   <sup>*66x* </sup>`9,853 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-35% </sup>`162.17 kB` |   <sup>*13x* </sup>`1,917 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |   <sup>*19x* </sup>`2,890 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`162.65 kB` |    **<sup>🏆 </sup>`147 ms`** |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                                |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       | **<sup>🏆-67% </sup>`702.67 kB`** | **<sup>🏆-49% </sup>`157.52 kB`** | <sup>*54x* </sup>`11,971 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`707.99 kB` |       <sup>-49% </sup>`157.92 kB` |     <sup>*4x* </sup>`935 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` |       <sup>-49% </sup>`158.16 kB` |  <sup>*45x* </sup>`9,958 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |  <sup>*16x* </sup>`3,735 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`166.88 kB` |  <sup>*10x* </sup>`2,416 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-44% </sup>`174.20 kB` | <sup>*52x* </sup>`11,598 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.15 kB` |       <sup>-42% </sup>`179.75 kB` |   **<sup>🏆 </sup>`221 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: Error_</sub>                                        |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `683.47 kB` |                              |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                | **<sup>🏆-69% </sup>`993.57 kB`** | **<sup>🏆-53% </sup>`319.97 kB`** |   <sup>*6x* </sup>`2,909 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`321.29 kB` | <sup>*34x* </sup>`15,945 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` |  <sup>*14x* </sup>`6,586 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.46 kB` |   <sup>*6x* </sup>`3,155 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.68 kB` |   **<sup>🏆 </sup>`464 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                            — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                                 |                                 — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                             |                                 — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                             |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                    **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                       | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`453.37 kB`** |  <sup>*4x* </sup>`2,807 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` | <sup>*13x* </sup>`7,430 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`479.73 kB` |  <sup>*7x* </sup>`4,480 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-66% </sup>`2.31 MB` |       <sup>-41% </sup>`488.05 kB` |  **<sup>🏆 </sup>`567 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                           — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                           — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: Error_</sub>                            |                               — |                                 — |                           — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                          |                               — |                                 — |                           — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                    |                               — |                                 — |                           — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.8.3](https://www.npmjs.com/package/typescript/v/4.8.3) ([Source](https://unpkg.com/typescript@4.8.3/lib/typescript.js)) |                      `10.82 MB` |                         `1.87 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-70% </sup>`3.27 MB`** | **<sup>🏆-55% </sup>`843.96 kB`** |   <sup>*8x* </sup>`7,456 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-68% </sup>`3.50 MB` |       <sup>-54% </sup>`866.64 kB` |  <sup>*11x* </sup>`9,609 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-68% </sup>`3.49 MB` |       <sup>-53% </sup>`869.36 kB` | <sup>*16x* </sup>`14,387 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-68% </sup>`3.45 MB` |       <sup>-52% </sup>`902.93 kB` |   **<sup>🏆 </sup>`871 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                            |                               — |                                 — |                            — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: TypeError_</sub>                                            |                               — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                              |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                                        |                               — |                                 — |                            — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.

## 🥇 Results

### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for the smallest uncompressed minified size for all races, and wins 9 out of 11 races for minzipped size! Impressively, it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1% in minzipped size while performing twice as fast as Uglify! Terser is a fork of UglifyJS and comes with support for ES6+.

### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing closely to Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript). However, note that esbuild has a [limited set of optimizations](https://github.com/evanw/esbuild/issues/639#:~:text=i%20can%20add%20a%20caveat%20to%20esbuild's%20minification%20documentation%20about%20code%20optimizations%20that%20are%20not%20included%20in%20esbuild.%20i%20think%20the%20list%20of%20possible%20code%20optimizations%20that%20esbuild%20doesn't%20do%20would%20be%20something%20like%20this%3A) and there are currently [no plans to improve it](https://github.com/evanw/esbuild/issues/639#issuecomment-792033958).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
