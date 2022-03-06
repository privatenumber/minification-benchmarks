# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Mar 6, 2022<!-- lastUpdated:end -->._

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
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*224x* </sup>`4,461 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.75 kB`** |       <sup>-58% </sup>`8.22 kB` |    <sup>*41x* </sup>`818 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*19x* </sup>`393 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.31 kB` |      <sup>*1x* </sup>`33 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.37 kB` |  <sup>*58x* </sup>`1,164 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |      <sup>*1x* </sup>`22 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.65 kB` |     <sup>*7x* </sup>`143 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*9x* </sup>`183 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-55% </sup>`8.74 kB` |    **<sup>🏆 </sup>`20 ms`** |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.96 kB`** | **<sup>🏆-49% </sup>`18.44 kB`** | <sup>*111x* </sup>`1,943 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.53 kB` |  <sup>*61x* </sup>`1,071 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-48% </sup>`18.62 kB` | <sup>*152x* </sup>`2,643 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.75 kB` | <sup>*299x* </sup>`5,207 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.81 kB` |       <sup>-48% </sup>`18.87 kB` |      <sup>*5x* </sup>`95 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.83 kB` |       <sup>-47% </sup>`19.25 kB` |      <sup>*1x* </sup>`30 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.44 kB` |    <sup>*20x* </sup>`353 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*25x* </sup>`440 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.66 kB` |    **<sup>🏆 </sup>`17 ms`** |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.60 kB`** | **<sup>🏆-63% </sup>`30.87 kB`** | <sup>*109x* </sup>`2,719 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`30.93 kB` |  <sup>*56x* </sup>`1,397 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.44 kB` |    <sup>*19x* </sup>`481 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*22x* </sup>`566 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-62% </sup>`31.65 kB` | <sup>*181x* </sup>`4,535 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.37 kB` |       <sup>-62% </sup>`31.85 kB` |     <sup>*7x* </sup>`179 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.89 kB` |      <sup>*1x* </sup>`43 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-62% </sup>`32.10 kB` |    **<sup>🏆 </sup>`25 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*219x* </sup>`5,475 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` | **<sup>🏆-52% </sup>`42.83 kB`** |  <sup>*56x* </sup>`1,719 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`114.21 kB`** |       <sup>-52% </sup>`42.90 kB` | <sup>*110x* </sup>`3,384 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`43.30 kB` |     <sup>*6x* </sup>`211 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.67 kB` | <sup>*161x* </sup>`4,955 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*200x* </sup>`6,119 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.16 kB` |       <sup>-51% </sup>`44.25 kB` |      <sup>*1x* </sup>`51 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.36 kB` |    <sup>*18x* </sup>`555 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |    <sup>*22x* </sup>`690 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-50% </sup>`44.98 kB` |    **<sup>🏆 </sup>`31 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.60 kB`** | **<sup>🏆-74% </sup>`24.61 kB`** |  <sup>*95x* </sup>`2,854 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*202x* </sup>`6,034 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.06 kB` | <sup>*132x* </sup>`3,941 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-74% </sup>`25.06 kB` |  <sup>*51x* </sup>`1,539 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.00 kB` |       <sup>-74% </sup>`25.34 kB` |     <sup>*5x* </sup>`177 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.76 kB` |    <sup>*19x* </sup>`575 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*1x* </sup>`55 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*20x* </sup>`608 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.54 kB` |       <sup>-72% </sup>`26.89 kB` |    **<sup>🏆 </sup>`30 ms`** |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`264.38 kB`** | **<sup>🏆-33% </sup>`86.84 kB`** | <sup>*119x* </sup>`6,963 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.66 kB` |  <sup>*63x* </sup>`3,684 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.30 kB` |  <sup>*18x* </sup>`1,108 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-52% </sup>`267.44 kB` |       <sup>-32% </sup>`88.88 kB` |    <sup>*11x* </sup>`663 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` |  <sup>*26x* </sup>`1,557 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.18 kB` |       <sup>-30% </sup>`90.42 kB` |     <sup>*1x* </sup>`101 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.07 kB` |       <sup>-30% </sup>`90.94 kB` |    **<sup>🏆 </sup>`58 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*144x* </sup>`8,453 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.12.0](https://www.npmjs.com/package/terser/v/5.12.0) ([Source](https://unpkg.com/terser@5.12.0/dist/bundle.min.js)) |                       `906.80 kB` |                       `180.06 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.77 kB` | **<sup>🏆-35% </sup>`116.99 kB`** |  <sup>*50x* </sup>`3,294 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`412.08 kB` |       <sup>-35% </sup>`117.13 kB` |  <sup>*93x* </sup>`6,162 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`431.16 kB` |       <sup>-35% </sup>`117.92 kB` |  <sup>*21x* </sup>`1,398 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`429.36 kB` |       <sup>-34% </sup>`118.07 kB` |  <sup>*17x* </sup>`1,161 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.78 kB` |       <sup>-34% </sup>`119.24 kB` |    **<sup>🏆 </sup>`66 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`399.43 kB`** |       <sup>-34% </sup>`119.39 kB` | <sup>*118x* </sup>`7,749 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.89 kB` |       <sup>-33% </sup>`119.78 kB` |      <sup>*1x* </sup>`94 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-39% </sup>`551.83 kB` |       <sup>-26% </sup>`133.44 kB` |     <sup>*5x* </sup>`345 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`642.78 kB`** | **<sup>🏆-36% </sup>`158.27 kB`** |  <sup>*102x* </sup>`8,905 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-36% </sup>`158.57 kB` |   <sup>*55x* </sup>`4,815 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`647.78 kB` |       <sup>-35% </sup>`160.73 kB` |     <sup>*11x* </sup>`969 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` | <sup>*128x* </sup>`11,193 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-35% </sup>`162.17 kB` |   <sup>*21x* </sup>`1,852 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |   <sup>*23x* </sup>`2,046 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.78 kB` |       <sup>-34% </sup>`162.65 kB` |      <sup>*1x* </sup>`164 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.24 kB` |       <sup>-33% </sup>`166.21 kB` |     **<sup>🏆 </sup>`87 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                      |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       | **<sup>🏆-67% </sup>`704.12 kB`** | **<sup>🏆-49% </sup>`157.62 kB`** | <sup>*58x* </sup>`11,557 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` |       <sup>-49% </sup>`158.16 kB` |  <sup>*34x* </sup>`6,819 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`713.04 kB` |       <sup>-47% </sup>`164.13 kB` |  <sup>*12x* </sup>`2,473 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |  <sup>*14x* </sup>`2,784 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`166.88 kB` |  <sup>*12x* </sup>`2,499 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-44% </sup>`174.20 kB` | <sup>*63x* </sup>`12,634 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.21 kB` |       <sup>-42% </sup>`179.79 kB` |   **<sup>🏆 </sup>`199 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: ReferenceError_</sub>                               |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                             |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `683.47 kB` |                             |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                    **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`321.26 kB`** | <sup>*41x* </sup>`9,945 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                | **<sup>🏆-69% </sup>`999.60 kB`** |       <sup>-52% </sup>`326.51 kB` | <sup>*24x* </sup>`5,761 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` | <sup>*19x* </sup>`4,766 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.46 kB` | <sup>*13x* </sup>`3,290 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.87 kB` |    <sup>*1x* </sup>`437 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-50% </sup>`338.39 kB` |  **<sup>🏆 </sup>`240 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                           — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                                 — |                                 — |                           — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                             |                                 — |                                 — |                           — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                 | **<sup>🏆-66% </sup>`2.25 MB`** | **<sup>🏆-44% </sup>`458.51 kB`** | <sup>*41x* </sup>`11,527 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-44% </sup>`464.13 kB` |  <sup>*34x* </sup>`9,778 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` |  <sup>*18x* </sup>`5,155 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`479.73 kB` |  <sup>*15x* </sup>`4,382 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`485.42 kB` |   **<sup>🏆 </sup>`280 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-66% </sup>`2.31 MB` |       <sup>-41% </sup>`488.11 kB` |     <sup>*2x* </sup>`592 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                        |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                    |                               — |                                 — |                            — |
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
