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

_Benchmarks last updated on <!-- lastUpdated:start -->Apr 6, 2024<!-- lastUpdated:end -->._

<br>

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum">
		<picture>
			<source width="830" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image=dark">
			<source width="830" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image">
			<img width="830" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=platinum&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

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

<br>

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold">
		<picture>
			<source width="830" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image=dark">
			<source width="830" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image">
			<img width="830" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=gold&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.13 kB` |                      `19.39 kB` |                              |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                     **Time** |
| @swc/core                                                                                                                         |       <sup>-68% </sup>`22.87 kB` | **<sup>🏆-58% </sup>`8.17 kB`** |      <sup>*3x* </sup>`41 ms` |
| uglify-js                                                                                                                         | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.18 kB` |    <sup>*15x* </sup>`202 ms` |
| google-closure-compiler                                                                                                           |       <sup>-68% </sup>`22.83 kB` |       <sup>-58% </sup>`8.19 kB` | <sup>*149x* </sup>`1,989 ms` |
| terser                                                                                                                            |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |     <sup>*8x* </sup>`115 ms` |
| babel-minify                                                                                                                      |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*25x* </sup>`340 ms` |
| esbuild                                                                                                                           |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |    **<sup>🏆 </sup>`13 ms`** |
| bun                                                                                                                               |       <sup>-67% </sup>`24.01 kB` |       <sup>-55% </sup>`8.65 kB` | <sup>*111x* </sup>`1,483 ms` |
| uglify-js (no compress)                                                                                                           |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*2x* </sup>`37 ms` |
| terser (no compress)                                                                                                              |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |      <sup>*3x* </sup>`48 ms` |
| tedivm/jshrink                                                                                                                    |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |    <sup>*41x* </sup>`555 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| uglify-js                                                                                                             | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** |    <sup>*24x* </sup>`446 ms` |
| @swc/core                                                                                                             |       <sup>-67% </sup>`58.21 kB` |       <sup>-48% </sup>`18.69 kB` |      <sup>*1x* </sup>`34 ms` |
| terser                                                                                                                |       <sup>-66% </sup>`59.16 kB` |       <sup>-48% </sup>`18.69 kB` |    <sup>*14x* </sup>`259 ms` |
| google-closure-compiler                                                                                               |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.91 kB` | <sup>*112x* </sup>`2,005 ms` |
| babel-minify                                                                                                          |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` |    <sup>*38x* </sup>`681 ms` |
| esbuild                                                                                                               |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |    **<sup>🏆 </sup>`18 ms`** |
| uglify-js (no compress)                                                                                               |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |      <sup>*4x* </sup>`83 ms` |
| terser (no compress)                                                                                                  |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.68 kB` |     <sup>*6x* </sup>`113 ms` |
| bun                                                                                                                   |       <sup>-64% </sup>`61.86 kB` |       <sup>-45% </sup>`19.87 kB` |      <sup>*2x* </sup>`43 ms` |
| tedivm/jshrink                                                                                                        |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |     <sup>*6x* </sup>`113 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                             |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                             |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                    **Time** |
| @swc/core                                                                                                               |       <sup>-69% </sup>`89.16 kB` | **<sup>🏆-63% </sup>`30.87 kB`** |     <sup>*2x* </sup>`47 ms` |
| uglify-js                                                                                                               | **<sup>🏆-69% </sup>`88.54 kB`** |       <sup>-63% </sup>`30.89 kB` |   <sup>*25x* </sup>`606 ms` |
| terser                                                                                                                  |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` |   <sup>*14x* </sup>`335 ms` |
| uglify-js (no compress)                                                                                                 |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*5x* </sup>`118 ms` |
| terser (no compress)                                                                                                    |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.62 kB` |    <sup>*6x* </sup>`149 ms` |
| babel-minify                                                                                                            |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*48x* </sup>`1,126 ms` |
| esbuild                                                                                                                 |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |   **<sup>🏆 </sup>`23 ms`** |
| bun                                                                                                                     |       <sup>-68% </sup>`92.56 kB` |       <sup>-61% </sup>`32.70 kB` |     <sup>*1x* </sup>`44 ms` |
| google-closure-compiler                                                                                                 |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*84x* </sup>`1,964 ms` |
| tedivm/jshrink                                                                                                          |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*4x* </sup>`101 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | --------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                             |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                    **Time** |
| @swc/core                                                                                                      |       <sup>-66% </sup>`115.46 kB` | **<sup>🏆-53% </sup>`42.48 kB`** |     <sup>*2x* </sup>`68 ms` |
| terser                                                                                                         |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.94 kB` |   <sup>*16x* </sup>`424 ms` |
| uglify-js                                                                                                      | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.95 kB` |   <sup>*31x* </sup>`821 ms` |
| babel-minify                                                                                                   |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*46x* </sup>`1,208 ms` |
| google-closure-compiler                                                                                        |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.23 kB` | <sup>*85x* </sup>`2,246 ms` |
| esbuild                                                                                                        |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |   **<sup>🏆 </sup>`26 ms`** |
| uglify-js (no compress)                                                                                        |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*6x* </sup>`157 ms` |
| terser (no compress)                                                                                           |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.68 kB` |    <sup>*7x* </sup>`209 ms` |
| bun                                                                                                            |       <sup>-64% </sup>`121.70 kB` |       <sup>-49% </sup>`45.34 kB` |     <sup>*1x* </sup>`38 ms` |
| tedivm/jshrink                                                                                                 |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*4x* </sup>`129 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                             |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                    **Time** |
| uglify-js                                                                                                                | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-74% </sup>`24.66 kB`** |   <sup>*25x* </sup>`629 ms` |
| google-closure-compiler                                                                                                  |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.97 kB` | <sup>*83x* </sup>`2,022 ms` |
| @swc/core                                                                                                                |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*2x* </sup>`64 ms` |
| terser                                                                                                                   |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |   <sup>*14x* </sup>`363 ms` |
| babel-minify                                                                                                             |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` |   <sup>*39x* </sup>`970 ms` |
| uglify-js (no compress)                                                                                                  |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*5x* </sup>`138 ms` |
| esbuild                                                                                                                  |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |   **<sup>🏆 </sup>`24 ms`** |
| terser (no compress)                                                                                                     |       <sup>-86% </sup>`75.29 kB` |       <sup>-73% </sup>`26.22 kB` |    <sup>*6x* </sup>`163 ms` |
| bun                                                                                                                      |       <sup>-86% </sup>`74.12 kB` |       <sup>-73% </sup>`26.50 kB` |     <sup>*1x* </sup>`48 ms` |
| tedivm/jshrink                                                                                                           |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*4x* </sup>`109 ms` |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | --------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `130.69 kB` |                             |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                    **Time** |
| uglify-js                                                                                               | **<sup>🏆-53% </sup>`263.91 kB`** | **<sup>🏆-33% </sup>`87.11 kB`** | <sup>*36x* </sup>`1,526 ms` |
| @swc/core                                                                                               |       <sup>-52% </sup>`265.27 kB` |       <sup>-33% </sup>`87.28 kB` |    <sup>*3x* </sup>`155 ms` |
| uglify-js (no compress)                                                                                 |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*6x* </sup>`287 ms` |
| terser                                                                                                  |       <sup>-52% </sup>`267.90 kB` |       <sup>-32% </sup>`88.34 kB` |   <sup>*21x* </sup>`901 ms` |
| terser (no compress)                                                                                    |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |   <sup>*11x* </sup>`464 ms` |
| esbuild                                                                                                 |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |   **<sup>🏆 </sup>`42 ms`** |
| bun                                                                                                     |       <sup>-51% </sup>`273.63 kB` |       <sup>-29% </sup>`92.38 kB` |     <sup>*1x* </sup>`53 ms` |
| google-closure-compiler                                                                                 |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`94.12 kB` | <sup>*81x* </sup>`3,364 ms` |
| babel-minify                                                                                            |                                 - |                                - |                           - |
| tedivm/jshrink                                                                                          |                                 - |                                - |                           - |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser v5.29.2](https://www.npmjs.com/package/terser/v/5.29.2) ([Source](https://unpkg.com/terser@5.29.2/dist/bundle.min.js)) |                         `1.01 MB` |                       `193.42 kB` |                             |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                    **Time** |
| @swc/core                                                                                                                      |       <sup>-55% </sup>`454.73 kB` | **<sup>🏆-36% </sup>`122.92 kB`** |    <sup>*2x* </sup>`142 ms` |
| uglify-js                                                                                                                      |       <sup>-55% </sup>`450.92 kB` |       <sup>-36% </sup>`123.21 kB` | <sup>*29x* </sup>`1,444 ms` |
| terser                                                                                                                         |       <sup>-55% </sup>`457.38 kB` |       <sup>-36% </sup>`123.33 kB` |   <sup>*17x* </sup>`843 ms` |
| terser (no compress)                                                                                                           |       <sup>-53% </sup>`473.36 kB` |       <sup>-36% </sup>`124.22 kB` |    <sup>*8x* </sup>`396 ms` |
| uglify-js (no compress)                                                                                                        |       <sup>-53% </sup>`471.14 kB` |       <sup>-36% </sup>`124.39 kB` |    <sup>*6x* </sup>`326 ms` |
| google-closure-compiler                                                                                                        | **<sup>🏆-56% </sup>`439.07 kB`** |       <sup>-35% </sup>`126.31 kB` | <sup>*59x* </sup>`2,910 ms` |
| esbuild                                                                                                                        |       <sup>-55% </sup>`458.00 kB` |       <sup>-35% </sup>`126.55 kB` |   **<sup>🏆 </sup>`49 ms`** |
| bun                                                                                                                            |       <sup>-54% </sup>`466.04 kB` |       <sup>-34% </sup>`127.41 kB` |     <sup>*1x* </sup>`55 ms` |
| tedivm/jshrink                                                                                                                 |       <sup>-37% </sup>`632.26 kB` |       <sup>-25% </sup>`144.94 kB` |    <sup>*6x* </sup>`327 ms` |
| babel-minify                                                                                                                   |                                 - |                                 - |                           - |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| @swc/core                                                                                                                  |       <sup>-48% </sup>`642.88 kB` | **<sup>🏆-36% </sup>`158.37 kB`** |     <sup>*3x* </sup>`197 ms` |
| uglify-js                                                                                                                  | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.91 kB` |  <sup>*34x* </sup>`1,963 ms` |
| terser                                                                                                                     |       <sup>-48% </sup>`653.99 kB` |       <sup>-36% </sup>`159.73 kB` |  <sup>*20x* </sup>`1,196 ms` |
| babel-minify                                                                                                               |       <sup>-48% </sup>`648.83 kB` |       <sup>-35% </sup>`162.50 kB` | <sup>*109x* </sup>`6,242 ms` |
| google-closure-compiler                                                                                                    |       <sup>-48% </sup>`644.45 kB` |       <sup>-34% </sup>`162.97 kB` |  <sup>*62x* </sup>`3,598 ms` |
| uglify-js (no compress)                                                                                                    |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |     <sup>*7x* </sup>`445 ms` |
| terser (no compress)                                                                                                       |       <sup>-46% </sup>`675.50 kB` |       <sup>-34% </sup>`163.20 kB` |    <sup>*10x* </sup>`587 ms` |
| esbuild                                                                                                                    |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |    **<sup>🏆 </sup>`57 ms`** |
| bun                                                                                                                        |       <sup>-47% </sup>`662.76 kB` |       <sup>-33% </sup>`166.48 kB` |      <sup>*1x* </sup>`74 ms` |
| tedivm/jshrink                                                                                                             |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |     <sup>*8x* </sup>`471 ms` |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.13 MB` |                       `309.94 kB` |                             |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                    **Time** |
| @swc/core                                                                                                                      |       <sup>-67% </sup>`707.21 kB` | **<sup>🏆-49% </sup>`157.86 kB`** |    <sup>*4x* </sup>`281 ms` |
| uglify-js                                                                                                                      | **<sup>🏆-67% </sup>`702.67 kB`** |       <sup>-49% </sup>`158.22 kB` | <sup>*37x* </sup>`2,584 ms` |
| terser                                                                                                                         |       <sup>-66% </sup>`715.59 kB` |       <sup>-49% </sup>`158.72 kB` | <sup>*23x* </sup>`1,646 ms` |
| terser (no compress)                                                                                                           |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`166.39 kB` |   <sup>*10x* </sup>`704 ms` |
| uglify-js (no compress)                                                                                                        |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |    <sup>*8x* </sup>`565 ms` |
| google-closure-compiler                                                                                                        |       <sup>-67% </sup>`705.87 kB` |       <sup>-43% </sup>`175.47 kB` | <sup>*58x* </sup>`4,069 ms` |
| esbuild                                                                                                                        |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |     <sup>*1x* </sup>`80 ms` |
| bun                                                                                                                            |       <sup>-66% </sup>`728.20 kB` |       <sup>-41% </sup>`182.57 kB` |   **<sup>🏆 </sup>`69 ms`** |
| babel-minify                                                                                                                   |                                 - |                                 - |                           - |
| tedivm/jshrink                                                                                                                 |                                 - |                                 - |                           - |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                             |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `684.61 kB` |                             |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                    **Time** |
| @swc/core                                                                                                                   |       <sup>-69% </sup>`993.07 kB` | **<sup>🏆-53% </sup>`320.25 kB`** |    <sup>*5x* </sup>`578 ms` |
| terser                                                                                                                      |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`322.11 kB` | <sup>*22x* </sup>`2,601 ms` |
| uglify-js                                                                                                                   | **<sup>🏆-69% </sup>`980.14 kB`** |       <sup>-52% </sup>`326.77 kB` | <sup>*41x* </sup>`4,689 ms` |
| google-closure-compiler                                                                                                     |       <sup>-69% </sup>`990.88 kB` |       <sup>-52% </sup>`328.23 kB` | <sup>*50x* </sup>`5,794 ms` |
| terser (no compress)                                                                                                        |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.74 kB` | <sup>*10x* </sup>`1,223 ms` |
| uglify-js (no compress)                                                                                                     |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |    <sup>*6x* </sup>`775 ms` |
| esbuild                                                                                                                     |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |    <sup>*1x* </sup>`124 ms` |
| bun                                                                                                                         |         <sup>-68% </sup>`1.03 MB` |       <sup>-51% </sup>`337.78 kB` |  **<sup>🏆 </sup>`114 ms`** |
| babel-minify                                                                                                                |                                 - |                                 - |                           - |
| tedivm/jshrink                                                                                                              |                                 - |                                 - |                           - |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.67 MB` |                       `825.18 kB` |                             |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                    **Time** |
| @swc/core                                                                                                          | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.87 kB`** |    <sup>*4x* </sup>`657 ms` |
| uglify-js                                                                                                          |       <sup>-67% </sup>`2.23 MB` |       <sup>-45% </sup>`453.93 kB` | <sup>*32x* </sup>`4,573 ms` |
| terser                                                                                                             |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`457.82 kB` | <sup>*20x* </sup>`2,916 ms` |
| terser (no compress)                                                                                               |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`475.48 kB` | <sup>*10x* </sup>`1,491 ms` |
| uglify-js (no compress)                                                                                            |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |  <sup>*8x* </sup>`1,131 ms` |
| google-closure-compiler                                                                                            |       <sup>-66% </sup>`2.25 MB` |       <sup>-42% </sup>`482.47 kB` | <sup>*42x* </sup>`5,940 ms` |
| esbuild                                                                                                            |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |    <sup>*1x* </sup>`184 ms` |
| bun                                                                                                                |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.75 kB` |  **<sup>🏆 </sup>`140 ms`** |
| tedivm/jshrink                                                                                                     |       <sup>-33% </sup>`4.45 MB` |       <sup>-24% </sup>`626.68 kB` | <sup>*12x* </sup>`1,716 ms` |
| babel-minify                                                                                                       |                               - |                                 - |                           - |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| uglify-js                                                                                                                              | **<sup>🏆-70% </sup>`3.27 MB`** | **<sup>🏆-55% </sup>`845.11 kB`** | <sup>*34x* </sup>`10,754 ms` |
| @swc/core                                                                                                                              |       <sup>-70% </sup>`3.31 MB` |       <sup>-55% </sup>`852.34 kB` |   <sup>*4x* </sup>`1,285 ms` |
| terser                                                                                                                                 |       <sup>-69% </sup>`3.35 MB` |       <sup>-55% </sup>`854.27 kB` |  <sup>*19x* </sup>`5,908 ms` |
| uglify-js (no compress)                                                                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |   <sup>*5x* </sup>`1,817 ms` |
| terser (no compress)                                                                                                                   |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.30 kB` |   <sup>*8x* </sup>`2,506 ms` |
| google-closure-compiler                                                                                                                |       <sup>-69% </sup>`3.40 MB` |       <sup>-52% </sup>`902.95 kB` |  <sup>*31x* </sup>`9,583 ms` |
| esbuild                                                                                                                                |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.50 kB` |   **<sup>🏆 </sup>`308 ms`** |
| babel-minify                                                                                                                           |                               - |                                 - |                            - |
| bun                                                                                                                                    |                               - |                                 - |                            - |
| tedivm/jshrink                                                                                                                         |                               - |                                 - |                            - |
<!-- benchmarks:end -->

## Sponsors

<p align="center">
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1">
		<picture>
			<source width="410" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image=dark">
			<source width="410" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image">
			<img width="410" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver1&image" alt="Premium sponsor banner">
		</picture>
	</a>
	<a href="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2">
		<picture>
			<source width="410" media="(prefers-color-scheme: dark)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image=dark">
			<source width="410" media="(prefers-color-scheme: light)" srcset="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image">
			<img width="410" src="https://privatenumber-sponsors.vercel.app/api/sponsor?tier=silver2&image" alt="Premium sponsor banner">
		</picture>
	</a>
</p>

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
