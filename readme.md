# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Feb 17, 2022<!-- lastUpdated:end -->._

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
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*180x* </sup>`4,465 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.77 kB`** |       <sup>-58% </sup>`8.23 kB` |    <sup>*33x* </sup>`835 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*17x* </sup>`428 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.11 kB` |       <sup>-57% </sup>`8.32 kB` |      <sup>*1x* </sup>`42 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.37 kB` |  <sup>*47x* </sup>`1,165 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |    **<sup>🏆 </sup>`25 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.05 kB` |       <sup>-55% </sup>`8.64 kB` |     <sup>*6x* </sup>`154 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*7x* </sup>`195 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-55% </sup>`8.74 kB` |      <sup>*1x* </sup>`25 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.15 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`58.14 kB`** | **<sup>🏆-49% </sup>`18.43 kB`** | <sup>*127x* </sup>`2,062 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.53 kB` |  <sup>*72x* </sup>`1,176 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-48% </sup>`18.62 kB` | <sup>*167x* </sup>`2,713 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.75 kB` | <sup>*322x* </sup>`5,210 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.94 kB` |       <sup>-48% </sup>`18.75 kB` |     <sup>*6x* </sup>`101 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.83 kB` |       <sup>-47% </sup>`19.25 kB` |      <sup>*1x* </sup>`31 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.73 kB` |       <sup>-46% </sup>`19.44 kB` |    <sup>*22x* </sup>`369 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.56 kB` |    <sup>*29x* </sup>`477 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.66 kB` |    **<sup>🏆 </sup>`16 ms`** |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.37 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.75 kB`** | **<sup>🏆-63% </sup>`30.89 kB`** |  <sup>*95x* </sup>`2,683 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`30.93 kB` |  <sup>*53x* </sup>`1,503 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.42 kB` |       <sup>-63% </sup>`31.06 kB` |     <sup>*6x* </sup>`190 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.21 kB` |       <sup>-63% </sup>`31.50 kB` |    <sup>*18x* </sup>`509 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.59 kB` |    <sup>*20x* </sup>`584 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-62% </sup>`31.65 kB` | <sup>*158x* </sup>`4,474 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.08 kB` |       <sup>-62% </sup>`31.90 kB` |      <sup>*1x* </sup>`46 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-62% </sup>`32.10 kB` |    **<sup>🏆 </sup>`28 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`32.98 kB` | <sup>*193x* </sup>`5,456 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.52 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` | **<sup>🏆-52% </sup>`42.83 kB`** |  <sup>*52x* </sup>`1,829 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`114.32 kB`** |       <sup>-52% </sup>`42.88 kB` | <sup>*101x* </sup>`3,559 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.80 kB` |       <sup>-52% </sup>`42.97 kB` |     <sup>*8x* </sup>`299 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.67 kB` | <sup>*142x* </sup>`4,981 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.05 kB` | <sup>*174x* </sup>`6,119 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.16 kB` |       <sup>-51% </sup>`44.25 kB` |      <sup>*1x* </sup>`55 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.28 kB` |       <sup>-51% </sup>`44.31 kB` |    <sup>*17x* </sup>`602 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.57 kB` |    <sup>*20x* </sup>`723 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-50% </sup>`44.98 kB` |    **<sup>🏆 </sup>`35 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.40 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.85 kB`** | **<sup>🏆-74% </sup>`24.59 kB`** |  <sup>*90x* </sup>`2,899 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.84 kB` | <sup>*181x* </sup>`5,809 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.06 kB` | <sup>*124x* </sup>`4,007 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-74% </sup>`25.06 kB` |  <sup>*50x* </sup>`1,634 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.43 kB` |       <sup>-74% </sup>`25.21 kB` |     <sup>*8x* </sup>`271 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.87 kB` |       <sup>-73% </sup>`25.71 kB` |    <sup>*19x* </sup>`622 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.06 kB` |      <sup>*2x* </sup>`64 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.10 kB` |    <sup>*20x* </sup>`672 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.54 kB` |       <sup>-72% </sup>`26.89 kB` |    **<sup>🏆 </sup>`32 ms`** |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `129.99 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`264.78 kB`** | **<sup>🏆-33% </sup>`86.84 kB`** | <sup>*106x* </sup>`7,106 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.66 kB` |  <sup>*59x* </sup>`3,952 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.72 kB` |       <sup>-32% </sup>`88.32 kB` |  <sup>*17x* </sup>`1,192 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`88.99 kB` |  <sup>*24x* </sup>`1,638 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-51% </sup>`269.74 kB` |       <sup>-31% </sup>`89.71 kB` |  <sup>*18x* </sup>`1,229 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.18 kB` |       <sup>-30% </sup>`90.42 kB` |     <sup>*1x* </sup>`104 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.07 kB` |       <sup>-30% </sup>`90.94 kB` |    **<sup>🏆 </sup>`67 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.48 kB` | <sup>*133x* </sup>`8,903 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.10.0](https://www.npmjs.com/package/terser/v/5.10.0) ([Source](https://unpkg.com/terser@5.10.0/dist/bundle.min.js)) |                       `905.11 kB` |                       `179.58 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.03 kB` | **<sup>🏆-35% </sup>`116.69 kB`** |  <sup>*49x* </sup>`3,458 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-54% </sup>`411.92 kB` |       <sup>-35% </sup>`116.78 kB` |  <sup>*83x* </sup>`5,829 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`430.30 kB` |       <sup>-35% </sup>`117.60 kB` |  <sup>*21x* </sup>`1,487 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`428.67 kB` |       <sup>-34% </sup>`117.69 kB` |  <sup>*17x* </sup>`1,212 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`398.68 kB`** |       <sup>-34% </sup>`118.96 kB` | <sup>*114x* </sup>`8,034 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.03 kB` |       <sup>-34% </sup>`118.98 kB` |    **<sup>🏆 </sup>`70 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.15 kB` |       <sup>-33% </sup>`119.43 kB` |     <sup>*1x* </sup>`109 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-39% </sup>`550.92 kB` |       <sup>-26% </sup>`133.09 kB` |     <sup>*5x* </sup>`399 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `247.75 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`643.33 kB`** | **<sup>🏆-36% </sup>`158.46 kB`** |   <sup>*85x* </sup>`8,698 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-36% </sup>`158.57 kB` |   <sup>*49x* </sup>`5,012 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`649.47 kB` |       <sup>-36% </sup>`159.47 kB` |   <sup>*11x* </sup>`1,149 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`161.84 kB` | <sup>*109x* </sup>`11,131 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`162.35 kB` |   <sup>*20x* </sup>`2,091 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`675.05 kB` |       <sup>-34% </sup>`162.54 kB` |   <sup>*17x* </sup>`1,758 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.78 kB` |       <sup>-34% </sup>`162.65 kB` |      <sup>*1x* </sup>`174 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.24 kB` |       <sup>-33% </sup>`166.21 kB` |    **<sup>🏆 </sup>`102 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                      |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.06 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-49% </sup>`158.16 kB`** |  <sup>*33x* </sup>`6,708 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       | **<sup>🏆-67% </sup>`704.26 kB`** |       <sup>-49% </sup>`158.17 kB` | <sup>*53x* </sup>`10,922 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`713.17 kB` |       <sup>-48% </sup>`160.16 kB` |   <sup>*6x* </sup>`1,399 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`165.72 kB` |  <sup>*13x* </sup>`2,792 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.55 kB` |       <sup>-46% </sup>`167.71 kB` |  <sup>*11x* </sup>`2,383 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-44% </sup>`174.20 kB` | <sup>*60x* </sup>`12,333 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.24 kB` |       <sup>-42% </sup>`179.79 kB` |   **<sup>🏆 </sup>`203 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: ReferenceError_</sub>                               |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                    |                   Original size |                         Gzip size |                             |
| :-------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                       `3.20 MB` |                       `683.47 kB` |                             |
| **Minifier**                                                                                                                |               **Minified size** |                **Minzipped size** |                    **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          | **<sup>🏆-69% </sup>`1.00 MB`** | **<sup>🏆-53% </sup>`321.26 kB`** | <sup>*41x* </sup>`9,990 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`323.60 kB` | <sup>*27x* </sup>`6,704 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |       <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`329.73 kB` | <sup>*18x* </sup>`4,515 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |       <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.29 kB` | <sup>*12x* </sup>`3,124 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |       <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`330.87 kB` |    <sup>*1x* </sup>`438 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |       <sup>-68% </sup>`1.01 MB` |       <sup>-50% </sup>`338.39 kB` |  **<sup>🏆 </sup>`241 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                               — |                                 — |                           — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                 |                               — |                                 — |                           — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                             |                               — |                                 — |                           — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.74 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                 | **<sup>🏆-66% </sup>`2.25 MB`** | **<sup>🏆-44% </sup>`458.51 kB`** | <sup>*32x* </sup>`11,290 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-44% </sup>`460.68 kB` |  <sup>*12x* </sup>`4,260 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`476.68 kB` |  <sup>*15x* </sup>`5,300 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.09 kB` |  <sup>*12x* </sup>`4,351 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`485.42 kB` |   **<sup>🏆 </sup>`348 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.46 kB` |     <sup>*1x* </sup>`632 ms` |
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
