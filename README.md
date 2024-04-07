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

_Benchmarks last updated on <!-- lastUpdated:start -->Apr 7, 2024<!-- lastUpdated:end -->._

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
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                  |       <sup>-68% </sup>`22.87 kB` | **<sup>🏆-58% </sup>`8.17 kB`** |    **<sup>🏆 </sup>`12 ms`** |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                            | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.18 kB` |    <sup>*17x* </sup>`205 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                                |       <sup>-68% </sup>`22.83 kB` |       <sup>-58% </sup>`8.19 kB` | <sup>*139x* </sup>`1,674 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                                  |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*11x* </sup>`137 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                                      |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*23x* </sup>`280 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |      <sup>*1x* </sup>`19 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                        |       <sup>-67% </sup>`24.01 kB` |       <sup>-55% </sup>`8.65 kB` |      <sup>*2x* </sup>`33 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                              |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*3x* </sup>`39 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                    |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |      <sup>*4x* </sup>`58 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                                   |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*9x* </sup>`109 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** |    <sup>*25x* </sup>`419 ms` |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                      |       <sup>-67% </sup>`58.21 kB` |       <sup>-48% </sup>`18.69 kB` |      <sup>*1x* </sup>`27 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-66% </sup>`59.16 kB` |       <sup>-48% </sup>`18.69 kB` |    <sup>*17x* </sup>`286 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                    |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.91 kB` | <sup>*112x* </sup>`1,870 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                          |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` |    <sup>*43x* </sup>`725 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                    |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |    **<sup>🏆 </sup>`17 ms`** |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                  |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |      <sup>*5x* </sup>`84 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                        |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.68 kB` |     <sup>*6x* </sup>`113 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                            |       <sup>-64% </sup>`61.86 kB` |       <sup>-45% </sup>`19.87 kB` |      <sup>*2x* </sup>`40 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                       |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |      <sup>*5x* </sup>`86 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                             |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                             |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-69% </sup>`89.16 kB` | **<sup>🏆-63% </sup>`30.87 kB`** |     <sup>*1x* </sup>`49 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-69% </sup>`88.54 kB`** |       <sup>-63% </sup>`30.89 kB` |   <sup>*23x* </sup>`614 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` |   <sup>*13x* </sup>`358 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*4x* </sup>`117 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.62 kB` |    <sup>*6x* </sup>`159 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                            |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*44x* </sup>`1,141 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |   **<sup>🏆 </sup>`26 ms`** |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-68% </sup>`92.56 kB` |       <sup>-61% </sup>`32.70 kB` |     <sup>*1x* </sup>`41 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                      |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*80x* </sup>`2,066 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                         |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*4x* </sup>`104 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | --------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                             |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                               |       <sup>-66% </sup>`115.46 kB` | **<sup>🏆-53% </sup>`42.48 kB`** |     <sup>*2x* </sup>`66 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                               |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.94 kB` |   <sup>*15x* </sup>`450 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                         | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.95 kB` |   <sup>*29x* </sup>`834 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                   |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*43x* </sup>`1,223 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                             |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.23 kB` | <sup>*78x* </sup>`2,242 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                             |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |   **<sup>🏆 </sup>`28 ms`** |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                           |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*5x* </sup>`165 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                 |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.68 kB` |    <sup>*6x* </sup>`191 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                     |       <sup>-64% </sup>`121.70 kB` |       <sup>-49% </sup>`45.34 kB` |     <sup>*1x* </sup>`36 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*4x* </sup>`131 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                             |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                    **Time** |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                   | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-74% </sup>`24.66 kB`** |   <sup>*27x* </sup>`653 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                       |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.97 kB` | <sup>*92x* </sup>`2,181 ms` |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                         |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*2x* </sup>`69 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                         |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |   <sup>*16x* </sup>`402 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                             |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*43x* </sup>`1,022 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                     |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*6x* </sup>`146 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                       |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |   **<sup>🏆 </sup>`24 ms`** |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                           |       <sup>-86% </sup>`75.29 kB` |       <sup>-73% </sup>`26.22 kB` |    <sup>*6x* </sup>`163 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                               |       <sup>-86% </sup>`74.12 kB` |       <sup>-73% </sup>`26.50 kB` |     <sup>*1x* </sup>`42 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                          |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*4x* </sup>`107 ms` |
----
| Artifact                                                                                                                              |                     Original size |                        Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | --------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js))                               |                       `555.77 kB` |                      `130.69 kB` |                             |
| **Minifier**                                                                                                                          |                 **Minified size** |               **Minzipped size** |                    **Time** |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-53% </sup>`263.91 kB`** | **<sup>🏆-33% </sup>`87.11 kB`** | <sup>*36x* </sup>`1,533 ms` |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                      |       <sup>-52% </sup>`265.27 kB` |       <sup>-33% </sup>`87.28 kB` |    <sup>*3x* </sup>`153 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                  |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*6x* </sup>`287 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                                      |       <sup>-52% </sup>`267.90 kB` |       <sup>-32% </sup>`88.34 kB` |   <sup>*22x* </sup>`942 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |   <sup>*11x* </sup>`462 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                    |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |   **<sup>🏆 </sup>`42 ms`** |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                            |       <sup>-51% </sup>`273.63 kB` |       <sup>-29% </sup>`92.38 kB` |     <sup>*1x* </sup>`44 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`94.12 kB` | <sup>*78x* </sup>`3,298 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌unknown: Cannot read properties of undefined (reading 'add')</sub> |                                 - |                                - |                           - |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub>❌Unexpected identifier 'error'</sub>                             |                                 - |                                - |                           - |
----
| Artifact                                                                                                                              |                     Original size |                         Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------: |
| [terser v5.29.2](https://www.npmjs.com/package/terser/v/5.29.2) ([Source](https://unpkg.com/terser@5.29.2/dist/bundle.min.js))        |                         `1.01 MB` |                       `193.42 kB` |                             |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                      |       <sup>-55% </sup>`454.73 kB` | **<sup>🏆-36% </sup>`122.92 kB`** |    <sup>*2x* </sup>`126 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                                |       <sup>-55% </sup>`450.92 kB` |       <sup>-36% </sup>`123.21 kB` | <sup>*32x* </sup>`1,458 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                                      |       <sup>-55% </sup>`457.38 kB` |       <sup>-36% </sup>`123.33 kB` |   <sup>*19x* </sup>`879 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-53% </sup>`473.36 kB` |       <sup>-36% </sup>`124.22 kB` |    <sup>*9x* </sup>`445 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                  |       <sup>-53% </sup>`471.14 kB` |       <sup>-36% </sup>`124.39 kB` |    <sup>*7x* </sup>`325 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                                    | **<sup>🏆-56% </sup>`439.07 kB`** |       <sup>-35% </sup>`126.31 kB` | <sup>*72x* </sup>`3,291 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                    |       <sup>-55% </sup>`458.00 kB` |       <sup>-35% </sup>`126.55 kB` |   **<sup>🏆 </sup>`45 ms`** |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                            |       <sup>-54% </sup>`466.04 kB` |       <sup>-34% </sup>`127.41 kB` |     <sup>*1x* </sup>`53 ms` |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                                       |       <sup>-37% </sup>`632.26 kB` |       <sup>-25% </sup>`144.94 kB` |    <sup>*7x* </sup>`332 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌unknown: Cannot read properties of undefined (reading 'add')</sub> |                                 - |                                 - |                           - |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                           |       <sup>-48% </sup>`642.88 kB` | **<sup>🏆-36% </sup>`158.37 kB`** |     <sup>*3x* </sup>`200 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                     | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.91 kB` |  <sup>*35x* </sup>`2,025 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                           |       <sup>-48% </sup>`653.99 kB` |       <sup>-36% </sup>`159.73 kB` |  <sup>*20x* </sup>`1,203 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                               |       <sup>-48% </sup>`648.83 kB` |       <sup>-35% </sup>`162.50 kB` | <sup>*109x* </sup>`6,320 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                         |       <sup>-48% </sup>`644.45 kB` |       <sup>-34% </sup>`162.97 kB` |  <sup>*62x* </sup>`3,587 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                       |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |     <sup>*7x* </sup>`459 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                             |       <sup>-46% </sup>`675.50 kB` |       <sup>-34% </sup>`163.20 kB` |    <sup>*10x* </sup>`582 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                         |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |      <sup>*1x* </sup>`59 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                 |       <sup>-47% </sup>`662.76 kB` |       <sup>-33% </sup>`166.48 kB` |    **<sup>🏆 </sup>`58 ms`** |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                            |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |     <sup>*7x* </sup>`410 ms` |
----
| Artifact                                                                                                                              |                     Original size |                         Gzip size |                             |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js))        |                         `2.13 MB` |                       `309.94 kB` |                             |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                      |       <sup>-67% </sup>`707.21 kB` | **<sup>🏆-49% </sup>`157.86 kB`** |    <sup>*4x* </sup>`307 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-67% </sup>`702.67 kB`** |       <sup>-49% </sup>`158.22 kB` | <sup>*38x* </sup>`2,651 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                                      |       <sup>-66% </sup>`715.59 kB` |       <sup>-49% </sup>`158.72 kB` | <sup>*24x* </sup>`1,641 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`166.39 kB` |   <sup>*10x* </sup>`694 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                  |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |    <sup>*8x* </sup>`555 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                                    |       <sup>-67% </sup>`705.87 kB` |       <sup>-43% </sup>`175.47 kB` | <sup>*64x* </sup>`4,437 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                    |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |     <sup>*1x* </sup>`77 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                            |       <sup>-66% </sup>`728.20 kB` |       <sup>-41% </sup>`182.57 kB` |   **<sup>🏆 </sup>`68 ms`** |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌unknown: Cannot read properties of undefined (reading 'add')</sub> |                                 - |                                 - |                           - |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub>❌Unexpected token '~'</sub>                                      |                                 - |                                 - |                           - |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                             |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `684.61 kB` |                             |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                            |       <sup>-69% </sup>`993.07 kB` | **<sup>🏆-53% </sup>`320.25 kB`** |    <sup>*5x* </sup>`549 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                            |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`322.11 kB` | <sup>*26x* </sup>`2,659 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                      | **<sup>🏆-69% </sup>`980.14 kB`** |       <sup>-52% </sup>`326.77 kB` | <sup>*48x* </sup>`4,865 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                          |       <sup>-69% </sup>`990.88 kB` |       <sup>-52% </sup>`328.23 kB` | <sup>*55x* </sup>`5,536 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                              |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.74 kB` | <sup>*13x* </sup>`1,316 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                        |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |    <sup>*8x* </sup>`803 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                          |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |    <sup>*1x* </sup>`125 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                                  |         <sup>-68% </sup>`1.03 MB` |       <sup>-51% </sup>`337.78 kB` |   **<sup>🏆 </sup>`99 ms`** |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌Timed out</sub>                                          |                                 - |                                 - |                           - |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub>❌Unexpected identifier 'error'</sub>                   |                                 - |                                 - |                           - |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                             |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.67 MB` |                       `825.18 kB` |                             |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                    **Time** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                   | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.87 kB`** |    <sup>*5x* </sup>`713 ms` |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                             |       <sup>-67% </sup>`2.23 MB` |       <sup>-45% </sup>`453.93 kB` | <sup>*39x* </sup>`4,743 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                   |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`457.82 kB` | <sup>*25x* </sup>`3,062 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                     |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`475.48 kB` | <sup>*12x* </sup>`1,489 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                               |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |  <sup>*9x* </sup>`1,174 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-42% </sup>`482.47 kB` | <sup>*50x* </sup>`6,066 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                 |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |    <sup>*1x* </sup>`183 ms` |
| [bun](packages/minifiers/minifiers/bun.ts)                                                                         |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.75 kB` |  **<sup>🏆 </sup>`121 ms`** |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                    |       <sup>-33% </sup>`4.45 MB` |       <sup>-24% </sup>`626.68 kB` | <sup>*14x* </sup>`1,696 ms` |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌Timed out</sub>                                 |                               - |                                 - |                           - |
----
| Artifact                                                                                                                                                                                                            |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js))                                                                              |                      `10.95 MB` |                         `1.88 MB` |                              |
| **Minifier**                                                                                                                                                                                                        |               **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                                                                                                              | **<sup>🏆-70% </sup>`3.27 MB`** | **<sup>🏆-55% </sup>`845.11 kB`** | <sup>*34x* </sup>`10,968 ms` |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                                                                                                    |       <sup>-70% </sup>`3.31 MB` |       <sup>-55% </sup>`852.34 kB` |   <sup>*3x* </sup>`1,236 ms` |
| [terser](packages/minifiers/minifiers/terser.ts)                                                                                                                                                                    |       <sup>-69% </sup>`3.35 MB` |       <sup>-55% </sup>`854.27 kB` |  <sup>*19x* </sup>`6,091 ms` |
| [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                                                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |   <sup>*6x* </sup>`1,916 ms` |
| [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                                                                                                      |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.30 kB` |   <sup>*8x* </sup>`2,668 ms` |
| [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                                                                                                                  |       <sup>-69% </sup>`3.40 MB` |       <sup>-52% </sup>`902.95 kB` | <sup>*32x* </sup>`10,205 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                                                                                                  |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.50 kB` |   **<sup>🏆 </sup>`315 ms`** |
| [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub>❌Timed out</sub>                                                                                                                                  |                               - |                                 - |                            - |
| [bun](packages/minifiers/minifiers/bun.ts) <sub>❌Expected values to be strictly equal:
+ actual - expected

+ 'var x = function () { return "string"; };\r\n'
- 'var x = function () { return "string"; };\n'</sub> |                               - |                                 - |                            - |
| [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub>❌Unexpected identifier 'error'</sub>                                                                                                           |                               - |                                 - |                            - |
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
