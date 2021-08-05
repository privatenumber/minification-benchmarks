# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process with a 1 minute timeout
- The measured time is an average taken from 5 consecutive runs
- Each table is sorted by smallest minified size in ascending order
- Each time is annotated with a multiplier relative to the fastest minifier
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.1 kB`
- Unminified Gzip size: `19.5 kB`

| Minifier                                                                                                   |                   Minified size |                 Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | ------------------------------: | -----------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-68% </sup>`22.8 kB`** | **<sup>🏆-58% </sup>`8.2 kB`** |    <sup>*44x* </sup>`957ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-68% </sup>`23.1 kB` |       <sup>-57% </sup>`8.3 kB` |    <sup>*21x* </sup>`462ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-67% </sup>`23.5 kB` |       <sup>-57% </sup>`8.4 kB` |  <sup>*57x* </sup>`1,251ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-67% </sup>`23.7 kB` |       <sup>-56% </sup>`8.6 kB` |    **<sup>🏆 </sup>`22ms`** |
| [swc](/lib/minifiers/swc.js)                                                                               |       <sup>-66% </sup>`24.4 kB` |       <sup>-54% </sup>`8.9 kB` |      <sup>*1x* </sup>`33ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-65% </sup>`25.1 kB` |       <sup>-56% </sup>`8.7 kB` |     <sup>*8x* </sup>`176ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-65% </sup>`25.1 kB` |       <sup>-55% </sup>`8.7 kB` |    <sup>*10x* </sup>`218ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-55% </sup>`32.8 kB` |      <sup>-43% </sup>`11.1 kB` | <sup>*181x* </sup>`3,946ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                              — |                           — |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.9 kB`
- Unminified Gzip size: `36.5 kB`

| Minifier                                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-66% </sup>`58.3 kB`** | **<sup>🏆-49% </sup>`18.5 kB`** |  <sup>*75x* </sup>`2,193ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.6 kB` |  <sup>*41x* </sup>`1,190ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-66% </sup>`59.1 kB` |       <sup>-49% </sup>`18.7 kB` |  <sup>*99x* </sup>`2,888ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-66% </sup>`59.9 kB` |       <sup>-47% </sup>`19.3 kB` |    **<sup>🏆 </sup>`29ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-65% </sup>`60.9 kB` |       <sup>-46% </sup>`19.7 kB` | <sup>*171x* </sup>`4,963ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-64% </sup>`63.0 kB` |       <sup>-47% </sup>`19.5 kB` |    <sup>*13x* </sup>`379ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-64% </sup>`63.2 kB` |       <sup>-46% </sup>`19.6 kB` |    <sup>*15x* </sup>`461ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                               — |                               — |                           — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.2 kB`
- Unminified Gzip size: `62.3 kB`

| Minifier                                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-58% </sup>`94.2 kB`** | **<sup>🏆-50% </sup>`31.2 kB`** |  <sup>*49x* </sup>`2,196ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-57% </sup>`94.9 kB` |       <sup>-50% </sup>`31.3 kB` |  <sup>*28x* </sup>`1,274ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-57% </sup>`95.1 kB` |       <sup>-49% </sup>`31.8 kB` |    **<sup>🏆 </sup>`44ms`** |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-57% </sup>`95.2 kB` |       <sup>-50% </sup>`31.4 kB` |  <sup>*69x* </sup>`3,066ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-55% </sup>`99.4 kB` |       <sup>-47% </sup>`33.0 kB` | <sup>*117x* </sup>`5,219ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |      <sup>-55% </sup>`101.0 kB` |       <sup>-48% </sup>`32.2 kB` |    <sup>*10x* </sup>`474ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |      <sup>-55% </sup>`101.2 kB` |       <sup>-48% </sup>`32.1 kB` |    <sup>*11x* </sup>`523ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                               — |                               — |                           — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.6 kB`
- Unminified Gzip size: `84.7 kB`

| Minifier                                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-69% </sup>`88.8 kB`** | **<sup>🏆-63% </sup>`31.0 kB`** |  <sup>*66x* </sup>`2,991ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-69% </sup>`89.9 kB` |       <sup>-63% </sup>`31.0 kB` |  <sup>*35x* </sup>`1,590ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-69% </sup>`90.2 kB` |       <sup>-62% </sup>`32.0 kB` |    **<sup>🏆 </sup>`45ms`** |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-68% </sup>`91.9 kB` |       <sup>-63% </sup>`31.7 kB` |  <sup>*98x* </sup>`4,432ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-67% </sup>`94.3 kB` |       <sup>-63% </sup>`31.6 kB` |    <sup>*12x* </sup>`556ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-67% </sup>`94.6 kB` |       <sup>-63% </sup>`31.7 kB` |    <sup>*12x* </sup>`582ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-67% </sup>`96.1 kB` |       <sup>-59% </sup>`34.3 kB` | <sup>*122x* </sup>`5,474ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                               — |                               — |                           — |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.1 kB`
- Unminified Gzip size: `97.3 kB`

| Minifier                                                                                                   |                   Minified size |                  Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | ------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-87% </sup>`69.7 kB`** | **<sup>🏆-75% </sup>`24.6 kB`** |  <sup>*65x* </sup>`2,983ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-87% </sup>`71.1 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*38x* </sup>`1,771ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-87% </sup>`71.8 kB` |       <sup>-74% </sup>`25.1 kB` |  <sup>*89x* </sup>`4,057ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-87% </sup>`72.5 kB` |       <sup>-73% </sup>`26.1 kB` |    **<sup>🏆 </sup>`46ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-86% </sup>`75.4 kB` |       <sup>-73% </sup>`25.9 kB` |    <sup>*13x* </sup>`610ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-86% </sup>`75.7 kB` |       <sup>-73% </sup>`26.2 kB` |    <sup>*14x* </sup>`665ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-86% </sup>`77.4 kB` |       <sup>-73% </sup>`26.2 kB` | <sup>*123x* </sup>`5,643ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                               — |                               — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                               — |                               — |                           — |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.8 kB`
- Unminified Gzip size: `130.5 kB`

| Minifier                                                                                                   | Minified size | Minzipped size | Time |
| :--------------------------------------------------------------------------------------------------------- | ------------: | -------------: | ---: |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |             — |              — |    — |
| [esbuild](/lib/minifiers/esbuild.js) <sub>_Failed_</sub>                                                   |             — |              — |    — |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |             — |              — |    — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) <sub>_Failed_</sub>     |             — |              — |    — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |             — |              — |    — |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js) <sub>_Failed_</sub>                             |             — |              — |    — |
| [terser](/lib/minifiers/terser.js) <sub>_Failed_</sub>                                                     |             — |              — |    — |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub>                       |             — |              — |    — |
| [uglify-js](/lib/minifiers/uglify-js.js) <sub>_Failed_</sub>                                               |             — |              — |    — |
----
### [terser v5.7.1](https://www.npmjs.com/package/terser/v/5.7.1)
- Unminified size: `870.0 kB`
- Unminified Gzip size: `174.6 kB`

| Minifier                                                                                                   |                    Minified size |                   Minzipped size |                       Time |
| :--------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | -------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-53% </sup>`407.7 kB`** | **<sup>🏆-34% </sup>`115.4 kB`** | <sup>*66x* </sup>`6,344ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-53% </sup>`411.0 kB` |       <sup>-34% </sup>`115.5 kB` | <sup>*37x* </sup>`3,568ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-53% </sup>`412.2 kB` |       <sup>-32% </sup>`118.3 kB` |   **<sup>🏆 </sup>`95ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-51% </sup>`423.4 kB` |       <sup>-33% </sup>`116.4 kB` | <sup>*13x* </sup>`1,268ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-51% </sup>`425.0 kB` |       <sup>-33% </sup>`116.3 kB` | <sup>*15x* </sup>`1,432ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-51% </sup>`425.6 kB` |       <sup>-28% </sup>`125.8 kB` | <sup>*86x* </sup>`8,239ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                                — |                          — |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                          — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                                — |                                — |                          — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.2 MB`
- Unminified Gzip size: `249.0 kB`

| Minifier                                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-48% </sup>`644.2 kB`** | **<sup>🏆-36% </sup>`158.6 kB`** |  <sup>*58x* </sup>`9,795ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                                             |       <sup>-48% </sup>`645.3 kB` |       <sup>-35% </sup>`161.4 kB` | <sup>*97x* </sup>`16,272ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-48% </sup>`647.0 kB` |       <sup>-34% </sup>`163.2 kB` |   **<sup>🏆 </sup>`167ms`** |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-48% </sup>`653.4 kB` |       <sup>-36% </sup>`159.1 kB` |  <sup>*30x* </sup>`5,026ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-47% </sup>`660.2 kB` |       <sup>-33% </sup>`167.1 kB` | <sup>*66x* </sup>`11,133ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-46% </sup>`675.4 kB` |       <sup>-35% </sup>`162.9 kB` |  <sup>*11x* </sup>`1,847ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-46% </sup>`675.6 kB` |       <sup>-35% </sup>`162.9 kB` |  <sup>*12x* </sup>`2,089ms` |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                                — |                                — |                           — |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.1 MB`
- Unminified Gzip size: `312.2 kB`

| Minifier                                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-67% </sup>`707.2 kB`** |       <sup>-49% </sup>`159.2 kB` | <sup>*57x* </sup>`13,870ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-66% </sup>`715.6 kB` | **<sup>🏆-49% </sup>`158.9 kB`** |  <sup>*29x* </sup>`7,069ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-66% </sup>`724.3 kB` |       <sup>-42% </sup>`180.5 kB` |   **<sup>🏆 </sup>`243ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-66% </sup>`727.1 kB` |       <sup>-42% </sup>`180.8 kB` | <sup>*58x* </sup>`14,194ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-65% </sup>`756.6 kB` |       <sup>-46% </sup>`167.6 kB` |  <sup>*10x* </sup>`2,436ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-64% </sup>`759.3 kB` |       <sup>-47% </sup>`166.6 kB` |  <sup>*11x* </sup>`2,703ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                                — |                           — |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                                — |                                — |                           — |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.2 MB`
- Unminified Gzip size: `689.7 kB`

| Minifier                                                                                                   |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-69% </sup>`983.8 kB`** |       <sup>-53% </sup>`326.1 kB` | <sup>*62x* </sup>`22,189ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-69% </sup>`998.0 kB` |       <sup>-52% </sup>`329.9 kB` | <sup>*54x* </sup>`19,433ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |         <sup>-69% </sup>`1.0 MB` | **<sup>🏆-53% </sup>`322.1 kB`** | <sup>*28x* </sup>`10,090ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |         <sup>-68% </sup>`1.0 MB` |       <sup>-52% </sup>`331.7 kB` |   **<sup>🏆 </sup>`357ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |         <sup>-67% </sup>`1.1 MB` |       <sup>-52% </sup>`331.7 kB` |   <sup>*8x* </sup>`3,212ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |         <sup>-66% </sup>`1.1 MB` |       <sup>-52% </sup>`330.7 kB` |  <sup>*12x* </sup>`4,516ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                                — |                                — |                           — |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                                — |                                — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                                — |                                — |                           — |
----
### [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1)
- Unminified size: `6.7 MB`
- Unminified Gzip size: `833.5 kB`

| Minifier                                                                                                   |                  Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------------------------------- | -----------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                                                   | **<sup>🏆-67% </sup>`2.2 MB`** | **<sup>🏆-45% </sup>`458.7 kB`** | <sup>*38x* </sup>`24,066ms` |
| [terser](/lib/minifiers/terser.js)                                                                         |       <sup>-66% </sup>`2.2 MB` |       <sup>-45% </sup>`461.4 kB` | <sup>*18x* </sup>`11,422ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js)                         |       <sup>-66% </sup>`2.3 MB` |       <sup>-41% </sup>`490.3 kB` | <sup>*34x* </sup>`21,553ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                                                       |       <sup>-65% </sup>`2.3 MB` |       <sup>-41% </sup>`491.2 kB` |   **<sup>🏆 </sup>`625ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                                           |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`483.0 kB` |   <sup>*7x* </sup>`4,506ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                                                 |       <sup>-64% </sup>`2.4 MB` |       <sup>-42% </sup>`479.9 kB` |   <sup>*8x* </sup>`5,125ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                                         |                              — |                                — |                           — |
| [google-closure-compiler.advanced](/lib/minifiers/google-closure-compiler.advanced.js) <sub>_Failed_</sub> |                              — |                                — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                                           |                              — |                                — |                           — |
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
