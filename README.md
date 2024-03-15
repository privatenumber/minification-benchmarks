<!-- cwebp -q 100 .github/logo-original.png -resize 300 0 -o .github/logo.webp -->
<h1 align="center">
	<img width="150" src=".github/logo.webp">
	<br>
	<sub>JavaScript</sub>
	<br>
	minifier race
</h1>

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

_Benchmarks last updated on <!-- lastUpdated:start -->Jan 18, 2024<!-- lastUpdated:end -->._

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
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-68% </sup>`22.87 kB` | **<sup>🏆-58% </sup>`8.17 kB`** |      <sup>*12x* </sup>`27 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-69% </sup>`22.67 kB`** |       <sup>-58% </sup>`8.18 kB` |    <sup>*223x* </sup>`494 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-68% </sup>`22.83 kB` |       <sup>-58% </sup>`8.19 kB` | <sup>*1427x* </sup>`3,155 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*117x* </sup>`259 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*298x* </sup>`660 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |       <sup>*6x* </sup>`14 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-67% </sup>`23.53 kB` |       <sup>-56% </sup>`8.63 kB` |      **<sup>🏆 </sup>`2 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                                      |       <sup>-67% </sup>`23.98 kB` |       <sup>-55% </sup>`8.63 kB` |       <sup>*6x* </sup>`15 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*43x* </sup>`97 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |     <sup>*52x* </sup>`116 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                              |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*51x* </sup>`114 ms` |
----
| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.30.1](https://www.npmjs.com/package/moment/v/2.30.1) ([Source](https://unpkg.com/moment@2.30.1/moment.js)) |                      `176.44 kB` |                       `36.84 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                              | **<sup>🏆-67% </sup>`58.81 kB`** | **<sup>🏆-49% </sup>`18.81 kB`** | <sup>*197x* </sup>`1,101 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                          |       <sup>-66% </sup>`59.32 kB` |       <sup>-49% </sup>`18.93 kB` |      <sup>*9x* </sup>`52 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                    |       <sup>-66% </sup>`60.21 kB` |       <sup>-49% </sup>`18.96 kB` |   <sup>*112x* </sup>`627 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                  |       <sup>-66% </sup>`59.36 kB` |       <sup>-48% </sup>`19.19 kB` | <sup>*657x* </sup>`3,669 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                        |       <sup>-66% </sup>`60.64 kB` |       <sup>-47% </sup>`19.40 kB` | <sup>*268x* </sup>`1,499 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                  |       <sup>-66% </sup>`60.85 kB` |       <sup>-47% </sup>`19.65 kB` |      <sup>*3x* </sup>`20 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                  |       <sup>-65% </sup>`60.98 kB` |       <sup>-46% </sup>`19.79 kB` |     **<sup>🏆 </sup>`6 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                      |       <sup>-64% </sup>`63.52 kB` |       <sup>-46% </sup>`19.84 kB` |    <sup>*37x* </sup>`209 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                            |       <sup>-64% </sup>`64.16 kB` |       <sup>-46% </sup>`19.95 kB` |    <sup>*45x* </sup>`254 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                          |       <sup>-64% </sup>`62.79 kB` |       <sup>-45% </sup>`20.17 kB` |      <sup>*3x* </sup>`18 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                  |       <sup>-44% </sup>`98.79 kB` |       <sup>-31% </sup>`25.44 kB` |    <sup>*47x* </sup>`265 ms` |
----
| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.7.1](https://www.npmjs.com/package/jquery/v/3.7.1) ([Source](https://unpkg.com/jquery@3.7.1/dist/jquery.js)) |                      `285.31 kB` |                       `83.70 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                            |       <sup>-70% </sup>`86.68 kB` | **<sup>🏆-64% </sup>`30.24 kB`** |     <sup>*10x* </sup>`83 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                      |       <sup>-69% </sup>`87.06 kB` |       <sup>-64% </sup>`30.27 kB` |   <sup>*102x* </sup>`803 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                | **<sup>🏆-70% </sup>`86.22 kB`** |       <sup>-64% </sup>`30.29 kB` | <sup>*186x* </sup>`1,467 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                    |       <sup>-69% </sup>`87.34 kB` |       <sup>-63% </sup>`30.82 kB` |     **<sup>🏆 </sup>`8 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                        |       <sup>-68% </sup>`92.35 kB` |       <sup>-63% </sup>`30.87 kB` |    <sup>*37x* </sup>`297 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                              |       <sup>-68% </sup>`92.20 kB` |       <sup>-63% </sup>`31.00 kB` |    <sup>*44x* </sup>`348 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                          |       <sup>-69% </sup>`87.98 kB` |       <sup>-63% </sup>`31.04 kB` | <sup>*291x* </sup>`2,294 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                    |       <sup>-69% </sup>`87.47 kB` |       <sup>-63% </sup>`31.21 kB` |      <sup>*3x* </sup>`26 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                            |       <sup>-68% </sup>`89.95 kB` |       <sup>-62% </sup>`31.88 kB` |      <sup>*2x* </sup>`20 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                    |       <sup>-69% </sup>`89.48 kB` |       <sup>-61% </sup>`32.30 kB` | <sup>*494x* </sup>`3,889 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                    |      <sup>-51% </sup>`141.15 kB` |       <sup>-52% </sup>`40.00 kB` |    <sup>*41x* </sup>`330 ms` |
----
| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.7.16](https://www.npmjs.com/package/vue/v/2.7.16) ([Source](https://unpkg.com/vue@2.7.16/dist/vue.js)) |                       `434.87 kB` |                      `103.03 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                   |       <sup>-69% </sup>`135.58 kB` | **<sup>🏆-52% </sup>`49.05 kB`** |     <sup>*9x* </sup>`138 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                       | **<sup>🏆-69% </sup>`133.28 kB`** |       <sup>-52% </sup>`49.47 kB` | <sup>*161x* </sup>`2,353 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                             |       <sup>-69% </sup>`136.85 kB` |       <sup>-52% </sup>`49.47 kB` |  <sup>*78x* </sup>`1,139 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                 |       <sup>-68% </sup>`138.05 kB` |       <sup>-51% </sup>`50.44 kB` | <sup>*208x* </sup>`3,034 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                           |       <sup>-69% </sup>`135.71 kB` |       <sup>-51% </sup>`50.92 kB` | <sup>*313x* </sup>`4,552 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                           |       <sup>-68% </sup>`137.87 kB` |       <sup>-51% </sup>`50.93 kB` |    **<sup>🏆 </sup>`15 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                           |       <sup>-68% </sup>`138.39 kB` |       <sup>-51% </sup>`50.98 kB` |      <sup>*2x* </sup>`35 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                               |       <sup>-66% </sup>`146.83 kB` |       <sup>-50% </sup>`51.06 kB` |    <sup>*27x* </sup>`395 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                     |       <sup>-66% </sup>`147.39 kB` |       <sup>-50% </sup>`51.24 kB` |    <sup>*31x* </sup>`465 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                   |       <sup>-67% </sup>`142.10 kB` |       <sup>-50% </sup>`51.98 kB` |      <sup>*1x* </sup>`25 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                           |       <sup>-47% </sup>`230.03 kB` |       <sup>-36% </sup>`65.64 kB` |    <sup>*38x* </sup>`553 ms` |
----
| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.10 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                 | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-74% </sup>`24.66 kB`** | <sup>*146x* </sup>`1,624 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                     |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.97 kB` | <sup>*382x* </sup>`4,241 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                             |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*9x* </sup>`103 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                       |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |    <sup>*75x* </sup>`842 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                           |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*198x* </sup>`2,199 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                         |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*30x* </sup>`337 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                               |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.20 kB` |    <sup>*32x* </sup>`355 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                     |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`31 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                     |       <sup>-87% </sup>`72.42 kB` |       <sup>-73% </sup>`26.37 kB` |    **<sup>🏆 </sup>`11 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                             |       <sup>-86% </sup>`74.07 kB` |       <sup>-73% </sup>`26.50 kB` |      <sup>*1x* </sup>`22 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                     |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*31x* </sup>`346 ms` |
----
| Artifact                                                                                                                                   |                     Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.7.0](https://www.npmjs.com/package/d3/v/6.7.0) ([Source](https://unpkg.com/d3@6.7.0/dist/d3.js))                                    |                       `560.02 kB` |                      `131.40 kB` |                              |
| **Minifier**                                                                                                                               |                 **Minified size** |               **Minzipped size** |                     **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                                   | **<sup>🏆-52% </sup>`266.49 kB`** | **<sup>🏆-33% </sup>`87.93 kB`** | <sup>*111x* </sup>`3,827 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                               |       <sup>-52% </sup>`267.89 kB` |       <sup>-33% </sup>`88.13 kB` |     <sup>*8x* </sup>`279 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                           |       <sup>-50% </sup>`278.05 kB` |       <sup>-32% </sup>`89.11 kB` |    <sup>*20x* </sup>`699 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                         |       <sup>-52% </sup>`270.55 kB` |       <sup>-32% </sup>`89.20 kB` |  <sup>*60x* </sup>`2,087 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                                 |       <sup>-50% </sup>`279.18 kB` |       <sup>-32% </sup>`89.92 kB` |    <sup>*27x* </sup>`957 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                       |       <sup>-51% </sup>`272.55 kB` |       <sup>-31% </sup>`90.57 kB` |    **<sup>🏆 </sup>`34 ms`** |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                       |       <sup>-51% </sup>`272.76 kB` |       <sup>-30% </sup>`91.54 kB` |      <sup>*1x* </sup>`59 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                               |       <sup>-51% </sup>`276.08 kB` |       <sup>-29% </sup>`92.92 kB` |      <sup>*1x* </sup>`36 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                                       |       <sup>-51% </sup>`272.94 kB` |       <sup>-28% </sup>`94.89 kB` | <sup>*182x* </sup>`6,256 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify: unknown: Cannot read properties of undefined (reading 'add')_</sub> |                                 — |                                — |                            — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                                                                |                                 — |                                — |                            — |
----
| Artifact                                                                                                                                   |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.27.0](https://www.npmjs.com/package/terser/v/5.27.0) ([Source](https://unpkg.com/terser@5.27.0/dist/bundle.min.js))             |                       `994.53 kB` |                       `191.29 kB` |                              |
| **Minifier**                                                                                                                               |                 **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                               |       <sup>-55% </sup>`450.36 kB` | **<sup>🏆-36% </sup>`121.84 kB`** |     <sup>*7x* </sup>`244 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                                   |       <sup>-55% </sup>`446.74 kB` |       <sup>-36% </sup>`122.12 kB` | <sup>*109x* </sup>`3,508 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                         |       <sup>-54% </sup>`453.16 kB` |       <sup>-36% </sup>`122.29 kB` |  <sup>*60x* </sup>`1,947 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                                 |       <sup>-53% </sup>`468.92 kB` |       <sup>-36% </sup>`123.15 kB` |    <sup>*28x* </sup>`899 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                           |       <sup>-53% </sup>`466.64 kB` |       <sup>-36% </sup>`123.30 kB` |    <sup>*23x* </sup>`756 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                       |       <sup>-55% </sup>`451.67 kB` |       <sup>-35% </sup>`123.67 kB` |    **<sup>🏆 </sup>`32 ms`** |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                                       | **<sup>🏆-56% </sup>`434.88 kB`** |       <sup>-34% </sup>`125.35 kB` | <sup>*192x* </sup>`6,169 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                       |       <sup>-54% </sup>`453.77 kB` |       <sup>-34% </sup>`125.59 kB` |      <sup>*2x* </sup>`64 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                               |       <sup>-54% </sup>`461.29 kB` |       <sup>-34% </sup>`126.64 kB` |      <sup>*1x* </sup>`39 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                                       |       <sup>-37% </sup>`625.66 kB` |       <sup>-25% </sup>`143.54 kB` |  <sup>*39x* </sup>`1,249 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify: unknown: Cannot read properties of undefined (reading 'add')_</sub> |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                   |                     Original size |                         Gzip size |                               |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                               |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                               |       <sup>-48% </sup>`643.00 kB` | **<sup>🏆-36% </sup>`158.39 kB`** |      <sup>*7x* </sup>`373 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                   | **<sup>🏆-49% </sup>`642.22 kB`** |       <sup>-36% </sup>`158.91 kB` |  <sup>*101x* </sup>`4,820 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                         |       <sup>-48% </sup>`654.01 kB` |       <sup>-36% </sup>`159.74 kB` |   <sup>*56x* </sup>`2,683 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                             |       <sup>-48% </sup>`648.83 kB` |       <sup>-35% </sup>`162.50 kB` | <sup>*236x* </sup>`11,295 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                       |       <sup>-48% </sup>`644.45 kB` |       <sup>-34% </sup>`162.97 kB` |  <sup>*165x* </sup>`7,901 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                           |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |     <sup>*20x* </sup>`997 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                 |       <sup>-46% </sup>`675.60 kB` |       <sup>-34% </sup>`163.23 kB` |   <sup>*25x* </sup>`1,226 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                       |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |       <sup>*1x* </sup>`93 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                       |       <sup>-48% </sup>`644.89 kB` |       <sup>-34% </sup>`164.68 kB` |     **<sup>🏆 </sup>`48 ms`** |
| [bun](/lib/minifiers/bun.ts)                                                                                               |       <sup>-47% </sup>`662.22 kB` |       <sup>-33% </sup>`166.36 kB` |       <sup>*1x* </sup>`48 ms` |
| [jshrink](/lib/minifiers/jshrink.ts)                                                                                       |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |   <sup>*34x* </sup>`1,638 ms` |
----
| Artifact                                                                                                                          |                     Original size |                         Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [victory v35.11.4](https://www.npmjs.com/package/victory/v/35.11.4) ([Source](https://unpkg.com/victory@35.11.4/dist/victory.js)) |                         `1.98 MB` |                       `295.81 kB` |                               |
| **Minifier**                                                                                                                      |                 **Minified size** |                **Minzipped size** |                      **Time** |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                          | **<sup>🏆-67% </sup>`653.50 kB`** | **<sup>🏆-49% </sup>`150.44 kB`** |  <sup>*111x* </sup>`6,100 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                                                      |       <sup>-67% </sup>`658.09 kB` |       <sup>-49% </sup>`151.88 kB` |     <sup>*14x* </sup>`810 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                |       <sup>-66% </sup>`664.00 kB` |       <sup>-49% </sup>`152.00 kB` |   <sup>*65x* </sup>`3,618 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                                                                    |       <sup>-66% </sup>`664.43 kB` |       <sup>-47% </sup>`155.40 kB` | <sup>*283x* </sup>`15,532 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                              |       <sup>-66% </sup>`669.49 kB` |       <sup>-47% </sup>`158.25 kB` |     **<sup>🏆 </sup>`55 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                        |       <sup>-65% </sup>`701.06 kB` |       <sup>-46% </sup>`158.55 kB` |   <sup>*25x* </sup>`1,384 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                  |       <sup>-65% </sup>`699.99 kB` |       <sup>-46% </sup>`159.66 kB` |   <sup>*21x* </sup>`1,169 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                              |       <sup>-67% </sup>`654.87 kB` |       <sup>-43% </sup>`168.65 kB` |  <sup>*165x* </sup>`9,063 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                              |       <sup>-66% </sup>`675.23 kB` |       <sup>-41% </sup>`174.13 kB` |      <sup>*2x* </sup>`133 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                      |       <sup>-66% </sup>`678.47 kB` |       <sup>-41% </sup>`174.66 kB` |       <sup>*1x* </sup>`62 ms` |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: SyntaxError_</sub>                                                     |                                 — |                                 — |                             — |
----
| Artifact                                                                                                                    |                   Original size |                         Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ----------------------------: |
| [echarts v5.4.3](https://www.npmjs.com/package/echarts/v/5.4.3) ([Source](https://unpkg.com/echarts@5.4.3/dist/echarts.js)) |                       `3.35 MB` |                       `720.68 kB` |                               |
| **Minifier**                                                                                                                |               **Minified size** |                **Minzipped size** |                      **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                |       <sup>-69% </sup>`1.03 MB` | **<sup>🏆-53% </sup>`337.62 kB`** |   <sup>*10x* </sup>`1,128 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                          |       <sup>-69% </sup>`1.04 MB` |       <sup>-53% </sup>`339.42 kB` |   <sup>*52x* </sup>`5,856 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                                                                    | **<sup>🏆-70% </sup>`1.02 MB`** |       <sup>-52% </sup>`343.93 kB` | <sup>*102x* </sup>`11,405 ms` |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts)                                                        |       <sup>-69% </sup>`1.03 MB` |       <sup>-52% </sup>`346.28 kB` | <sup>*118x* </sup>`13,214 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                  |       <sup>-67% </sup>`1.12 MB` |       <sup>-52% </sup>`349.09 kB` |   <sup>*24x* </sup>`2,718 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                            |       <sup>-67% </sup>`1.11 MB` |       <sup>-51% </sup>`349.71 kB` |   <sup>*16x* </sup>`1,836 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                        |       <sup>-68% </sup>`1.06 MB` |       <sup>-51% </sup>`349.90 kB` |      <sup>*1x* </sup>`133 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                        |       <sup>-69% </sup>`1.05 MB` |       <sup>-51% </sup>`350.08 kB` |      <sup>*1x* </sup>`214 ms` |
| [bun](/lib/minifiers/bun.ts)                                                                                                |       <sup>-68% </sup>`1.07 MB` |       <sup>-51% </sup>`355.60 kB` |    **<sup>🏆 </sup>`111 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                       |                               — |                                 — |                             — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: TypeError_</sub>                                                 |                               — |                                 — |                             — |
----
| Artifact                                                                                                              |     Original size |          Gzip size |          |
| :-------------------------------------------------------------------------------------------------------------------- | ----------------: | -----------------: | -------: |
| [antd v4.24.15](https://www.npmjs.com/package/antd/v/4.24.15) ([Source](https://unpkg.com/antd@4.24.15/dist/antd.js)) |         `4.60 MB` |        `693.44 kB` |          |
| **Minifier**                                                                                                          | **Minified size** | **Minzipped size** | **Time** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Invalid output: AssertionError_</sub>                            |                 — |                  — |        — |
| [bun](/lib/minifiers/bun.ts) <sub>_Invalid output: AssertionError_</sub>                                              |                 — |                  — |        — |
| [esbuild](/lib/minifiers/esbuild.ts) <sub>_Invalid output: AssertionError_</sub>                                      |                 — |                  — |        — |
| [google-closure-compiler](/lib/minifiers/google-closure-compiler.ts) <sub>_Invalid output: AssertionError_</sub>      |                 — |                  — |        — |
| [jshrink](/lib/minifiers/jshrink.ts) <sub>_Invalid output: AssertionError_</sub>                                      |                 — |                  — |        — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: AssertionError_</sub>                                              |                 — |                  — |        — |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts) <sub>_Invalid output: AssertionError_</sub>                      |                 — |                  — |        — |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts) <sub>_Invalid output: AssertionError_</sub>                |                 — |                  — |        — |
| [terser](/lib/minifiers/terser.ts) <sub>_Invalid output: AssertionError_</sub>                                        |                 — |                  — |        — |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts) <sub>_Invalid output: AssertionError_</sub>          |                 — |                  — |        — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Invalid output: AssertionError_</sub>                                  |                 — |                  — |        — |
----
| Artifact                                                                                                                               |                   Original size |                         Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.89 MB` |                              |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                     **Time** |
| [swc](/lib/minifiers/swc.ts)                                                                                                           | **<sup>🏆-70% </sup>`3.31 MB`** | **<sup>🏆-55% </sup>`852.29 kB`** |  <sup>*10x* </sup>`2,653 ms` |
| [terser](/lib/minifiers/terser.ts)                                                                                                     |       <sup>-69% </sup>`3.35 MB` |       <sup>-55% </sup>`854.43 kB` | <sup>*50x* </sup>`12,573 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                                                       |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |  <sup>*15x* </sup>`3,873 ms` |
| [tdewolff-minify](/lib/minifiers/tdewolff-minify.ts)                                                                                   |       <sup>-69% </sup>`3.36 MB` |       <sup>-53% </sup>`876.92 kB` |   **<sup>🏆 </sup>`249 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                                             |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.31 kB` |  <sup>*20x* </sup>`4,984 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                                                   |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.50 kB` |     <sup>*2x* </sup>`499 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                                                  |                               — |                                 — |                            — |
| [bun](/lib/minifiers/bun.ts) <sub>_Invalid output: AssertionError_</sub>                                                               |                               — |                                 — |                            — |
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
