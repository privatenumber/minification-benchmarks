# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 17, 2022<!-- lastUpdated:end -->._

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
| [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1) ([Source](https://unpkg.com/react@17.0.1/cjs/react.development.js)) |                       `72.14 kB` |                      `19.41 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*181x* </sup>`3,275 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.80 kB`** |       <sup>-58% </sup>`8.20 kB` |    <sup>*37x* </sup>`682 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*18x* </sup>`337 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.32 kB` |      <sup>*2x* </sup>`37 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.37 kB` |    <sup>*51x* </sup>`931 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |      <sup>*1x* </sup>`18 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.06 kB` |       <sup>-55% </sup>`8.65 kB` |     <sup>*6x* </sup>`122 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*8x* </sup>`154 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-55% </sup>`8.74 kB` |    **<sup>🏆 </sup>`18 ms`** |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              |       <sup>-66% </sup>`58.33 kB` | **<sup>🏆-49% </sup>`18.44 kB`** | <sup>*115x* </sup>`1,626 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.53 kB` |    <sup>*63x* </sup>`898 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-48% </sup>`18.62 kB` | <sup>*156x* </sup>`2,195 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  | **<sup>🏆-66% </sup>`58.27 kB`** |       <sup>-48% </sup>`18.75 kB` | <sup>*309x* </sup>`4,345 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.99 kB` |       <sup>-48% </sup>`18.76 kB` |      <sup>*5x* </sup>`80 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.89 kB` |       <sup>-47% </sup>`19.25 kB` |      <sup>*1x* </sup>`24 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`63.01 kB` |       <sup>-46% </sup>`19.48 kB` |    <sup>*20x* </sup>`294 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*26x* </sup>`371 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.64 kB` |    **<sup>🏆 </sup>`14 ms`** |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.82 kB`** | **<sup>🏆-63% </sup>`30.90 kB`** | <sup>*100x* </sup>`2,227 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`30.93 kB` |  <sup>*52x* </sup>`1,168 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.39 kB` |       <sup>-63% </sup>`31.04 kB` |     <sup>*6x* </sup>`142 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.26 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*17x* </sup>`398 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*21x* </sup>`471 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-62% </sup>`31.65 kB` | <sup>*157x* </sup>`3,505 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.20 kB` |       <sup>-62% </sup>`31.91 kB` |      <sup>*1x* </sup>`36 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-62% </sup>`32.10 kB` |    **<sup>🏆 </sup>`22 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*211x* </sup>`4,701 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-66% </sup>`115.04 kB`** | **<sup>🏆-53% </sup>`42.49 kB`** | <sup>*101x* </sup>`2,736 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` |       <sup>-52% </sup>`42.83 kB` |  <sup>*54x* </sup>`1,457 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.79 kB` |       <sup>-52% </sup>`42.95 kB` |     <sup>*8x* </sup>`218 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.67 kB` | <sup>*144x* </sup>`3,902 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*193x* </sup>`5,207 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.32 kB` |       <sup>-51% </sup>`44.26 kB` |      <sup>*1x* </sup>`43 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.39 kB` |       <sup>-50% </sup>`44.40 kB` |    <sup>*18x* </sup>`486 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |    <sup>*21x* </sup>`580 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-50% </sup>`45.08 kB` |    **<sup>🏆 </sup>`27 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.50 kB`** |  <sup>*94x* </sup>`2,311 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*195x* </sup>`4,792 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.06 kB` | <sup>*129x* </sup>`3,167 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-74% </sup>`25.06 kB` |  <sup>*54x* </sup>`1,324 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.43 kB` |       <sup>-74% </sup>`25.23 kB` |     <sup>*8x* </sup>`208 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.80 kB` |    <sup>*20x* </sup>`500 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*2x* </sup>`50 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*21x* </sup>`534 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.55 kB` |       <sup>-72% </sup>`26.90 kB` |    **<sup>🏆 </sup>`24 ms`** |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`265.31 kB`** | **<sup>🏆-33% </sup>`86.99 kB`** | <sup>*107x* </sup>`5,720 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.66 kB` |  <sup>*58x* </sup>`3,130 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.44 kB` |    <sup>*17x* </sup>`945 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` |  <sup>*24x* </sup>`1,287 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-51% </sup>`270.24 kB` |       <sup>-31% </sup>`89.75 kB` |    <sup>*16x* </sup>`904 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.20 kB` |       <sup>-30% </sup>`90.43 kB` |      <sup>*1x* </sup>`83 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.08 kB` |       <sup>-30% </sup>`90.97 kB` |    **<sup>🏆 </sup>`53 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*137x* </sup>`7,345 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.10.0](https://www.npmjs.com/package/terser/v/5.10.0) ([Source](https://unpkg.com/terser@5.10.0/dist/bundle.min.js)) |                       `905.11 kB` |                       `179.58 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-54% </sup>`412.56 kB` | **<sup>🏆-35% </sup>`116.55 kB`** |  <sup>*81x* </sup>`4,562 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.03 kB` |       <sup>-35% </sup>`116.69 kB` |  <sup>*48x* </sup>`2,733 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`430.30 kB` |       <sup>-35% </sup>`117.60 kB` |  <sup>*20x* </sup>`1,167 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`428.78 kB` |       <sup>-34% </sup>`117.70 kB` |    <sup>*17x* </sup>`970 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`398.69 kB`** |       <sup>-34% </sup>`118.95 kB` | <sup>*115x* </sup>`6,508 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.03 kB` |       <sup>-34% </sup>`118.99 kB` |    **<sup>🏆 </sup>`56 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.20 kB` |       <sup>-33% </sup>`119.44 kB` |      <sup>*1x* </sup>`84 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: TypeError_</sub>                                                            |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.03 kB`** |   <sup>*87x* </sup>`7,220 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-36% </sup>`158.57 kB` |   <sup>*48x* </sup>`4,023 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`649.82 kB` |       <sup>-36% </sup>`159.55 kB` |     <sup>*10x* </sup>`877 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`160.90 kB` | <sup>*186x* </sup>`15,446 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` |  <sup>*107x* </sup>`8,917 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |   <sup>*20x* </sup>`1,680 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`675.43 kB` |       <sup>-34% </sup>`162.37 kB` |   <sup>*16x* </sup>`1,408 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.99 kB` |       <sup>-34% </sup>`162.68 kB` |      <sup>*1x* </sup>`139 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.26 kB` |       <sup>-33% </sup>`166.25 kB` |     **<sup>🏆 </sup>`83 ms`** |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`707.08 kB` | **<sup>🏆-49% </sup>`158.02 kB`** |   <sup>*85x* </sup>`8,601 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` |       <sup>-49% </sup>`158.16 kB` |   <sup>*54x* </sup>`5,484 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-66% </sup>`715.96 kB` |       <sup>-48% </sup>`160.35 kB` |   <sup>*10x* </sup>`1,104 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |   <sup>*22x* </sup>`2,256 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`166.43 kB` |   <sup>*18x* </sup>`1,896 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`719.75 kB` |       <sup>-45% </sup>`171.21 kB` |    **<sup>🏆 </sup>`101 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-67% </sup>`705.87 kB`** |       <sup>-44% </sup>`174.20 kB` | <sup>*108x* </sup>`11,016 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.30 kB` |       <sup>-42% </sup>`179.80 kB` |      <sup>*1x* </sup>`170 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `683.47 kB` |                              |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`321.26 kB`** |  <sup>*42x* </sup>`8,085 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`983.84 kB`** |       <sup>-52% </sup>`325.28 kB` | <sup>*81x* </sup>`15,511 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` |  <sup>*19x* </sup>`3,772 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.70 kB` |  <sup>*13x* </sup>`2,506 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.90 kB` |     <sup>*1x* </sup>`343 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-51% </sup>`338.28 kB` |   **<sup>🏆 </sup>`191 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: SyntaxError_</sub>                                                       |                                 — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                           | **<sup>🏆-68% </sup>`2.14 MB`** | **<sup>🏆-45% </sup>`452.38 kB`** | <sup>*64x* </sup>`15,629 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-44% </sup>`458.51 kB` |  <sup>*37x* </sup>`9,119 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-44% </sup>`460.76 kB` |  <sup>*13x* </sup>`3,274 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` |  <sup>*17x* </sup>`4,343 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`479.55 kB` |  <sup>*14x* </sup>`3,487 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`486.43 kB` |   **<sup>🏆 </sup>`243 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.52 kB` |     <sup>*2x* </sup>`514 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                            — |
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
