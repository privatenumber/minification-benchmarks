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

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 20, 2024<!-- lastUpdated:end -->._

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
| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.14 kB` |                      `19.39 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`22.87 kB` | **<sup>🏆-58% </sup>`8.17 kB`** |      <sup>*11x* </sup>`27 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.18 kB` |    <sup>*207x* </sup>`479 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` |       <sup>-58% </sup>`8.19 kB` | <sup>*1301x* </sup>`3,004 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*109x* </sup>`254 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*279x* </sup>`646 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |       <sup>*9x* </sup>`23 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.53 kB` |       <sup>-56% </sup>`8.63 kB` |      **<sup>🏆 </sup>`2 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                                      |       <sup>-67% </sup>`23.98 kB` |       <sup>-55% </sup>`8.63 kB` |       <sup>*8x* </sup>`21 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*38x* </sup>`88 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |     <sup>*48x* </sup>`112 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                              |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*51x* </sup>`118 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`57.87 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** | <sup>*221x* </sup>`1,104 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`59.16 kB` |       <sup>-48% </sup>`18.69 kB` |   <sup>*123x* </sup>`613 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-67% </sup>`58.23 kB` |       <sup>-48% </sup>`18.70 kB` |     <sup>*10x* </sup>`55 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.91 kB` | <sup>*707x* </sup>`3,525 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` | <sup>*297x* </sup>`1,481 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |      <sup>*3x* </sup>`19 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-66% </sup>`59.94 kB` |       <sup>-46% </sup>`19.49 kB` |     **<sup>🏆 </sup>`5 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |    <sup>*43x* </sup>`215 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.68 kB` |    <sup>*50x* </sup>`253 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                          |       <sup>-64% </sup>`61.79 kB` |       <sup>-45% </sup>`19.84 kB` |      <sup>*3x* </sup>`18 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                  |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |    <sup>*53x* </sup>`265 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-69% </sup>`89.16 kB` | **<sup>🏆-63% </sup>`30.87 kB`** |     <sup>*10x* </sup>`87 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-69% </sup>`88.54 kB`** |       <sup>-63% </sup>`30.89 kB` | <sup>*188x* </sup>`1,498 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` |   <sup>*103x* </sup>`821 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`89.85 kB` |       <sup>-63% </sup>`31.46 kB` |     **<sup>🏆 </sup>`8 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*38x* </sup>`303 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.62 kB` |    <sup>*43x* </sup>`350 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*301x* </sup>`2,398 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |      <sup>*3x* </sup>`26 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                            |       <sup>-68% </sup>`92.41 kB` |       <sup>-61% </sup>`32.60 kB` |      <sup>*2x* </sup>`20 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*496x* </sup>`3,952 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                    |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*42x* </sup>`335 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-66% </sup>`115.46 kB` | **<sup>🏆-53% </sup>`42.48 kB`** |     <sup>*9x* </sup>`124 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.94 kB` |  <sup>*78x* </sup>`1,010 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-67% </sup>`113.98 kB`** |       <sup>-52% </sup>`42.95 kB` | <sup>*158x* </sup>`2,038 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*208x* </sup>`2,673 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-66% </sup>`115.60 kB` |       <sup>-51% </sup>`44.23 kB` | <sup>*340x* </sup>`4,366 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-66% </sup>`117.83 kB` |       <sup>-51% </sup>`44.37 kB` |    **<sup>🏆 </sup>`13 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |      <sup>*2x* </sup>`31 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*25x* </sup>`332 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.68 kB` |    <sup>*32x* </sup>`413 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                   |       <sup>-64% </sup>`121.51 kB` |       <sup>-49% </sup>`45.30 kB` |      <sup>*1x* </sup>`23 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                           |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*35x* </sup>`450 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-74% </sup>`24.66 kB`** | <sup>*146x* </sup>`1,625 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.97 kB` | <sup>*385x* </sup>`4,285 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*9x* </sup>`104 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |    <sup>*78x* </sup>`872 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*188x* </sup>`2,097 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*29x* </sup>`327 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.20 kB` |    <sup>*32x* </sup>`361 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`33 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.42 kB` |       <sup>-73% </sup>`26.37 kB` |    **<sup>🏆 </sup>`11 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                             |       <sup>-86% </sup>`74.07 kB` |       <sup>-73% </sup>`26.50 kB` |      <sup>*2x* </sup>`23 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                     |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*31x* </sup>`348 ms` |
----
| Artifact                                                                                                |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------ | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |                       `555.77 kB` |                      `130.69 kB` |                              |
| **Minifier**                                                                                            |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                | **<sup>🏆-53% </sup>`263.91 kB`** | **<sup>🏆-33% </sup>`87.11 kB`** | <sup>*115x* </sup>`3,797 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                            |       <sup>-52% </sup>`265.27 kB` |       <sup>-33% </sup>`87.28 kB` |     <sup>*8x* </sup>`283 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                        |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*21x* </sup>`705 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                      |       <sup>-52% </sup>`267.91 kB` |       <sup>-32% </sup>`88.34 kB` |  <sup>*63x* </sup>`2,095 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                              |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |    <sup>*29x* </sup>`952 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                    |       <sup>-51% </sup>`269.93 kB` |       <sup>-31% </sup>`89.89 kB` |    **<sup>🏆 </sup>`33 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                    |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |      <sup>*1x* </sup>`64 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                            |       <sup>-51% </sup>`273.42 kB` |       <sup>-30% </sup>`92.12 kB` |      <sup>*1x* </sup>`36 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                    |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`94.12 kB` | <sup>*199x* </sup>`6,527 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                            |                                 — |                                — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                             |                                 — |                                — |                            — |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.27.0](https://www.npmjs.com/package/terser/v/5.27.0) ([Source](https://unpkg.com/terser@5.27.0/dist/bundle.min.js)) |                       `994.53 kB` |                       `191.29 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-55% </sup>`450.36 kB` | **<sup>🏆-36% </sup>`121.84 kB`** |     <sup>*7x* </sup>`240 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       |       <sup>-55% </sup>`446.74 kB` |       <sup>-36% </sup>`122.12 kB` | <sup>*117x* </sup>`3,559 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-54% </sup>`453.16 kB` |       <sup>-36% </sup>`122.29 kB` |  <sup>*65x* </sup>`1,970 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-53% </sup>`468.92 kB` |       <sup>-36% </sup>`123.15 kB` |    <sup>*29x* </sup>`905 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-53% </sup>`466.64 kB` |       <sup>-36% </sup>`123.30 kB` |    <sup>*24x* </sup>`744 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-55% </sup>`451.67 kB` |       <sup>-35% </sup>`123.67 kB` |    **<sup>🏆 </sup>`30 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           | **<sup>🏆-56% </sup>`434.88 kB`** |       <sup>-34% </sup>`125.35 kB` | <sup>*196x* </sup>`5,948 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-54% </sup>`453.77 kB` |       <sup>-34% </sup>`125.59 kB` |      <sup>*1x* </sup>`60 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                   |       <sup>-54% </sup>`461.29 kB` |       <sup>-34% </sup>`126.64 kB` |      <sup>*1x* </sup>`36 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                           |       <sup>-37% </sup>`625.66 kB` |       <sup>-25% </sup>`143.54 kB` |  <sup>*41x* </sup>`1,254 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`643.00 kB` | **<sup>🏆-36% </sup>`158.39 kB`** |      <sup>*7x* </sup>`374 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.91 kB` |   <sup>*99x* </sup>`4,807 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`654.01 kB` |       <sup>-36% </sup>`159.74 kB` |   <sup>*56x* </sup>`2,716 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`648.83 kB` |       <sup>-35% </sup>`162.50 kB` | <sup>*229x* </sup>`11,077 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-34% </sup>`162.97 kB` |  <sup>*154x* </sup>`7,433 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |     <sup>*20x* </sup>`995 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`163.23 kB` |   <sup>*25x* </sup>`1,217 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |       <sup>*1x* </sup>`91 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`644.89 kB` |       <sup>-34% </sup>`164.68 kB` |       <sup>*1x* </sup>`49 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                               |       <sup>-47% </sup>`662.22 kB` |       <sup>-33% </sup>`166.36 kB` |     **<sup>🏆 </sup>`48 ms`** |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                       |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |   <sup>*34x* </sup>`1,650 ms` |
----
| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |                         `2.14 MB` |                       `309.98 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                       | **<sup>🏆-67% </sup>`702.67 kB`** | **<sup>🏆-49% </sup>`158.22 kB`** | <sup>*107x* </sup>`6,244 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                   |       <sup>-67% </sup>`707.83 kB` |       <sup>-49% </sup>`158.28 kB` |     <sup>*9x* </sup>`550 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                             |       <sup>-66% </sup>`715.60 kB` |       <sup>-49% </sup>`158.73 kB` |  <sup>*62x* </sup>`3,645 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                           |       <sup>-66% </sup>`718.74 kB` |       <sup>-47% </sup>`165.09 kB` |    **<sup>🏆 </sup>`58 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`166.39 kB` |  <sup>*25x* </sup>`1,503 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |  <sup>*21x* </sup>`1,256 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                           |       <sup>-67% </sup>`705.87 kB` |       <sup>-43% </sup>`175.47 kB` | <sup>*153x* </sup>`8,900 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                           |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |     <sup>*2x* </sup>`124 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                   |       <sup>-66% </sup>`728.04 kB` |       <sup>-41% </sup>`182.50 kB` |      <sup>*1x* </sup>`66 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>                                                   |                                 — |                                 — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: SyntaxError_</sub>                                                  |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                    |                     Original size |                         Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |                         `3.20 MB` |                       `684.61 kB` |                               |
| **Minifier**                                                                                                                |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`993.30 kB` | **<sup>🏆-53% </sup>`320.36 kB`** |    <sup>*9x* </sup>`1,043 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                          |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`322.11 kB` |   <sup>*52x* </sup>`5,665 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-69% </sup>`980.14 kB`** |       <sup>-52% </sup>`326.77 kB` |  <sup>*99x* </sup>`10,786 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                        |       <sup>-69% </sup>`990.88 kB` |       <sup>-52% </sup>`328.23 kB` | <sup>*113x* </sup>`12,306 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.74 kB` |   <sup>*23x* </sup>`2,573 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |   <sup>*16x* </sup>`1,776 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |      <sup>*1x* </sup>`200 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.90 kB` |      <sup>*1x* </sup>`122 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                |         <sup>-68% </sup>`1.03 MB` |       <sup>-51% </sup>`337.39 kB` |    **<sup>🏆 </sup>`109 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                                 — |                                 — |                             — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                                                 |                                 — |                                 — |                             — |
----
| Artifact                                                                                                           |                   Original size |                         Gzip size |                               |
| :----------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ----------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |                       `6.69 MB` |                       `825.54 kB` |                               |
| **Minifier**                                                                                                       |               **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                       | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.90 kB`** |    <sup>*9x* </sup>`1,297 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                           |       <sup>-67% </sup>`2.23 MB` |       <sup>-45% </sup>`453.93 kB` |  <sup>*80x* </sup>`10,950 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`457.82 kB` |   <sup>*46x* </sup>`6,374 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-43% </sup>`472.07 kB` |    **<sup>🏆 </sup>`136 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`475.48 kB` |   <sup>*21x* </sup>`2,952 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |   <sup>*18x* </sup>`2,472 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                               |       <sup>-66% </sup>`2.25 MB` |       <sup>-42% </sup>`482.47 kB` | <sup>*102x* </sup>`13,976 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                               |       <sup>-66% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |      <sup>*2x* </sup>`297 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                       |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.56 kB` |      <sup>*1x* </sup>`141 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                               |       <sup>-33% </sup>`4.45 MB` |       <sup>-24% </sup>`626.68 kB` |   <sup>*50x* </sup>`6,924 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                              |                               — |                                 — |                             — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v5.2.2](https://www.npmjs.com/package/typescript/v/5.2.2) ([Source](https://unpkg.com/typescript@5.2.2/lib/typescript.js)) |                       `8.33 MB` |                         `1.42 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-65% </sup>`2.94 MB`** | **<sup>🏆-42% </sup>`826.53 kB`** |  <sup>*12x* </sup>`2,919 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                     |       <sup>-64% </sup>`3.00 MB` |       <sup>-41% </sup>`831.40 kB` | <sup>*60x* </sup>`14,046 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                   |       <sup>-64% </sup>`3.02 MB` |       <sup>-40% </sup>`848.75 kB` |     <sup>*1x* </sup>`341 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-62% </sup>`3.16 MB` |       <sup>-40% </sup>`850.76 kB` |  <sup>*29x* </sup>`6,989 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-62% </sup>`3.15 MB` |       <sup>-40% </sup>`857.62 kB` |  <sup>*19x* </sup>`4,455 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-63% </sup>`3.07 MB` |       <sup>-38% </sup>`880.56 kB` |     <sup>*1x* </sup>`464 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                           |       <sup>-62% </sup>`3.12 MB` |       <sup>-37% </sup>`890.67 kB` |   **<sup>🏆 </sup>`234 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Timed out_</sub>                                            |                               — |                                 — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                                                            |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                                                        |                               — |                                 — |                            — |
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
