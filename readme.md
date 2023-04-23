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

_Benchmarks last updated on <!-- lastUpdated:start -->Apr 23, 2023<!-- lastUpdated:end -->._

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
| [react v18.2.0](https://www.npmjs.com/package/react/v/18.2.0) ([Source](https://unpkg.com/react@18.2.0/cjs/react.development.js)) |                       `87.57 kB` |                      `23.58 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-71% </sup>`25.24 kB`** | **<sup>🏆-62% </sup>`9.07 kB`** |   <sup>*186x* </sup>`652 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-71% </sup>`25.66 kB` |       <sup>-61% </sup>`9.12 kB` | <sup>*788x* </sup>`2,761 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-71% </sup>`25.82 kB` |       <sup>-61% </sup>`9.20 kB` |      <sup>*9x* </sup>`34 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-70% </sup>`26.15 kB` |       <sup>-60% </sup>`9.33 kB` |    <sup>*94x* </sup>`330 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-70% </sup>`26.65 kB` |       <sup>-60% </sup>`9.41 kB` | <sup>*293x* </sup>`1,027 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-69% </sup>`26.82 kB` |       <sup>-59% </sup>`9.62 kB` |     <sup>*13x* </sup>`46 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-70% </sup>`26.57 kB` |       <sup>-59% </sup>`9.69 kB` |     **<sup>🏆 </sup>`3 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-68% </sup>`28.39 kB` |       <sup>-59% </sup>`9.74 kB` |    <sup>*34x* </sup>`122 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-67% </sup>`28.47 kB` |       <sup>-59% </sup>`9.77 kB` |    <sup>*41x* </sup>`144 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                          |       <sup>-70% </sup>`26.50 kB` |      <sup>-57% </sup>`10.13 kB` |       <sup>*2x* </sup>`7 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.4](https://www.npmjs.com/package/moment/v/2.29.4) ([Source](https://unpkg.com/moment@2.29.4/moment.js)) |                      `174.60 kB` |                       `36.34 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.93 kB`** | **<sup>🏆-49% </sup>`18.50 kB`** | <sup>*158x* </sup>`1,198 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.25 kB` |       <sup>-49% </sup>`18.66 kB` |   <sup>*103x* </sup>`780 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-67% </sup>`58.49 kB` |       <sup>-48% </sup>`18.76 kB` |     <sup>*10x* </sup>`76 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-67% </sup>`58.34 kB` |       <sup>-48% </sup>`18.81 kB` | <sup>*565x* </sup>`4,278 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.79 kB` |       <sup>-47% </sup>`19.09 kB` | <sup>*275x* </sup>`2,088 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.91 kB` |       <sup>-47% </sup>`19.31 kB` |     <sup>*12x* </sup>`98 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`60.02 kB` |       <sup>-46% </sup>`19.49 kB` |     **<sup>🏆 </sup>`8 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.59 kB` |       <sup>-46% </sup>`19.51 kB` |    <sup>*29x* </sup>`220 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.24 kB` |       <sup>-46% </sup>`19.62 kB` |    <sup>*40x* </sup>`308 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                              |       <sup>-65% </sup>`60.82 kB` |       <sup>-43% </sup>`20.88 kB` |      <sup>*2x* </sup>`18 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.6.4](https://www.npmjs.com/package/jquery/v/3.6.4) ([Source](https://unpkg.com/jquery@3.6.4/dist/jquery.js)) |                      `292.46 kB` |                       `86.00 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-70% </sup>`88.84 kB`** | **<sup>🏆-64% </sup>`30.95 kB`** | <sup>*153x* </sup>`1,926 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.48 kB` |       <sup>-64% </sup>`30.98 kB` |     <sup>*9x* </sup>`117 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.87 kB` |       <sup>-64% </sup>`31.01 kB` |  <sup>*80x* </sup>`1,012 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-68% </sup>`94.40 kB` |       <sup>-63% </sup>`31.55 kB` |    <sup>*24x* </sup>`306 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`90.18 kB` |       <sup>-63% </sup>`31.58 kB` |    **<sup>🏆 </sup>`13 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-68% </sup>`94.88 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*33x* </sup>`419 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`92.43 kB` |       <sup>-63% </sup>`31.83 kB` | <sup>*265x* </sup>`3,336 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.38 kB` |       <sup>-63% </sup>`32.00 kB` |      <sup>*4x* </sup>`57 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`93.06 kB` |       <sup>-62% </sup>`33.07 kB` | <sup>*375x* </sup>`4,713 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                |       <sup>-69% </sup>`90.76 kB` |       <sup>-61% </sup>`33.32 kB` |      <sup>*2x* </sup>`30 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.7.14](https://www.npmjs.com/package/vue/v/2.7.14) ([Source](https://unpkg.com/vue@2.7.14/dist/vue.js)) |                       `433.74 kB` |                      `102.64 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-69% </sup>`135.12 kB` | **<sup>🏆-52% </sup>`48.83 kB`** |     <sup>*8x* </sup>`166 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-69% </sup>`136.53 kB` |       <sup>-52% </sup>`49.21 kB` |  <sup>*82x* </sup>`1,653 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-69% </sup>`133.02 kB`** |       <sup>-52% </sup>`49.26 kB` | <sup>*133x* </sup>`2,656 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-68% </sup>`137.64 kB` |       <sup>-51% </sup>`50.19 kB` | <sup>*205x* </sup>`4,091 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-69% </sup>`135.32 kB` |       <sup>-51% </sup>`50.57 kB` | <sup>*259x* </sup>`5,184 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-68% </sup>`138.08 kB` |       <sup>-51% </sup>`50.70 kB` |      <sup>*4x* </sup>`83 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-68% </sup>`137.46 kB` |       <sup>-51% </sup>`50.71 kB` |    **<sup>🏆 </sup>`20 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-66% </sup>`146.40 kB` |       <sup>-51% </sup>`50.77 kB` |    <sup>*20x* </sup>`405 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-66% </sup>`146.94 kB` |       <sup>-50% </sup>`50.95 kB` |    <sup>*29x* </sup>`597 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                       |       <sup>-68% </sup>`140.60 kB` |       <sup>-48% </sup>`53.39 kB` |      <sup>*2x* </sup>`44 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.39 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-75% </sup>`24.56 kB`** | <sup>*108x* </sup>`1,889 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*255x* </sup>`4,457 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.05 kB` |     <sup>*6x* </sup>`113 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.05 kB` |       <sup>-74% </sup>`25.07 kB` |  <sup>*64x* </sup>`1,129 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.37 kB` | <sup>*171x* </sup>`2,994 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.76 kB` |    <sup>*20x* </sup>`358 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*2x* </sup>`51 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*29x* </sup>`511 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.47 kB` |       <sup>-73% </sup>`26.32 kB` |    **<sup>🏆 </sup>`17 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                        |                                — |                                — |                            — |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v7.8.4](https://www.npmjs.com/package/d3/v/7.8.4) ([Source](https://unpkg.com/d3@7.8.4/dist/d3.js)) |                       `586.96 kB` |                      `138.16 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-53% </sup>`275.20 kB`** | **<sup>🏆-34% </sup>`91.27 kB`** |  <sup>*89x* </sup>`4,952 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-53% </sup>`276.97 kB` |       <sup>-34% </sup>`91.69 kB` |     <sup>*6x* </sup>`386 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`279.49 kB` |       <sup>-33% </sup>`92.29 kB` |  <sup>*71x* </sup>`3,965 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-51% </sup>`287.99 kB` |       <sup>-33% </sup>`92.65 kB` |    <sup>*12x* </sup>`715 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-51% </sup>`288.89 kB` |       <sup>-32% </sup>`93.39 kB` |  <sup>*27x* </sup>`1,521 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-52% </sup>`281.41 kB` |       <sup>-32% </sup>`93.94 kB` |    **<sup>🏆 </sup>`55 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-52% </sup>`281.74 kB` |       <sup>-31% </sup>`94.86 kB` |     <sup>*2x* </sup>`139 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-52% </sup>`281.96 kB` |       <sup>-29% </sup>`98.17 kB` | <sup>*136x* </sup>`7,567 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Failed to minify_</sub>                                  |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.17.1](https://www.npmjs.com/package/terser/v/5.17.1) ([Source](https://unpkg.com/terser@5.17.1/dist/bundle.min.js)) |                       `975.79 kB` |                       `186.60 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-55% </sup>`442.51 kB` | **<sup>🏆-36% </sup>`119.29 kB`** |     <sup>*6x* </sup>`283 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`438.56 kB` |       <sup>-36% </sup>`119.35 kB` |  <sup>*95x* </sup>`4,237 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`444.84 kB` |       <sup>-36% </sup>`119.57 kB` |  <sup>*68x* </sup>`3,024 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-53% </sup>`460.03 kB` |       <sup>-35% </sup>`120.41 kB` |  <sup>*29x* </sup>`1,286 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`457.77 kB` |       <sup>-35% </sup>`120.53 kB` |    <sup>*16x* </sup>`740 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-55% </sup>`443.11 kB` |       <sup>-35% </sup>`120.67 kB` |    **<sup>🏆 </sup>`44 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`427.04 kB`** |       <sup>-35% </sup>`121.97 kB` | <sup>*153x* </sup>`6,778 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`445.35 kB` |       <sup>-35% </sup>`122.18 kB` |     <sup>*2x* </sup>`102 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: SyntaxError_</sub>                                              |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [three v0.151.3](https://www.npmjs.com/package/three/v/0.151.3) ([Source](https://unpkg.com/three@0.151.3/build/three.js)) |                         `1.25 MB` |                       `244.64 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               | **<sup>🏆-50% </sup>`623.00 kB`** | **<sup>🏆-37% </sup>`155.30 kB`** |     <sup>*7x* </sup>`429 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   |       <sup>-50% </sup>`623.99 kB` |       <sup>-36% </sup>`156.38 kB` |  <sup>*99x* </sup>`5,839 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-49% </sup>`632.18 kB` |       <sup>-36% </sup>`156.97 kB` | <sup>*109x* </sup>`6,456 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-50% </sup>`627.77 kB` |       <sup>-35% </sup>`158.81 kB` |    **<sup>🏆 </sup>`59 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-47% </sup>`655.60 kB` |       <sup>-35% </sup>`159.01 kB` |  <sup>*21x* </sup>`1,241 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-47% </sup>`657.22 kB` |       <sup>-35% </sup>`159.38 kB` |  <sup>*31x* </sup>`1,832 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-49% </sup>`629.70 kB` |       <sup>-34% </sup>`161.00 kB` |     <sup>*2x* </sup>`132 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-50% </sup>`626.94 kB` |       <sup>-34% </sup>`161.67 kB` | <sup>*159x* </sup>`9,387 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                               |                                 — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Failed to minify_</sub>                                                     |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v36.6.8](https://www.npmjs.com/package/victory/v/36.6.8) ([Source](https://unpkg.com/victory@36.6.8/dist/victory.js)) |                         `2.35 MB` |                       `333.50 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-66% </sup>`798.94 kB` | **<sup>🏆-51% </sup>`164.58 kB`** |   <sup>*89x* </sup>`8,324 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-65% </sup>`812.74 kB` |       <sup>-50% </sup>`166.35 kB` |   <sup>*71x* </sup>`6,636 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-65% </sup>`811.69 kB` |       <sup>-50% </sup>`168.30 kB` |      <sup>*7x* </sup>`700 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-65% </sup>`817.61 kB` |       <sup>-48% </sup>`173.09 kB` |     **<sup>🏆 </sup>`93 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`852.84 kB` |       <sup>-48% </sup>`173.52 kB` |   <sup>*27x* </sup>`2,565 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-64% </sup>`851.39 kB` |       <sup>-48% </sup>`174.64 kB` |   <sup>*18x* </sup>`1,730 ms` |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                       | **<sup>🏆-71% </sup>`685.65 kB`** |       <sup>-47% </sup>`175.34 kB` |      <sup>*2x* </sup>`197 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-66% </sup>`803.67 kB` |       <sup>-43% </sup>`188.96 kB` | <sup>*126x* </sup>`11,723 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-65% </sup>`825.20 kB` |       <sup>-42% </sup>`194.98 kB` |      <sup>*2x* </sup>`190 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                   Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.4.2](https://www.npmjs.com/package/echarts/v/5.4.2) ([Source](https://unpkg.com/echarts@5.4.2/dist/echarts.js)) |                       `3.33 MB` |                       `717.18 kB` |                              |
| **Minifier**                                                                                                                |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`1.03 MB` | **<sup>🏆-53% </sup>`336.66 kB`** |   <sup>*7x* </sup>`1,397 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`1.02 MB`** |       <sup>-52% </sup>`342.91 kB` | <sup>*76x* </sup>`13,712 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                        |       <sup>-69% </sup>`1.03 MB` |       <sup>-52% </sup>`344.33 kB` | <sup>*82x* </sup>`14,751 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |       <sup>-67% </sup>`1.12 MB` |       <sup>-52% </sup>`347.54 kB` |  <sup>*27x* </sup>`4,857 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |       <sup>-67% </sup>`1.11 MB` |       <sup>-51% </sup>`348.16 kB` |  <sup>*12x* </sup>`2,153 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |       <sup>-68% </sup>`1.05 MB` |       <sup>-51% </sup>`348.60 kB` |     <sup>*1x* </sup>`347 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |       <sup>-68% </sup>`1.05 MB` |       <sup>-51% </sup>`348.93 kB` |   **<sup>🏆 </sup>`178 ms`** |
| [minify-js](/lib/minifiers/minify-js.ts)                                                                                    |       <sup>-69% </sup>`1.05 MB` |       <sup>-50% </sup>`358.81 kB` |     <sup>*1x* </sup>`307 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                               — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                   |                               — |                                 — |                            — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v5.0.4](https://www.npmjs.com/package/typescript/v/5.0.4) ([Source](https://unpkg.com/typescript@5.0.4/lib/typescript.js)) |                       `8.11 MB` |                         `1.38 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-64% </sup>`2.89 MB`** | **<sup>🏆-41% </sup>`812.55 kB`** |   <sup>*6x* </sup>`3,755 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                   |       <sup>-64% </sup>`2.94 MB` |       <sup>-40% </sup>`827.15 kB` |   **<sup>🏆 </sup>`579 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-62% </sup>`3.08 MB` |       <sup>-40% </sup>`828.99 kB` | <sup>*25x* </sup>`14,750 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-62% </sup>`3.07 MB` |       <sup>-40% </sup>`835.37 kB` |  <sup>*10x* </sup>`6,336 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-63% </sup>`3.00 MB` |       <sup>-38% </sup>`856.52 kB` |     <sup>*1x* </sup>`605 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                            |                               — |                                 — |                            — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Failed to minify_</sub>                                                                 |                               — |                                 — |                            — |
| [terser](/lib/minifiers/terser.ts) <sub>_Timed out_</sub>                                                                              |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                                        |                               — |                                 — |                            — |
----
| Artifact                                                                                                         |     Original size |          Gzip size |          |
| :--------------------------------------------------------------------------------------------------------------- | ----------------: | -----------------: | -------: |
| [antd v5.4.4](https://www.npmjs.com/package/antd/v/5.4.4) ([Source](https://unpkg.com/antd@5.4.4/dist/antd.js))  |         `8.14 MB` |          `1.04 MB` |          |
| **Minifier**                                                                                                     | **Minified size** | **Minzipped size** | **Time** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Invalid output: AssertionError_</sub>                       |                 — |                  — |        — |
| [esbuild](/lib/minifiers/esbuild.ts) <sub>_Invalid output: AssertionError_</sub>                                 |                 — |                  — |        — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Invalid output: AssertionError_</sub> |                 — |                  — |        — |
| [minify-js](/lib/minifiers/minify-js.ts) <sub>_Invalid output: AssertionError_</sub>                             |                 — |                  — |        — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: AssertionError_</sub>                                         |                 — |                  — |        — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: AssertionError_</sub>                 |                 — |                  — |        — |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts) <sub>_Invalid output: AssertionError_</sub>           |                 — |                  — |        — |
| [terser](/lib/minifiers/terser.ts) <sub>_Invalid output: AssertionError_</sub>                                   |                 — |                  — |        — |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts) <sub>_Invalid output: AssertionError_</sub>     |                 — |                  — |        — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Invalid output: AssertionError_</sub>                             |                 — |                  — |        — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.
