# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 14, 2022<!-- lastUpdated:end -->._

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
Minifiers are ranked by smallest minifed Brotli size.

#### Minified size

Size of the minified output.

#### Minified and Brotli size

Size of the minified output with [Brotli compression](https://en.wikipedia.org/wiki/Brotli).

For minifiers, this measures how compressable the output is.

For users, this measures network transfer size, which is usually the metric that matters most.

#### Time

How long minification took (average of 5 runs). Each time is annotated with a multiplier relative to the fastest minifier.

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                                                                                          |                    Original size |                     Brotli size |                              |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1) ([Source](https://unpkg.com/react@17.0.1/cjs/react.development.js)) |                       `72.14 kB` |                      `16.46 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |                 **Brotli size** |                     **Time** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-57% </sup>`7.15 kB`** | <sup>*240x* </sup>`4,275 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.80 kB`** |       <sup>-56% </sup>`7.19 kB` |    <sup>*38x* </sup>`683 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-56% </sup>`7.27 kB` |    <sup>*19x* </sup>`342 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.10 kB` |       <sup>-56% </sup>`7.28 kB` |      <sup>*2x* </sup>`36 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-55% </sup>`7.34 kB` |    <sup>*53x* </sup>`955 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-54% </sup>`7.50 kB` |      <sup>*1x* </sup>`18 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.06 kB` |       <sup>-54% </sup>`7.65 kB` |     <sup>*6x* </sup>`124 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-53% </sup>`7.70 kB` |     <sup>*8x* </sup>`158 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-53% </sup>`7.70 kB` |    **<sup>🏆 </sup>`18 ms`** |
----
| Artifact                                                                                                              |                    Original size |                      Brotli size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `30.37 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |                  **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              |       <sup>-66% </sup>`58.33 kB` | **<sup>🏆-45% </sup>`16.81 kB`** | <sup>*120x* </sup>`1,678 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-44% </sup>`16.88 kB` |    <sup>*68x* </sup>`953 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-44% </sup>`16.94 kB` | <sup>*161x* </sup>`2,248 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.98 kB` |       <sup>-44% </sup>`17.02 kB` |      <sup>*5x* </sup>`82 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  | **<sup>🏆-66% </sup>`58.27 kB`** |       <sup>-44% </sup>`17.02 kB` | <sup>*315x* </sup>`4,381 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.89 kB` |       <sup>-42% </sup>`17.53 kB` |      <sup>*1x* </sup>`26 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`63.01 kB` |       <sup>-42% </sup>`17.66 kB` |    <sup>*21x* </sup>`305 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-42% </sup>`17.71 kB` |    <sup>*28x* </sup>`389 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-41% </sup>`17.80 kB` |    **<sup>🏆 </sup>`14 ms`** |
----
| Artifact                                                                                                                |                    Original size |                      Brotli size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `70.07 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |                  **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.82 kB`** | **<sup>🏆-60% </sup>`28.05 kB`** |  <sup>*99x* </sup>`2,321 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-60% </sup>`28.06 kB` |  <sup>*51x* </sup>`1,199 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.39 kB` |       <sup>-60% </sup>`28.09 kB` |     <sup>*6x* </sup>`149 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-59% </sup>`28.45 kB` | <sup>*154x* </sup>`3,606 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.26 kB` |       <sup>-59% </sup>`28.49 kB` |    <sup>*17x* </sup>`401 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-59% </sup>`28.58 kB` |    <sup>*20x* </sup>`480 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-59% </sup>`28.91 kB` |    **<sup>🏆 </sup>`23 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.20 kB` |       <sup>-59% </sup>`28.97 kB` |      <sup>*1x* </sup>`36 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-58% </sup>`29.52 kB` | <sup>*211x* </sup>`4,928 ms` |
----
| Artifact                                                                                                       |                     Original size |                      Brotli size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `74.32 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |                  **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-66% </sup>`115.04 kB`** | **<sup>🏆-49% </sup>`37.68 kB`** | <sup>*105x* </sup>`2,865 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` |       <sup>-49% </sup>`38.05 kB` |  <sup>*55x* </sup>`1,502 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.79 kB` |       <sup>-49% </sup>`38.11 kB` |     <sup>*8x* </sup>`227 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-48% </sup>`38.51 kB` | <sup>*149x* </sup>`4,055 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-48% </sup>`38.73 kB` | <sup>*186x* </sup>`5,060 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.32 kB` |       <sup>-47% </sup>`39.26 kB` |      <sup>*1x* </sup>`44 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.39 kB` |       <sup>-47% </sup>`39.31 kB` |    <sup>*17x* </sup>`484 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-47% </sup>`39.40 kB` |    <sup>*21x* </sup>`592 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-46% </sup>`39.79 kB` |    **<sup>🏆 </sup>`27 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                      Brotli size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `74.46 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |                  **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-71% </sup>`21.78 kB`** |  <sup>*89x* </sup>`2,360 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-70% </sup>`22.23 kB` | <sup>*123x* </sup>`3,279 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-70% </sup>`22.26 kB` |  <sup>*51x* </sup>`1,361 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.43 kB` |       <sup>-70% </sup>`22.33 kB` |     <sup>*8x* </sup>`218 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-70% </sup>`22.36 kB` | <sup>*196x* </sup>`5,204 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`75.44 kB` |       <sup>-69% </sup>`22.85 kB` |    <sup>*18x* </sup>`500 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-69% </sup>`23.08 kB` |    <sup>*21x* </sup>`557 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-69% </sup>`23.28 kB` |      <sup>*1x* </sup>`50 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.55 kB` |       <sup>-68% </sup>`23.93 kB` |    **<sup>🏆 </sup>`26 ms`** |
----
| Artifact                                                                                                |                     Original size |                      Brotli size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `107.31 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |                  **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`265.31 kB`** | **<sup>🏆-32% </sup>`73.29 kB`** | <sup>*106x* </sup>`5,874 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-31% </sup>`73.81 kB` |  <sup>*57x* </sup>`3,183 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`276.12 kB` |       <sup>-30% </sup>`74.62 kB` |    <sup>*17x* </sup>`951 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-30% </sup>`75.16 kB` |  <sup>*23x* </sup>`1,325 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-51% </sup>`270.24 kB` |       <sup>-30% </sup>`75.41 kB` |    <sup>*17x* </sup>`962 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.08 kB` |       <sup>-28% </sup>`76.79 kB` |    **<sup>🏆 </sup>`55 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.20 kB` |       <sup>-28% </sup>`76.97 kB` |      <sup>*1x* </sup>`87 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-26% </sup>`79.48 kB` | <sup>*137x* </sup>`7,623 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                       Brotli size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.10.0](https://www.npmjs.com/package/terser/v/5.10.0) ([Source](https://unpkg.com/terser@5.10.0/dist/bundle.min.js)) |                       `905.11 kB` |                       `141.90 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                   **Brotli size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-54% </sup>`412.56 kB` | **<sup>🏆-29% </sup>`100.88 kB`** |  <sup>*78x* </sup>`4,639 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.03 kB` |       <sup>-29% </sup>`101.00 kB` |  <sup>*47x* </sup>`2,780 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`430.30 kB` |       <sup>-28% </sup>`101.69 kB` |  <sup>*20x* </sup>`1,185 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`428.78 kB` |       <sup>-28% </sup>`101.71 kB` |    <sup>*16x* </sup>`999 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.03 kB` |       <sup>-27% </sup>`103.14 kB` |    **<sup>🏆 </sup>`59 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`398.69 kB`** |       <sup>-27% </sup>`103.66 kB` | <sup>*112x* </sup>`6,663 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.20 kB` |       <sup>-27% </sup>`104.22 kB` |      <sup>*1x* </sup>`85 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: TypeError_</sub>                                                            |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                       Brotli size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `194.48 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                   **Brotli size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-34% </sup>`128.31 kB`** |   <sup>*88x* </sup>`7,439 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-34% </sup>`128.80 kB` |   <sup>*49x* </sup>`4,159 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`649.82 kB` |       <sup>-34% </sup>`129.16 kB` |     <sup>*11x* </sup>`984 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`645.34 kB` |       <sup>-33% </sup>`130.54 kB` | <sup>*180x* </sup>`15,218 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-32% </sup>`131.49 kB` |   <sup>*20x* </sup>`1,702 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`675.43 kB` |       <sup>-32% </sup>`131.59 kB` |   <sup>*17x* </sup>`1,453 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-32% </sup>`131.71 kB` |  <sup>*105x* </sup>`8,908 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.99 kB` |       <sup>-32% </sup>`132.91 kB` |      <sup>*1x* </sup>`143 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.26 kB` |       <sup>-30% </sup>`135.41 kB` |     **<sup>🏆 </sup>`84 ms`** |
----
| Artifact                                                                                                                       |                     Original size |                       Brotli size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `213.11 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                   **Brotli size** |                      **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-42% </sup>`122.96 kB`** |   <sup>*55x* </sup>`5,607 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`707.08 kB` |       <sup>-42% </sup>`123.25 kB` |   <sup>*90x* </sup>`9,107 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-66% </sup>`715.96 kB` |       <sup>-42% </sup>`124.31 kB` |   <sup>*12x* </sup>`1,238 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-40% </sup>`127.70 kB` |   <sup>*22x* </sup>`2,312 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.58 kB` |       <sup>-40% </sup>`128.25 kB` |   <sup>*18x* </sup>`1,917 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`719.75 kB` |       <sup>-38% </sup>`132.03 kB` |    **<sup>🏆 </sup>`101 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-67% </sup>`705.87 kB`** |       <sup>-37% </sup>`134.28 kB` | <sup>*107x* </sup>`10,903 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.30 kB` |       <sup>-35% </sup>`137.72 kB` |      <sup>*1x* </sup>`172 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                     Original size |                       Brotli size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `506.62 kB` |                              |
| **Minifier**                                                                                                                |                 **Minified size** |                   **Brotli size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-49% </sup>`260.15 kB`** |  <sup>*42x* </sup>`8,206 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`983.84 kB`** |       <sup>-48% </sup>`264.06 kB` | <sup>*81x* </sup>`15,848 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-48% </sup>`265.76 kB` |  <sup>*19x* </sup>`3,853 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-47% </sup>`266.11 kB` |  <sup>*13x* </sup>`2,545 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-47% </sup>`269.38 kB` |     <sup>*1x* </sup>`354 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-46% </sup>`273.71 kB` |   **<sup>🏆 </sup>`194 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: SyntaxError_</sub>                                                       |                                 — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                       Brotli size |                             |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `595.79 kB` |                             |
| **Minifier**                                                                                                       |               **Minified size** |                   **Brotli size** |                    **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                 | **<sup>🏆-66% </sup>`2.25 MB`** | **<sup>🏆-40% </sup>`359.40 kB`** | <sup>*37x* </sup>`9,360 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-40% </sup>`360.42 kB` | <sup>*12x* </sup>`3,091 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-38% </sup>`372.05 kB` | <sup>*17x* </sup>`4,393 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-37% </sup>`374.85 kB` | <sup>*14x* </sup>`3,617 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-36% </sup>`380.54 kB` |  **<sup>🏆 </sup>`247 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-36% </sup>`383.16 kB` |    <sup>*2x* </sup>`516 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                           — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                           — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                    |                               — |                                 — |                           — |
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
