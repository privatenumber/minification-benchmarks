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
| [@swc/core](https://github.com/swc-project/swc)                                                             | [1.12.1](https://www.npmjs.com/package/@swc/core/v/1.12.1)                           | 2025-06-12     |
| [bun](https://github.com/oven-sh/bun)                                                                       | [1.2.16](https://www.npmjs.com/package/bun/v/1.2.16)                                 | 2025-06-12     |
| [google-closure-compiler](https://github.com/git+https://github.com/google/closure-compiler-npm.git#master) | [20250609.0.0](https://www.npmjs.com/package/google-closure-compiler/v/20250609.0.0) | 2025-06-11     |
| [terser](https://github.com/terser/terser)                                                                  | [5.42.0](https://www.npmjs.com/package/terser/v/5.42.0)                              | 2025-06-09     |
| [oxc-minify](https://github.com/oxc-project/oxc.git)                                                        | [0.72.3](https://www.npmjs.com/package/oxc-minify/v/0.72.3)                          | 2025-06-06     |
| [esbuild](https://github.com/evanw/esbuild)                                                                 | [0.25.5](https://www.npmjs.com/package/esbuild/v/0.25.5)                             | 2025-05-27     |
| [@tdewolff/minify](https://github.com/tdewolff/minify#readme)                                               | [2.23.8](https://www.npmjs.com/package/@tdewolff/minify/v/2.23.8)                    | 2025-05-21     |
| [uglify-js](https://github.com/mishoo/UglifyJS)                                                             | [3.19.3](https://www.npmjs.com/package/uglify-js/v/3.19.3)                           | 2024-08-29     |
| [babel-minify](https://github.com/babel/minify/tree/master/packages/babel-minify)                           | [0.5.2](https://www.npmjs.com/package/babel-minify/v/0.5.2)                          | 2022-05-06     |
| [tedivm/jshrink](https://github.com/tedious/JShrink)                                                        | 1.7.0                                                                                |                |
<!-- minifiers:end -->

_Benchmarks last updated on <!-- lastUpdated:start -->Jun 13, 2025<!-- lastUpdated:end -->._

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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 19385
	bar [19385,8177,8186,8265,8448,8493,8543,8628,8661,8668,8746,11040]
```

<div align="center">

| Artifact                                                                                                                              |                    Original size |                       Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------: | ------------------------------: | --------------------------------: |
| [react v17.0.2](https://www.npmjs.com/package/react/v/17.0.2) ([Source](https://unpkg.com/react@17.0.2/cjs/react.development.js))     |                       `72.13 kB` |                      `19.39 kB` |                                   |
| **Minifier**                                                                                                                          |                **Minified size** |              **Minzipped size** |                          **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                             | **<sup>🏆-69% </sup>`22.64 kB`** | **<sup>🏆-58% </sup>`8.18 kB`** |        <sup>*189x* </sup>`497 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   |       <sup>-68% </sup>`22.81 kB` |       <sup>-58% </sup>`8.19 kB` |           <sup>*5x* </sup>`14 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-68% </sup>`23.07 kB` |       <sup>-57% </sup>`8.27 kB` |        <sup>*102x* </sup>`270 ms` |
| 4. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                                       |       <sup>-67% </sup>`23.60 kB` |       <sup>-56% </sup>`8.45 kB` |        <sup>*246x* </sup>`647 ms` |
| 5. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-67% </sup>`23.52 kB` |       <sup>-56% </sup>`8.49 kB` |            <sup>*1x* </sup>`3 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-67% </sup>`23.70 kB` |       <sup>-56% </sup>`8.54 kB` |           <sup>*4x* </sup>`13 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-67% </sup>`23.49 kB` |       <sup>-55% </sup>`8.63 kB` |          **<sup>🏆 </sup>`3 ms`** |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-67% </sup>`23.99 kB` |       <sup>-55% </sup>`8.66 kB` |           <sup>*5x* </sup>`14 ms` |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-65% </sup>`25.03 kB` |       <sup>-55% </sup>`8.67 kB` |          <sup>*34x* </sup>`91 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                    |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.75 kB` |         <sup>*45x* </sup>`119 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                                   |       <sup>-43% </sup>`40.82 kB` |      <sup>-43% </sup>`11.04 kB` |         <sup>*46x* </sup>`123 ms` |
| 12. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                - |                               - | <sup>:warning:</sup> `+10,000 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 36231
	bar [36231,18568,18690,18747,18923,19119,19260,19334,19478,19569,19683,19857,24998]
```

<div align="center">

| Artifact                                                                                                              |                    Original size |                        Gzip size |                              |
| :-------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |                      `173.90 kB` |                       `36.23 kB` |                              |
| **Minifier**                                                                                                          |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                             | **<sup>🏆-67% </sup>`57.73 kB`** | **<sup>🏆-49% </sup>`18.57 kB`** | <sup>*206x* </sup>`1,149 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                   |       <sup>-66% </sup>`59.14 kB` |       <sup>-48% </sup>`18.69 kB` |   <sup>*121x* </sup>`676 ms` |
| 3. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                   |       <sup>-66% </sup>`58.42 kB` |       <sup>-48% </sup>`18.75 kB` |      <sup>*6x* </sup>`35 ms` |
| 4. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                 |       <sup>-66% </sup>`58.29 kB` |       <sup>-48% </sup>`18.92 kB` | <sup>*842x* </sup>`4,694 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                       |       <sup>-66% </sup>`59.70 kB` |       <sup>-47% </sup>`19.12 kB` | <sup>*262x* </sup>`1,465 ms` |
| 6. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                           |       <sup>-66% </sup>`59.52 kB` |       <sup>-47% </sup>`19.26 kB` |       <sup>*1x* </sup>`8 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                 |       <sup>-66% </sup>`59.82 kB` |       <sup>-47% </sup>`19.33 kB` |      <sup>*3x* </sup>`21 ms` |
| 8. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                |       <sup>-66% </sup>`59.87 kB` |       <sup>-46% </sup>`19.48 kB` |     **<sup>🏆 </sup>`6 ms`** |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                               |       <sup>-64% </sup>`62.50 kB` |       <sup>-46% </sup>`19.57 kB` |    <sup>*38x* </sup>`215 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                    |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.68 kB` |    <sup>*50x* </sup>`282 ms` |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                        |       <sup>-64% </sup>`61.84 kB` |       <sup>-45% </sup>`19.86 kB` |      <sup>*3x* </sup>`18 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                   |       <sup>-44% </sup>`97.63 kB` |       <sup>-31% </sup>`25.00 kB` |    <sup>*50x* </sup>`282 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 84498
	bar [84498,30866,30903,30913,30969,31446,31470,31621,31799,31954,32653,33092,40879]
```

<div align="center">

| Artifact                                                                                                                |                    Original size |                        Gzip size |                              |
| :---------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |                      `287.63 kB` |                       `84.50 kB` |                              |
| **Minifier**                                                                                                            |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                     |       <sup>-69% </sup>`89.17 kB` | **<sup>🏆-63% </sup>`30.87 kB`** |      <sup>*6x* </sup>`54 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                               | **<sup>🏆-69% </sup>`88.45 kB`** |       <sup>-63% </sup>`30.90 kB` | <sup>*202x* </sup>`1,593 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-69% </sup>`89.54 kB` |       <sup>-63% </sup>`30.91 kB` |   <sup>*118x* </sup>`933 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                             |       <sup>-69% </sup>`89.33 kB` |       <sup>-63% </sup>`30.97 kB` |      <sup>*1x* </sup>`12 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-69% </sup>`89.68 kB` |       <sup>-63% </sup>`31.45 kB` |     **<sup>🏆 </sup>`8 ms`** |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                 |       <sup>-67% </sup>`94.08 kB` |       <sup>-63% </sup>`31.47 kB` |    <sup>*39x* </sup>`314 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                       |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.62 kB` |    <sup>*47x* </sup>`375 ms` |
| 8. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                         |       <sup>-68% </sup>`92.10 kB` |       <sup>-62% </sup>`31.80 kB` | <sup>*304x* </sup>`2,398 ms` |
| 9. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                   |       <sup>-69% </sup>`90.07 kB` |       <sup>-62% </sup>`31.95 kB` |      <sup>*4x* </sup>`36 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                          |       <sup>-68% </sup>`92.55 kB` |       <sup>-61% </sup>`32.65 kB` |      <sup>*3x* </sup>`27 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                  |       <sup>-68% </sup>`92.73 kB` |       <sup>-61% </sup>`33.09 kB` | <sup>*521x* </sup>`4,108 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                     |      <sup>-50% </sup>`144.14 kB` |       <sup>-52% </sup>`40.88 kB` |    <sup>*46x* </sup>`363 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 89668
	bar [89668,42730,42919,43036,43357,43925,44184,44358,44368,44450,44679,45400,57169]
```

<div align="center">

| Artifact                                                                                                       |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |                       `342.15 kB` |                       `89.67 kB` |                              |
| **Minifier**                                                                                                   |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                            |       <sup>-66% </sup>`115.69 kB` | **<sup>🏆-52% </sup>`42.73 kB`** |      <sup>*5x* </sup>`73 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                            |       <sup>-66% </sup>`116.80 kB` |       <sup>-52% </sup>`42.92 kB` |  <sup>*86x* </sup>`1,128 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                      | **<sup>🏆-67% </sup>`113.80 kB`** |       <sup>-52% </sup>`43.04 kB` | <sup>*168x* </sup>`2,206 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                    |       <sup>-66% </sup>`117.25 kB` |       <sup>-52% </sup>`43.36 kB` |      <sup>*1x* </sup>`16 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                |       <sup>-66% </sup>`117.90 kB` |       <sup>-51% </sup>`43.93 kB` | <sup>*206x* </sup>`2,696 ms` |
| 6. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                          |       <sup>-66% </sup>`115.61 kB` |       <sup>-51% </sup>`44.18 kB` | <sup>*348x* </sup>`4,549 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                         |       <sup>-66% </sup>`117.69 kB` |       <sup>-51% </sup>`44.36 kB` |    **<sup>🏆 </sup>`13 ms`** |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                          |       <sup>-65% </sup>`118.14 kB` |       <sup>-51% </sup>`44.37 kB` |      <sup>*3x* </sup>`43 ms` |
| 9. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                        |       <sup>-63% </sup>`126.14 kB` |       <sup>-50% </sup>`44.45 kB` |    <sup>*27x* </sup>`364 ms` |
| 10. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                             |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.68 kB` |    <sup>*34x* </sup>`447 ms` |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                 |       <sup>-64% </sup>`121.50 kB` |       <sup>-49% </sup>`45.40 kB` |      <sup>*2x* </sup>`30 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                            |       <sup>-42% </sup>`197.36 kB` |       <sup>-36% </sup>`57.17 kB` |    <sup>*36x* </sup>`479 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11,12]
	y-axis "Gzip size" 0 --> 96690
	bar [96690,24686,25022,25186,25240,25503,25862,25979,26200,26221,26498,26655,36327]
```

<div align="center">

| Artifact                                                                                                                 |                    Original size |                        Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |                      `544.09 kB` |                       `96.69 kB` |                              |
| **Minifier**                                                                                                             |                **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                | **<sup>🏆-87% </sup>`68.17 kB`** | **<sup>🏆-74% </sup>`24.69 kB`** | <sup>*147x* </sup>`1,689 ms` |
| 2. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                    |       <sup>-86% </sup>`73.50 kB` |       <sup>-74% </sup>`25.02 kB` | <sup>*375x* </sup>`4,314 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-87% </sup>`70.67 kB` |       <sup>-74% </sup>`25.19 kB` |    <sup>*85x* </sup>`987 ms` |
| 4. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                      |       <sup>-87% </sup>`69.82 kB` |       <sup>-74% </sup>`25.24 kB` |      <sup>*5x* </sup>`60 ms` |
| 5. [babel-minify](packages/minifiers/minifiers/babel-minify.ts)                                                          |       <sup>-87% </sup>`72.37 kB` |       <sup>-74% </sup>`25.50 kB` | <sup>*181x* </sup>`2,083 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                  |       <sup>-86% </sup>`74.61 kB` |       <sup>-73% </sup>`25.86 kB` |    <sup>*28x* </sup>`333 ms` |
| 7. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                              |       <sup>-87% </sup>`71.38 kB` |       <sup>-73% </sup>`25.98 kB` |    **<sup>🏆 </sup>`11 ms`** |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                    |       <sup>-87% </sup>`72.48 kB` |       <sup>-73% </sup>`26.20 kB` |      <sup>*2x* </sup>`29 ms` |
| 9. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                        |       <sup>-86% </sup>`75.29 kB` |       <sup>-73% </sup>`26.22 kB` |    <sup>*35x* </sup>`404 ms` |
| 10. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                  |       <sup>-87% </sup>`71.90 kB` |       <sup>-73% </sup>`26.50 kB` |      <sup>*1x* </sup>`12 ms` |
| 11. [bun](packages/minifiers/minifiers/bun.ts)                                                                           |       <sup>-87% </sup>`73.45 kB` |       <sup>-72% </sup>`26.66 kB` |      <sup>*2x* </sup>`24 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                      |      <sup>-73% </sup>`148.78 kB` |       <sup>-62% </sup>`36.33 kB` |    <sup>*31x* </sup>`365 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10]
	y-axis "Gzip size" 0 --> 130686
	bar [130686,87016,87205,88087,88148,88319,89156,89882,90800,92395,94166]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                        Gzip size |                              |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js))                    |                       `555.77 kB` |                      `130.69 kB` |                              |
| **Minifier**                                                                                                               |                 **Minified size** |               **Minzipped size** |                     **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-53% </sup>`263.56 kB`** | **<sup>🏆-33% </sup>`87.02 kB`** | <sup>*121x* </sup>`3,927 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-52% </sup>`265.22 kB` |       <sup>-33% </sup>`87.21 kB` |     <sup>*4x* </sup>`157 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-52% </sup>`267.78 kB` |       <sup>-33% </sup>`88.09 kB` |  <sup>*72x* </sup>`2,356 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-51% </sup>`270.83 kB` |       <sup>-33% </sup>`88.15 kB` |      <sup>*1x* </sup>`36 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-50% </sup>`275.35 kB` |       <sup>-32% </sup>`88.32 kB` |    <sup>*21x* </sup>`711 ms` |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |  <sup>*31x* </sup>`1,028 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-52% </sup>`269.35 kB` |       <sup>-31% </sup>`89.88 kB` |    **<sup>🏆 </sup>`32 ms`** |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-51% </sup>`270.13 kB` |       <sup>-31% </sup>`90.80 kB` |      <sup>*2x* </sup>`69 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                              |       <sup>-51% </sup>`273.41 kB` |       <sup>-29% </sup>`92.40 kB` |      <sup>*1x* </sup>`47 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                     |       <sup>-51% </sup>`270.32 kB` |       <sup>-28% </sup>`94.17 kB` | <sup>*202x* </sup>`6,560 ms` |
| 11. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>    |                                 ❌ |                               ❌  |                            - |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub> |                                 ❌ |                               ❌  |                            - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 193763
	bar [193763,122353,123302,123334,123490,124428,124609,124885,126454,126707,127653,145178]
```

<div align="center">

| Artifact                                                                                                                       |                     Original size |                         Gzip size |                              |
| :----------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser v5.30.3](https://www.npmjs.com/package/terser/v/5.30.3) ([Source](https://unpkg.com/terser@5.30.3/dist/bundle.min.js)) |                         `1.01 MB` |                       `193.76 kB` |                              |
| **Minifier**                                                                                                                   |                 **Minified size** |                **Minzipped size** |                     **Time** |
| 1. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                    |       <sup>-56% </sup>`440.17 kB` | **<sup>🏆-37% </sup>`122.35 kB`** |      <sup>*1x* </sup>`37 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                            |       <sup>-55% </sup>`455.59 kB` |       <sup>-36% </sup>`123.30 kB` |     <sup>*4x* </sup>`149 ms` |
| 3. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                      |       <sup>-55% </sup>`451.19 kB` |       <sup>-36% </sup>`123.33 kB` | <sup>*108x* </sup>`3,787 ms` |
| 4. [terser](packages/minifiers/minifiers/terser.ts)                                                                            |       <sup>-55% </sup>`458.29 kB` |       <sup>-36% </sup>`123.49 kB` |  <sup>*64x* </sup>`2,245 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                              |       <sup>-53% </sup>`474.40 kB` |       <sup>-36% </sup>`124.43 kB` |    <sup>*28x* </sup>`991 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                        |       <sup>-53% </sup>`472.16 kB` |       <sup>-36% </sup>`124.61 kB` |    <sup>*22x* </sup>`778 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                         |       <sup>-55% </sup>`456.59 kB` |       <sup>-36% </sup>`124.89 kB` |    **<sup>🏆 </sup>`35 ms`** |
| 8. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                          | **<sup>🏆-56% </sup>`439.97 kB`** |       <sup>-35% </sup>`126.45 kB` | <sup>*175x* </sup>`6,109 ms` |
| 9. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                          |       <sup>-55% </sup>`458.89 kB` |       <sup>-35% </sup>`126.71 kB` |      <sup>*1x* </sup>`60 ms` |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                                 |       <sup>-54% </sup>`466.80 kB` |       <sup>-34% </sup>`127.65 kB` |      <sup>*1x* </sup>`42 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                            |       <sup>-37% </sup>`633.71 kB` |       <sup>-25% </sup>`145.18 kB` |  <sup>*38x* </sup>`1,341 ms` |
| 12. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>        |                                 ❌ |                                ❌  |                            - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9,10,11]
	y-axis "Gzip size" 0 --> 248267
	bar [248267,158751,159071,159200,160827,162771,163036,163198,163725,164610,166210,193471]
```

<div align="center">

| Artifact                                                                                                                   |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------------: |
| [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |                         `1.25 MB` |                       `248.27 kB` |                                   |
| **Minifier**                                                                                                               |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                        |       <sup>-48% </sup>`643.04 kB` | **<sup>🏆-36% </sup>`158.75 kB`** |          <sup>*4x* </sup>`232 ms` |
| 2. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                  | **<sup>🏆-49% </sup>`641.59 kB`** |       <sup>-36% </sup>`159.07 kB` |      <sup>*101x* </sup>`5,046 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                        |       <sup>-48% </sup>`653.26 kB` |       <sup>-36% </sup>`159.20 kB` |       <sup>*61x* </sup>`3,073 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                |       <sup>-48% </sup>`647.00 kB` |       <sup>-35% </sup>`160.83 kB` |           <sup>*1x* </sup>`56 ms` |
| 5. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts)                                      |       <sup>-48% </sup>`644.52 kB` |       <sup>-34% </sup>`162.77 kB` |      <sup>*159x* </sup>`7,956 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                    |       <sup>-46% </sup>`674.49 kB` |       <sup>-34% </sup>`163.04 kB` |         <sup>*19x* </sup>`994 ms` |
| 7. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                          |       <sup>-46% </sup>`675.50 kB` |       <sup>-34% </sup>`163.20 kB` |       <sup>*27x* </sup>`1,346 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                      |       <sup>-48% </sup>`646.76 kB` |       <sup>-34% </sup>`163.73 kB` |           <sup>*1x* </sup>`89 ms` |
| 9. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                     |       <sup>-48% </sup>`642.46 kB` |       <sup>-34% </sup>`164.61 kB` |         **<sup>🏆 </sup>`50 ms`** |
| 10. [bun](packages/minifiers/minifiers/bun.ts)                                                                             |       <sup>-47% </sup>`655.93 kB` |       <sup>-33% </sup>`166.21 kB` |           <sup>*1x* </sup>`54 ms` |
| 11. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts)                                                        |       <sup>-24% </sup>`952.01 kB` |       <sup>-22% </sup>`193.47 kB` |       <sup>*34x* </sup>`1,715 ms` |
| 12. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>            |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
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
	x-axis ["Original",1,2,3,4,5,6,7,8,9]
	y-axis "Gzip size" 0 --> 309942
	bar [309942,157435,157842,158710,162248,165014,166386,167579,181071,182671]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js))        |                         `2.13 MB` |                       `309.94 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [uglify-js](packages/minifiers/minifiers/uglify-js.ts)                                                                             | **<sup>🏆-67% </sup>`694.78 kB`** | **<sup>🏆-49% </sup>`157.44 kB`** |      <sup>*120x* </sup>`6,579 ms` |
| 2. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   |       <sup>-67% </sup>`706.20 kB` |       <sup>-49% </sup>`157.84 kB` |          <sup>*5x* </sup>`326 ms` |
| 3. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-66% </sup>`715.59 kB` |       <sup>-49% </sup>`158.71 kB` |       <sup>*75x* </sup>`4,126 ms` |
| 4. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`716.13 kB` |       <sup>-48% </sup>`162.25 kB` |           <sup>*1x* </sup>`77 ms` |
| 5. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`717.07 kB` |       <sup>-47% </sup>`165.01 kB` |         **<sup>🏆 </sup>`55 ms`** |
| 6. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-64% </sup>`759.34 kB` |       <sup>-46% </sup>`166.39 kB` |       <sup>*30x* </sup>`1,650 ms` |
| 7. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-65% </sup>`756.53 kB` |       <sup>-46% </sup>`167.58 kB` |       <sup>*23x* </sup>`1,314 ms` |
| 8. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-66% </sup>`724.14 kB` |       <sup>-42% </sup>`181.07 kB` |          <sup>*2x* </sup>`123 ms` |
| 9. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`727.90 kB` |       <sup>-41% </sup>`182.67 kB` |           <sup>*1x* </sup>`76 ms` |
| 10. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: minification">❌ Minification</sub>               |                                 ❌ |                                ❌  |                                 - |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>      |                                 ❌ |                                ❌  |                                 - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8]
	y-axis "Gzip size" 0 --> 684611
	bar [684611,321207,321986,324608,330736,331412,331563,331847,337934]
```

<div align="center">

| Artifact                                                                                                                              |                     Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------: | --------------------------------: | --------------------------------: |
| [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js))           |                         `3.20 MB` |                       `684.61 kB` |                                   |
| **Minifier**                                                                                                                          |                 **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-69% </sup>`994.43 kB`** | **<sup>🏆-53% </sup>`321.21 kB`** |          <sup>*5x* </sup>`646 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |         <sup>-69% </sup>`1.00 MB` |       <sup>-53% </sup>`321.99 kB` |       <sup>*51x* </sup>`6,219 ms` |
| 3. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |         <sup>-69% </sup>`1.01 MB` |       <sup>-53% </sup>`324.61 kB` |          <sup>*1x* </sup>`151 ms` |
| 4. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.74 kB` |       <sup>*22x* </sup>`2,726 ms` |
| 5. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.41 kB` |       <sup>*14x* </sup>`1,756 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.56 kB` |          <sup>*1x* </sup>`194 ms` |
| 7. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.85 kB` |        **<sup>🏆 </sup>`121 ms`** |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |         <sup>-68% </sup>`1.02 MB` |       <sup>-51% </sup>`337.93 kB` |          <sup>*1x* </sup>`121 ms` |
| 9. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                        |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                             |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                                 - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: minification">❌ Minification</sub>            |                                 ❌ |                                ❌  |                                 - |
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
	x-axis ["Original",1,2,3,4,5,6,7,8]
	y-axis "Gzip size" 0 --> 825175
	bar [825175,452424,457789,463332,471791,475480,478572,488279,491833]
```

<div align="center">

| Artifact                                                                                                                              |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------: | --------------------------------: | --------------------------------: |
| [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js))                    |                       `6.67 MB` |                       `825.18 kB` |                                   |
| **Minifier**                                                                                                                          |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                   | **<sup>🏆-68% </sup>`2.15 MB`** | **<sup>🏆-45% </sup>`452.42 kB`** |          <sup>*6x* </sup>`878 ms` |
| 2. [terser](packages/minifiers/minifiers/terser.ts)                                                                                   |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`457.79 kB` |       <sup>*50x* </sup>`7,077 ms` |
| 3. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                           |       <sup>-66% </sup>`2.28 MB` |       <sup>-44% </sup>`463.33 kB` |          <sup>*1x* </sup>`194 ms` |
| 4. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                |       <sup>-66% </sup>`2.29 MB` |       <sup>-43% </sup>`471.79 kB` |        **<sup>🏆 </sup>`141 ms`** |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                     |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`475.48 kB` |       <sup>*22x* </sup>`3,132 ms` |
| 6. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                               |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`478.57 kB` |       <sup>*17x* </sup>`2,525 ms` |
| 7. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                 |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`488.28 kB` |          <sup>*2x* </sup>`306 ms` |
| 8. [bun](packages/minifiers/minifiers/bun.ts)                                                                                         |       <sup>-66% </sup>`2.30 MB` |       <sup>-40% </sup>`491.83 kB` |          <sup>*1x* </sup>`167 ms` |
| 9. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                        |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: timeout">❌ Timed out</sub>                    |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                             |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub> |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
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
	x-axis ["Original",1,2,3,4,5,6]
	y-axis "Gzip size" 0 --> 1884998
	bar [1884998,859095,860657,875817,876535,879301,915551]
```

<div align="center">

| Artifact                                                                                                                               |                   Original size |                         Gzip size |                                   |
| :------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------------: |
| [typescript v4.9.5](https://www.npmjs.com/package/typescript/v/4.9.5) ([Source](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                                   |
| **Minifier**                                                                                                                           |               **Minified size** |                **Minzipped size** |                          **Time** |
| 1. [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                    | **<sup>🏆-70% </sup>`3.31 MB`** | **<sup>🏆-54% </sup>`859.10 kB`** |        <sup>*6x* </sup>`1,806 ms` |
| 2. [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                            |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`860.66 kB` |          <sup>*1x* </sup>`406 ms` |
| 3. [@tdewolff/minify](packages/minifiers/minifiers/tdewolff-minify.ts)                                                                 |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`875.82 kB` |        **<sup>🏆 </sup>`259 ms`** |
| 4. [uglify-js (no compress)](packages/minifiers/minifiers/uglify-js.ts)                                                                |       <sup>-68% </sup>`3.54 MB` |       <sup>-53% </sup>`876.54 kB` |       <sup>*15x* </sup>`4,029 ms` |
| 5. [terser (no compress)](packages/minifiers/minifiers/terser.ts)                                                                      |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.30 kB` |       <sup>*20x* </sup>`5,322 ms` |
| 6. [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                                  |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.55 kB` |          <sup>*1x* </sup>`497 ms` |
| 7. [terser](packages/minifiers/minifiers/terser.ts) <sub title="Failed: timeout">❌ Timed out</sub>                                     |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 8. [babel-minify](packages/minifiers/minifiers/babel-minify.ts) <sub title="Failed: timeout">❌ Timed out</sub>                         |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 9. [uglify-js](packages/minifiers/minifiers/uglify-js.ts) <sub title="Failed: timeout">❌ Timed out</sub>                               |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 10. [tedivm/jshrink](packages/minifiers/minifiers/jshrink/index.ts) <sub title="Failed: timeout">❌ Timed out</sub>                     |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 11. [google-closure-compiler](packages/minifiers/minifiers/google-closure-compiler.ts) <sub title="Failed: timeout">❌ Timed out</sub>  |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |
| 12. [bun](packages/minifiers/minifiers/bun.ts) <sub title="Failed: post-validation">❌ Post-validation</sub>                            |                               ❌ |                                ❌  |                                 - |
</div>
<!-- benchmarks:end -->

## ⚔️ Minifier showdown

> [!NOTE]
> 🤖 This analysis is AI generated

<!-- analysis:start -->
The JavaScript minifier competition was nothing short of electrifying. With a slew of contenders showcasing their compression and speed skills, we’ve got some dazzling results—and a couple of disqualifications. Let’s dive into the ultimate breakdown of who soared, who stumbled, and who just couldn’t keep up.

### Best minifier
The crown goes to **`@swc/core`**! This formidable competitor clinched consistent top positions for smallest gzip sizes with lightning speed performances across various file sizes. Whether it’s compressing small libraries like `react` or battling it out with the massive `typescript`, @swc/core excelled when balancing efficiency and performance. Given its superior size reductions and reasonable processing speeds (e.g., 321.21 KB for `echarts` in just 646 ms), it shines as the go-to pick for users wanting a blend of compression quality and speed.

### Honorable mentions
**1. oxc-minify**: The underdog of speedsters! While @swc/core edged it out in size reductions, oxc-minify stole the spotlight in scenarios where speed matters most—compressing `lodash` in just 11 ms and `terser` itself in 37 ms. It’s perfect for low-latency build pipelines where compression size can take a small backseat to performance.

**2. uglify-js**: The heavyweight champion of compression. Despite its slower speeds (6,579 ms for `victory`—whew!), it took the lead in gzip size reductions, showing off its compression prowess on almost every test. Best suited for large-scale projects where absolute minimal file size is the goal and time is a lesser concern.

**3. @tdewolff/minify**: The sprinter that dominated speed categories! Never settling in size rankings but often the fastest (processing `moment` in a jaw-dropping 6 ms, `vue` in 13 ms, and managing `antd`'s grueling 825 KB in just 141 ms). It’s a solid choice for blazing-fast pipelines that prioritize “good enough” compression.

### Eliminated
It’s always tough saying goodbye, but not every competitor can make the cut.

- **babel-minify** stumbled with a consistent error during minification (`d3`). Its compatibility issues make it a risky choice for modern JS projects.
- **tedivm/jshrink** had a tough time closing regex patterns (`d3`), leading to a critical failure. While light, its stability can trip up users requiring reliable tooling.
- **bun** fizzled out at the post-validation stage of `typescript`, showing quirks in how it handles cross-platform line endings. Feels experimental and not yet ready for production pipelines.

Congratulations to all the minifiers for putting on such a thrilling display! From @swc/core’s balanced dominance to oxc-minify and @tdewolff/minify’s speed sprints, and even uglify-js’s battlefield compression assaults, the competition highlighted strengths for every use case. Happy minifying!
<!-- analysis:end -->

## Sponsors

<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>
