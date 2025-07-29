<p align="center">
	<img width="160" src=".github/logo.webp">
</p>
<h1 align="center">
	<sup>minification benchmarks</sup>
</h1>

> What's the best JavaScript minifier?

This project benchmarks the following minifiers:

<!-- minifiers:start -->
| Minifier                                                                                                    | Version                                                                              | Release date ↓ |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------- |
| [google-closure-compiler](https://github.com/git+https://github.com/google/closure-compiler-npm.git#master) | [20250727.0.0](https://www.npmjs.com/package/google-closure-compiler/v/20250727.0.0) | 2025-07-29     |
| [@swc/core](https://github.com/swc-project/swc)                                                             | [1.13.3](https://www.npmjs.com/package/@swc/core/v/1.13.3)                           | 2025-07-29     |
| [@cminify/cminify-linux-x64](https://codeberg.org/Jumping-Beaver/cminify)                                   | [3.0.1](https://www.npmjs.com/package/@cminify/cminify-linux-x64/v/3.0.1)            | 2025-07-27     |
| [oxc-minify](https://github.com/oxc-project/oxc.git)                                                        | [0.78.0](https://www.npmjs.com/package/oxc-minify/v/0.78.0)                          | 2025-07-24     |
| [@tdewolff/minify](https://github.com/tdewolff/minify#readme)                                               | [2.23.10](https://www.npmjs.com/package/@tdewolff/minify/v/2.23.10)                  | 2025-07-22     |
| [esbuild](https://github.com/evanw/esbuild)                                                                 | [0.25.8](https://www.npmjs.com/package/esbuild/v/0.25.8)                             | 2025-07-19     |
| [bun](https://github.com/oven-sh/bun)                                                                       | [1.2.19](https://www.npmjs.com/package/bun/v/1.2.19)                                 | 2025-07-19     |
| [terser](https://github.com/terser/terser)                                                                  | [5.43.1](https://www.npmjs.com/package/terser/v/5.43.1)                              | 2025-06-19     |
| [uglify-js](https://github.com/mishoo/UglifyJS)                                                             | [3.19.3](https://www.npmjs.com/package/uglify-js/v/3.19.3)                           | 2024-08-29     |
| [babel-minify](https://github.com/babel/minify/tree/master/packages/babel-minify)                           | [0.5.2](https://www.npmjs.com/package/babel-minify/v/0.5.2)                          | 2022-05-06     |
| [tedivm/jshrink](https://github.com/tedious/JShrink)                                                        | 1.8.0                                                                                |                |
<!-- minifiers:end -->

_Benchmarks last updated on <!-- lastUpdated:start -->Jul 29, 2025<!-- lastUpdated:end -->._

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
- Each minifier is minimally configured (sourcemaps & comments disabled), comparing out-of-the-box experience
- Minifier upgrade PRs are automated via [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)
- Benchmarks are updated on every PR via [GitHub Actions](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)
- The raw benchmark data is available in [`/packages/data/data/data.json`](/packages/data/data/data.json)

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

> [!TIP]
> What's the verdict? [⚔️ See the _Minifier showdown_](#%EF%B8%8F-minifier-showdown)

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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12,13]
	y-axis "Gzip size" 0 --> 19385
	bar [19385,8177,8186,8216,8255,8448,8493,8543,8628,8661,8668,8739,10858,11040]
```

<div align="center">

| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.13 kB` |                      `19.39 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                         | **<sup>🏆-69% </sup>`22.64 kB`** | **<sup>🏆-58% </sup>`8.18 kB`** |    <sup>*191x* </sup>`497 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                               |       <sup>-68% </sup>`22.81 kB` |       <sup>-58% </sup>`8.19 kB` |       <sup>*4x* </sup>`12 ms` |
| 3. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                             |       <sup>-68% </sup>`22.84 kB` |       <sup>-58% </sup>`8.22 kB` | <sup>*1248x* </sup>`3,239 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                               |       <sup>-68% </sup>`23.05 kB` |       <sup>-57% </sup>`8.26 kB` |    <sup>*105x* </sup>`275 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                                   |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*249x* </sup>`647 ms` |
| 6. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                       |       <sup>-67% </sup>`23.52 kB` |       <sup>-56% </sup>`8.49 kB` |        <sup>*1x* </sup>`3 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                             |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |       <sup>*5x* </sup>`14 ms` |
| 8. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                            |       <sup>-67% </sup>`23.49 kB` |       <sup>-55% </sup>`8.63 kB` |      **<sup>🏆 </sup>`3 ms`** |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                                     |       <sup>-67% </sup>`23.99 kB` |       <sup>-55% </sup>`8.66 kB` |       <sup>*5x* </sup>`13 ms` |
| 10. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                          |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*35x* </sup>`91 ms` |
| 11. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                |       <sup>-65% </sup>`25.06 kB` |       <sup>-55% </sup>`8.74 kB` |     <sup>*45x* </sup>`118 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                         |       <sup>-44% </sup>`40.04 kB` |      <sup>-44% </sup>`10.86 kB` |       <sup>*4x* </sup>`12 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                               |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*48x* </sup>`126 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12,13]
	y-axis "Gzip size" 0 --> 36231
	bar [36231,18568,18689,18747,18923,19119,19260,19333,19478,19569,19651,19857,24744,24998]
```

<div align="center">

| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                             | **<sup>🏆-67% </sup>`57.73 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** | <sup>*188x* </sup>`1,149 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                   |       <sup>-66% </sup>`59.01 kB` |       <sup>-48% </sup>`18.69 kB` |   <sup>*113x* </sup>`693 ms` |
| 3. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                   |       <sup>-66% </sup>`58.42 kB` |       <sup>-48% </sup>`18.75 kB` |      <sup>*4x* </sup>`30 ms` |
| 4. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                 |       <sup>-66% </sup>`58.29 kB` |       <sup>-48% </sup>`18.92 kB` | <sup>*602x* </sup>`3,670 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                       |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` | <sup>*240x* </sup>`1,465 ms` |
| 6. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                           |       <sup>-66% </sup>`59.51 kB` |       <sup>-47% </sup>`19.26 kB` |       <sup>*1x* </sup>`9 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                 |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |      <sup>*3x* </sup>`22 ms` |
| 8. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                |       <sup>-66% </sup>`59.87 kB` |       <sup>-46% </sup>`19.48 kB` |     **<sup>🏆 </sup>`6 ms`** |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                               |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |    <sup>*35x* </sup>`215 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                    |       <sup>-64% </sup>`63.01 kB` |       <sup>-46% </sup>`19.65 kB` |    <sup>*47x* </sup>`289 ms` |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                        |       <sup>-64% </sup>`61.84 kB` |       <sup>-45% </sup>`19.86 kB` |      <sup>*2x* </sup>`17 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                             |       <sup>-45% </sup>`95.93 kB` |       <sup>-32% </sup>`24.74 kB` |      <sup>*1x* </sup>`10 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                   |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |    <sup>*46x* </sup>`284 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12,13]
	y-axis "Gzip size" 0 --> 84498
	bar [84498,30856,30866,30903,30966,31446,31470,31555,31799,31954,32653,33092,40365,40879]
```

<div align="center">

| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [terser](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-69% </sup>`89.24 kB` | **<sup>🏆-63% </sup>`30.86 kB`** |   <sup>*116x* </sup>`921 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                     |       <sup>-69% </sup>`89.17 kB` |       <sup>-63% </sup>`30.87 kB` |      <sup>*5x* </sup>`47 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                               | **<sup>🏆-69% </sup>`88.45 kB`** |       <sup>-63% </sup>`30.90 kB` | <sup>*200x* </sup>`1,593 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                             |       <sup>-69% </sup>`89.34 kB` |       <sup>-63% </sup>`30.97 kB` |      <sup>*1x* </sup>`15 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-69% </sup>`89.68 kB` |       <sup>-63% </sup>`31.45 kB` |     **<sup>🏆 </sup>`8 ms`** |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                 |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*39x* </sup>`314 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                       |       <sup>-67% </sup>`94.26 kB` |       <sup>-63% </sup>`31.56 kB` |    <sup>*46x* </sup>`373 ms` |
| 8. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                         |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*302x* </sup>`2,398 ms` |
| 9. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                   |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |      <sup>*4x* </sup>`36 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                          |       <sup>-68% </sup>`92.55 kB` |       <sup>-61% </sup>`32.65 kB` |      <sup>*3x* </sup>`28 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                  |       <sup>-68% </sup>`92.73 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*510x* </sup>`4,044 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                               |      <sup>-51% </sup>`141.45 kB` |       <sup>-52% </sup>`40.37 kB` |      <sup>*2x* </sup>`22 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                     |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*45x* </sup>`361 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12,13]
	y-axis "Gzip size" 0 --> 89668
	bar [89668,42730,42870,43036,43348,43925,44184,44358,44368,44450,44636,45400,56356,57169]
```

<div align="center">

| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                            |       <sup>-66% </sup>`115.69 kB` | **<sup>🏆-52% </sup>`42.73 kB`** |      <sup>*5x* </sup>`65 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                            |       <sup>-66% </sup>`116.60 kB` |       <sup>-52% </sup>`42.87 kB` |  <sup>*92x* </sup>`1,143 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                      | **<sup>🏆-67% </sup>`113.80 kB`** |       <sup>-52% </sup>`43.04 kB` | <sup>*178x* </sup>`2,206 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                    |       <sup>-66% </sup>`117.22 kB` |       <sup>-52% </sup>`43.35 kB` |      <sup>*1x* </sup>`18 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*218x* </sup>`2,696 ms` |
| 6. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                          |       <sup>-66% </sup>`115.61 kB` |       <sup>-51% </sup>`44.18 kB` | <sup>*360x* </sup>`4,450 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                         |       <sup>-66% </sup>`117.69 kB` |       <sup>-51% </sup>`44.36 kB` |    **<sup>🏆 </sup>`12 ms`** |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                          |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |      <sup>*3x* </sup>`42 ms` |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                        |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*29x* </sup>`364 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                             |       <sup>-63% </sup>`126.39 kB` |       <sup>-50% </sup>`44.64 kB` |    <sup>*35x* </sup>`442 ms` |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                 |       <sup>-64% </sup>`121.50 kB` |       <sup>-49% </sup>`45.40 kB` |      <sup>*2x* </sup>`29 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                      |       <sup>-43% </sup>`193.91 kB` |       <sup>-37% </sup>`56.36 kB` |      <sup>*1x* </sup>`23 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                            |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*38x* </sup>`478 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12,13]
	y-axis "Gzip size" 0 --> 96690
	bar [96690,24686,25022,25152,25240,25503,25862,25979,26187,26200,26498,26655,35944,36327]
```

<div align="center">

| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                | **<sup>🏆-87% </sup>`68.17 kB`** | **<sup>🏆-74% </sup>`24.69 kB`** | <sup>*134x* </sup>`1,689 ms` |
| 2. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                    |       <sup>-86% </sup>`73.50 kB` |       <sup>-74% </sup>`25.02 kB` | <sup>*322x* </sup>`4,050 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-87% </sup>`70.41 kB` |       <sup>-74% </sup>`25.15 kB` |  <sup>*81x* </sup>`1,028 ms` |
| 4. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                      |       <sup>-87% </sup>`69.81 kB` |       <sup>-74% </sup>`25.24 kB` |      <sup>*4x* </sup>`53 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                          |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*165x* </sup>`2,083 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                  |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*26x* </sup>`333 ms` |
| 7. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                              |       <sup>-87% </sup>`71.38 kB` |       <sup>-73% </sup>`25.98 kB` |      <sup>*1x* </sup>`14 ms` |
| 8. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                        |       <sup>-86% </sup>`75.04 kB` |       <sup>-73% </sup>`26.19 kB` |    <sup>*31x* </sup>`393 ms` |
| 9. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                    |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`35 ms` |
| 10. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-87% </sup>`71.90 kB` |       <sup>-73% </sup>`26.50 kB` |    **<sup>🏆 </sup>`13 ms`** |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                           |       <sup>-87% </sup>`73.45 kB` |       <sup>-72% </sup>`26.66 kB` |      <sup>*1x* </sup>`23 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                |      <sup>-73% </sup>`146.27 kB` |       <sup>-63% </sup>`35.94 kB` |      <sup>*1x* </sup>`13 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                      |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*29x* </sup>`371 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 130686
	bar [130686,87016,87205,87997,88162,88319,89069,89882,90800,92395,94166,103813]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js))                    |                       `555.77 kB` |                      `130.69 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-53% </sup>`263.56 kB`** | **<sup>🏆-33% </sup>`87.02 kB`** | <sup>*140x* </sup>`3,927 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-52% </sup>`265.22 kB` |       <sup>-33% </sup>`87.21 kB` |     <sup>*5x* </sup>`144 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-52% </sup>`267.42 kB` |       <sup>-33% </sup>`88.00 kB` |  <sup>*83x* </sup>`2,338 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-51% </sup>`270.91 kB` |       <sup>-33% </sup>`88.16 kB` |      <sup>*1x* </sup>`43 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*25x* </sup>`711 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-50% </sup>`276.13 kB` |       <sup>-32% </sup>`89.07 kB` |  <sup>*36x* </sup>`1,020 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-52% </sup>`269.35 kB` |       <sup>-31% </sup>`89.88 kB` |      <sup>*1x* </sup>`33 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |      <sup>*2x* </sup>`69 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-51% </sup>`273.41 kB` |       <sup>-29% </sup>`92.40 kB` |      <sup>*1x* </sup>`47 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                     |       <sup>-51% </sup>`270.32 kB` |       <sup>-28% </sup>`94.17 kB` | <sup>*238x* </sup>`6,681 ms` |
| 11. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                  |       <sup>-29% </sup>`393.70 kB` |      <sup>-21% </sup>`103.81 kB` |    **<sup>🏆 </sup>`28 ms`** |
| 12. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>    |                                 ❌ |                               ❌  |                            - |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub> |                                 ❌ |                               ❌  |                            - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 193763
	bar [193763,122368,123258,123334,123346,124253,124609,124885,126454,126707,127653,144303,145178]
```

<div align="center">

| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.30.3](https://www.npmjs.com/package/terser/v/5.30.3) ([Source](https://unpkg.com/terser@5.30.3/dist/bundle.min.js)) |                         `1.01 MB` |                       `193.76 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                    |       <sup>-56% </sup>`440.19 kB` | **<sup>🏆-37% </sup>`122.37 kB`** |      <sup>*1x* </sup>`44 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                            |       <sup>-55% </sup>`455.52 kB` |       <sup>-36% </sup>`123.26 kB` |     <sup>*5x* </sup>`130 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                      |       <sup>-55% </sup>`451.19 kB` |       <sup>-36% </sup>`123.33 kB` | <sup>*162x* </sup>`3,787 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                            |       <sup>-55% </sup>`456.59 kB` |       <sup>-36% </sup>`123.35 kB` |  <sup>*95x* </sup>`2,227 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                              |       <sup>-53% </sup>`472.58 kB` |       <sup>-36% </sup>`124.25 kB` |    <sup>*41x* </sup>`966 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                        |       <sup>-53% </sup>`472.16 kB` |       <sup>-36% </sup>`124.61 kB` |    <sup>*33x* </sup>`778 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                         |       <sup>-55% </sup>`456.59 kB` |       <sup>-36% </sup>`124.89 kB` |      <sup>*1x* </sup>`35 ms` |
| 8. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                          | **<sup>🏆-56% </sup>`439.97 kB`** |       <sup>-35% </sup>`126.45 kB` | <sup>*262x* </sup>`6,113 ms` |
| 9. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                          |       <sup>-55% </sup>`458.89 kB` |       <sup>-35% </sup>`126.71 kB` |      <sup>*2x* </sup>`63 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                                 |       <sup>-54% </sup>`466.80 kB` |       <sup>-34% </sup>`127.65 kB` |      <sup>*1x* </sup>`42 ms` |
| 11. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                      |       <sup>-38% </sup>`625.93 kB` |       <sup>-26% </sup>`144.30 kB` |    **<sup>🏆 </sup>`23 ms`** |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                            |       <sup>-37% </sup>`633.71 kB` |       <sup>-25% </sup>`145.18 kB` |  <sup>*57x* </sup>`1,337 ms` |
| 13. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>        |                                 ❌ |                                ❌  |                            - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 248267
	bar [248267,158751,159071,159165,160827,162771,163036,163181,163723,164610,166210,191965,193471]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                                   |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-48% </sup>`643.03 kB` | **<sup>🏆-36% </sup>`158.75 kB`** |          <sup>*8x* </sup>`204 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-49% </sup>`641.59 kB`** |       <sup>-36% </sup>`159.07 kB` |      <sup>*209x* </sup>`5,046 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-48% </sup>`653.18 kB` |       <sup>-36% </sup>`159.17 kB` |      <sup>*124x* </sup>`2,985 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-48% </sup>`647.00 kB` |       <sup>-35% </sup>`160.83 kB` |           <sup>*2x* </sup>`63 ms` |
| 5. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                      |       <sup>-48% </sup>`644.52 kB` |       <sup>-34% </sup>`162.77 kB` |      <sup>*333x* </sup>`8,018 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |         <sup>*41x* </sup>`994 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-46% </sup>`675.43 kB` |       <sup>-34% </sup>`163.18 kB` |       <sup>*53x* </sup>`1,294 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.72 kB` |           <sup>*3x* </sup>`95 ms` |
| 9. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-48% </sup>`642.46 kB` |       <sup>-34% </sup>`164.61 kB` |           <sup>*2x* </sup>`49 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                             |       <sup>-47% </sup>`655.93 kB` |       <sup>-33% </sup>`166.21 kB` |           <sup>*2x* </sup>`55 ms` |
| 11. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                  |       <sup>-25% </sup>`941.06 kB` |       <sup>-23% </sup>`191.97 kB` |         **<sup>🏆 </sup>`24 ms`** |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                        |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |       <sup>*71x* </sup>`1,714 ms` |
| 13. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>            |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10]
	y-axis "Gzip size" 0 --> 309942
	bar [309942,157435,157754,158459,162351,165014,166176,167579,181071,182671,221118]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js))        |                         `2.13 MB` |                       `309.94 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                             | **<sup>🏆-67% </sup>`694.78 kB`** | **<sup>🏆-49% </sup>`157.44 kB`** |      <sup>*192x* </sup>`6,579 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   |       <sup>-67% </sup>`705.99 kB` |       <sup>-49% </sup>`157.75 kB` |          <sup>*8x* </sup>`307 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-67% </sup>`712.87 kB` |       <sup>-49% </sup>`158.46 kB` |      <sup>*118x* </sup>`4,042 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`717.56 kB` |       <sup>-48% </sup>`162.35 kB` |           <sup>*2x* </sup>`87 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`717.07 kB` |       <sup>-47% </sup>`165.01 kB` |           <sup>*1x* </sup>`57 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-65% </sup>`756.62 kB` |       <sup>-46% </sup>`166.18 kB` |       <sup>*45x* </sup>`1,573 ms` |
| 7. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |       <sup>*38x* </sup>`1,314 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |          <sup>*3x* </sup>`123 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`727.90 kB` |       <sup>-41% </sup>`182.67 kB` |           <sup>*2x* </sup>`77 ms` |
| 10. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                             |         <sup>-33% </sup>`1.43 MB` |       <sup>-29% </sup>`221.12 kB` |         **<sup>🏆 </sup>`34 ms`** |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>               |                                 ❌ |                                ❌  |                                 - |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>      |                                 ❌ |                                ❌  |                                 - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9]
	y-axis "Gzip size" 0 --> 684611
	bar [684611,321110,321556,324594,330348,331412,331563,331847,337934,434451]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js))           |                         `3.20 MB` |                       `684.61 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-69% </sup>`994.07 kB`** | **<sup>🏆-53% </sup>`321.11 kB`** |         <sup>*13x* </sup>`623 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-69% </sup>`998.45 kB` |       <sup>-53% </sup>`321.56 kB` |      <sup>*132x* </sup>`6,086 ms` |
| 3. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |         <sup>-69% </sup>`1.01 MB` |       <sup>-53% </sup>`324.59 kB` |          <sup>*3x* </sup>`168 ms` |
| 4. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.35 kB` |       <sup>*58x* </sup>`2,684 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |       <sup>*38x* </sup>`1,756 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |          <sup>*4x* </sup>`205 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.85 kB` |          <sup>*2x* </sup>`119 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |         <sup>-68% </sup>`1.02 MB` |       <sup>-51% </sup>`337.93 kB` |          <sup>*2x* </sup>`126 ms` |
| 9. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                              |         <sup>-45% </sup>`1.77 MB` |       <sup>-37% </sup>`434.45 kB` |         **<sup>🏆 </sup>`46 ms`** |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                       |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                             |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 13. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub>            |                                 ❌ |                                ❌  |                                 - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10]
	y-axis "Gzip size" 0 --> 825175
	bar [825175,452400,457352,460602,471791,474973,478572,488279,491833,623370,626675]
```

<div align="center">

| Artifact                                                                                                                              |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------: | --------------------------------: | --------------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js))                    |                       `6.67 MB` |                       `825.18 kB` |                                   |
| **Minifier**                                                                                                                          |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.40 kB`** |         <sup>*10x* </sup>`801 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-66% </sup>`2.24 MB` |       <sup>-45% </sup>`457.35 kB` |       <sup>*97x* </sup>`7,180 ms` |
| 3. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`2.25 MB` |       <sup>-44% </sup>`460.60 kB` |          <sup>*3x* </sup>`249 ms` |
| 4. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`2.29 MB` |       <sup>-43% </sup>`471.79 kB` |          <sup>*1x* </sup>`141 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`474.97 kB` |       <sup>*42x* </sup>`3,144 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |       <sup>*34x* </sup>`2,525 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |          <sup>*4x* </sup>`312 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.83 kB` |          <sup>*2x* </sup>`171 ms` |
| 9. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                              |       <sup>-34% </sup>`4.43 MB` |       <sup>-24% </sup>`623.37 kB` |         **<sup>🏆 </sup>`74 ms`** |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                                   |       <sup>-33% </sup>`4.45 MB` |       <sup>-24% </sup>`626.68 kB` |       <sup>*98x* </sup>`7,276 ms` |
| 11. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                       |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                             |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 13. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7]
	y-axis "Gzip size" 0 --> 1884998
	bar [1884998,859044,860693,875817,876535,878642,915551,1128072]
```

<div align="center">

| Artifact                                                                                                                               |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                                   |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                    | **<sup>🏆-70% </sup>`3.31 MB`** | **<sup>🏆-54% </sup>`859.04 kB`** |       <sup>*15x* </sup>`1,701 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                            |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`860.69 kB` |          <sup>*4x* </sup>`489 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                 |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`875.82 kB` |          <sup>*2x* </sup>`265 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |       <sup>*36x* </sup>`4,029 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`878.64 kB` |       <sup>*47x* </sup>`5,316 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                  |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.55 kB` |          <sup>*4x* </sup>`519 ms` |
| 7. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                               |       <sup>-47% </sup>`5.85 MB` |         <sup>-40% </sup>`1.13 MB` |        **<sup>🏆 </sup>`111 ms`** |
| 8. [terser](packages/minifiers/minifiers/terser.ts) <sub title="Failed: timeout">❌ Timed out</sub>                                     |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 9. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                         |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                              |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: timeout">❌ Timed out</sub>                     |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub>  |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 13. [bun](packages/minifiers/minifiers/bun.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>                            |                               ❌ |                                ❌  |                                 - |
</div>
<!-- benchmarks:end -->

## ⚔️ Minifier showdown

> [!NOTE]
> 🤖 This analysis is AI generated

<!-- analysis:start -->
The JavaScript minification showdown is over, and the results are in! With agile code crunchers and tight compression, the participants delivered an intense race. We're here to crown the champion, give shoutouts to honorable performances, and call out some faltering contenders. Buckle up!

### Best minifier
**@swc/core** takes the crown with remarkable consistency as an all-rounder champion. Why? It delivers highly competitive gzip compression (top-tier or near the best in each round) and an impressive speed advantage across practically every package tested. With results like turning a hefty 825.18 kB `antd` library into a lean 452.40 kB in just 801 ms, it's the minifier that balances small sizes and blistering speeds perfectly for the average developer.

### Honorable mentions
1. **oxc-minify** – While slightly behind @swc/core in compression, it's no slouch in speed, going head-to-head with @tdewolff/minify for the fastest runtime. For instance, it crushed `typescript` into just 860.69 kB in 489 ms, only a whisker away from @swc/core compression-wise.
2. **uglify-js** – The compression heavyweight! It dominated filesize in smaller-to-mid-range packages like `react`, `moment`, and `d3`, often achieving the absolute smallest gzipped output. However, what it gains in size, it loses in speed, taking upwards of 6,579 ms for `victory`. Ideal for developers prioritizing maximum compression over speed.
3. **@tdewolff/minify** – Blisteringly fast! With its lightning-quick processing times as low as 3 ms (e.g., `react` and `moment`), it's the go-to for anyone needing rapid minification. Surprisingly decent compression too, sitting just behind the leaders in most scenarios. 
4. **terser** – The reliable workhorse of the competition. While not a top performer in any singular metric, its strong gzip savings (especially in larger libraries) and balanced speed make it a steady, professional choice for well-rounded needs. 
5. **@cminify/cminify-linux-x64** – An oddball. This minifier blazed through runtimes with jaw-dropping speeds (as low as 12 ms for `react`), but its compression often lagged significantly behind others. For enormous files like `echarts` and `typescript`, it still managed respectable performance. Ideal for those who simply need a "quick and dirty" minification pass.

### Eliminated
- **babel-minify** – Crashed out with a "Cannot read properties" error during the `d3` package test. A promising contender grounded by reliability issues. Best avoided.
- **tedivm/jshrink** – Couldn’t parse through regex-heavy entries, crashing with "Unclosed regex pattern" errors. Its simplicity isn't suited for complex scripts. A hard no for production use.
- **bun** – Encountered validation errors, resulting in inaccurate output for the `typescript` package. Might deliver speed in other areas, but critical correctness issues make it unsuitable for minification tasks here.

### Quick outro
A big round of applause to all contenders for an epic battle of size and speed! If you're an average developer hunting for the ultimate minifier, @swc/core is your knight in shining armor with virtually no trade-offs. Need specific strengths like maximum compression, ultra-speed, or resource-efficient processing? Our honorable mentions have your back. Stay compressed and code on!
<!-- analysis:end -->

## Sponsors

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
