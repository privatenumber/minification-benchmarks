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

| Minifier                                                                                                       |                   Minified size |                  Minzipped size |                         Time |
| :------------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | ---------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-52% </sup>`87.3 kB`** | **<sup>🏆-33% </sup>`87.3 kB`** |   <sup>*68x* </sup>`6,931ms` |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-52% </sup>`87.9 kB` |       <sup>-33% </sup>`87.9 kB` |   <sup>*34x* </sup>`3,538ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-51% </sup>`90.6 kB` |       <sup>-31% </sup>`90.6 kB` |    **<sup>🏆 </sup>`102ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-50% </sup>`88.7 kB` |       <sup>-32% </sup>`88.7 kB` |   <sup>*11x* </sup>`1,191ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-50% </sup>`89.2 kB` |       <sup>-32% </sup>`89.2 kB` |   <sup>*14x* </sup>`1,523ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |      <sup>-45% </sup>`101.9 kB` |      <sup>-22% </sup>`101.9 kB` | <sup>*101x* </sup>`10,345ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |      <sup>-17% </sup>`117.7 kB` |      <sup>-10% </sup>`117.7 kB` |      <sup>*6x* </sup>`631ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                               — |                               — |                            — |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                            — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-70% </sup>`32.5 kB`** |       <sup>-62% </sup>`32.5 kB` | <sup>*175x* </sup>`8,789ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-69% </sup>`31.0 kB` | **<sup>🏆-63% </sup>`31.0 kB`** |  <sup>*52x* </sup>`2,625ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-69% </sup>`31.2 kB` |       <sup>-63% </sup>`31.2 kB` |  <sup>*27x* </sup>`1,374ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-69% </sup>`32.2 kB` |       <sup>-62% </sup>`32.2 kB` |    **<sup>🏆 </sup>`50ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-68% </sup>`31.9 kB` |       <sup>-62% </sup>`31.9 kB` |  <sup>*84x* </sup>`4,226ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-67% </sup>`31.6 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*10x* </sup>`505ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-67% </sup>`31.9 kB` |       <sup>-62% </sup>`31.9 kB` |    <sup>*10x* </sup>`539ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-66% </sup>`34.5 kB` |       <sup>-59% </sup>`34.5 kB` | <sup>*108x* </sup>`5,432ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-49% </sup>`42.4 kB` |       <sup>-50% </sup>`42.4 kB` |     <sup>*2x* </sup>`112ms` |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.1 kB`
- Unminified Gzip size: `97.3 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-89% </sup>`21.0 kB`** | **<sup>🏆-78% </sup>`21.0 kB`** | <sup>*182x* </sup>`9,598ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-87% </sup>`24.6 kB` |       <sup>-75% </sup>`24.6 kB` |  <sup>*48x* </sup>`2,572ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-87% </sup>`25.3 kB` |       <sup>-74% </sup>`25.3 kB` |  <sup>*28x* </sup>`1,475ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-87% </sup>`25.3 kB` |       <sup>-74% </sup>`25.3 kB` |  <sup>*69x* </sup>`3,638ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-87% </sup>`26.3 kB` |       <sup>-73% </sup>`26.3 kB` |    **<sup>🏆 </sup>`52ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-86% </sup>`25.9 kB` |       <sup>-73% </sup>`25.9 kB` |     <sup>*9x* </sup>`520ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-86% </sup>`26.4 kB` |       <sup>-73% </sup>`26.4 kB` |    <sup>*11x* </sup>`611ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-86% </sup>`26.4 kB` |       <sup>-73% </sup>`26.4 kB` | <sup>*108x* </sup>`5,680ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-71% </sup>`37.9 kB` |       <sup>-61% </sup>`37.9 kB` |      <sup>*1x* </sup>`95ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                                                       |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-66% </sup>`18.5 kB`** | **<sup>🏆-49% </sup>`18.5 kB`** |  <sup>*50x* </sup>`1,770ms` |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-66% </sup>`18.7 kB` |       <sup>-49% </sup>`18.7 kB` |  <sup>*29x* </sup>`1,050ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                                             |       <sup>-66% </sup>`18.8 kB` |       <sup>-49% </sup>`18.8 kB` |  <sup>*74x* </sup>`2,636ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-65% </sup>`19.4 kB` |       <sup>-47% </sup>`19.4 kB` |    **<sup>🏆 </sup>`35ms`** |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |       <sup>-65% </sup>`19.7 kB` |       <sup>-46% </sup>`19.7 kB` | <sup>*138x* </sup>`4,902ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-64% </sup>`19.5 kB` |       <sup>-47% </sup>`19.5 kB` |     <sup>*9x* </sup>`342ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-64% </sup>`19.7 kB` |       <sup>-46% </sup>`19.7 kB` |    <sup>*11x* </sup>`410ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |       <sup>-41% </sup>`25.9 kB` |       <sup>-29% </sup>`25.9 kB` |      <sup>*1x* </sup>`59ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                                                       |                  Minified size |                 Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------- | -----------------------------: | -----------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-68% </sup>`8.2 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** |    <sup>*40x* </sup>`872ms` |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-68% </sup>`8.4 kB` |       <sup>-57% </sup>`8.4 kB` |    <sup>*19x* </sup>`418ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                                             |       <sup>-67% </sup>`8.5 kB` |       <sup>-56% </sup>`8.5 kB` |  <sup>*52x* </sup>`1,139ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-67% </sup>`8.7 kB` |       <sup>-55% </sup>`8.7 kB` |      <sup>*1x* </sup>`26ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-65% </sup>`8.7 kB` |       <sup>-56% </sup>`8.7 kB` |     <sup>*7x* </sup>`155ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-65% </sup>`8.9 kB` |       <sup>-54% </sup>`8.9 kB` |     <sup>*8x* </sup>`183ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |      <sup>-54% </sup>`11.2 kB` |      <sup>-42% </sup>`11.2 kB` | <sup>*184x* </sup>`4,008ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |      <sup>-41% </sup>`11.4 kB` |      <sup>-42% </sup>`11.4 kB` |    **<sup>🏆 </sup>`22ms`** |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                              — |                              — |                           — |
----
### [terser v5.6.0](https://www.npmjs.com/package/terser/v/5.6.0)
- Unminified size: `868.1 kB`
- Unminified Gzip size: `174.2 kB`

| Minifier                                                                                                       |                    Minified size |                   Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-53% </sup>`115.1 kB`** | **<sup>🏆-34% </sup>`115.1 kB`** |  <sup>*59x* </sup>`5,719ms` |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-53% </sup>`115.2 kB` |       <sup>-34% </sup>`115.2 kB` |  <sup>*32x* </sup>`3,111ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-53% </sup>`118.0 kB` |       <sup>-32% </sup>`118.0 kB` |    **<sup>🏆 </sup>`96ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-51% </sup>`116.0 kB` |       <sup>-33% </sup>`116.0 kB` |  <sup>*11x* </sup>`1,128ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-51% </sup>`116.0 kB` |       <sup>-33% </sup>`116.0 kB` |  <sup>*13x* </sup>`1,320ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |       <sup>-51% </sup>`125.3 kB` |       <sup>-28% </sup>`125.3 kB` | <sup>*101x* </sup>`9,793ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |       <sup>-32% </sup>`140.8 kB` |       <sup>-19% </sup>`140.8 kB` |     <sup>*5x* </sup>`502ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                                — |                           — |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                           — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                                                       |                    Minified size |                   Minzipped size |                         Time |
| :------------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-48% </sup>`158.7 kB`** | **<sup>🏆-36% </sup>`158.7 kB`** |   <sup>*55x* </sup>`8,266ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                                             |       <sup>-48% </sup>`161.4 kB` |       <sup>-35% </sup>`161.4 kB` | <sup>*106x* </sup>`15,863ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-48% </sup>`163.3 kB` |       <sup>-34% </sup>`163.3 kB` |    **<sup>🏆 </sup>`148ms`** |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-48% </sup>`159.1 kB` |       <sup>-36% </sup>`159.1 kB` |   <sup>*27x* </sup>`4,127ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |       <sup>-47% </sup>`167.1 kB` |       <sup>-33% </sup>`167.1 kB` |  <sup>*77x* </sup>`11,525ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-46% </sup>`162.9 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*10x* </sup>`1,627ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-46% </sup>`162.9 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*12x* </sup>`1,814ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |       <sup>-23% </sup>`197.0 kB` |       <sup>-21% </sup>`197.0 kB` |      <sup>*4x* </sup>`644ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                            — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                                                       |                   Minified size |                  Minzipped size |                        Time |
| :------------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                                                   | **<sup>🏆-58% </sup>`31.2 kB`** | **<sup>🏆-50% </sup>`31.2 kB`** |  <sup>*45x* </sup>`2,018ms` |
| [terser](/scripts/minifiers/terser.js)                                                                         |       <sup>-57% </sup>`31.3 kB` |       <sup>-50% </sup>`31.3 kB` |  <sup>*24x* </sup>`1,072ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                                       |       <sup>-57% </sup>`31.8 kB` |       <sup>-49% </sup>`31.8 kB` |    **<sup>🏆 </sup>`44ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                                             |       <sup>-57% </sup>`31.5 kB` |       <sup>-49% </sup>`31.5 kB` |  <sup>*63x* </sup>`2,839ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)                         |       <sup>-55% </sup>`33.0 kB` |       <sup>-47% </sup>`33.0 kB` | <sup>*123x* </sup>`5,474ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                                           |       <sup>-55% </sup>`32.2 kB` |       <sup>-48% </sup>`32.2 kB` |    <sup>*10x* </sup>`455ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                                                 |       <sup>-55% </sup>`32.2 kB` |       <sup>-48% </sup>`32.2 kB` |    <sup>*11x* </sup>`498ms` |
| [swc](/scripts/minifiers/swc.js)                                                                               |       <sup>-40% </sup>`38.3 kB` |       <sup>-39% </sup>`38.3 kB` |      <sup>*2x* </sup>`94ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome!

## 🥇 Results

#### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for minification performance, winning 6/8 races and only losing to Google Closure Compiler by less than `9 kB`! What's even more impressive is that it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1~2%. Terser is a fork of uglify-es and comes with support for ES6+.

#### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing just as well as Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
