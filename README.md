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
| [oxc-minify](https://github.com/oxc-project/oxc.git)                                                        | [0.79.1](https://www.npmjs.com/package/oxc-minify/v/0.79.1)                          | 2025-07-31     |
| [google-closure-compiler](https://github.com/git+https://github.com/google/closure-compiler-npm.git#master) | [20250727.0.0](https://www.npmjs.com/package/google-closure-compiler/v/20250727.0.0) | 2025-07-29     |
| [@swc/core](https://github.com/swc-project/swc)                                                             | [1.13.3](https://www.npmjs.com/package/@swc/core/v/1.13.3)                           | 2025-07-29     |
| [@cminify/cminify-linux-x64](https://codeberg.org/Jumping-Beaver/cminify)                                   | [3.0.1](https://www.npmjs.com/package/@cminify/cminify-linux-x64/v/3.0.1)            | 2025-07-27     |
| [@tdewolff/minify](https://github.com/tdewolff/minify#readme)                                               | [2.23.10](https://www.npmjs.com/package/@tdewolff/minify/v/2.23.10)                  | 2025-07-22     |
| [esbuild](https://github.com/evanw/esbuild)                                                                 | [0.25.8](https://www.npmjs.com/package/esbuild/v/0.25.8)                             | 2025-07-19     |
| [bun](https://github.com/oven-sh/bun)                                                                       | [1.2.19](https://www.npmjs.com/package/bun/v/1.2.19)                                 | 2025-07-19     |
| [terser](https://github.com/terser/terser)                                                                  | [5.43.1](https://www.npmjs.com/package/terser/v/5.43.1)                              | 2025-06-19     |
| [uglify-js](https://github.com/mishoo/UglifyJS)                                                             | [3.19.3](https://www.npmjs.com/package/uglify-js/v/3.19.3)                           | 2024-08-29     |
| [babel-minify](https://github.com/babel/minify/tree/master/packages/babel-minify)                           | [0.5.2](https://www.npmjs.com/package/babel-minify/v/0.5.2)                          | 2022-05-06     |
| [tedivm/jshrink](https://github.com/tedious/JShrink)                                                        | 1.8.0                                                                                |                |
<!-- minifiers:end -->

_Benchmarks last updated on <!-- lastUpdated:start -->Aug 2, 2025<!-- lastUpdated:end -->._

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

### Ranking

For each benchmark, minifiers are ranked by a score that reflects the best balance of trade-offs.

The score combines minzipped size and minification time, with size weighted more heavily by default (85% size, 15% time) since it's usually the top priority. If a minifier is unusually slow, the weights shift toward time using a [logistic sigmoid function](https://en.wikipedia.org/wiki/Sigmoid_function), up to a 50/50 split. This avoids harsh cutoffs while still penalizing extreme slowness.

Both size and time are scaled using [min-max normalization](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_%28min–max_normalization%29) so they can be compared fairly. The result is a context-aware score that helps surface the best overall choice—but make sure to check each column directly if size or speed matters more to you.


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
	bar [19385,8186,8255,8177,8487,8543,8739,8668,8628,8661,8448,8216,11040,10858]
```

<div align="center">

| Artifact                                                                                                                          |                    Original size |                       Gzip size |                               |
| :-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ----------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js)) |                       `72.13 kB` |                      `19.39 kB` |                               |
| **Minifier**                                                                                                                      |                **Minified size** |              **Minzipped size** |                      **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                               |       <sup>-68% </sup>`22.81 kB` |       <sup>-58% </sup>`8.19 kB` |       <sup>*4x* </sup>`12 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                               |       <sup>-68% </sup>`23.05 kB` |       <sup>-57% </sup>`8.26 kB` |    <sup>*105x* </sup>`275 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                         | **<sup>🏆-69% </sup>`22.64 kB`** | **<sup>🏆-58% </sup>`8.18 kB`** |    <sup>*191x* </sup>`497 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                       |       <sup>-67% </sup>`23.51 kB` |       <sup>-56% </sup>`8.49 kB` |        <sup>*1x* </sup>`3 ms` |
| 5. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                             |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |       <sup>*5x* </sup>`14 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                 |       <sup>-65% </sup>`25.06 kB` |       <sup>-55% </sup>`8.74 kB` |     <sup>*45x* </sup>`118 ms` |
| 7. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                           |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |      <sup>*35x* </sup>`91 ms` |
| 8. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                            |       <sup>-67% </sup>`23.49 kB` |       <sup>-55% </sup>`8.63 kB` |      **<sup>🏆 </sup>`3 ms`** |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                                     |       <sup>-67% </sup>`23.99 kB` |       <sup>-55% </sup>`8.66 kB` |       <sup>*5x* </sup>`13 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                                  |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |    <sup>*249x* </sup>`647 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                            |       <sup>-68% </sup>`22.84 kB` |       <sup>-58% </sup>`8.22 kB` | <sup>*1248x* </sup>`3,239 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                               |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |     <sup>*48x* </sup>`126 ms` |
| 13. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                         |       <sup>-44% </sup>`40.04 kB` |      <sup>-44% </sup>`10.86 kB` |       <sup>*4x* </sup>`12 ms` |
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
	bar [36231,18747,19260,19333,18689,19478,19651,19569,18568,19857,19119,18923,24998,24744]
```

<div align="center">

| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                   |       <sup>-66% </sup>`58.42 kB` |       <sup>-48% </sup>`18.75 kB` |      <sup>*4x* </sup>`30 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                           |       <sup>-66% </sup>`59.51 kB` |       <sup>-47% </sup>`19.26 kB` |       <sup>*1x* </sup>`9 ms` |
| 3. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                 |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |      <sup>*3x* </sup>`22 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                   |       <sup>-66% </sup>`59.01 kB` |       <sup>-48% </sup>`18.69 kB` |   <sup>*113x* </sup>`693 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                |       <sup>-66% </sup>`59.87 kB` |       <sup>-46% </sup>`19.48 kB` |     **<sup>🏆 </sup>`6 ms`** |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                     |       <sup>-64% </sup>`63.01 kB` |       <sup>-46% </sup>`19.65 kB` |    <sup>*47x* </sup>`289 ms` |
| 7. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                               |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |    <sup>*35x* </sup>`215 ms` |
| 8. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                             | **<sup>🏆-67% </sup>`57.73 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** | <sup>*188x* </sup>`1,149 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                         |       <sup>-64% </sup>`61.84 kB` |       <sup>-45% </sup>`19.86 kB` |      <sup>*2x* </sup>`17 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                      |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` | <sup>*240x* </sup>`1,465 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                |       <sup>-66% </sup>`58.29 kB` |       <sup>-48% </sup>`18.92 kB` | <sup>*602x* </sup>`3,670 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                   |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |    <sup>*46x* </sup>`284 ms` |
| 13. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                             |       <sup>-45% </sup>`95.93 kB` |       <sup>-32% </sup>`24.74 kB` |      <sup>*1x* </sup>`10 ms` |
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
	bar [84498,30866,30966,31446,31470,31555,31954,30856,32653,30903,31799,40879,33092,40365]
```

<div align="center">

| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                     |       <sup>-69% </sup>`89.17 kB` |       <sup>-63% </sup>`30.87 kB` |      <sup>*5x* </sup>`47 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                             |       <sup>-69% </sup>`89.34 kB` |       <sup>-63% </sup>`30.97 kB` |      <sup>*1x* </sup>`15 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-69% </sup>`89.68 kB` |       <sup>-63% </sup>`31.45 kB` |     **<sup>🏆 </sup>`8 ms`** |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                 |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*39x* </sup>`314 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                       |       <sup>-67% </sup>`94.26 kB` |       <sup>-63% </sup>`31.56 kB` |    <sup>*46x* </sup>`373 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                   |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |      <sup>*4x* </sup>`36 ms` |
| 7. [terser](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-69% </sup>`89.24 kB` | **<sup>🏆-63% </sup>`30.86 kB`** |   <sup>*116x* </sup>`921 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                           |       <sup>-68% </sup>`92.55 kB` |       <sup>-61% </sup>`32.65 kB` |      <sup>*3x* </sup>`28 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                               | **<sup>🏆-69% </sup>`88.45 kB`** |       <sup>-63% </sup>`30.90 kB` | <sup>*200x* </sup>`1,593 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                        |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*302x* </sup>`2,398 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                     |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*45x* </sup>`361 ms` |
| 12. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                  |       <sup>-68% </sup>`92.73 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*510x* </sup>`4,044 ms` |
| 13. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                               |      <sup>-51% </sup>`141.45 kB` |       <sup>-52% </sup>`40.37 kB` |      <sup>*2x* </sup>`22 ms` |
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
	bar [89668,42730,43348,44358,44368,44450,44636,42870,45400,43036,43925,44184,57169,56356]
```

<div align="center">

| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                            |       <sup>-66% </sup>`115.69 kB` | **<sup>🏆-52% </sup>`42.73 kB`** |      <sup>*5x* </sup>`65 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                    |       <sup>-66% </sup>`117.22 kB` |       <sup>-52% </sup>`43.35 kB` |      <sup>*1x* </sup>`18 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                         |       <sup>-66% </sup>`117.69 kB` |       <sup>-51% </sup>`44.36 kB` |    **<sup>🏆 </sup>`12 ms`** |
| 4. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                          |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |      <sup>*3x* </sup>`42 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                        |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*29x* </sup>`364 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                              |       <sup>-63% </sup>`126.39 kB` |       <sup>-50% </sup>`44.64 kB` |    <sup>*35x* </sup>`442 ms` |
| 7. [terser](packages/minifiers/minifiers/terser.ts)                                                            |       <sup>-66% </sup>`116.60 kB` |       <sup>-52% </sup>`42.87 kB` |  <sup>*92x* </sup>`1,143 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                  |       <sup>-64% </sup>`121.50 kB` |       <sup>-49% </sup>`45.40 kB` |      <sup>*2x* </sup>`29 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                      | **<sup>🏆-67% </sup>`113.80 kB`** |       <sup>-52% </sup>`43.04 kB` | <sup>*178x* </sup>`2,206 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                               |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*218x* </sup>`2,696 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                         |       <sup>-66% </sup>`115.61 kB` |       <sup>-51% </sup>`44.18 kB` | <sup>*360x* </sup>`4,450 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                            |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*38x* </sup>`478 ms` |
| 13. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                      |       <sup>-43% </sup>`193.91 kB` |       <sup>-37% </sup>`56.36 kB` |      <sup>*1x* </sup>`23 ms` |
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
	bar [96690,25240,25862,25979,26200,26187,26498,26655,25152,24686,25503,25022,36327,35944]
```

<div align="center">

| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                      |       <sup>-87% </sup>`69.81 kB` |       <sup>-74% </sup>`25.24 kB` |      <sup>*4x* </sup>`53 ms` |
| 2. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                  |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*26x* </sup>`333 ms` |
| 3. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                              |       <sup>-87% </sup>`71.38 kB` |       <sup>-73% </sup>`25.98 kB` |      <sup>*1x* </sup>`14 ms` |
| 4. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                    |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`35 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                        |       <sup>-86% </sup>`75.04 kB` |       <sup>-73% </sup>`26.19 kB` |    <sup>*31x* </sup>`393 ms` |
| 6. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                   |       <sup>-87% </sup>`71.90 kB` |       <sup>-73% </sup>`26.50 kB` |    **<sup>🏆 </sup>`13 ms`** |
| 7. [bun](packages/minifiers/minifiers/bun.ts)                                                                            |       <sup>-87% </sup>`73.45 kB` |       <sup>-72% </sup>`26.66 kB` |      <sup>*1x* </sup>`23 ms` |
| 8. [terser](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-87% </sup>`70.41 kB` |       <sup>-74% </sup>`25.15 kB` |  <sup>*81x* </sup>`1,028 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                | **<sup>🏆-87% </sup>`68.17 kB`** | **<sup>🏆-74% </sup>`24.69 kB`** | <sup>*134x* </sup>`1,689 ms` |
| 10. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                         |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*165x* </sup>`2,083 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                   |       <sup>-86% </sup>`73.50 kB` |       <sup>-74% </sup>`25.02 kB` | <sup>*322x* </sup>`4,050 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                      |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*29x* </sup>`371 ms` |
| 13. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                |      <sup>-73% </sup>`146.27 kB` |       <sup>-63% </sup>`35.94 kB` |      <sup>*1x* </sup>`13 ms` |
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
	bar [130686,87205,88140,88319,89069,89882,90800,87997,92395,87016,94166,103813]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js))                    |                       `555.77 kB` |                      `130.69 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-52% </sup>`265.22 kB` |       <sup>-33% </sup>`87.21 kB` |     <sup>*5x* </sup>`144 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-51% </sup>`270.88 kB` |       <sup>-33% </sup>`88.14 kB` |      <sup>*1x* </sup>`43 ms` |
| 3. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*25x* </sup>`711 ms` |
| 4. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-50% </sup>`276.13 kB` |       <sup>-32% </sup>`89.07 kB` |  <sup>*36x* </sup>`1,020 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-52% </sup>`269.35 kB` |       <sup>-31% </sup>`89.88 kB` |      <sup>*1x* </sup>`33 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |      <sup>*2x* </sup>`69 ms` |
| 7. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-52% </sup>`267.42 kB` |       <sup>-33% </sup>`88.00 kB` |  <sup>*83x* </sup>`2,338 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-51% </sup>`273.41 kB` |       <sup>-29% </sup>`92.40 kB` |      <sup>*1x* </sup>`47 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-53% </sup>`263.56 kB`** | **<sup>🏆-33% </sup>`87.02 kB`** | <sup>*140x* </sup>`3,927 ms` |
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
	bar [193763,122262,123258,124885,124609,124253,126707,127653,123346,123334,126454,145178,144303]
```

<div align="center">

| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.30.3](https://www.npmjs.com/package/terser/v/5.30.3) ([Source](https://unpkg.com/terser@5.30.3/dist/bundle.min.js)) |                         `1.01 MB` |                       `193.76 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                    |       <sup>-56% </sup>`440.04 kB` | **<sup>🏆-37% </sup>`122.26 kB`** |      <sup>*1x* </sup>`44 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                            |       <sup>-55% </sup>`455.52 kB` |       <sup>-36% </sup>`123.26 kB` |     <sup>*5x* </sup>`130 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                         |       <sup>-55% </sup>`456.59 kB` |       <sup>-36% </sup>`124.89 kB` |      <sup>*1x* </sup>`35 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                        |       <sup>-53% </sup>`472.16 kB` |       <sup>-36% </sup>`124.61 kB` |    <sup>*33x* </sup>`778 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                              |       <sup>-53% </sup>`472.58 kB` |       <sup>-36% </sup>`124.25 kB` |    <sup>*41x* </sup>`966 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                          |       <sup>-55% </sup>`458.89 kB` |       <sup>-35% </sup>`126.71 kB` |      <sup>*2x* </sup>`63 ms` |
| 7. [bun](packages/minifiers/minifiers/bun.ts)                                                                                  |       <sup>-54% </sup>`466.80 kB` |       <sup>-34% </sup>`127.65 kB` |      <sup>*1x* </sup>`42 ms` |
| 8. [terser](packages/minifiers/minifiers/terser.ts)                                                                            |       <sup>-55% </sup>`456.59 kB` |       <sup>-36% </sup>`123.35 kB` |  <sup>*95x* </sup>`2,227 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                      |       <sup>-55% </sup>`451.19 kB` |       <sup>-36% </sup>`123.33 kB` | <sup>*162x* </sup>`3,787 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                         | **<sup>🏆-56% </sup>`439.97 kB`** |       <sup>-35% </sup>`126.45 kB` | <sup>*262x* </sup>`6,113 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                            |       <sup>-37% </sup>`633.71 kB` |       <sup>-25% </sup>`145.18 kB` |  <sup>*57x* </sup>`1,337 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                      |       <sup>-38% </sup>`625.93 kB` |       <sup>-26% </sup>`144.30 kB` |    **<sup>🏆 </sup>`23 ms`** |
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
	bar [248267,158751,160827,163036,163723,163181,164610,166210,159165,159071,162771,193471,191965]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                                   |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-48% </sup>`643.03 kB` | **<sup>🏆-36% </sup>`158.75 kB`** |          <sup>*8x* </sup>`204 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-48% </sup>`647.00 kB` |       <sup>-35% </sup>`160.83 kB` |           <sup>*2x* </sup>`62 ms` |
| 3. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |         <sup>*41x* </sup>`994 ms` |
| 4. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.72 kB` |           <sup>*3x* </sup>`95 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-46% </sup>`675.43 kB` |       <sup>-34% </sup>`163.18 kB` |       <sup>*53x* </sup>`1,294 ms` |
| 6. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-48% </sup>`642.46 kB` |       <sup>-34% </sup>`164.61 kB` |           <sup>*2x* </sup>`49 ms` |
| 7. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-47% </sup>`655.93 kB` |       <sup>-33% </sup>`166.21 kB` |           <sup>*2x* </sup>`55 ms` |
| 8. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-48% </sup>`653.18 kB` |       <sup>-36% </sup>`159.17 kB` |      <sup>*124x* </sup>`2,985 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-49% </sup>`641.59 kB`** |       <sup>-36% </sup>`159.07 kB` |      <sup>*209x* </sup>`5,046 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                     |       <sup>-48% </sup>`644.52 kB` |       <sup>-34% </sup>`162.77 kB` |      <sup>*333x* </sup>`8,018 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                        |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |       <sup>*71x* </sup>`1,714 ms` |
| 12. [@cminify/cminify-linux-x64](packages/minifiers/minifiers/cminify.ts)                                                  |       <sup>-25% </sup>`941.06 kB` |       <sup>-23% </sup>`191.97 kB` |         **<sup>🏆 </sup>`24 ms`** |
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
	bar [309942,157754,162349,165014,167579,166176,158459,181071,182671,157435,221118]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js))        |                         `2.13 MB` |                       `309.94 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   |       <sup>-67% </sup>`705.99 kB` |       <sup>-49% </sup>`157.75 kB` |          <sup>*8x* </sup>`307 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`717.55 kB` |       <sup>-48% </sup>`162.35 kB` |           <sup>*2x* </sup>`90 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`717.07 kB` |       <sup>-47% </sup>`165.01 kB` |           <sup>*1x* </sup>`57 ms` |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |       <sup>*38x* </sup>`1,314 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-65% </sup>`756.62 kB` |       <sup>-46% </sup>`166.18 kB` |       <sup>*45x* </sup>`1,573 ms` |
| 6. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-67% </sup>`712.87 kB` |       <sup>-49% </sup>`158.46 kB` |      <sup>*118x* </sup>`4,042 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |          <sup>*3x* </sup>`123 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`727.90 kB` |       <sup>-41% </sup>`182.67 kB` |           <sup>*2x* </sup>`77 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                             | **<sup>🏆-67% </sup>`694.78 kB`** | **<sup>🏆-49% </sup>`157.44 kB`** |      <sup>*192x* </sup>`6,579 ms` |
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
	bar [684611,324594,321110,331563,331847,337934,331412,330348,321556,434451]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js))           |                         `3.20 MB` |                       `684.61 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |         <sup>-69% </sup>`1.01 MB` |       <sup>-53% </sup>`324.59 kB` |          <sup>*3x* </sup>`179 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-69% </sup>`994.07 kB`** | **<sup>🏆-53% </sup>`321.11 kB`** |         <sup>*13x* </sup>`623 ms` |
| 3. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |          <sup>*4x* </sup>`205 ms` |
| 4. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.85 kB` |          <sup>*2x* </sup>`119 ms` |
| 5. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |         <sup>-68% </sup>`1.02 MB` |       <sup>-51% </sup>`337.93 kB` |          <sup>*2x* </sup>`126 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |       <sup>*38x* </sup>`1,756 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`330.35 kB` |       <sup>*58x* </sup>`2,684 ms` |
| 8. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-69% </sup>`998.45 kB` |       <sup>-53% </sup>`321.56 kB` |      <sup>*132x* </sup>`6,086 ms` |
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
	bar [825175,460597,452400,471791,488279,491833,478572,474973,457352,623370,626675]
```

<div align="center">

| Artifact                                                                                                                              |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------: | --------------------------------: | --------------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js))                    |                       `6.67 MB` |                       `825.18 kB` |                                   |
| **Minifier**                                                                                                                          |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`2.25 MB` |       <sup>-44% </sup>`460.60 kB` |          <sup>*3x* </sup>`250 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.40 kB`** |         <sup>*10x* </sup>`801 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`2.29 MB` |       <sup>-43% </sup>`471.79 kB` |          <sup>*1x* </sup>`141 ms` |
| 4. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |          <sup>*4x* </sup>`312 ms` |
| 5. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.83 kB` |          <sup>*2x* </sup>`171 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |       <sup>*34x* </sup>`2,525 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`474.97 kB` |       <sup>*42x* </sup>`3,144 ms` |
| 8. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-66% </sup>`2.24 MB` |       <sup>-45% </sup>`457.35 kB` |       <sup>*97x* </sup>`7,180 ms` |
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
	bar [1884998,860693,875817,859044,915551,876535,878642,1128072]
```

<div align="center">

| Artifact                                                                                                                               |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                                   |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                            |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`860.69 kB` |          <sup>*4x* </sup>`487 ms` |
| 2. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                 |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`875.82 kB` |          <sup>*2x* </sup>`265 ms` |
| 3. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                    | **<sup>🏆-70% </sup>`3.31 MB`** | **<sup>🏆-54% </sup>`859.04 kB`** |       <sup>*15x* </sup>`1,701 ms` |
| 4. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                  |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.55 kB` |          <sup>*4x* </sup>`519 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |       <sup>*36x* </sup>`4,029 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`878.64 kB` |       <sup>*47x* </sup>`5,316 ms` |
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
The competitive world of JavaScript minifiers has never been fiercer. It’s not just about shaving kilobytes anymore; it’s about how fast you do it, how gracefully you dance between raw speed and compression perfection, and, sometimes, simply not crashing under pressure. Let’s dive into the results, where some contenders raced ahead, some stumbled, and one walked away wearing the crown.

### Best minifier
The undisputed champion this year is **@swc/core**. From the smallest of libraries to massive, code-heavy projects, this minifier balanced its performance like a veteran gymnast. It rarely claimed the top speed but delivered compression that was consistently top-tier—or very close—with a speed that left most challengers lagging.

Take the heavyweight match with "antd," a whopping 825 kB beast: @swc/core delivered 452.40 kB (a significant 45% reduction) in just 801 ms. Compare that to the compression-first heavyweight **uglify-js**, which might crawl to a similar result over 6,500 ms. Or look at how @swc/core tackled the colossal "typescript," compressing it to 859.04 kB (54% reduction) in 1,701 ms—a clear display of resilience and excellence on the hardest stages.

What crowns @swc/core as the overall best isn’t just its consistency, though. It’s the rare versatility to adapt across all library sizes—powerful compression for the big boys, blinding speed for tighter scripts, and out-of-the-box reliability. It may not always be the number one sprinter or the muscle of the pack, but it excels where it counts most: in the balance.

### Honorable mentions
While @swc/core stole the spotlight, there are plenty of reasons to cheer for its competition:

- **Uglify-js**, the titan of byte-purging brutality, still rules with an iron fist in pure compression. No tool struck deeper cuts in files like "lodash" (74% reduction in 1,689 ms) or "victory" (49% slashed in 6,579 ms). But, let’s face it—the cost of such precision is abysmal speed. Think of it as the meticulous artisan in an assembly line world.

- **@tdewolff/minify** made your CI pipeline’s dreams come true, ripping through files like lightning. "React" in 3 milliseconds. "Moment" in 6 milliseconds. Even the hulking "three" was reduced in just 8 milliseconds. It’s not quite the best at compression, but when you need *fast and good enough* (and you often will), @tdewolff/minify is your weapon of choice.

- **Oxc-minify**, a rising star, snuck quietly into the "most balanced" category across multiple challenges. From "echarts" (53% slashed in 179 ms) to "typescript" (54% reduced in 487 ms), it showed it’s a reliable middle-ground tool. And yet, it could flex a strong compression win too—leading "terser" (37% shaved in 44 ms) with incredible precision.

- **@cminify/cminify-linux-x64** secured the "fastest" crown in the later rounds by an outrageous margin. Hammering through "d3" and "typescript" in just 28 ms and 111 ms respectively, it’s a productivity freak—but beware, its compression ratios tap out early (23–40% range in key rounds). Small projects? Consider it. Big optimization budgets? Look elsewhere.

### Eliminated
Not everyone made it through the gauntlet. Let’s take a moment for those who fell behind:

- **babel-minify** threw in the towel on "d3," raising a cryptic error when it encountered undefined properties. A solid veteran in past competitions, but clearly showing wear from its age.

- **tedivm/jshrink**, valiant but tragically flawed, keeled over when regex complexity reared its head during "d3." Precision in the details matters—it stumbled in the unforgiving world of JavaScript edge cases.

- **bun**, a promising debutant, spoiled its reputation in post-validation. Mismanaging line endings on "typescript" isn’t a fatal stumble, but in a race this competitive, even a small misstep can cost you everything.

### Closing remarks
What a race. Minifiers showed us speed, showed us size, and showed us what happens under real-world pressure. But while benchmarks tell us who’s the fastest and most efficient, they don’t tell the whole story. Developer experience, compatibility, and ecosystem maturity still matter.

So, if you’re choosing a minifier for your next project, don’t just pick the raw champion—pick the tool that fits your workflow. But if you’re looking for the one minifier to rule them all, @swc/core proved it’s ready. Explore, experiment, and remember: in the race for smaller code, every byte counts.
<!-- analysis:end -->

## Sponsors

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
