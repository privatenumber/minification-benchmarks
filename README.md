<p align="center">
	<img width="160" src=".github/logo.webp">
</p>
<h1 align="center">
	<sup>minification benchmarks</sup>
</h1>

> What's the best JavaScript minifier?

This project benchmarks the following minifiers:

<!-- minifiers:start -->
- [babel-minify](https://github.com/babel/minify/tree/master/packages/babel-minify) <sub>v0.5.2</sub>
- [bun](https://github.com/oven-sh/bun) <sub>v1.1.12</sub>
- [esbuild](https://github.com/evanw/esbuild) <sub>v0.21.5</sub>
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler) <sub>v20240317.0.0</sub>
- [tedivm/jshrink](https://github.com/tedious/JShrink) <sub>v1.7.0</sub>
- [@swc/core](https://github.com/swc-project/swc) <sub>v1.5.27</sub>
- [@tdewolff/minify](https://github.com/tdewolff/minify#readme) <sub>v2.20.33</sub>
- [terser](https://github.com/terser/terser) <sub>v5.31.1</sub>
- [uglify-js](https://github.com/mishoo/UglifyJS) <sub>v3.18.0</sub>
<!-- minifiers:end -->

_Benchmarks last updated on <!-- lastUpdated:start -->Jun 10, 2024<!-- lastUpdated:end -->._

<br>

<p align="center">
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=398771"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/donate.webp"></a>
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=397608"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/sponsor.webp"></a>
</p>

## 🙋‍♂️ Why?

1. To help you pick a minifier that fits your needs
2. To promote JS minifiers and document their performances
3. To encourage healthy competition and improvement amongst minifiers

## 👟 Methodology

- Each minifier is executed in its own process with a 10s timeout
- Artifact integrity is verified by a test before and after minification
- Minifier upgrade PRs are automated via [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)
- Benchmarks are updated on every PR via [GitHub Actions](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

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
```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "react v17.0.2"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 19385
	bar [19385,8173,8177,8193,8317,8448,8543,8631,8651,8668,8746,11040]
```

<div align="center">

| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.13 kB` |                      `19.39 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                               |       <sup>-68% </sup>`22.87 kB` | **<sup>🏆-58% </sup>`8.17 kB`** |       <sup>*8x* </sup>`21 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                         | **<sup>🏆-69% </sup>`22.66 kB`** |       <sup>-58% </sup>`8.18 kB` |    <sup>*184x* </sup>`479 ms` |
| 3. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                             |       <sup>-68% </sup>`22.83 kB` |       <sup>-58% </sup>`8.19 kB` | <sup>*1261x* </sup>`3,269 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                               |       <sup>-68% </sup>`23.14 kB` |       <sup>-57% </sup>`8.32 kB` |    <sup>*103x* </sup>`269 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                                   |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*227x* </sup>`590 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                             |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |       <sup>*5x* </sup>`14 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                            |       <sup>-67% </sup>`23.53 kB` |       <sup>-55% </sup>`8.63 kB` |      **<sup>🏆 </sup>`3 ms`** |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                     |       <sup>-67% </sup>`24.01 kB` |       <sup>-55% </sup>`8.65 kB` |       <sup>*5x* </sup>`14 ms` |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                           |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*34x* </sup>`90 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |     <sup>*45x* </sup>`119 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                               |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*40x* </sup>`105 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "moment v2.29.1"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 36231
	bar [36231,18559,18686,18690,18910,19119,19334,19496,19569,19683,19858,24998]
```

<div align="center">

| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                             | **<sup>🏆-67% </sup>`57.85 kB`** | **<sup>🏆-49% </sup>`18.56 kB`** | <sup>*214x* </sup>`1,121 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                   |       <sup>-67% </sup>`58.21 kB` |       <sup>-48% </sup>`18.69 kB` |      <sup>*9x* </sup>`52 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                   |       <sup>-66% </sup>`59.14 kB` |       <sup>-48% </sup>`18.69 kB` |   <sup>*128x* </sup>`673 ms` |
| 4. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                 |       <sup>-66% </sup>`58.27 kB` |       <sup>-48% </sup>`18.91 kB` | <sup>*736x* </sup>`3,856 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                       |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` | <sup>*261x* </sup>`1,367 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                 |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |      <sup>*3x* </sup>`20 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                |       <sup>-66% </sup>`59.95 kB` |       <sup>-46% </sup>`19.50 kB` |     **<sup>🏆 </sup>`5 ms`** |
| 8. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                               |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |    <sup>*41x* </sup>`218 ms` |
| 9. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                     |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.68 kB` |    <sup>*52x* </sup>`276 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                        |       <sup>-64% </sup>`61.86 kB` |       <sup>-45% </sup>`19.86 kB` |      <sup>*3x* </sup>`17 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                   |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |    <sup>*46x* </sup>`246 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "jquery v3.5.1"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 84498
	bar [84498,30867,30879,30912,31470,31474,31621,31799,31954,32630,33086,40879]
```

<div align="center">

| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                     |       <sup>-69% </sup>`89.15 kB` | **<sup>🏆-63% </sup>`30.87 kB`** |     <sup>*11x* </sup>`92 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                               | **<sup>🏆-69% </sup>`88.51 kB`** |       <sup>-63% </sup>`30.88 kB` | <sup>*181x* </sup>`1,516 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` |   <sup>*107x* </sup>`898 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                 |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*37x* </sup>`312 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-69% </sup>`89.85 kB` |       <sup>-63% </sup>`31.47 kB` |     **<sup>🏆 </sup>`8 ms`** |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                       |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.62 kB` |    <sup>*42x* </sup>`352 ms` |
| 7. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                         |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*269x* </sup>`2,255 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                   |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |      <sup>*4x* </sup>`37 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                           |       <sup>-68% </sup>`92.56 kB` |       <sup>-61% </sup>`32.63 kB` |      <sup>*2x* </sup>`20 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                  |       <sup>-68% </sup>`92.70 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*522x* </sup>`4,363 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                     |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*37x* </sup>`315 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "vue v2.6.12"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 89668
	bar [89668,42477,42939,42939,43925,44230,44368,44376,44450,44679,45340,57169]
```

<div align="center">

| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                            |       <sup>-66% </sup>`115.47 kB` | **<sup>🏆-53% </sup>`42.48 kB`** |    <sup>*11x* </sup>`131 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                            |       <sup>-66% </sup>`116.83 kB` |       <sup>-52% </sup>`42.94 kB` |  <sup>*94x* </sup>`1,089 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                      | **<sup>🏆-67% </sup>`114.00 kB`** |       <sup>-52% </sup>`42.94 kB` | <sup>*178x* </sup>`2,065 ms` |
| 4. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*214x* </sup>`2,476 ms` |
| 5. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                          |       <sup>-66% </sup>`115.61 kB` |       <sup>-51% </sup>`44.23 kB` | <sup>*407x* </sup>`4,717 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                          |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |      <sup>*3x* </sup>`42 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                         |       <sup>-66% </sup>`117.81 kB` |       <sup>-51% </sup>`44.38 kB` |    **<sup>🏆 </sup>`12 ms`** |
| 8. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                        |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*31x* </sup>`367 ms` |
| 9. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                              |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.68 kB` |    <sup>*37x* </sup>`435 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                 |       <sup>-64% </sup>`121.70 kB` |       <sup>-49% </sup>`45.34 kB` |      <sup>*1x* </sup>`23 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                            |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*35x* </sup>`416 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "lodash v4.17.21"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 96690
	bar [96690,24659,24972,25178,25186,25503,25862,26200,26221,26473,26498,36327]
```

<div align="center">

| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                | **<sup>🏆-87% </sup>`68.24 kB`** | **<sup>🏆-74% </sup>`24.66 kB`** | <sup>*135x* </sup>`1,630 ms` |
| 2. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                    |       <sup>-86% </sup>`73.47 kB` |       <sup>-74% </sup>`24.97 kB` | <sup>*386x* </sup>`4,633 ms` |
| 3. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                      |       <sup>-87% </sup>`69.83 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*9x* </sup>`113 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |    <sup>*76x* </sup>`921 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                          |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*161x* </sup>`1,940 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                  |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*27x* </sup>`336 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                    |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`29 ms` |
| 8. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                        |       <sup>-86% </sup>`75.29 kB` |       <sup>-73% </sup>`26.22 kB` |    <sup>*31x* </sup>`376 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                            |       <sup>-86% </sup>`74.12 kB` |       <sup>-73% </sup>`26.47 kB` |      <sup>*2x* </sup>`24 ms` |
| 10. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-87% </sup>`71.90 kB` |       <sup>-73% </sup>`26.50 kB` |    **<sup>🏆 </sup>`12 ms`** |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                      |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*27x* </sup>`328 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "d3 v6.3.1"
	x-axis ["Original",1,2,3,4,5,6,7,8,9]
	y-axis "Gzip size" 0 --> 130686
	bar [130686,87040,87283,88319,88343,89156,89892,90800,92395,94121]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js))                    |                       `555.77 kB` |                      `130.69 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-53% </sup>`263.76 kB`** | **<sup>🏆-33% </sup>`87.04 kB`** | <sup>*115x* </sup>`3,862 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-52% </sup>`265.27 kB` |       <sup>-33% </sup>`87.28 kB` |     <sup>*8x* </sup>`299 ms` |
| 3. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*21x* </sup>`708 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-52% </sup>`267.90 kB` |       <sup>-32% </sup>`88.34 kB` |  <sup>*67x* </sup>`2,267 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |  <sup>*30x* </sup>`1,013 ms` |
| 6. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-51% </sup>`269.93 kB` |       <sup>-31% </sup>`89.89 kB` |    **<sup>🏆 </sup>`33 ms`** |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |      <sup>*2x* </sup>`73 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-51% </sup>`273.63 kB` |       <sup>-29% </sup>`92.40 kB` |      <sup>*1x* </sup>`37 ms` |
| 9. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                      |       <sup>-51% </sup>`270.30 kB` |       <sup>-28% </sup>`94.12 kB` | <sup>*212x* </sup>`7,110 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>    |                                 ❌ |                               ❌  |                            - |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub> |                                 ❌ |                               ❌  |                            - |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "terser v5.30.3"
	x-axis ["Original",1,2,3,4,5,6,7,8,9]
	y-axis "Gzip size" 0 --> 193763
	bar [193763,123276,123502,124428,124609,124900,126562,126706,127551,145178]
```

<div align="center">

| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.30.3](https://www.npmjs.com/package/terser/v/5.30.3) ([Source](https://unpkg.com/terser@5.30.3/dist/bundle.min.js)) |                         `1.01 MB` |                       `193.76 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                      |       <sup>-55% </sup>`451.54 kB` | **<sup>🏆-36% </sup>`123.28 kB`** | <sup>*110x* </sup>`3,637 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                            |       <sup>-55% </sup>`458.31 kB` |       <sup>-36% </sup>`123.50 kB` |  <sup>*67x* </sup>`2,197 ms` |
| 3. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                              |       <sup>-53% </sup>`474.40 kB` |       <sup>-36% </sup>`124.43 kB` |    <sup>*29x* </sup>`974 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                        |       <sup>-53% </sup>`472.16 kB` |       <sup>-36% </sup>`124.61 kB` |    <sup>*24x* </sup>`787 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                         |       <sup>-55% </sup>`456.69 kB` |       <sup>-36% </sup>`124.90 kB` |    **<sup>🏆 </sup>`33 ms`** |
| 6. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                          | **<sup>🏆-56% </sup>`439.95 kB`** |       <sup>-35% </sup>`126.56 kB` | <sup>*202x* </sup>`6,631 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                          |       <sup>-55% </sup>`458.89 kB` |       <sup>-35% </sup>`126.71 kB` |      <sup>*1x* </sup>`63 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                  |       <sup>-54% </sup>`466.96 kB` |       <sup>-34% </sup>`127.55 kB` |      <sup>*1x* </sup>`37 ms` |
| 9. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                             |       <sup>-37% </sup>`633.71 kB` |       <sup>-25% </sup>`145.18 kB` |  <sup>*36x* </sup>`1,185 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>        |                                 ❌ |                                ❌  |                            - |
| 11. [@swc/core](packages/minifiers/minifiers/swc.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>              |                                 ❌ |                                ❌  |                            - |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "three v0.124.0"
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10]
	y-axis "Gzip size" 0 --> 248267
	bar [248267,158374,158982,159729,162998,163036,163198,163725,164737,166483,193471]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                                   |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-48% </sup>`642.91 kB` | **<sup>🏆-36% </sup>`158.37 kB`** |          <sup>*8x* </sup>`391 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-49% </sup>`642.31 kB`** |       <sup>-36% </sup>`158.98 kB` |      <sup>*101x* </sup>`4,870 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-48% </sup>`653.99 kB` |       <sup>-36% </sup>`159.73 kB` |       <sup>*61x* </sup>`2,937 ms` |
| 4. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                      |       <sup>-48% </sup>`644.45 kB` |       <sup>-34% </sup>`163.00 kB` |      <sup>*170x* </sup>`8,208 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |         <sup>*20x* </sup>`989 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-46% </sup>`675.50 kB` |       <sup>-34% </sup>`163.20 kB` |       <sup>*27x* </sup>`1,311 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |           <sup>*1x* </sup>`91 ms` |
| 8. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-48% </sup>`644.55 kB` |       <sup>-34% </sup>`164.74 kB` |           <sup>*1x* </sup>`50 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-47% </sup>`662.76 kB` |       <sup>-33% </sup>`166.48 kB` |         **<sup>🏆 </sup>`48 ms`** |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                        |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |       <sup>*31x* </sup>`1,519 ms` |
| 11. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>            |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "victory v35.8.4"
	x-axis ["Original",1,2,3,4,5,6,7,8]
	y-axis "Gzip size" 0 --> 309942
	bar [309942,157859,158090,158718,165131,166386,167579,181071,182659]
```

<div align="center">

| Artifact                                                                                                                             |                     Original size |                         Gzip size |                                   |
| :----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js))       |                         `2.13 MB` |                       `309.94 kB` |                                   |
| **Minifier**                                                                                                                         |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                  |       <sup>-67% </sup>`707.21 kB` | **<sup>🏆-49% </sup>`157.86 kB`** |          <sup>*9x* </sup>`578 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                            | **<sup>🏆-67% </sup>`697.60 kB`** |       <sup>-49% </sup>`158.09 kB` |      <sup>*107x* </sup>`6,251 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                                  |       <sup>-66% </sup>`715.59 kB` |       <sup>-49% </sup>`158.72 kB` |       <sup>*68x* </sup>`3,996 ms` |
| 4. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`718.73 kB` |       <sup>-47% </sup>`165.13 kB` |         **<sup>🏆 </sup>`58 ms`** |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                    |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`166.39 kB` |       <sup>*27x* </sup>`1,596 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                              |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |       <sup>*22x* </sup>`1,324 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |          <sup>*2x* </sup>`124 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                        |       <sup>-66% </sup>`728.19 kB` |       <sup>-41% </sup>`182.66 kB` |           <sup>*1x* </sup>`68 ms` |
| 9. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>              |                                 ❌ |                                ❌  |                                 - |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>     |                                 ❌ |                                ❌  |                                 - |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "echarts v5.1.1"
	x-axis ["Original",1,2,3,4,5,6,7]
	y-axis "Gzip size" 0 --> 684611
	bar [684611,320244,322106,330736,331412,331563,331791,337786]
```

<div align="center">

| Artifact                                                                                                                             |                     Original size |                         Gzip size |                                   |
| :----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js))          |                         `3.20 MB` |                       `684.61 kB` |                                   |
| **Minifier**                                                                                                                         |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                  | **<sup>🏆-69% </sup>`993.11 kB`** | **<sup>🏆-53% </sup>`320.24 kB`** |        <sup>*9x* </sup>`1,092 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                  |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`322.11 kB` |       <sup>*54x* </sup>`6,046 ms` |
| 3. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                    |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.74 kB` |       <sup>*23x* </sup>`2,656 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                              |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |       <sup>*15x* </sup>`1,746 ms` |
| 5. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |          <sup>*1x* </sup>`204 ms` |
| 6. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                               |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.79 kB` |          <sup>*1x* </sup>`123 ms` |
| 7. [bun](packages/minifiers/minifiers/bun.ts)                                                                                        |         <sup>-68% </sup>`1.03 MB` |       <sup>-51% </sup>`337.79 kB` |        **<sup>🏆 </sup>`111 ms`** |
| 8. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                       |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 9. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                            |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub>           |                                 ❌ |                                ❌  |                                 - |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "antd v4.16.1"
	x-axis ["Original",1,2,3,4,5,6,7]
	y-axis "Gzip size" 0 --> 825175
	bar [825175,452864,457817,472053,475480,478572,488279,491753]
```

<div align="center">

| Artifact                                                                                                                             |                   Original size |                         Gzip size |                                   |
| :----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js))                   |                       `6.67 MB` |                       `825.18 kB` |                                   |
| **Minifier**                                                                                                                         |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                  | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.86 kB`** |        <sup>*9x* </sup>`1,365 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                  |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`457.82 kB` |       <sup>*48x* </sup>`6,833 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                               |       <sup>-66% </sup>`2.30 MB` |       <sup>-43% </sup>`472.05 kB` |        **<sup>🏆 </sup>`141 ms`** |
| 4. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                    |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`475.48 kB` |       <sup>*21x* </sup>`3,068 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                              |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |       <sup>*17x* </sup>`2,445 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |          <sup>*2x* </sup>`296 ms` |
| 7. [bun](packages/minifiers/minifiers/bun.ts)                                                                                        |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.75 kB` |          <sup>*1x* </sup>`152 ms` |
| 8. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                       |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 9. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: timeout">❌ Timed out</sub>                   |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                            |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
</div>

----

```mermaid
---
config:
    xyChart:
        width: 720
        height: 360
        xAxis:
            labelPadding: 20
        yAxis:
            labelPadding: 10
---
xychart-beta
	title "typescript v4.9.5"
	x-axis ["Original",1,2,3,4,5]
	y-axis "Gzip size" 0 --> 1884998
	bar [1884998,852013,876535,876675,879301,915495]
```

<div align="center">

| Artifact                                                                                                                               |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                                   |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                    | **<sup>🏆-70% </sup>`3.31 MB`** | **<sup>🏆-55% </sup>`852.01 kB`** |       <sup>*10x* </sup>`2,761 ms` |
| 2. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |       <sup>*14x* </sup>`3,883 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                 |       <sup>-69% </sup>`3.36 MB` |       <sup>-53% </sup>`876.68 kB` |        **<sup>🏆 </sup>`265 ms`** |
| 4. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.30 kB` |       <sup>*19x* </sup>`5,228 ms` |
| 5. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                  |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.50 kB` |          <sup>*1x* </sup>`507 ms` |
| 6. [terser](packages/minifiers/minifiers/terser.ts) <sub title="Failed: timeout">❌ Timed out</sub>                                     |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 7. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                         |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 8. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub>   |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                               |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub>             |                               ❌ |                                ❌  |                                 - |
| 11. [bun](packages/minifiers/minifiers/bun.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>                            |                               ❌ |                                ❌  |                                 - |
</div>
<!-- benchmarks:end -->

## Sponsors

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
