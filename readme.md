# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process
- The measured time is an average taken from 10 consecutive runs
- Each table is sorted by smallest minified size in ascending order
- Each time is annotated with a multiplier relative to the fastest minifier
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Comments are not stripped because not all minifiers support it


## 📋 Results

<!-- benchmarks:start -->
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.8 kB`
- Unminified Gzip size: `130.5 kB`

| Minifier                                                                                                             |                    Minified size |                  Minzipped size |                         Time |
| :------------------------------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-53% </sup>`265.4 kB`** | **<sup>🏆-34% </sup>`87.3 kB`** |   <sup>*81x* </sup>`8,026ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-52% </sup>`268.0 kB` |       <sup>-33% </sup>`87.9 kB` |   <sup>*42x* </sup>`4,155ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-52% </sup>`270.4 kB` |       <sup>-31% </sup>`90.6 kB` |     **<sup>🏆 </sup>`99ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |       <sup>-51% </sup>`276.1 kB` |       <sup>-33% </sup>`88.7 kB` |   <sup>*13x* </sup>`1,340ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |       <sup>-51% </sup>`276.5 kB` |       <sup>-32% </sup>`89.2 kB` |   <sup>*17x* </sup>`1,744ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-45% </sup>`306.3 kB` |      <sup>-22% </sup>`101.9 kB` | <sup>*103x* </sup>`10,172ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |       <sup>-17% </sup>`463.0 kB` |      <sup>-10% </sup>`117.7 kB` |      <sup>*3x* </sup>`354ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                               — |                            — |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                               — |                            — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                                         |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-70% </sup>`87.4 kB`** |       <sup>-62% </sup>`32.5 kB` | <sup>*199x* </sup>`8,533ms` |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                               |       <sup>-70% </sup>`88.9 kB` | **<sup>🏆-64% </sup>`31.0 kB`** |  <sup>*69x* </sup>`2,980ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                     |       <sup>-69% </sup>`90.3 kB` |       <sup>-64% </sup>`31.2 kB` |  <sup>*37x* </sup>`1,608ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                   |       <sup>-69% </sup>`90.5 kB` |       <sup>-63% </sup>`32.2 kB` |    **<sup>🏆 </sup>`43ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                         |       <sup>-68% </sup>`92.4 kB` |       <sup>-63% </sup>`31.9 kB` | <sup>*112x* </sup>`4,806ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                       |       <sup>-68% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*13x* </sup>`571ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                             |       <sup>-67% </sup>`95.0 kB` |       <sup>-63% </sup>`31.9 kB` |    <sup>*14x* </sup>`620ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)     |       <sup>-67% </sup>`96.5 kB` |       <sup>-60% </sup>`34.5 kB` | <sup>*131x* </sup>`5,599ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                           |      <sup>-49% </sup>`147.8 kB` |       <sup>-51% </sup>`42.4 kB` |      <sup>*1x* </sup>`81ms` |
----
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Unminified size: `542.6 kB`
- Unminified Gzip size: `96.8 kB`

| Minifier                                                                                         |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-89% </sup>`60.2 kB`** | **<sup>🏆-79% </sup>`20.9 kB`** | <sup>*175x* </sup>`8,411ms` |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                               |       <sup>-88% </sup>`69.5 kB` |       <sup>-75% </sup>`24.5 kB` |  <sup>*60x* </sup>`2,889ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                     |       <sup>-87% </sup>`71.2 kB` |       <sup>-74% </sup>`25.2 kB` |  <sup>*36x* </sup>`1,761ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                         |       <sup>-87% </sup>`71.9 kB` |       <sup>-74% </sup>`25.3 kB` |  <sup>*85x* </sup>`4,112ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                   |       <sup>-87% </sup>`72.6 kB` |       <sup>-73% </sup>`26.2 kB` |    **<sup>🏆 </sup>`48ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                       |       <sup>-87% </sup>`75.2 kB` |       <sup>-74% </sup>`25.8 kB` |    <sup>*11x* </sup>`571ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                             |       <sup>-87% </sup>`75.8 kB` |       <sup>-73% </sup>`26.3 kB` |    <sup>*14x* </sup>`696ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)     |       <sup>-86% </sup>`77.4 kB` |       <sup>-73% </sup>`26.3 kB` | <sup>*117x* </sup>`5,634ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                           |      <sup>-72% </sup>`155.9 kB` |       <sup>-62% </sup>`37.6 kB` |      <sup>*1x* </sup>`71ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-67% </sup>`58.3 kB`** | **<sup>🏆-50% </sup>`18.5 kB`** |  <sup>*65x* </sup>`2,094ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.7 kB` |  <sup>*38x* </sup>`1,221ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                                             |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.8 kB` |  <sup>*91x* </sup>`2,907ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-66% </sup>`60.0 kB` |       <sup>-47% </sup>`19.4 kB` |    **<sup>🏆 </sup>`32ms`** |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-65% </sup>`60.9 kB` |       <sup>-47% </sup>`19.7 kB` | <sup>*157x* </sup>`5,011ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |    <sup>*11x* </sup>`380ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |       <sup>-64% </sup>`63.3 kB` |       <sup>-47% </sup>`19.7 kB` |    <sup>*15x* </sup>`484ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |      <sup>-42% </sup>`102.4 kB` |       <sup>-30% </sup>`25.9 kB` |      <sup>*1x* </sup>`48ms` |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                                                             |                   Minified size |                 Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | --------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-69% </sup>`22.8 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** |    <sup>*51x* </sup>`915ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-68% </sup>`23.4 kB` |       <sup>-57% </sup>`8.4 kB` |    <sup>*25x* </sup>`460ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                                             |       <sup>-68% </sup>`23.8 kB` |       <sup>-57% </sup>`8.5 kB` |  <sup>*68x* </sup>`1,217ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-67% </sup>`24.0 kB` |       <sup>-56% </sup>`8.7 kB` |      <sup>*1x* </sup>`19ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |       <sup>-66% </sup>`25.1 kB` |       <sup>-56% </sup>`8.7 kB` |     <sup>*9x* </sup>`170ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |       <sup>-65% </sup>`25.3 kB` |       <sup>-55% </sup>`8.9 kB` |    <sup>*11x* </sup>`208ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-55% </sup>`32.9 kB` |      <sup>-43% </sup>`11.2 kB` | <sup>*235x* </sup>`4,194ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |       <sup>-42% </sup>`42.5 kB` |      <sup>-42% </sup>`11.4 kB` |    **<sup>🏆 </sup>`18ms`** |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                              — |                           — |
----
### [terser v5.6.0](https://www.npmjs.com/package/terser/v/5.6.0)
- Unminified size: `868.1 kB`
- Unminified Gzip size: `174.2 kB`

| Minifier                                                                                                             |                    Minified size |                   Minzipped size |                       Time |
| :------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-54% </sup>`407.1 kB`** | **<sup>🏆-34% </sup>`115.1 kB`** | <sup>*71x* </sup>`6,464ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-53% </sup>`410.5 kB` |       <sup>-34% </sup>`115.2 kB` | <sup>*40x* </sup>`3,637ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-53% </sup>`411.6 kB` |       <sup>-33% </sup>`118.0 kB` |   **<sup>🏆 </sup>`91ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |       <sup>-52% </sup>`422.8 kB` |       <sup>-34% </sup>`116.0 kB` | <sup>*14x* </sup>`1,320ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |       <sup>-52% </sup>`424.3 kB` |       <sup>-34% </sup>`116.0 kB` | <sup>*16x* </sup>`1,495ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-52% </sup>`425.2 kB` |       <sup>-29% </sup>`125.3 kB` | <sup>*94x* </sup>`8,590ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |       <sup>-33% </sup>`588.6 kB` |       <sup>-20% </sup>`140.8 kB` |    <sup>*3x* </sup>`296ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                                — |                          — |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                          — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                                                             |                    Minified size |                   Minzipped size |                         Time |
| :------------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-49% </sup>`644.3 kB`** | **<sup>🏆-37% </sup>`158.7 kB`** |  <sup>*67x* </sup>`10,069ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                                             |       <sup>-49% </sup>`645.3 kB` |       <sup>-36% </sup>`161.4 kB` | <sup>*156x* </sup>`23,345ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-49% </sup>`647.2 kB` |       <sup>-35% </sup>`163.3 kB` |    **<sup>🏆 </sup>`150ms`** |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-48% </sup>`653.4 kB` |       <sup>-37% </sup>`159.1 kB` |   <sup>*35x* </sup>`5,368ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-48% </sup>`660.1 kB` |       <sup>-33% </sup>`167.1 kB` |  <sup>*77x* </sup>`11,624ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |       <sup>-46% </sup>`675.4 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*12x* </sup>`1,873ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |       <sup>-46% </sup>`675.6 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*15x* </sup>`2,265ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |       <sup>-24% </sup>`959.9 kB` |       <sup>-21% </sup>`197.0 kB` |      <sup>*3x* </sup>`530ms` |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                            — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                                                                   | **<sup>🏆-58% </sup>`94.2 kB`** | **<sup>🏆-50% </sup>`31.2 kB`** |  <sup>*54x* </sup>`2,203ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                                                                         |       <sup>-58% </sup>`95.0 kB` |       <sup>-50% </sup>`31.3 kB` |  <sup>*31x* </sup>`1,265ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                                       |       <sup>-58% </sup>`95.2 kB` |       <sup>-49% </sup>`31.8 kB` |    **<sup>🏆 </sup>`40ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                                                             |       <sup>-58% </sup>`95.3 kB` |       <sup>-50% </sup>`31.5 kB` |  <sup>*79x* </sup>`3,214ms` |
| [google-closure-compiler.simple](/lib/benchmark/minifiers/google-closure-compiler.simple.js)                         |       <sup>-56% </sup>`99.5 kB` |       <sup>-47% </sup>`33.0 kB` | <sup>*129x* </sup>`5,246ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js)                                           |      <sup>-55% </sup>`101.0 kB` |       <sup>-49% </sup>`32.2 kB` |    <sup>*11x* </sup>`484ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                                                 |      <sup>-55% </sup>`101.3 kB` |       <sup>-49% </sup>`32.2 kB` |    <sup>*13x* </sup>`548ms` |
| [swc](/lib/benchmark/minifiers/swc.js)                                                                               |      <sup>-40% </sup>`134.7 kB` |       <sup>-39% </sup>`38.3 kB` |      <sup>*1x* </sup>`64ms` |
| [google-closure-compiler.advanced](/lib/benchmark/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome!

## 🥇 Results

#### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for minification performance. This is quite impressive as it doesn't support or leverage new and concise ES6+ syntax (hence the failed minifications for "terser v5.5.1").

[Terser](https://github.com/terser/terser) takes a very close second, only short at most by 1%. Terser is a fork of uglify-es and comes with support for ES6+.

#### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! Nothing comes close to the Go compiled minifier/bundler.

esbuild's minification supports cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript) and performs very competitively—only short at most by 2% from UglifyJs.

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._
