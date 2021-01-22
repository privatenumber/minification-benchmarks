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
### [d3 v5.16.0](https://www.npmjs.com/package/d3/v/5.16.0)
- Unminified size: `515.7 kB`
- Unminified Gzip size: `121.4 kB`

| Minifier                                                                   |                    Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | --------------------------: |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   | **<sup>🏆-53% </sup>`246.0 kB`** |       <sup>-33% </sup>`82.3 kB` | <sup>*108x* </sup>`6,838ms` |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         |       <sup>-53% </sup>`246.6 kB` | **<sup>🏆-34% </sup>`80.8 kB`** |  <sup>*72x* </sup>`4,560ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-52% </sup>`248.8 kB` |       <sup>-33% </sup>`81.7 kB` |  <sup>*37x* </sup>`2,330ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-52% </sup>`250.9 kB` |       <sup>-31% </sup>`84.2 kB` |    **<sup>🏆 </sup>`63ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-51% </sup>`255.5 kB` |       <sup>-33% </sup>`82.2 kB` |    <sup>*12x* </sup>`794ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-51% </sup>`255.9 kB` |       <sup>-32% </sup>`82.8 kB` |  <sup>*17x* </sup>`1,080ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-70% </sup>`88.9 kB`** | **<sup>🏆-64% </sup>`31.0 kB`** |  <sup>*62x* </sup>`1,888ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-69% </sup>`90.3 kB` |       <sup>-64% </sup>`31.2 kB` |  <sup>*34x* </sup>`1,052ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-69% </sup>`90.5 kB` |       <sup>-63% </sup>`32.2 kB` |    **<sup>🏆 </sup>`30ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-68% </sup>`92.4 kB` |       <sup>-63% </sup>`31.9 kB` | <sup>*103x* </sup>`3,099ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-68% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*12x* </sup>`376ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-67% </sup>`95.0 kB` |       <sup>-63% </sup>`31.9 kB` |    <sup>*14x* </sup>`431ms` |
----
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Unminified size: `542.6 kB`
- Unminified Gzip size: `96.8 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-88% </sup>`69.5 kB`** | **<sup>🏆-75% </sup>`24.5 kB`** | <sup>*54x* </sup>`1,814ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-87% </sup>`71.2 kB` |       <sup>-74% </sup>`25.2 kB` | <sup>*33x* </sup>`1,121ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-87% </sup>`71.9 kB` |       <sup>-74% </sup>`25.3 kB` | <sup>*83x* </sup>`2,763ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-87% </sup>`72.6 kB` |       <sup>-73% </sup>`26.2 kB` |   **<sup>🏆 </sup>`33ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-87% </sup>`75.2 kB` |       <sup>-74% </sup>`25.8 kB` |   <sup>*10x* </sup>`352ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-87% </sup>`75.8 kB` |       <sup>-73% </sup>`26.3 kB` |   <sup>*13x* </sup>`460ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-67% </sup>`58.3 kB`** | **<sup>🏆-50% </sup>`18.5 kB`** | <sup>*59x* </sup>`1,268ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.7 kB` |   <sup>*33x* </sup>`712ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-66% </sup>`59.2 kB` |       <sup>-49% </sup>`18.8 kB` | <sup>*83x* </sup>`1,784ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-66% </sup>`60.0 kB` |       <sup>-47% </sup>`19.4 kB` |   **<sup>🏆 </sup>`21ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |   <sup>*11x* </sup>`250ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-64% </sup>`63.3 kB` |       <sup>-47% </sup>`19.7 kB` |   <sup>*14x* </sup>`305ms` |
----
### [react v16.14.0](https://www.npmjs.com/package/react/v/16.14.0)
- Unminified size: `60.6 kB`
- Unminified Gzip size: `16.5 kB`

| Minifier                                                                   |                   Minified size |                 Minzipped size |                     Time |
| :------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | -----------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-69% </sup>`19.1 kB`** | **<sup>🏆-58% </sup>`6.9 kB`** | <sup>*48x* </sup>`527ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-68% </sup>`19.6 kB` |       <sup>-57% </sup>`7.1 kB` | <sup>*22x* </sup>`247ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-68% </sup>`19.9 kB` |       <sup>-57% </sup>`7.2 kB` | <sup>*63x* </sup>`694ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-67% </sup>`20.1 kB` |       <sup>-56% </sup>`7.3 kB` | **<sup>🏆 </sup>`11ms`** |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-66% </sup>`21.0 kB` |       <sup>-56% </sup>`7.3 kB` |   <sup>*8x* </sup>`91ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-66% </sup>`21.2 kB` |       <sup>-55% </sup>`7.5 kB` | <sup>*10x* </sup>`113ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Unminified size: `860.3 kB`
- Unminified Gzip size: `173.1 kB`

| Minifier                                                                                       |                    Minified size |                   Minzipped size |                       Time |
| :--------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | -------------------------: |
| [terser](/lib/benchmark/minifiers/terser.js)                                                   | **<sup>🏆-53% </sup>`407.2 kB`** | **<sup>🏆-34% </sup>`114.6 kB`** | <sup>*35x* </sup>`2,134ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                                                 |       <sup>-53% </sup>`408.3 kB` |       <sup>-33% </sup>`117.3 kB` |   **<sup>🏆 </sup>`60ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)                           |       <sup>-52% </sup>`420.8 kB` |       <sup>-34% </sup>`115.3 kB` |   <sup>*15x* </sup>`930ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                                — |                                — |                          — |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                                — |                                — |                          — |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                                — |                                — |                          — |
----
### [three v0.123.0](https://www.npmjs.com/package/three/v/0.123.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `248.7 kB`

| Minifier                                                                   |                    Minified size |                   Minzipped size |                         Time |
| :------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-49% </sup>`643.8 kB`** | **<sup>🏆-37% </sup>`159.0 kB`** |   <sup>*67x* </sup>`6,003ms` |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-49% </sup>`644.6 kB` |       <sup>-36% </sup>`161.3 kB` | <sup>*121x* </sup>`10,743ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-49% </sup>`646.4 kB` |       <sup>-35% </sup>`163.1 kB` |     **<sup>🏆 </sup>`89ms`** |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-48% </sup>`652.7 kB` |       <sup>-37% </sup>`159.0 kB` |   <sup>*36x* </sup>`3,261ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |       <sup>-46% </sup>`674.6 kB` |       <sup>-35% </sup>`162.7 kB` |   <sup>*12x* </sup>`1,100ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |       <sup>-46% </sup>`674.8 kB` |       <sup>-35% </sup>`162.7 kB` |   <sup>*15x* </sup>`1,389ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                   |                   Minified size |                  Minzipped size |                       Time |
| :------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | -------------------------: |
| [uglify-js](/lib/benchmark/minifiers/uglify-js.js)                         | **<sup>🏆-58% </sup>`94.2 kB`** | **<sup>🏆-50% </sup>`31.2 kB`** | <sup>*49x* </sup>`1,334ms` |
| [terser](/lib/benchmark/minifiers/terser.js)                               |       <sup>-58% </sup>`95.0 kB` |       <sup>-50% </sup>`31.3 kB` |   <sup>*29x* </sup>`791ms` |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                             |       <sup>-58% </sup>`95.2 kB` |       <sup>-49% </sup>`31.8 kB` |   **<sup>🏆 </sup>`27ms`** |
| [babel-minify](/lib/benchmark/minifiers/babel-minify.js)                   |       <sup>-58% </sup>`95.3 kB` |       <sup>-50% </sup>`31.5 kB` | <sup>*73x* </sup>`1,975ms` |
| [uglify-js.no-compress](/lib/benchmark/minifiers/uglify-js.no-compress.js) |      <sup>-55% </sup>`101.0 kB` |       <sup>-49% </sup>`32.2 kB` |   <sup>*11x* </sup>`314ms` |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js)       |      <sup>-55% </sup>`101.3 kB` |       <sup>-49% </sup>`32.2 kB` |   <sup>*13x* </sup>`352ms` |
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