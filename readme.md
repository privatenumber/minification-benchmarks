# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

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

| Minifier                                                                                       |                    Minified size |                  Minzipped size |                       Time |
| :--------------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | -------------------------: |
| [terser](/lib/benchmark/minifiers/terser.js)                                                   | **<sup>🏆-52% </sup>`268.0 kB`** | **<sup>🏆-33% </sup>`87.9 kB`** | <sup>*31x* </sup>`2,544ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                 |       <sup>-52% </sup>`270.4 kB` |       <sup>-31% </sup>`90.6 kB` |   **<sup>🏆 </sup>`80ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                           |       <sup>-51% </sup>`276.5 kB` |       <sup>-32% </sup>`89.2 kB` | <sup>*14x* </sup>`1,148ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                                — |                               — |                          — |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                                — |                               — |                          — |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                                — |                               — |                          — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-70% </sup>`88.9 kB`** | **<sup>🏆-64% </sup>`31.0 kB`** |  <sup>*66x* </sup>`1,870ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-69% </sup>`90.3 kB` |       <sup>-64% </sup>`31.2 kB` |  <sup>*36x* </sup>`1,023ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-69% </sup>`90.5 kB` |       <sup>-63% </sup>`32.2 kB` |    **<sup>🏆 </sup>`28ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-68% </sup>`92.4 kB` |       <sup>-63% </sup>`31.9 kB` | <sup>*106x* </sup>`3,000ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-68% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*12x* </sup>`361ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-67% </sup>`95.0 kB` |       <sup>-63% </sup>`31.9 kB` |    <sup>*14x* </sup>`415ms` |
----
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Unminified size: `542.6 kB`
- Unminified Gzip size: `96.8 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-88% </sup>`69.5 kB`** | **<sup>🏆-75% </sup>`24.5 kB`** | <sup>*57x* </sup>`1,873ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-87% </sup>`71.2 kB` |       <sup>-74% </sup>`25.2 kB` | <sup>*33x* </sup>`1,101ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-87% </sup>`71.9 kB` |       <sup>-74% </sup>`25.3 kB` | <sup>*81x* </sup>`2,655ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-87% </sup>`72.6 kB` |       <sup>-73% </sup>`26.2 kB` |   **<sup>🏆 </sup>`33ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-87% </sup>`75.2 kB` |       <sup>-74% </sup>`25.8 kB` |   <sup>*11x* </sup>`381ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-87% </sup>`75.8 kB` |       <sup>-73% </sup>`26.3 kB` |   <sup>*14x* </sup>`460ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-67% </sup>`58.3 kB`** | **<sup>🏆-50% </sup>`18.5 kB`** | <sup>*59x* </sup>`1,342ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.7 kB` |   <sup>*33x* </sup>`750ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.8 kB` | <sup>*83x* </sup>`1,898ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-66% </sup>`60.0 kB` |       <sup>-47% </sup>`19.4 kB` |   **<sup>🏆 </sup>`23ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |   <sup>*11x* </sup>`258ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-64% </sup>`63.3 kB` |       <sup>-47% </sup>`19.7 kB` |   <sup>*14x* </sup>`323ms` |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                   |                   Minified size |                 Minzipped size |                     Time |
| :------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | -----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-69% </sup>`22.8 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** | <sup>*55x* </sup>`705ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-68% </sup>`23.4 kB` |       <sup>-57% </sup>`8.4 kB` | <sup>*24x* </sup>`309ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-68% </sup>`23.8 kB` |       <sup>-57% </sup>`8.5 kB` | <sup>*64x* </sup>`823ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-67% </sup>`24.0 kB` |       <sup>-56% </sup>`8.7 kB` | **<sup>🏆 </sup>`13ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-66% </sup>`25.1 kB` |       <sup>-56% </sup>`8.7 kB` |  <sup>*9x* </sup>`117ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-65% </sup>`25.3 kB` |       <sup>-55% </sup>`8.9 kB` | <sup>*11x* </sup>`144ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Unminified size: `860.3 kB`
- Unminified Gzip size: `173.1 kB`

| Minifier                                                                                       |                    Minified size |                   Minzipped size |                       Time |
| :--------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | -------------------------: |
| [terser](/lib/benchmark/minifiers/terser.js)                                                   | **<sup>🏆-53% </sup>`407.2 kB`** | **<sup>🏆-34% </sup>`114.6 kB`** | <sup>*34x* </sup>`2,220ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                 |       <sup>-53% </sup>`408.3 kB` |       <sup>-33% </sup>`117.3 kB` |   **<sup>🏆 </sup>`65ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                           |       <sup>-52% </sup>`420.8 kB` |       <sup>-34% </sup>`115.3 kB` |   <sup>*13x* </sup>`900ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                                — |                                — |                          — |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                                — |                                — |                          — |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                                — |                                — |                          — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                   |                    Minified size |                   Minzipped size |                         Time |
| :------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-49% </sup>`644.5 kB`** | **<sup>🏆-37% </sup>`159.1 kB`** |   <sup>*65x* </sup>`5,784ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-49% </sup>`645.3 kB` |       <sup>-36% </sup>`161.4 kB` | <sup>*122x* </sup>`10,804ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-49% </sup>`647.2 kB` |       <sup>-35% </sup>`163.3 kB` |     **<sup>🏆 </sup>`88ms`** |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-48% </sup>`653.4 kB` |       <sup>-37% </sup>`159.1 kB` |   <sup>*35x* </sup>`3,113ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-46% </sup>`675.4 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*14x* </sup>`1,248ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-46% </sup>`675.6 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*15x* </sup>`1,389ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-58% </sup>`94.2 kB`** | **<sup>🏆-50% </sup>`31.2 kB`** | <sup>*47x* </sup>`1,500ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-58% </sup>`95.0 kB` |       <sup>-50% </sup>`31.3 kB` |   <sup>*27x* </sup>`881ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-58% </sup>`95.2 kB` |       <sup>-49% </sup>`31.8 kB` |   **<sup>🏆 </sup>`32ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-58% </sup>`95.3 kB` |       <sup>-50% </sup>`31.5 kB` | <sup>*69x* </sup>`2,202ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |      <sup>-55% </sup>`101.0 kB` |       <sup>-49% </sup>`32.2 kB` |   <sup>*10x* </sup>`344ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |      <sup>-55% </sup>`101.3 kB` |       <sup>-49% </sup>`32.2 kB` |   <sup>*11x* </sup>`367ms` |
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