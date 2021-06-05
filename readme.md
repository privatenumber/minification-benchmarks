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
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-67% </sup>`2.2 MB`** | **<sup>🏆-45% </sup>`458.8 kB`** | <sup>*43x* </sup>`22,206ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`2.2 MB` |       <sup>-45% </sup>`461.4 kB` | <sup>*19x* </sup>`10,158ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-65% </sup>`2.3 MB` |       <sup>-41% </sup>`491.2 kB` |   **<sup>🏆 </sup>`513ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`483.0 kB` |   <sup>*8x* </sup>`4,253ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`479.9 kB` |   <sup>*9x* </sup>`4,685ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-59% </sup>`2.8 MB` |       <sup>-38% </sup>`515.5 kB` | <sup>*49x* </sup>`25,349ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-57% </sup>`2.9 MB` |       <sup>-36% </sup>`532.7 kB` | <sup>*41x* </sup>`21,179ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-33% </sup>`4.5 MB` |       <sup>-24% </sup>`634.8 kB` |   <sup>*3x* </sup>`1,754ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                              — |                                — |                           — |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.8 kB`
- Unminified Gzip size: `130.5 kB`

| Minifier                                                                                   |                    Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-54% </sup>`256.1 kB`** |       <sup>-30% </sup>`91.4 kB` | <sup>*109x* </sup>`9,871ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-52% </sup>`265.4 kB` | **<sup>🏆-33% </sup>`87.3 kB`** |  <sup>*79x* </sup>`7,158ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-52% </sup>`268.0 kB` |       <sup>-33% </sup>`87.9 kB` |  <sup>*38x* </sup>`3,492ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-51% </sup>`270.4 kB` |       <sup>-31% </sup>`90.6 kB` |    **<sup>🏆 </sup>`90ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-50% </sup>`276.1 kB` |       <sup>-32% </sup>`88.6 kB` |  <sup>*13x* </sup>`1,185ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-50% </sup>`276.5 kB` |       <sup>-32% </sup>`89.2 kB` |  <sup>*16x* </sup>`1,462ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-45% </sup>`306.4 kB` |      <sup>-22% </sup>`101.9 kB` |  <sup>*95x* </sup>`8,555ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-17% </sup>`462.8 kB` |      <sup>-11% </sup>`116.2 kB` |     <sup>*4x* </sup>`388ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                               — |                           — |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.2 MB`
- Unminified Gzip size: `689.7 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                         Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-75% </sup>`790.1 kB`** | **<sup>🏆-57% </sup>`296.7 kB`** |  <sup>*64x* </sup>`18,770ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-69% </sup>`983.8 kB` |       <sup>-53% </sup>`326.0 kB` |  <sup>*63x* </sup>`18,595ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-69% </sup>`998.8 kB` |       <sup>-52% </sup>`330.4 kB` |  <sup>*57x* </sup>`16,820ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |         <sup>-69% </sup>`1.0 MB` |       <sup>-53% </sup>`322.1 kB` |   <sup>*30x* </sup>`8,983ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |         <sup>-69% </sup>`1.0 MB` |       <sup>-53% </sup>`325.5 kB` | <sup>*137x* </sup>`40,152ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |         <sup>-68% </sup>`1.0 MB` |       <sup>-52% </sup>`331.7 kB` |    **<sup>🏆 </sup>`293ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |         <sup>-67% </sup>`1.1 MB` |       <sup>-52% </sup>`331.7 kB` |    <sup>*9x* </sup>`2,926ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |         <sup>-66% </sup>`1.1 MB` |       <sup>-52% </sup>`330.7 kB` |   <sup>*13x* </sup>`3,948ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |         <sup>-42% </sup>`1.8 MB` |       <sup>-34% </sup>`455.4 kB` |    <sup>*4x* </sup>`1,377ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-70% </sup>`87.0 kB`** |       <sup>-62% </sup>`32.4 kB` | <sup>*152x* </sup>`5,431ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-69% </sup>`88.9 kB` | **<sup>🏆-63% </sup>`31.0 kB`** |  <sup>*72x* </sup>`2,581ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-69% </sup>`89.9 kB` |       <sup>-63% </sup>`31.0 kB` |  <sup>*38x* </sup>`1,384ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-69% </sup>`90.2 kB` |       <sup>-62% </sup>`32.0 kB` |    **<sup>🏆 </sup>`36ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-68% </sup>`91.9 kB` |       <sup>-63% </sup>`31.7 kB` | <sup>*107x* </sup>`3,853ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-67% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*14x* </sup>`505ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-67% </sup>`94.6 kB` |       <sup>-63% </sup>`31.7 kB` |    <sup>*14x* </sup>`518ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-67% </sup>`96.1 kB` |       <sup>-59% </sup>`34.3 kB` | <sup>*137x* </sup>`4,924ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-49% </sup>`147.8 kB` |       <sup>-50% </sup>`42.4 kB` |      <sup>*2x* </sup>`82ms` |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.1 kB`
- Unminified Gzip size: `97.3 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-89% </sup>`60.0 kB`** | **<sup>🏆-79% </sup>`20.8 kB`** | <sup>*143x* </sup>`5,566ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-87% </sup>`69.7 kB` |       <sup>-75% </sup>`24.6 kB` |  <sup>*65x* </sup>`2,558ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-87% </sup>`71.1 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*38x* </sup>`1,485ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-87% </sup>`71.8 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*88x* </sup>`3,441ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-87% </sup>`72.5 kB` |       <sup>-73% </sup>`26.1 kB` |    **<sup>🏆 </sup>`39ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-86% </sup>`75.4 kB` |       <sup>-73% </sup>`25.9 kB` |    <sup>*13x* </sup>`534ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-86% </sup>`75.7 kB` |       <sup>-73% </sup>`26.2 kB` |    <sup>*14x* </sup>`579ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-86% </sup>`77.4 kB` |       <sup>-73% </sup>`26.2 kB` | <sup>*129x* </sup>`5,024ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-71% </sup>`155.7 kB` |       <sup>-61% </sup>`38.0 kB` |      <sup>*2x* </sup>`79ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-72% </sup>`49.6 kB`** | **<sup>🏆-52% </sup>`17.6 kB`** | <sup>*192x* </sup>`4,955ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-66% </sup>`58.3 kB` |       <sup>-49% </sup>`18.5 kB` |  <sup>*70x* </sup>`1,813ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.6 kB` |  <sup>*40x* </sup>`1,042ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.7 kB` |  <sup>*94x* </sup>`2,434ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-66% </sup>`59.9 kB` |       <sup>-47% </sup>`19.3 kB` |    **<sup>🏆 </sup>`26ms`** |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-65% </sup>`60.9 kB` |       <sup>-46% </sup>`19.7 kB` | <sup>*167x* </sup>`4,306ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |    <sup>*13x* </sup>`336ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`63.2 kB` |       <sup>-46% </sup>`19.6 kB` |    <sup>*15x* </sup>`408ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-41% </sup>`102.4 kB` |       <sup>-29% </sup>`25.8 kB` |      <sup>*1x* </sup>`49ms` |
----
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                                   |                   Minified size |                 Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-68% </sup>`22.8 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** |    <sup>*51x* </sup>`765ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-68% </sup>`23.1 kB` |       <sup>-57% </sup>`8.3 kB` |    <sup>*26x* </sup>`393ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-67% </sup>`23.5 kB` |       <sup>-57% </sup>`8.4 kB` |  <sup>*69x* </sup>`1,035ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-67% </sup>`23.7 kB` |       <sup>-56% </sup>`8.6 kB` |    **<sup>🏆 </sup>`15ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-65% </sup>`25.1 kB` |       <sup>-56% </sup>`8.7 kB` |     <sup>*9x* </sup>`144ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-65% </sup>`25.1 kB` |       <sup>-55% </sup>`8.7 kB` |    <sup>*11x* </sup>`178ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-65% </sup>`25.2 kB` |       <sup>-52% </sup>`9.3 kB` | <sup>*259x* </sup>`3,887ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-55% </sup>`32.8 kB` |      <sup>-43% </sup>`11.1 kB` | <sup>*240x* </sup>`3,591ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-41% </sup>`42.7 kB` |      <sup>-41% </sup>`11.4 kB` |      <sup>*1x* </sup>`17ms` |
----
### [terser v5.7.0](https://www.npmjs.com/package/terser/v/5.7.0)
- Unminified size: `869.4 kB`
- Unminified Gzip size: `174.5 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-58% </sup>`369.0 kB`** |       <sup>-32% </sup>`118.5 kB` | <sup>*101x* </sup>`8,356ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-53% </sup>`407.7 kB` | **<sup>🏆-34% </sup>`115.3 kB`** |  <sup>*66x* </sup>`5,521ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-53% </sup>`411.0 kB` |       <sup>-34% </sup>`115.5 kB` |  <sup>*37x* </sup>`3,107ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-53% </sup>`412.2 kB` |       <sup>-32% </sup>`118.3 kB` |    **<sup>🏆 </sup>`82ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-51% </sup>`423.4 kB` |       <sup>-33% </sup>`116.3 kB` |  <sup>*13x* </sup>`1,121ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-51% </sup>`424.9 kB` |       <sup>-33% </sup>`116.3 kB` |  <sup>*15x* </sup>`1,241ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-51% </sup>`425.9 kB` |       <sup>-28% </sup>`125.8 kB` |  <sup>*89x* </sup>`7,414ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-32% </sup>`590.9 kB` |       <sup>-19% </sup>`141.2 kB` |     <sup>*4x* </sup>`335ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                                — |                           — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                         Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-58% </sup>`527.6 kB`** | **<sup>🏆-40% </sup>`148.5 kB`** |  <sup>*87x* </sup>`11,335ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-48% </sup>`644.3 kB` |       <sup>-36% </sup>`158.7 kB` |   <sup>*65x* </sup>`8,456ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-48% </sup>`645.3 kB` |       <sup>-35% </sup>`161.4 kB` | <sup>*108x* </sup>`14,040ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-48% </sup>`647.2 kB` |       <sup>-34% </sup>`163.3 kB` |    **<sup>🏆 </sup>`130ms`** |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-48% </sup>`653.4 kB` |       <sup>-36% </sup>`159.1 kB` |   <sup>*33x* </sup>`4,296ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-47% </sup>`660.2 kB` |       <sup>-33% </sup>`167.1 kB` |   <sup>*74x* </sup>`9,641ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-46% </sup>`675.4 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*12x* </sup>`1,623ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-46% </sup>`675.6 kB` |       <sup>-35% </sup>`162.9 kB` |   <sup>*13x* </sup>`1,796ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |       <sup>-23% </sup>`960.3 kB` |       <sup>-21% </sup>`197.2 kB` |      <sup>*3x* </sup>`441ms` |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.1 MB`
- Unminified Gzip size: `312.2 kB`

| Minifier                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               | **<sup>🏆-67% </sup>`706.5 kB`** |       <sup>-49% </sup>`159.3 kB` | <sup>*62x* </sup>`12,172ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-66% </sup>`715.6 kB` | **<sup>🏆-49% </sup>`158.9 kB`** |  <sup>*30x* </sup>`5,969ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-66% </sup>`724.5 kB` |       <sup>-42% </sup>`180.5 kB` |   **<sup>🏆 </sup>`195ms`** |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |       <sup>-65% </sup>`756.6 kB` |       <sup>-46% </sup>`167.6 kB` |  <sup>*11x* </sup>`2,228ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |       <sup>-64% </sup>`759.3 kB` |       <sup>-47% </sup>`166.6 kB` |  <sup>*11x* </sup>`2,285ms` |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) |       <sup>-61% </sup>`829.1 kB` |       <sup>-41% </sup>`182.9 kB` | <sup>*72x* </sup>`14,143ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-58% </sup>`903.3 kB` |       <sup>-38% </sup>`193.2 kB` | <sup>*60x* </sup>`11,817ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |         <sup>-30% </sup>`1.5 MB` |       <sup>-26% </sup>`230.7 kB` |     <sup>*3x* </sup>`771ms` |
| [babel-minify](/scripts/minifiers/babel-minify.js) <sub>_Failed_</sub>                     |                                — |                                — |                           — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :----------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [google-closure-compiler.advanced](/scripts/minifiers/google-closure-compiler.advanced.js) | **<sup>🏆-68% </sup>`71.3 kB`** | **<sup>🏆-55% </sup>`28.1 kB`** | <sup>*159x* </sup>`5,496ms` |
| [uglify-js](/scripts/minifiers/uglify-js.js)                                               |       <sup>-58% </sup>`94.2 kB` |       <sup>-50% </sup>`31.2 kB` |  <sup>*54x* </sup>`1,882ms` |
| [terser](/scripts/minifiers/terser.js)                                                     |       <sup>-57% </sup>`94.9 kB` |       <sup>-50% </sup>`31.3 kB` |  <sup>*30x* </sup>`1,047ms` |
| [esbuild](/scripts/minifiers/esbuild.js)                                                   |       <sup>-57% </sup>`95.1 kB` |       <sup>-49% </sup>`31.8 kB` |    **<sup>🏆 </sup>`35ms`** |
| [babel-minify](/scripts/minifiers/babel-minify.js)                                         |       <sup>-57% </sup>`95.2 kB` |       <sup>-50% </sup>`31.4 kB` |  <sup>*76x* </sup>`2,650ms` |
| [google-closure-compiler.simple](/scripts/minifiers/google-closure-compiler.simple.js)     |       <sup>-55% </sup>`99.4 kB` |       <sup>-47% </sup>`33.0 kB` | <sup>*134x* </sup>`4,628ms` |
| [uglify-js.no-compress](/scripts/minifiers/uglify-js.no-compress.js)                       |      <sup>-55% </sup>`101.0 kB` |       <sup>-48% </sup>`32.2 kB` |    <sup>*12x* </sup>`431ms` |
| [terser.no-compress](/scripts/minifiers/terser.no-compress.js)                             |      <sup>-55% </sup>`101.2 kB` |       <sup>-48% </sup>`32.1 kB` |    <sup>*12x* </sup>`445ms` |
| [swc](/scripts/minifiers/swc.js)                                                           |      <sup>-40% </sup>`134.7 kB` |       <sup>-39% </sup>`38.3 kB` |      <sup>*1x* </sup>`55ms` |
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
