# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

This repo is routinely maintained to compare the quality and speed across the latest versions of the following JavaScript minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [tdewolff/minify](https://github.com/tdewolff/minify)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 3, 2022<!-- lastUpdated:end -->._

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
| [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1) ([Source](https://unpkg.com/react@17.0.1/cjs/react.development.js)) |                       `72.14 kB` |                      `19.46 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                                |       <sup>-68% </sup>`22.83 kB` | **<sup>🏆-58% </sup>`8.17 kB`** | <sup>*214x* </sup>`4,463 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-68% </sup>`22.80 kB`** |       <sup>-58% </sup>`8.21 kB` |    <sup>*42x* </sup>`890 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*21x* </sup>`448 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.33 kB` |      <sup>*2x* </sup>`47 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |  <sup>*60x* </sup>`1,265 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.53 kB` |      <sup>*1x* </sup>`27 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*7x* </sup>`156 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.73 kB` |     <sup>*9x* </sup>`204 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.65 kB` |       <sup>-55% </sup>`8.78 kB` |    **<sup>🏆 </sup>`21 ms`** |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.53 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              |       <sup>-66% </sup>`58.33 kB` | **<sup>🏆-49% </sup>`18.50 kB`** | <sup>*122x* </sup>`2,205 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.59 kB` |  <sup>*69x* </sup>`1,251 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` | <sup>*165x* </sup>`2,984 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                    | **<sup>🏆-66% </sup>`58.27 kB`** |       <sup>-49% </sup>`18.79 kB` | <sup>*291x* </sup>`5,261 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`58.99 kB` |       <sup>-49% </sup>`18.80 kB` |     <sup>*5x* </sup>`105 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.89 kB` |       <sup>-47% </sup>`19.30 kB` |      <sup>*1x* </sup>`33 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*22x* </sup>`398 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*27x* </sup>`492 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.75 kB` |    **<sup>🏆 </sup>`18 ms`** |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.73 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.82 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** |  <sup>*94x* </sup>`2,974 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*50x* </sup>`1,584 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.43 kB` |       <sup>-63% </sup>`31.12 kB` |     <sup>*5x* </sup>`177 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.26 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*16x* </sup>`520 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*19x* </sup>`616 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`91.93 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*155x* </sup>`4,918 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.20 kB` |       <sup>-62% </sup>`31.98 kB` |      <sup>*1x* </sup>`50 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.93 kB` |       <sup>-62% </sup>`32.28 kB` |    **<sup>🏆 </sup>`32 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                      |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.06 kB` | <sup>*190x* </sup>`6,006 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `90.12 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-66% </sup>`115.04 kB`** | **<sup>🏆-53% </sup>`42.55 kB`** | <sup>*100x* </sup>`3,831 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.77 kB` |       <sup>-52% </sup>`42.91 kB` |  <sup>*51x* </sup>`1,970 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`116.79 kB` |       <sup>-52% </sup>`43.00 kB` |     <sup>*7x* </sup>`275 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.72 kB` | <sup>*139x* </sup>`5,360 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                             |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.11 kB` | <sup>*172x* </sup>`6,626 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.32 kB` |       <sup>-51% </sup>`44.30 kB` |      <sup>*1x* </sup>`57 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.39 kB` |       <sup>-51% </sup>`44.47 kB` |    <sup>*16x* </sup>`634 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.64 kB` |    <sup>*20x* </sup>`787 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-65% </sup>`118.17 kB` |       <sup>-50% </sup>`45.24 kB` |    **<sup>🏆 </sup>`38 ms`** |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `97.26 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.57 kB`** |  <sup>*91x* </sup>`3,026 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                       |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.91 kB` | <sup>*190x* </sup>`6,285 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` | <sup>*131x* </sup>`4,321 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`71.09 kB` |       <sup>-74% </sup>`25.16 kB` |  <sup>*52x* </sup>`1,718 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`70.43 kB` |       <sup>-74% </sup>`25.31 kB` |     <sup>*7x* </sup>`260 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.90 kB` |    <sup>*20x* </sup>`661 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.14 kB` |      <sup>*1x* </sup>`53 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*20x* </sup>`686 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.55 kB` |       <sup>-72% </sup>`26.99 kB` |    **<sup>🏆 </sup>`33 ms`** |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `130.55 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-52% </sup>`265.31 kB`** | **<sup>🏆-33% </sup>`87.24 kB`** | <sup>*103x* </sup>`7,901 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |  <sup>*54x* </sup>`4,142 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |  <sup>*16x* </sup>`1,283 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |  <sup>*22x* </sup>`1,703 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-51% </sup>`270.24 kB` |       <sup>-31% </sup>`90.00 kB` |  <sup>*15x* </sup>`1,164 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.20 kB` |       <sup>-31% </sup>`90.63 kB` |     <sup>*1x* </sup>`104 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`270.31 kB` |       <sup>-30% </sup>`91.36 kB` |    **<sup>🏆 </sup>`77 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                      |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`93.68 kB` | <sup>*118x* </sup>`9,039 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.10.0](https://www.npmjs.com/package/terser/v/5.10.0) ([Source](https://unpkg.com/terser@5.10.0/dist/bundle.min.js)) |                       `905.11 kB` |                       `181.62 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-54% </sup>`412.56 kB` | **<sup>🏆-36% </sup>`116.87 kB`** |  <sup>*87x* </sup>`5,984 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`416.03 kB` |       <sup>-36% </sup>`117.04 kB` |  <sup>*53x* </sup>`3,634 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-52% </sup>`430.30 kB` |       <sup>-35% </sup>`117.95 kB` |  <sup>*22x* </sup>`1,546 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`428.78 kB` |       <sup>-35% </sup>`118.07 kB` |  <sup>*19x* </sup>`1,304 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                             | **<sup>🏆-56% </sup>`398.69 kB`** |       <sup>-34% </sup>`119.30 kB` | <sup>*120x* </sup>`8,252 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-54% </sup>`415.03 kB` |       <sup>-34% </sup>`119.51 kB` |    **<sup>🏆 </sup>`68 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`417.20 kB` |       <sup>-34% </sup>`119.84 kB` |     <sup>*1x* </sup>`115 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: TypeError_</sub>                                                            |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `249.01 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |   <sup>*92x* </sup>`9,748 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`653.38 kB` |       <sup>-36% </sup>`159.14 kB` |   <sup>*49x* </sup>`5,287 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`649.74 kB` |       <sup>-36% </sup>`160.12 kB` |   <sup>*11x* </sup>`1,213 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                         |       <sup>-48% </sup>`644.45 kB` |       <sup>-35% </sup>`162.42 kB` | <sup>*105x* </sup>`11,193 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*17x* </sup>`1,877 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*20x* </sup>`2,183 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.99 kB` |       <sup>-34% </sup>`163.24 kB` |      <sup>*1x* </sup>`171 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`648.26 kB` |       <sup>-33% </sup>`167.28 kB` |    **<sup>🏆 </sup>`106 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                      |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `312.17 kB` |                               |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-49% </sup>`159.01 kB`** |   <sup>*60x* </sup>`7,285 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-67% </sup>`707.08 kB` |       <sup>-49% </sup>`159.14 kB` |  <sup>*98x* </sup>`11,861 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-66% </sup>`716.02 kB` |       <sup>-48% </sup>`161.16 kB` |   <sup>*12x* </sup>`1,509 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |   <sup>*25x* </sup>`3,041 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |   <sup>*20x* </sup>`2,471 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`719.76 kB` |       <sup>-45% </sup>`172.41 kB` |    **<sup>🏆 </sup>`121 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts)                                             | **<sup>🏆-67% </sup>`705.87 kB`** |       <sup>-44% </sup>`175.18 kB` | <sup>*108x* </sup>`13,085 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.30 kB` |       <sup>-42% </sup>`180.45 kB` |      <sup>*1x* </sup>`222 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                   Original size |                         Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                       `3.20 MB` |                       `689.67 kB` |                              |
| **Minifier**                                                                                                                |               **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                          | **<sup>🏆-69% </sup>`1.00 MB`** | **<sup>🏆-53% </sup>`322.12 kB`** | <sup>*35x* </sup>`10,641 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |       <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*16x* </sup>`4,972 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |       <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |     <sup>*1x* </sup>`458 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |       <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |  <sup>*11x* </sup>`3,338 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |       <sup>-68% </sup>`1.02 MB` |       <sup>-51% </sup>`340.44 kB` |   **<sup>🏆 </sup>`303 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                               — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub>                   |                               — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: SyntaxError_</sub>                                                       |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                             |                               — |                                 — |                            — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `833.49 kB` |                              |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                     **Time** |
| [terser](/lib/minifiers/terser.ts)                                                                                 | **<sup>🏆-66% </sup>`2.25 MB`** | **<sup>🏆-45% </sup>`461.42 kB`** | <sup>*28x* </sup>`12,159 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                       |       <sup>-66% </sup>`2.27 MB` |       <sup>-44% </sup>`463.54 kB` |  <sup>*11x* </sup>`5,028 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |  <sup>*13x* </sup>`5,683 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |  <sup>*11x* </sup>`4,662 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-41% </sup>`491.03 kB` |   **<sup>🏆 </sup>`421 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.09 kB` |     <sup>*1x* </sup>`685 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub>          |                               — |                                 — |                            — |
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
