# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 7, 2022<!-- lastUpdated:end -->._

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
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1) ([Source](https://unpkg.com/react@17.0.1/cjs/react.development.js)) |                       `72.14 kB` |                      `19.46 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                                |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*215x* </sup>`3,412 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.80 kB`** |       <sup>-58% </sup>`8.21 kB` |    <sup>*42x* </sup>`681 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*21x* </sup>`345 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.33 kB` |      <sup>*2x* </sup>`35 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |    <sup>*59x* </sup>`936 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |      <sup>*1x* </sup>`19 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*7x* </sup>`123 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.73 kB` |     <sup>*9x* </sup>`156 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-55% </sup>`8.75 kB` |    **<sup>🏆 </sup>`16 ms`** |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.53 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              |       <sup>-66% </sup>`58.33 kB` | **<sup>🏆-49% </sup>`18.50 kB`** | <sup>*120x* </sup>`1,649 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.59 kB` |    <sup>*68x* </sup>`936 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` | <sup>*165x* </sup>`2,252 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                    | **<sup>🏆-66% </sup>`58.27 kB`** |       <sup>-49% </sup>`18.79 kB` | <sup>*319x* </sup>`4,367 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.99 kB` |       <sup>-49% </sup>`18.80 kB` |      <sup>*5x* </sup>`82 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.89 kB` |       <sup>-47% </sup>`19.30 kB` |      <sup>*1x* </sup>`26 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*21x* </sup>`297 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*28x* </sup>`384 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.67 kB` |    **<sup>🏆 </sup>`14 ms`** |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.73 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.82 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** | <sup>*101x* </sup>`2,273 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*53x* </sup>`1,193 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.43 kB` |       <sup>-63% </sup>`31.12 kB` |     <sup>*6x* </sup>`147 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.26 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*18x* </sup>`408 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*21x* </sup>`472 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*159x* </sup>`3,581 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.20 kB` |       <sup>-62% </sup>`31.98 kB` |      <sup>*1x* </sup>`36 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-62% </sup>`32.16 kB` |    **<sup>🏆 </sup>`22 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                      |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.06 kB` | <sup>*217x* </sup>`4,894 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `90.12 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-66% </sup>`115.04 kB`** | **<sup>🏆-53% </sup>`42.55 kB`** | <sup>*102x* </sup>`2,792 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` |       <sup>-52% </sup>`42.91 kB` |  <sup>*54x* </sup>`1,468 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.79 kB` |       <sup>-52% </sup>`43.00 kB` |     <sup>*8x* </sup>`224 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.72 kB` | <sup>*145x* </sup>`3,966 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                             |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.11 kB` | <sup>*188x* </sup>`5,130 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.32 kB` |       <sup>-51% </sup>`44.30 kB` |      <sup>*1x* </sup>`46 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.39 kB` |       <sup>-51% </sup>`44.47 kB` |    <sup>*17x* </sup>`481 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.64 kB` |    <sup>*21x* </sup>`578 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-50% </sup>`45.10 kB` |    **<sup>🏆 </sup>`27 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `97.26 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.57 kB`** |  <sup>*88x* </sup>`2,328 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                       |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.91 kB` | <sup>*190x* </sup>`5,008 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` | <sup>*121x* </sup>`3,204 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-74% </sup>`25.16 kB` |  <sup>*50x* </sup>`1,329 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.43 kB` |       <sup>-74% </sup>`25.31 kB` |     <sup>*7x* </sup>`209 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.90 kB` |    <sup>*19x* </sup>`506 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.14 kB` |      <sup>*1x* </sup>`49 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*20x* </sup>`543 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.55 kB` |       <sup>-72% </sup>`26.95 kB` |    **<sup>🏆 </sup>`26 ms`** |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `130.55 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`265.31 kB`** | **<sup>🏆-33% </sup>`87.24 kB`** | <sup>*105x* </sup>`5,773 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |  <sup>*57x* </sup>`3,142 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |    <sup>*17x* </sup>`941 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |  <sup>*23x* </sup>`1,306 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-51% </sup>`270.24 kB` |       <sup>-31% </sup>`90.00 kB` |    <sup>*16x* </sup>`926 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.20 kB` |       <sup>-31% </sup>`90.63 kB` |      <sup>*1x* </sup>`83 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.08 kB` |       <sup>-30% </sup>`91.16 kB` |    **<sup>🏆 </sup>`55 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                      |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.68 kB` | <sup>*135x* </sup>`7,418 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.10.0](https://www.npmjs.com/package/terser/v/5.10.0) ([Source](https://unpkg.com/terser@5.10.0/dist/bundle.min.js)) |                       `905.11 kB` |                       `181.62 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-54% </sup>`412.56 kB` | **<sup>🏆-36% </sup>`116.87 kB`** |  <sup>*80x* </sup>`4,626 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.03 kB` |       <sup>-36% </sup>`117.04 kB` |  <sup>*47x* </sup>`2,742 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`430.30 kB` |       <sup>-35% </sup>`117.95 kB` |  <sup>*20x* </sup>`1,181 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`428.78 kB` |       <sup>-35% </sup>`118.07 kB` |    <sup>*17x* </sup>`994 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                             | **<sup>🏆-56% </sup>`398.69 kB`** |       <sup>-34% </sup>`119.30 kB` | <sup>*113x* </sup>`6,548 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.03 kB` |       <sup>-34% </sup>`119.33 kB` |    **<sup>🏆 </sup>`57 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.20 kB` |       <sup>-34% </sup>`119.84 kB` |      <sup>*1x* </sup>`87 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: TypeError_</sub>                                                            |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `249.01 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |   <sup>*86x* </sup>`7,279 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-36% </sup>`159.14 kB` |   <sup>*48x* </sup>`4,066 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`649.71 kB` |       <sup>-36% </sup>`160.13 kB` |     <sup>*11x* </sup>`963 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`161.44 kB` | <sup>*178x* </sup>`15,058 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                         |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`162.42 kB` |  <sup>*105x* </sup>`8,901 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*16x* </sup>`1,403 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*20x* </sup>`1,694 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.99 kB` |       <sup>-34% </sup>`163.24 kB` |      <sup>*1x* </sup>`140 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.26 kB` |       <sup>-33% </sup>`166.78 kB` |     **<sup>🏆 </sup>`84 ms`** |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `312.17 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-49% </sup>`159.01 kB`** |   <sup>*55x* </sup>`5,521 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`707.08 kB` |       <sup>-49% </sup>`159.14 kB` |   <sup>*87x* </sup>`8,681 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-66% </sup>`716.02 kB` |       <sup>-48% </sup>`161.16 kB` |   <sup>*12x* </sup>`1,197 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |   <sup>*23x* </sup>`2,272 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |   <sup>*19x* </sup>`1,916 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`719.75 kB` |       <sup>-45% </sup>`172.08 kB` |     **<sup>🏆 </sup>`99 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                             | **<sup>🏆-67% </sup>`705.87 kB`** |       <sup>-44% </sup>`175.18 kB` | <sup>*107x* </sup>`10,572 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.30 kB` |       <sup>-42% </sup>`180.45 kB` |      <sup>*1x* </sup>`175 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `689.67 kB` |                              |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`322.12 kB`** |  <sup>*40x* </sup>`8,068 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`983.84 kB`** |       <sup>-53% </sup>`326.05 kB` | <sup>*77x* </sup>`15,548 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*18x* </sup>`3,782 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |     <sup>*1x* </sup>`338 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |  <sup>*12x* </sup>`2,497 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-51% </sup>`339.05 kB` |   **<sup>🏆 </sup>`201 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub>                   |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: SyntaxError_</sub>                                                       |                                 — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `833.49 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                           | **<sup>🏆-68% </sup>`2.14 MB`** | **<sup>🏆-45% </sup>`455.89 kB`** | <sup>*64x* </sup>`15,789 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`461.42 kB` |  <sup>*37x* </sup>`9,240 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-44% </sup>`463.54 kB` |  <sup>*13x* </sup>`3,386 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |  <sup>*17x* </sup>`4,375 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |  <sup>*14x* </sup>`3,537 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`490.51 kB` |   **<sup>🏆 </sup>`244 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.09 kB` |     <sup>*2x* </sup>`531 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub>          |                               — |                                 — |                            — |
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
