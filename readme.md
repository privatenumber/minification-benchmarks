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
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Comments are not stripped because not all minifiers support this


## 📋 Results

<!-- benchmarks:start -->
### [d3 v5.16.0](https://www.npmjs.com/package/d3/v/5.16.0)
- Unminified size: `515.7 kB`
- Unminified Gzip size: `121.4 kB`

| Minifier                                                             |                    Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------- | -------------------------------: | ------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-52% </sup>`250.9 kB`** |       <sup>-31% </sup>`84.2 kB` | **<sup>🏆 </sup>`75.78ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-51% </sup>`255.9 kB` | **<sup>🏆-32% </sup>`82.8 kB`** |    <sup> </sup>`1,325.23ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-69% </sup>`90.5 kB`** |       <sup>-63% </sup>`32.2 kB` | **<sup>🏆 </sup>`37.94ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-67% </sup>`95.0 kB` | **<sup>🏆-63% </sup>`31.9 kB`** |       <sup> </sup>`522.2ms` |
----
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Unminified size: `542.6 kB`
- Unminified Gzip size: `96.8 kB`

| Minifier                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-87% </sup>`72.6 kB`** | **<sup>🏆-73% </sup>`26.2 kB`** | **<sup>🏆 </sup>`40.82ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-87% </sup>`75.8 kB` |       <sup>-73% </sup>`26.3 kB` |      <sup> </sup>`586.94ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-66% </sup>`60.0 kB`** | **<sup>🏆-47% </sup>`19.4 kB`** | **<sup>🏆 </sup>`26.42ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-64% </sup>`63.3 kB` |       <sup>-47% </sup>`19.7 kB` |       <sup> </sup>`392.7ms` |
----
### [react v16.14.0](https://www.npmjs.com/package/react/v/16.14.0)
- Unminified size: `60.6 kB`
- Unminified Gzip size: `16.5 kB`

| Minifier                                                             |                   Minified size |                 Minzipped size |                        Time |
| :------------------------------------------------------------------- | ------------------------------: | -----------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-67% </sup>`20.1 kB`** | **<sup>🏆-56% </sup>`7.3 kB`** | **<sup>🏆 </sup>`13.88ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-66% </sup>`21.2 kB` |       <sup>-55% </sup>`7.5 kB` |      <sup> </sup>`164.57ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Unminified size: `860.3 kB`
- Unminified Gzip size: `173.1 kB`

| Minifier                                                             |                    Minified size |                   Minzipped size |                        Time |
| :------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-53% </sup>`408.3 kB`** |       <sup>-33% </sup>`117.3 kB` | **<sup>🏆 </sup>`76.95ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-52% </sup>`420.8 kB` | **<sup>🏆-34% </sup>`115.3 kB`** |    <sup> </sup>`1,197.28ms` |
----
### [three v0.123.0](https://www.npmjs.com/package/three/v/0.123.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `248.7 kB`

| Minifier                                                             |                    Minified size |                   Minzipped size |                         Time |
| :------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-49% </sup>`646.4 kB`** |       <sup>-35% </sup>`163.1 kB` | **<sup>🏆 </sup>`118.03ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |       <sup>-46% </sup>`674.8 kB` | **<sup>🏆-35% </sup>`162.7 kB`** |     <sup> </sup>`1,756.44ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                             |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [esbuild](/lib/benchmark/minifiers/esbuild.js)                       | **<sup>🏆-58% </sup>`95.2 kB`** | **<sup>🏆-49% </sup>`31.8 kB`** | **<sup>🏆 </sup>`34.63ms`** |
| [terser.no-compress](/lib/benchmark/minifiers/terser.no-compress.js) |      <sup>-55% </sup>`101.3 kB` |       <sup>-49% </sup>`32.2 kB` |      <sup> </sup>`454.87ms` |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome!

## 🥇 Results

#### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for minification performance. This is quite impressive as it doesn't support or leverage new and concise ES6+ syntax (hence the failed minifications).

[Terser](https://github.com/terser/terser) takes a close second, only short at most by 1% and with support for ES6+.

#### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs 10x+ laps around everyone else. Nothing comes close to the Go compiled minifier/bundler!

esbuild's minification supports cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript) and performs very competitively—only short at most by 2% from UglifyJs.

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._