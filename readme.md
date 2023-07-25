# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:

- [babel-minify](https://github.com/babel/minify)
- [bun](https://github.com/oven-sh/bun)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [JShrink](https://github.com/tedious/JShrink)
- [minify-js](https://github.com/wilsonzlin/minify-js)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Jul 25, 2023<!-- lastUpdated:end -->._

<sub>Found this useful? Show your support & appreciation by [sponsoring](https://github.com/sponsors/privatenumber)! ❤️</sub>

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
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.14 kB` |                      `19.41 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*1121x* </sup>`3,503 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`22.87 kB` |       <sup>-58% </sup>`8.18 kB` |       <sup>*9x* </sup>`30 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.19 kB` |    <sup>*234x* </sup>`732 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*108x* </sup>`338 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.60 kB` |       <sup>-57% </sup>`8.43 kB` |  <sup>*374x* </sup>`1,170 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |       <sup>*6x* </sup>`21 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                      |       <sup>-67% </sup>`23.98 kB` |       <sup>-56% </sup>`8.58 kB` |       <sup>*6x* </sup>`21 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.53 kB` |       <sup>-56% </sup>`8.62 kB` |      **<sup>🏆 </sup>`3 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.65 kB` |     <sup>*39x* </sup>`123 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*51x* </sup>`162 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                          |       <sup>-67% </sup>`23.46 kB` |       <sup>-54% </sup>`9.00 kB` |        <sup>*1x* </sup>`5 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                              |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.00 kB` |     <sup>*45x* </sup>`142 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.46 kB`** | <sup>*234x* </sup>`1,749 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-67% </sup>`58.23 kB` |       <sup>-49% </sup>`18.58 kB` |     <sup>*10x* </sup>`79 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.16 kB` |       <sup>-49% </sup>`18.59 kB` |   <sup>*125x* </sup>`937 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.75 kB` | <sup>*569x* </sup>`4,251 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.02 kB` | <sup>*300x* </sup>`2,245 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.24 kB` |      <sup>*5x* </sup>`37 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.94 kB` |       <sup>-46% </sup>`19.42 kB` |     **<sup>🏆 </sup>`7 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.44 kB` |    <sup>*41x* </sup>`309 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*53x* </sup>`398 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                          |       <sup>-64% </sup>`61.79 kB` |       <sup>-46% </sup>`19.69 kB` |      <sup>*4x* </sup>`32 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                              |       <sup>-65% </sup>`60.74 kB` |       <sup>-42% </sup>`20.82 kB` |      <sup>*2x* </sup>`15 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                  |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`24.80 kB` |    <sup>*46x* </sup>`349 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.54 kB`** | **<sup>🏆-63% </sup>`30.85 kB`** | <sup>*199x* </sup>`2,468 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.16 kB` |       <sup>-63% </sup>`30.87 kB` |    <sup>*11x* </sup>`147 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.90 kB` | <sup>*104x* </sup>`1,294 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.85 kB` |       <sup>-63% </sup>`31.44 kB` |    **<sup>🏆 </sup>`12 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.44 kB` |    <sup>*34x* </sup>`427 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*41x* </sup>`511 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.75 kB` | <sup>*279x* </sup>`3,450 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.89 kB` |      <sup>*5x* </sup>`70 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                            |       <sup>-68% </sup>`92.45 kB` |       <sup>-62% </sup>`32.45 kB` |      <sup>*4x* </sup>`53 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*391x* </sup>`4,836 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                |       <sup>-69% </sup>`90.51 kB` |       <sup>-61% </sup>`33.20 kB` |      <sup>*1x* </sup>`23 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                    |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.64 kB` |    <sup>*36x* </sup>`447 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`115.52 kB` | **<sup>🏆-53% </sup>`42.41 kB`** |     <sup>*9x* </sup>`191 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.87 kB` |  <sup>*79x* </sup>`1,569 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.89 kB` | <sup>*160x* </sup>`3,139 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.83 kB` | <sup>*193x* </sup>`3,789 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*267x* </sup>`5,241 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.24 kB` |      <sup>*3x* </sup>`76 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.36 kB` |    <sup>*25x* </sup>`496 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-66% </sup>`117.83 kB` |       <sup>-50% </sup>`44.37 kB` |    **<sup>🏆 </sup>`20 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |    <sup>*32x* </sup>`633 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                   |       <sup>-64% </sup>`121.52 kB` |       <sup>-50% </sup>`44.98 kB` |      <sup>*2x* </sup>`49 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                       |       <sup>-64% </sup>`121.77 kB` |       <sup>-48% </sup>`46.72 kB` |      <sup>*1x* </sup>`30 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                           |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`56.87 kB` |    <sup>*30x* </sup>`592 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-75% </sup>`24.56 kB`** | <sup>*159x* </sup>`2,572 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*308x* </sup>`4,974 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.86 kB` |       <sup>-74% </sup>`25.06 kB` |     <sup>*9x* </sup>`149 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.05 kB` |       <sup>-74% </sup>`25.07 kB` |  <sup>*85x* </sup>`1,379 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.37 kB` | <sup>*192x* </sup>`3,111 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.76 kB` |    <sup>*27x* </sup>`444 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*2x* </sup>`47 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*34x* </sup>`556 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                             |       <sup>-86% </sup>`74.09 kB` |       <sup>-73% </sup>`26.31 kB` |      <sup>*2x* </sup>`35 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.47 kB` |       <sup>-73% </sup>`26.32 kB` |    **<sup>🏆 </sup>`16 ms`** |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                     |      <sup>-73% </sup>`148.78 kB` |       <sup>-63% </sup>`36.01 kB` |    <sup>*27x* </sup>`447 ms` |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                        |                                — |                                — |                            — |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                |       <sup>-53% </sup>`263.91 kB` | **<sup>🏆-33% </sup>`86.73 kB`** | <sup>*122x* </sup>`5,840 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-52% </sup>`265.50 kB` |       <sup>-33% </sup>`87.21 kB` |     <sup>*8x* </sup>`416 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.91 kB` |       <sup>-33% </sup>`87.71 kB` |  <sup>*73x* </sup>`3,529 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.30 kB` |    <sup>*20x* </sup>`983 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` |  <sup>*32x* </sup>`1,549 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`269.93 kB` |       <sup>-31% </sup>`89.70 kB` |    **<sup>🏆 </sup>`48 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.13 kB` |       <sup>-30% </sup>`90.41 kB` |     <sup>*2x* </sup>`119 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                            |       <sup>-51% </sup>`273.45 kB` |       <sup>-30% </sup>`91.49 kB` |      <sup>*1x* </sup>`69 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*148x* </sup>`7,098 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                | **<sup>🏆-53% </sup>`261.82 kB`** |       <sup>-26% </sup>`95.58 kB` |      <sup>*1x* </sup>`71 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                             |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.19.2](https://www.npmjs.com/package/terser/v/5.19.2) ([Source](https://unpkg.com/terser@5.19.2/dist/bundle.min.js)) |                       `984.87 kB` |                       `188.36 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`441.14 kB` | **<sup>🏆-36% </sup>`119.98 kB`** | <sup>*122x* </sup>`5,408 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-55% </sup>`445.09 kB` |       <sup>-36% </sup>`120.00 kB` |     <sup>*7x* </sup>`345 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-55% </sup>`447.48 kB` |       <sup>-36% </sup>`120.23 kB` |  <sup>*75x* </sup>`3,343 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-53% </sup>`463.03 kB` |       <sup>-36% </sup>`121.13 kB` |  <sup>*33x* </sup>`1,469 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`460.75 kB` |       <sup>-36% </sup>`121.27 kB` |  <sup>*23x* </sup>`1,034 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-55% </sup>`445.90 kB` |       <sup>-36% </sup>`121.42 kB` |    **<sup>🏆 </sup>`44 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`429.73 kB`** |       <sup>-35% </sup>`122.89 kB` | <sup>*149x* </sup>`6,627 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-55% </sup>`448.07 kB` |       <sup>-35% </sup>`122.94 kB` |      <sup>*2x* </sup>`89 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                   |       <sup>-54% </sup>`455.49 kB` |       <sup>-34% </sup>`123.81 kB` |      <sup>*1x* </sup>`48 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                           |       <sup>-37% </sup>`619.05 kB` |       <sup>-25% </sup>`141.08 kB` |  <sup>*36x* </sup>`1,621 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                              |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`643.15 kB` | **<sup>🏆-36% </sup>`157.73 kB`** |     <sup>*7x* </sup>`542 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.26 kB` | <sup>*101x* </sup>`7,261 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`654.11 kB` |       <sup>-36% </sup>`158.98 kB` |  <sup>*66x* </sup>`4,718 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` | <sup>*116x* </sup>`8,299 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-35% </sup>`162.17 kB` |  <sup>*19x* </sup>`1,419 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |  <sup>*28x* </sup>`2,060 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`162.65 kB` |     <sup>*1x* </sup>`128 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`644.89 kB` |       <sup>-34% </sup>`163.91 kB` |    **<sup>🏆 </sup>`71 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                               |       <sup>-47% </sup>`662.23 kB` |       <sup>-33% </sup>`164.93 kB` |      <sup>*1x* </sup>`77 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                   |       <sup>-47% </sup>`660.81 kB` |       <sup>-32% </sup>`168.59 kB` |     <sup>*1x* </sup>`102 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                       |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`192.43 kB` |  <sup>*34x* </sup>`2,460 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                      |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`702.67 kB` | **<sup>🏆-49% </sup>`157.52 kB`** |  <sup>*111x* </sup>`9,262 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`708.00 kB` |       <sup>-49% </sup>`157.58 kB` |      <sup>*9x* </sup>`779 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.61 kB` |       <sup>-49% </sup>`158.05 kB` |   <sup>*79x* </sup>`6,559 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`718.74 kB` |       <sup>-47% </sup>`164.50 kB` |     **<sup>🏆 </sup>`83 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |   <sup>*30x* </sup>`2,539 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`166.88 kB` |   <sup>*21x* </sup>`1,823 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                       | **<sup>🏆-72% </sup>`607.42 kB`** |       <sup>-46% </sup>`168.01 kB` |      <sup>*1x* </sup>`159 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-44% </sup>`174.20 kB` | <sup>*121x* </sup>`10,115 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`179.74 kB` |      <sup>*2x* </sup>`168 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                   |       <sup>-66% </sup>`728.21 kB` |       <sup>-41% </sup>`181.17 kB` |       <sup>*1x* </sup>`88 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: SyntaxError_</sub>                                                  |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `683.47 kB` |                               |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`993.45 kB` | **<sup>🏆-53% </sup>`319.77 kB`** |   <sup>*10x* </sup>`1,574 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`321.40 kB` |  <sup>*73x* </sup>`10,568 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`980.14 kB`** |       <sup>-52% </sup>`326.17 kB` | <sup>*105x* </sup>`15,064 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` |   <sup>*32x* </sup>`4,698 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.46 kB` |   <sup>*16x* </sup>`2,398 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.68 kB` |      <sup>*2x* </sup>`332 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.30 kB` |      <sup>*1x* </sup>`185 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                |         <sup>-68% </sup>`1.03 MB` |       <sup>-51% </sup>`335.42 kB` |    **<sup>🏆 </sup>`143 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                    |         <sup>-69% </sup>`1.01 MB` |       <sup>-50% </sup>`340.93 kB` |      <sup>*1x* </sup>`258 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                             — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                             — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                                                 |                                 — |                                 — |                             — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                       | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`453.62 kB`** |   <sup>*9x* </sup>`1,771 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                           |       <sup>-67% </sup>`2.23 MB` |       <sup>-45% </sup>`454.61 kB` | <sup>*82x* </sup>`15,356 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-44% </sup>`458.47 kB` | <sup>*63x* </sup>`11,905 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-43% </sup>`473.23 kB` |     <sup>*1x* </sup>`206 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` |  <sup>*28x* </sup>`5,319 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`479.73 kB` |  <sup>*17x* </sup>`3,321 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-66% </sup>`2.31 MB` |       <sup>-41% </sup>`488.09 kB` |     <sup>*2x* </sup>`463 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                       |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`490.89 kB` |   **<sup>🏆 </sup>`187 ms`** |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                               |       <sup>-33% </sup>`4.45 MB` |       <sup>-24% </sup>`625.76 kB` | <sup>*54x* </sup>`10,260 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: TypeError_</sub>                                    |                               — |                                 — |                            — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.8.3](https://www.npmjs.com/package/typescript/v/4.8.3) ([Source](https://unpkg.com/typescript@4.8.3/lib/typescript.js)) |                      `10.82 MB` |                         `1.87 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-70% </sup>`3.27 MB`** | **<sup>🏆-55% </sup>`843.46 kB`** |   <sup>*9x* </sup>`3,994 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-68% </sup>`3.50 MB` |       <sup>-54% </sup>`866.64 kB` |  <sup>*16x* </sup>`6,915 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                   |       <sup>-69% </sup>`3.33 MB` |       <sup>-53% </sup>`867.52 kB` |   **<sup>🏆 </sup>`414 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-68% </sup>`3.49 MB` |       <sup>-53% </sup>`869.36 kB` | <sup>*26x* </sup>`10,824 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                               |       <sup>-69% </sup>`3.31 MB` |       <sup>-52% </sup>`898.44 kB` |     <sup>*2x* </sup>`991 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-68% </sup>`3.45 MB` |       <sup>-52% </sup>`902.92 kB` |     <sup>*1x* </sup>`763 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [bun](/lib/minifiers/bun.ts) <sub>_Invalid output: AssertionError_</sub>                                                               |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                            |                               — |                                 — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Timed out_</sub>                                                                            |                               — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                              |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                                        |                               — |                                 — |                            — |
<!-- benchmarks:end -->

## Sponsors
<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
