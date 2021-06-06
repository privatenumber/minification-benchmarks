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

- Each minifier is executed in its own process with a 1 minute timeout
- The measured time is an average taken from 5 consecutive runs
- Each table is sorted by smallest minified size in ascending order
- Each time is annotated with a multiplier relative to the fastest minifier
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Comments are not stripped because not all minifiers support it


## 📋 Results

<!-- benchmarks:start -->
### [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1)
- Unminified size: `6.7 MB`
- Unminified Gzip size: `833.5 kB`

| Minifier                                                                                   |                  Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -----------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-67% </sup>`2.2 MB`** | **<sup>🏆-45% </sup>`458.8 kB`** | <sup>*31x* </sup>`25,427ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`2.2 MB` |       <sup>-45% </sup>`461.4 kB` | <sup>*14x* </sup>`11,742ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-65% </sup>`2.3 MB` |       <sup>-41% </sup>`491.2 kB` |   **<sup>🏆 </sup>`807ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`483.0 kB` |   <sup>*5x* </sup>`4,774ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`479.9 kB` |   <sup>*6x* </sup>`5,411ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-59% </sup>`2.8 MB` |       <sup>-38% </sup>`515.5 kB` | <sup>*51x* </sup>`41,792ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-57% </sup>`2.9 MB` |       <sup>-36% </sup>`532.7 kB` | <sup>*40x* </sup>`32,670ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-33% </sup>`4.5 MB` |       <sup>-24% </sup>`634.8 kB` |   <sup>*2x* </sup>`1,987ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                              — |                                — |                           — |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.8 kB`
- Unminified Gzip size: `130.5 kB`

| Minifier                                                                                   |                    Minified size |                  Minzipped size |                         Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-54% </sup>`256.1 kB`** |       <sup>-30% </sup>`91.4 kB` | <sup>*120x* </sup>`11,094ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-52% </sup>`265.4 kB` | **<sup>🏆-33% </sup>`87.3 kB`** |   <sup>*87x* </sup>`8,126ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-52% </sup>`268.0 kB` |       <sup>-33% </sup>`87.9 kB` |   <sup>*42x* </sup>`3,963ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-51% </sup>`270.4 kB` |       <sup>-31% </sup>`90.6 kB` |     **<sup>🏆 </sup>`92ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-50% </sup>`276.1 kB` |       <sup>-32% </sup>`88.6 kB` |   <sup>*14x* </sup>`1,330ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-50% </sup>`276.5 kB` |       <sup>-32% </sup>`89.2 kB` |   <sup>*18x* </sup>`1,687ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-45% </sup>`306.4 kB` |      <sup>-22% </sup>`101.9 kB` |  <sup>*103x* </sup>`9,582ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-17% </sup>`462.8 kB` |      <sup>-11% </sup>`116.2 kB` |      <sup>*4x* </sup>`404ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                               — |                            — |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.2 MB`
- Unminified Gzip size: `689.7 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-75% </sup>`790.1 kB`** | **<sup>🏆-57% </sup>`296.7 kB`** | <sup>*66x* </sup>`26,665ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-69% </sup>`983.8 kB` |       <sup>-53% </sup>`326.0 kB` | <sup>*54x* </sup>`22,110ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-69% </sup>`998.8 kB` |       <sup>-52% </sup>`330.4 kB` | <sup>*46x* </sup>`18,870ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |         <sup>-69% </sup>`1.0 MB` |       <sup>-53% </sup>`322.1 kB` | <sup>*25x* </sup>`10,234ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |         <sup>-68% </sup>`1.0 MB` |       <sup>-52% </sup>`331.7 kB` |   **<sup>🏆 </sup>`403ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |         <sup>-67% </sup>`1.1 MB` |       <sup>-52% </sup>`331.7 kB` |   <sup>*8x* </sup>`3,377ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |         <sup>-66% </sup>`1.1 MB` |       <sup>-52% </sup>`330.7 kB` |  <sup>*11x* </sup>`4,649ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |         <sup>-42% </sup>`1.8 MB` |       <sup>-34% </sup>`455.4 kB` |   <sup>*3x* </sup>`1,606ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                                — |                           — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-70% </sup>`87.0 kB`** |       <sup>-62% </sup>`32.4 kB` | <sup>*159x* </sup>`6,245ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-69% </sup>`88.9 kB` | **<sup>🏆-63% </sup>`31.0 kB`** |  <sup>*75x* </sup>`2,972ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-69% </sup>`89.9 kB` |       <sup>-63% </sup>`31.0 kB` |  <sup>*40x* </sup>`1,573ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-69% </sup>`90.2 kB` |       <sup>-62% </sup>`32.0 kB` |    **<sup>🏆 </sup>`39ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-68% </sup>`91.9 kB` |       <sup>-63% </sup>`31.7 kB` | <sup>*122x* </sup>`4,810ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-67% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*14x* </sup>`573ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-67% </sup>`94.6 kB` |       <sup>-63% </sup>`31.7 kB` |    <sup>*15x* </sup>`598ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-67% </sup>`96.1 kB` |       <sup>-59% </sup>`34.3 kB` | <sup>*143x* </sup>`5,607ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-49% </sup>`147.8 kB` |       <sup>-50% </sup>`42.4 kB` |      <sup>*2x* </sup>`84ms` |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.1 kB`
- Unminified Gzip size: `97.3 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-89% </sup>`60.0 kB`** | **<sup>🏆-79% </sup>`20.8 kB`** | <sup>*140x* </sup>`6,281ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-87% </sup>`69.7 kB` |       <sup>-75% </sup>`24.6 kB` |  <sup>*65x* </sup>`2,928ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-87% </sup>`71.1 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*38x* </sup>`1,706ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-87% </sup>`71.8 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*93x* </sup>`4,188ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-87% </sup>`72.5 kB` |       <sup>-73% </sup>`26.1 kB` |    **<sup>🏆 </sup>`45ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-86% </sup>`75.4 kB` |       <sup>-73% </sup>`25.9 kB` |    <sup>*13x* </sup>`599ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-86% </sup>`75.7 kB` |       <sup>-73% </sup>`26.2 kB` |    <sup>*14x* </sup>`661ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-86% </sup>`77.4 kB` |       <sup>-73% </sup>`26.2 kB` | <sup>*127x* </sup>`5,703ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-71% </sup>`155.7 kB` |       <sup>-61% </sup>`38.0 kB` |      <sup>*1x* </sup>`78ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-72% </sup>`49.6 kB`** | **<sup>🏆-52% </sup>`17.6 kB`** | <sup>*192x* </sup>`5,667ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-66% </sup>`58.3 kB` |       <sup>-49% </sup>`18.5 kB` |  <sup>*69x* </sup>`2,063ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.6 kB` |  <sup>*39x* </sup>`1,168ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.7 kB` |  <sup>*99x* </sup>`2,930ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-66% </sup>`59.9 kB` |       <sup>-47% </sup>`19.3 kB` |    **<sup>🏆 </sup>`30ms`** |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-65% </sup>`60.9 kB` |       <sup>-46% </sup>`19.7 kB` | <sup>*172x* </sup>`5,090ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |    <sup>*12x* </sup>`382ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`63.2 kB` |       <sup>-46% </sup>`19.6 kB` |    <sup>*14x* </sup>`441ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-41% </sup>`102.4 kB` |       <sup>-29% </sup>`25.8 kB` |      <sup>*1x* </sup>`49ms` |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                                   |                   Minified size |                 Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-68% </sup>`22.8 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** |    <sup>*55x* </sup>`886ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-68% </sup>`23.1 kB` |       <sup>-57% </sup>`8.3 kB` |    <sup>*27x* </sup>`437ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-67% </sup>`23.5 kB` |       <sup>-57% </sup>`8.4 kB` |  <sup>*76x* </sup>`1,227ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-67% </sup>`23.7 kB` |       <sup>-56% </sup>`8.6 kB` |    **<sup>🏆 </sup>`16ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-65% </sup>`25.1 kB` |       <sup>-56% </sup>`8.7 kB` |    <sup>*10x* </sup>`167ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-65% </sup>`25.1 kB` |       <sup>-55% </sup>`8.7 kB` |    <sup>*12x* </sup>`202ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-65% </sup>`25.2 kB` |       <sup>-52% </sup>`9.3 kB` | <sup>*287x* </sup>`4,624ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-55% </sup>`32.8 kB` |      <sup>-43% </sup>`11.1 kB` | <sup>*256x* </sup>`4,125ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-41% </sup>`42.7 kB` |      <sup>-41% </sup>`11.4 kB` |      <sup>*1x* </sup>`18ms` |
----
### [terser v5.7.0](https://www.npmjs.com/package/terser/v/5.7.0)
- Unminified size: `869.4 kB`
- Unminified Gzip size: `174.5 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-58% </sup>`369.0 kB`** |       <sup>-32% </sup>`118.5 kB` | <sup>*103x* </sup>`9,583ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-53% </sup>`407.7 kB` | **<sup>🏆-34% </sup>`115.3 kB`** |  <sup>*68x* </sup>`6,360ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-53% </sup>`411.0 kB` |       <sup>-34% </sup>`115.5 kB` |  <sup>*37x* </sup>`3,464ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-53% </sup>`412.2 kB` |       <sup>-32% </sup>`118.3 kB` |    **<sup>🏆 </sup>`92ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-51% </sup>`423.4 kB` |       <sup>-33% </sup>`116.3 kB` |  <sup>*13x* </sup>`1,275ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-51% </sup>`424.9 kB` |       <sup>-33% </sup>`116.3 kB` |  <sup>*15x* </sup>`1,405ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-51% </sup>`425.9 kB` |       <sup>-28% </sup>`125.8 kB` |  <sup>*91x* </sup>`8,432ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-32% </sup>`590.9 kB` |       <sup>-19% </sup>`141.2 kB` |     <sup>*3x* </sup>`333ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                                — |                           — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                         Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-58% </sup>`527.6 kB`** | **<sup>🏆-40% </sup>`148.5 kB`** |  <sup>*83x* </sup>`12,728ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-48% </sup>`644.3 kB` |       <sup>-36% </sup>`158.7 kB` |   <sup>*65x* </sup>`9,956ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-48% </sup>`645.3 kB` |       <sup>-35% </sup>`161.4 kB` | <sup>*147x* </sup>`22,466ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-48% </sup>`647.2 kB` |       <sup>-34% </sup>`163.3 kB` |    **<sup>🏆 </sup>`153ms`** |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-48% </sup>`653.4 kB` |       <sup>-36% </sup>`159.1 kB` |   <sup>*32x* </sup>`4,966ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-47% </sup>`660.2 kB` |       <sup>-33% </sup>`167.1 kB` |  <sup>*73x* </sup>`11,223ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-46% </sup>`675.4 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*12x* </sup>`1,870ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-46% </sup>`675.6 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*13x* </sup>`2,101ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-23% </sup>`960.3 kB` |       <sup>-21% </sup>`197.2 kB` |      <sup>*3x* </sup>`577ms` |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.1 MB`
- Unminified Gzip size: `312.2 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-67% </sup>`706.5 kB`** |       <sup>-49% </sup>`159.3 kB` | <sup>*67x* </sup>`14,604ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`715.6 kB` | **<sup>🏆-49% </sup>`158.9 kB`** |  <sup>*32x* </sup>`6,998ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-66% </sup>`724.5 kB` |       <sup>-42% </sup>`180.5 kB` |   **<sup>🏆 </sup>`217ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-65% </sup>`756.6 kB` |       <sup>-46% </sup>`167.6 kB` |  <sup>*11x* </sup>`2,564ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`759.3 kB` |       <sup>-47% </sup>`166.6 kB` |  <sup>*12x* </sup>`2,694ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-61% </sup>`829.1 kB` |       <sup>-41% </sup>`182.9 kB` | <sup>*75x* </sup>`16,323ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-58% </sup>`903.3 kB` |       <sup>-38% </sup>`193.2 kB` | <sup>*63x* </sup>`13,788ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |         <sup>-30% </sup>`1.5 MB` |       <sup>-26% </sup>`230.7 kB` |   <sup>*5x* </sup>`1,097ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                                — |                           — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-68% </sup>`71.3 kB`** | **<sup>🏆-55% </sup>`28.1 kB`** | <sup>*180x* </sup>`6,552ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-58% </sup>`94.2 kB` |       <sup>-50% </sup>`31.2 kB` |  <sup>*61x* </sup>`2,224ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-57% </sup>`94.9 kB` |       <sup>-50% </sup>`31.3 kB` |  <sup>*34x* </sup>`1,244ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-57% </sup>`95.1 kB` |       <sup>-49% </sup>`31.8 kB` |    **<sup>🏆 </sup>`36ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-57% </sup>`95.2 kB` |       <sup>-50% </sup>`31.4 kB` |  <sup>*88x* </sup>`3,228ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-55% </sup>`99.4 kB` |       <sup>-47% </sup>`33.0 kB` | <sup>*143x* </sup>`5,226ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |      <sup>-55% </sup>`101.0 kB` |       <sup>-48% </sup>`32.2 kB` |    <sup>*13x* </sup>`499ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |      <sup>-55% </sup>`101.2 kB` |       <sup>-48% </sup>`32.1 kB` |    <sup>*14x* </sup>`521ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-40% </sup>`134.7 kB` |       <sup>-39% </sup>`38.3 kB` |      <sup>*1x* </sup>`57ms` |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.

## 🥇 Results

#### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for minification performance by winning 9 out of 11 races. When short, it only loses to Google Closure Compiler by less than `9 kB`! Impressively, it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1~2%. Terser is a fork of uglify-es and comes with support for ES6+.

#### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing closely to Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript). However, note that esbuild has a [limited set of optimizations](https://github.com/evanw/esbuild/issues/639#:~:text=i%20can%20add%20a%20caveat%20to%20esbuild's%20minification%20documentation%20about%20code%20optimizations%20that%20are%20not%20included%20in%20esbuild.%20i%20think%20the%20list%20of%20possible%20code%20optimizations%20that%20esbuild%20doesn't%20do%20would%20be%20something%20like%20this%3A) and currently has [no plans to improve it](https://github.com/evanw/esbuild/issues/639#issuecomment-792033958).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
