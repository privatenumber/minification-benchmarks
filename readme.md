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
- _"Minzipped size"_ measures how well the minified file compresses with Gzip
- Each table is sorted by smallest minzipped size in ascending order
- Each time is annotated with a multiplier relative to the fastest minifier
- Minified artifacts are validated by a smoke test
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
### [react v17.0.1](https://www.npmjs.com/package/react/v/17.0.1)
- Unminified size: `72.14 kB`
- Unminified Gzip size: `19.46 kB`

| Minifier                                                                           |                    Minified size |                  Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-68% </sup>`22.83 kB`** | **<sup>🏆-58% </sup>`8.21 kB`** |  <sup>*46x* </sup>`1,000ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*22x* </sup>`491ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |  <sup>*77x* </sup>`1,670ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-67% </sup>`23.74 kB` |       <sup>-56% </sup>`8.56 kB` |    **<sup>🏆 </sup>`22ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*8x* </sup>`187ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |    <sup>*10x* </sup>`225ms` |
| [swc](/lib/minifiers/swc.js)                                                       |       <sup>-66% </sup>`24.38 kB` |       <sup>-54% </sup>`8.91 kB` |      <sup>*1x* </sup>`31ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-55% </sup>`32.76 kB` |      <sup>-43% </sup>`11.10 kB` | <sup>*230x* </sup>`4,994ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.90 kB`
- Unminified Gzip size: `36.53 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-66% </sup>`58.33 kB`** | **<sup>🏆-49% </sup>`18.49 kB`** |  <sup>*79x* </sup>`2,403ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.59 kB` |  <sup>*42x* </sup>`1,271ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` | <sup>*106x* </sup>`3,223ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-66% </sup>`59.89 kB` |       <sup>-47% </sup>`19.30 kB` |    **<sup>🏆 </sup>`30ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*14x* </sup>`431ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*16x* </sup>`501ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-65% </sup>`60.94 kB` |       <sup>-46% </sup>`19.68 kB` | <sup>*178x* </sup>`5,393ms` |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.16 kB`
- Unminified Gzip size: `62.27 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-58% </sup>`94.18 kB`** | **<sup>🏆-50% </sup>`31.19 kB`** |  <sup>*50x* </sup>`2,303ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-57% </sup>`94.91 kB` |       <sup>-50% </sup>`31.25 kB` |  <sup>*27x* </sup>`1,253ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-57% </sup>`95.18 kB` |       <sup>-50% </sup>`31.44 kB` |  <sup>*77x* </sup>`3,501ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-57% </sup>`95.07 kB` |       <sup>-49% </sup>`31.76 kB` |    **<sup>🏆 </sup>`45ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |      <sup>-55% </sup>`101.18 kB` |       <sup>-48% </sup>`32.07 kB` |    <sup>*11x* </sup>`525ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |      <sup>-55% </sup>`101.05 kB` |       <sup>-48% </sup>`32.15 kB` |    <sup>*10x* </sup>`485ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-55% </sup>`99.44 kB` |       <sup>-47% </sup>`32.99 kB` | <sup>*135x* </sup>`6,169ms` |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.63 kB`
- Unminified Gzip size: `84.73 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-69% </sup>`88.83 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** |  <sup>*72x* </sup>`3,167ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*36x* </sup>`1,585ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-67% </sup>`94.25 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*12x* </sup>`559ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*14x* </sup>`623ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-68% </sup>`91.92 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*112x* </sup>`4,905ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-69% </sup>`90.23 kB` |       <sup>-62% </sup>`32.00 kB` |    **<sup>🏆 </sup>`44ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-67% </sup>`96.09 kB` |       <sup>-59% </sup>`34.34 kB` | <sup>*129x* </sup>`5,649ms` |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.10 kB`
- Unminified Gzip size: `97.26 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.58 kB`** |  <sup>*68x* </sup>`3,079ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` |  <sup>*97x* </sup>`4,361ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-87% </sup>`71.07 kB` |       <sup>-74% </sup>`25.15 kB` |  <sup>*39x* </sup>`1,771ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.89 kB` |    <sup>*13x* </sup>`623ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-87% </sup>`72.50 kB` |       <sup>-73% </sup>`26.14 kB` |    **<sup>🏆 </sup>`45ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*14x* </sup>`672ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-86% </sup>`77.39 kB` |       <sup>-73% </sup>`26.25 kB` | <sup>*126x* </sup>`5,702ms` |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.77 kB`
- Unminified Gzip size: `130.55 kB`

| Minifier                                                                           |                     Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-52% </sup>`265.30 kB`** | **<sup>🏆-33% </sup>`87.23 kB`** |   <sup>*85x* </sup>`8,653ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |   <sup>*40x* </sup>`4,026ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |   <sup>*12x* </sup>`1,277ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |   <sup>*16x* </sup>`1,645ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-51% </sup>`270.19 kB` |       <sup>-31% </sup>`90.63 kB` |    **<sup>🏆 </sup>`101ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-45% </sup>`306.40 kB` |      <sup>-22% </sup>`101.94 kB` | <sup>*100x* </sup>`10,104ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                 |                                 — |                                — |                            — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                 — |                                — |                            — |
----
### [terser v5.7.1](https://www.npmjs.com/package/terser/v/5.7.1)
- Unminified size: `869.97 kB`
- Unminified Gzip size: `174.60 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                       Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | -------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-53% </sup>`407.74 kB`** | **<sup>🏆-34% </sup>`115.42 kB`** | <sup>*73x* </sup>`6,565ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-53% </sup>`411.04 kB` |       <sup>-34% </sup>`115.53 kB` | <sup>*39x* </sup>`3,499ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-51% </sup>`424.97 kB` |       <sup>-33% </sup>`116.33 kB` | <sup>*15x* </sup>`1,406ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-51% </sup>`423.40 kB` |       <sup>-33% </sup>`116.37 kB` | <sup>*14x* </sup>`1,260ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-53% </sup>`412.20 kB` |       <sup>-32% </sup>`118.30 kB` |   **<sup>🏆 </sup>`89ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-51% </sup>`425.58 kB` |       <sup>-28% </sup>`125.77 kB` | <sup>*97x* </sup>`8,734ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                 |                                 — |                                 — |                          — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                 — |                                 — |                          — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.25 MB`
- Unminified Gzip size: `249.01 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |  <sup>*63x* </sup>`10,237ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-48% </sup>`653.42 kB` |       <sup>-36% </sup>`159.15 kB` |   <sup>*31x* </sup>`5,080ms` |
| [babel-minify](/lib/minifiers/babel-minify.js)                                     |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`161.44 kB` | <sup>*160x* </sup>`25,976ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*11x* </sup>`1,850ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*13x* </sup>`2,176ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-48% </sup>`646.98 kB` |       <sup>-34% </sup>`163.24 kB` |    **<sup>🏆 </sup>`162ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-47% </sup>`660.16 kB` |       <sup>-33% </sup>`167.13 kB` |  <sup>*71x* </sup>`11,664ms` |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                 — |                                 — |                            — |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.14 MB`
- Unminified Gzip size: `312.17 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-66% </sup>`715.63 kB` | **<sup>🏆-49% </sup>`158.91 kB`** |  <sup>*33x* </sup>`7,066ms` |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-67% </sup>`707.17 kB`** |       <sup>-49% </sup>`159.20 kB` | <sup>*67x* </sup>`14,386ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |  <sup>*13x* </sup>`2,788ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |  <sup>*11x* </sup>`2,498ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-66% </sup>`724.31 kB` |       <sup>-42% </sup>`180.46 kB` |   **<sup>🏆 </sup>`214ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-66% </sup>`727.13 kB` |       <sup>-42% </sup>`180.82 kB` | <sup>*62x* </sup>`13,361ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                 |                                 — |                                 — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                 — |                                 — |                           — |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.20 MB`
- Unminified Gzip size: `689.67 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser](/lib/minifiers/terser.js)                                                 |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`322.11 kB`** | <sup>*25x* </sup>`10,394ms` |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-69% </sup>`983.76 kB`** |       <sup>-53% </sup>`326.06 kB` | <sup>*58x* </sup>`24,076ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-69% </sup>`997.97 kB` |       <sup>-52% </sup>`329.90 kB` | <sup>*61x* </sup>`25,115ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*11x* </sup>`4,647ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |   **<sup>🏆 </sup>`411ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |   <sup>*8x* </sup>`3,305ms` |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                 |                                 — |                                 — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                                 — |                                 — |                           — |
----
### [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1)
- Unminified size: `6.69 MB`
- Unminified Gzip size: `833.49 kB`

| Minifier                                                                           |                   Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.js)                                           | **<sup>🏆-67% </sup>`2.23 MB`** | **<sup>🏆-45% </sup>`458.73 kB`** | <sup>*44x* </sup>`30,382ms` |
| [terser](/lib/minifiers/terser.js)                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`461.39 kB` | <sup>*21x* </sup>`14,308ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.js)                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |   <sup>*9x* </sup>`6,408ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.js)                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |   <sup>*7x* </sup>`5,376ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.js) |       <sup>-66% </sup>`2.27 MB` |       <sup>-41% </sup>`490.34 kB` | <sup>*45x* </sup>`30,714ms` |
| [esbuild](/lib/minifiers/esbuild.js)                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.15 kB` |   **<sup>🏆 </sup>`681ms`** |
| [babel-minify](/lib/minifiers/babel-minify.js) <sub>_Failed_</sub>                 |                               — |                                 — |                           — |
| [swc](/lib/minifiers/swc.js) <sub>_Failed_</sub>                                   |                               — |                                 — |                           — |
<!-- benchmarks:end -->

---

_Want to see more projects listed?_ PRs welcome! See the [contribution guide](/.github/CONTRIBUTING.md) for more info.

## 🥇 Results

### Best minification performance
[UglifyJS](https://github.com/mishoo/UglifyJS) takes first place for the smallest uncompressed minified size for all races, and wins 9 out of 11 races for minzipped size! Impressively, it's still written in ES5 but can handle ES6 up to ES2020.

[Terser](https://github.com/terser/terser) takes a very close second, only short by at most by 1% in minzipped size while performing twice as fast as Uglify! Terser is a fork of UglifyJS and comes with support for ES6+.

### Fastest minifier
[esbuild](https://github.com/evanw/esbuild) runs _10x_+ laps around everyone else! The Go-lang JS minifier/bundler is a beast of its own. Not only is it insanely fast, but demonstrates very competitive minification abilities, usually performing closely to Terser while supporting cutting-edge [ESNext syntax](https://esbuild.github.io/content-types/#javascript). However, note that esbuild has a [limited set of optimizations](https://github.com/evanw/esbuild/issues/639#:~:text=i%20can%20add%20a%20caveat%20to%20esbuild's%20minification%20documentation%20about%20code%20optimizations%20that%20are%20not%20included%20in%20esbuild.%20i%20think%20the%20list%20of%20possible%20code%20optimizations%20that%20esbuild%20doesn't%20do%20would%20be%20something%20like%20this%3A) and there are currently [no plans to improve it](https://github.com/evanw/esbuild/issues/639#issuecomment-792033958).

_⚡️ Pro Tip: Harness the speed of esbuild in your Webpack build for minification (and even transpilation) with [esbuild-loader](https://github.com/privatenumber/esbuild-loader)._

Definitely keep an eye out for [swc](https://github.com/swc-project/swc), the JS compiler written in Rust. It's also blazing fast and rumor has it they're stepping up their minification.
