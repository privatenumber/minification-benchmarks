# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:

- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [minify-js](https://github.com/wilsonzlin/minify-js)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Mar 30, 2023<!-- lastUpdated:end -->._

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
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.14 kB` |                      `19.41 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*1082x* </sup>`3,451 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`22.89 kB` |       <sup>-58% </sup>`8.18 kB` |       <sup>*8x* </sup>`27 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.19 kB` |    <sup>*244x* </sup>`780 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*121x* </sup>`387 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.60 kB` |       <sup>-57% </sup>`8.43 kB` |  <sup>*404x* </sup>`1,291 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |       <sup>*9x* </sup>`31 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.53 kB` |       <sup>-56% </sup>`8.62 kB` |      **<sup>🏆 </sup>`3 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.65 kB` |     <sup>*40x* </sup>`128 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*55x* </sup>`176 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                          |       <sup>-67% </sup>`23.46 kB` |       <sup>-54% </sup>`9.00 kB` |        <sup>*1x* </sup>`5 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.46 kB`** | <sup>*260x* </sup>`1,880 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.16 kB` |       <sup>-49% </sup>`18.59 kB` | <sup>*146x* </sup>`1,057 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.43 kB` |       <sup>-48% </sup>`18.70 kB` |      <sup>*9x* </sup>`70 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.75 kB` | <sup>*574x* </sup>`4,144 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.02 kB` | <sup>*341x* </sup>`2,465 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.24 kB` |      <sup>*3x* </sup>`29 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.94 kB` |       <sup>-46% </sup>`19.42 kB` |     **<sup>🏆 </sup>`7 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.44 kB` |    <sup>*45x* </sup>`328 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*59x* </sup>`431 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                              |       <sup>-65% </sup>`60.74 kB` |       <sup>-42% </sup>`20.82 kB` |      <sup>*2x* </sup>`15 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.54 kB`** | **<sup>🏆-63% </sup>`30.85 kB`** | <sup>*223x* </sup>`2,630 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.16 kB` |       <sup>-63% </sup>`30.87 kB` |    <sup>*10x* </sup>`119 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.90 kB` | <sup>*118x* </sup>`1,393 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.85 kB` |       <sup>-63% </sup>`31.44 kB` |    **<sup>🏆 </sup>`12 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.44 kB` |    <sup>*38x* </sup>`450 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*48x* </sup>`571 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.75 kB` | <sup>*320x* </sup>`3,768 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.89 kB` |      <sup>*3x* </sup>`46 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*389x* </sup>`4,581 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                |       <sup>-69% </sup>`90.51 kB` |       <sup>-61% </sup>`33.20 kB` |      <sup>*1x* </sup>`23 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`115.30 kB` | **<sup>🏆-53% </sup>`42.46 kB`** |     <sup>*8x* </sup>`159 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.87 kB` |  <sup>*91x* </sup>`1,766 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.89 kB` | <sup>*170x* </sup>`3,287 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.83 kB` | <sup>*214x* </sup>`4,127 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*260x* </sup>`5,012 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.24 kB` |      <sup>*2x* </sup>`47 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.36 kB` |    <sup>*25x* </sup>`499 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-66% </sup>`117.83 kB` |       <sup>-50% </sup>`44.37 kB` |    **<sup>🏆 </sup>`19 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |    <sup>*35x* </sup>`692 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                       |       <sup>-64% </sup>`121.77 kB` |       <sup>-48% </sup>`46.72 kB` |      <sup>*1x* </sup>`30 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-75% </sup>`24.56 kB`** | <sup>*166x* </sup>`2,787 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*295x* </sup>`4,952 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.05 kB` |     <sup>*7x* </sup>`129 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.05 kB` |       <sup>-74% </sup>`25.07 kB` |  <sup>*92x* </sup>`1,543 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.37 kB` | <sup>*199x* </sup>`3,341 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.76 kB` |    <sup>*30x* </sup>`502 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*2x* </sup>`40 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*37x* </sup>`628 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.47 kB` |       <sup>-73% </sup>`26.32 kB` |    **<sup>🏆 </sup>`17 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                        |                                — |                                — |                            — |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                |       <sup>-53% </sup>`263.91 kB` | **<sup>🏆-33% </sup>`86.73 kB`** | <sup>*130x* </sup>`6,053 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-52% </sup>`265.51 kB` |       <sup>-33% </sup>`87.17 kB` |     <sup>*7x* </sup>`343 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.91 kB` |       <sup>-33% </sup>`87.71 kB` |  <sup>*94x* </sup>`4,389 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.30 kB` |  <sup>*22x* </sup>`1,018 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` |  <sup>*36x* </sup>`1,706 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`269.93 kB` |       <sup>-31% </sup>`89.70 kB` |    **<sup>🏆 </sup>`46 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.13 kB` |       <sup>-30% </sup>`90.41 kB` |      <sup>*1x* </sup>`87 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*151x* </sup>`6,999 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                | **<sup>🏆-53% </sup>`261.82 kB`** |       <sup>-26% </sup>`95.58 kB` |      <sup>*1x* </sup>`68 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.16.8](https://www.npmjs.com/package/terser/v/5.16.8) ([Source](https://unpkg.com/terser@5.16.8/dist/bundle.min.js)) |                       `972.59 kB` |                       `186.02 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-55% </sup>`441.42 kB` | **<sup>🏆-36% </sup>`119.10 kB`** |     <sup>*7x* </sup>`308 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`437.51 kB` |       <sup>-36% </sup>`119.11 kB` | <sup>*130x* </sup>`5,626 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`443.76 kB` |       <sup>-36% </sup>`119.33 kB` |  <sup>*85x* </sup>`3,661 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-53% </sup>`458.88 kB` |       <sup>-35% </sup>`120.18 kB` |  <sup>*35x* </sup>`1,519 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`456.60 kB` |       <sup>-35% </sup>`120.31 kB` |  <sup>*25x* </sup>`1,103 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-55% </sup>`442.02 kB` |       <sup>-35% </sup>`120.45 kB` |    **<sup>🏆 </sup>`43 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`425.95 kB`** |       <sup>-35% </sup>`121.78 kB` | <sup>*149x* </sup>`6,442 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`444.25 kB` |       <sup>-34% </sup>`121.94 kB` |      <sup>*1x* </sup>`85 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                              |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`643.26 kB` | **<sup>🏆-36% </sup>`157.96 kB`** |     <sup>*6x* </sup>`478 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.26 kB` | <sup>*107x* </sup>`7,561 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`654.14 kB` |       <sup>-36% </sup>`158.99 kB` |  <sup>*75x* </sup>`5,322 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` | <sup>*117x* </sup>`8,291 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-35% </sup>`162.17 kB` |  <sup>*21x* </sup>`1,509 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |  <sup>*30x* </sup>`2,187 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`162.65 kB` |     <sup>*2x* </sup>`149 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`644.89 kB` |       <sup>-34% </sup>`163.91 kB` |    **<sup>🏆 </sup>`71 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                   |       <sup>-47% </sup>`660.81 kB` |       <sup>-32% </sup>`168.59 kB` |     <sup>*1x* </sup>`101 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                      |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`702.67 kB` | **<sup>🏆-49% </sup>`157.52 kB`** | <sup>*115x* </sup>`9,592 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`707.98 kB` |       <sup>-49% </sup>`157.84 kB` |     <sup>*8x* </sup>`695 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.61 kB` |       <sup>-49% </sup>`158.05 kB` |  <sup>*86x* </sup>`7,181 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`718.74 kB` |       <sup>-47% </sup>`164.50 kB` |    **<sup>🏆 </sup>`83 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |  <sup>*33x* </sup>`2,746 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`166.88 kB` |  <sup>*22x* </sup>`1,894 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                       | **<sup>🏆-72% </sup>`607.42 kB`** |       <sup>-46% </sup>`168.01 kB` |     <sup>*1x* </sup>`156 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-44% </sup>`174.20 kB` | <sup>*116x* </sup>`9,696 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`179.74 kB` |     <sup>*2x* </sup>`174 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `683.47 kB` |                              |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`993.61 kB` | **<sup>🏆-53% </sup>`319.94 kB`** |   <sup>*7x* </sup>`1,514 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`980.14 kB`** |       <sup>-52% </sup>`326.17 kB` | <sup>*76x* </sup>`15,698 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` |  <sup>*24x* </sup>`5,073 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.46 kB` |  <sup>*12x* </sup>`2,527 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.68 kB` |     <sup>*1x* </sup>`320 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.30 kB` |   **<sup>🏆 </sup>`206 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                    |         <sup>-69% </sup>`1.01 MB` |       <sup>-50% </sup>`340.93 kB` |     <sup>*1x* </sup>`260 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                   |                                 — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                       | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`453.28 kB`** |   <sup>*7x* </sup>`1,790 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                           |       <sup>-67% </sup>`2.23 MB` |       <sup>-45% </sup>`454.61 kB` | <sup>*67x* </sup>`16,074 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-44% </sup>`458.47 kB` | <sup>*52x* </sup>`12,470 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-43% </sup>`473.23 kB` |   **<sup>🏆 </sup>`239 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` |  <sup>*26x* </sup>`6,367 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`479.73 kB` |  <sup>*14x* </sup>`3,406 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-66% </sup>`2.31 MB` |       <sup>-41% </sup>`488.03 kB` |     <sup>*2x* </sup>`479 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: TypeError_</sub>                                    |                               — |                                 — |                            — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.8.3](https://www.npmjs.com/package/typescript/v/4.8.3) ([Source](https://unpkg.com/typescript@4.8.3/lib/typescript.js)) |                      `10.82 MB` |                         `1.87 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-70% </sup>`3.27 MB`** | **<sup>🏆-55% </sup>`843.64 kB`** |   <sup>*8x* </sup>`3,544 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-68% </sup>`3.50 MB` |       <sup>-54% </sup>`866.64 kB` |  <sup>*18x* </sup>`7,485 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                   |       <sup>-69% </sup>`3.33 MB` |       <sup>-53% </sup>`867.52 kB` |   **<sup>🏆 </sup>`401 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-68% </sup>`3.49 MB` |       <sup>-53% </sup>`869.36 kB` | <sup>*28x* </sup>`11,381 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                               |       <sup>-69% </sup>`3.31 MB` |       <sup>-52% </sup>`898.44 kB` |   <sup>*3x* </sup>`1,421 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-68% </sup>`3.45 MB` |       <sup>-52% </sup>`902.93 kB` |     <sup>*1x* </sup>`756 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                            |                               — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                              |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                                        |                               — |                                 — |                            — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.
