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
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-68% </sup>`22.83 kB`** | **<sup>🏆-58% </sup>`8.21 kB`** |    <sup>*46x* </sup>`887ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*21x* </sup>`419ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |  <sup>*61x* </sup>`1,183ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-67% </sup>`23.74 kB` |       <sup>-56% </sup>`8.56 kB` |    **<sup>🏆 </sup>`19ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*8x* </sup>`163ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |     <sup>*9x* </sup>`187ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-67% </sup>`23.73 kB` |       <sup>-53% </sup>`9.15 kB` |      <sup>*1x* </sup>`32ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-55% </sup>`32.76 kB` |      <sup>-43% </sup>`11.10 kB` | <sup>*224x* </sup>`4,294ms` |
----
### [moment v2.29.1](https://www.npmjs.com/package/moment/v/2.29.1)
- Unminified size: `173.90 kB`
- Unminified Gzip size: `36.53 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-66% </sup>`58.33 kB`** | **<sup>🏆-49% </sup>`18.49 kB`** |  <sup>*75x* </sup>`2,048ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`59.06 kB` |       <sup>-49% </sup>`18.59 kB` |  <sup>*40x* </sup>`1,086ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` | <sup>*100x* </sup>`2,725ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`59.89 kB` |       <sup>-47% </sup>`19.30 kB` |    **<sup>🏆 </sup>`27ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*13x* </sup>`359ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*15x* </sup>`428ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-65% </sup>`60.94 kB` |       <sup>-46% </sup>`19.68 kB` | <sup>*186x* </sup>`5,044ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-64% </sup>`63.28 kB` |       <sup>-37% </sup>`22.84 kB` |      <sup>*2x* </sup>`76ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Unminified size: `223.16 kB`
- Unminified Gzip size: `62.27 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-58% </sup>`94.18 kB`** | **<sup>🏆-50% </sup>`31.19 kB`** |  <sup>*57x* </sup>`2,156ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-57% </sup>`94.91 kB` |       <sup>-50% </sup>`31.25 kB` |  <sup>*31x* </sup>`1,191ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-57% </sup>`95.18 kB` |       <sup>-50% </sup>`31.44 kB` |  <sup>*80x* </sup>`3,062ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-57% </sup>`95.07 kB` |       <sup>-49% </sup>`31.76 kB` |    **<sup>🏆 </sup>`38ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |      <sup>-55% </sup>`101.18 kB` |       <sup>-48% </sup>`32.07 kB` |    <sup>*13x* </sup>`493ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |      <sup>-55% </sup>`101.05 kB` |       <sup>-48% </sup>`32.15 kB` |    <sup>*12x* </sup>`470ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-55% </sup>`99.44 kB` |       <sup>-47% </sup>`32.99 kB` | <sup>*138x* </sup>`5,219ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |      <sup>-54% </sup>`101.83 kB` |       <sup>-39% </sup>`37.91 kB` |     <sup>*3x* </sup>`128ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Unminified size: `287.63 kB`
- Unminified Gzip size: `84.73 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-69% </sup>`88.83 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** |  <sup>*75x* </sup>`2,879ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*38x* </sup>`1,494ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-67% </sup>`94.25 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*13x* </sup>`535ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*14x* </sup>`555ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-68% </sup>`91.92 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*116x* </sup>`4,470ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-69% </sup>`90.23 kB` |       <sup>-62% </sup>`32.00 kB` |    **<sup>🏆 </sup>`38ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-67% </sup>`96.09 kB` |       <sup>-59% </sup>`34.34 kB` | <sup>*144x* </sup>`5,554ms` |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [lodash v4.17.21](https://www.npmjs.com/package/lodash/v/4.17.21)
- Unminified size: `544.10 kB`
- Unminified Gzip size: `97.26 kB`

| Minifier                                                                           |                    Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.58 kB`** |  <sup>*66x* </sup>`2,846ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` |  <sup>*93x* </sup>`3,971ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-87% </sup>`71.07 kB` |       <sup>-74% </sup>`25.15 kB` |  <sup>*38x* </sup>`1,623ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.89 kB` |    <sup>*13x* </sup>`559ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-87% </sup>`72.50 kB` |       <sup>-73% </sup>`26.14 kB` |    **<sup>🏆 </sup>`43ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*14x* </sup>`623ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-86% </sup>`77.39 kB` |       <sup>-73% </sup>`26.25 kB` | <sup>*130x* </sup>`5,562ms` |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                — |                                — |                           — |
----
### [d3 v6.3.1](https://www.npmjs.com/package/d3/v/6.3.1)
- Unminified size: `555.77 kB`
- Unminified Gzip size: `130.55 kB`

| Minifier                                                                           |                     Minified size |                   Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-52% </sup>`265.30 kB`** | **<sup>🏆-33% </sup>`87.23 kB`** |  <sup>*90x* </sup>`8,178ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |  <sup>*42x* </sup>`3,831ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |  <sup>*13x* </sup>`1,252ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |  <sup>*17x* </sup>`1,591ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-51% </sup>`270.19 kB` |       <sup>-31% </sup>`90.63 kB` |    **<sup>🏆 </sup>`91ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-45% </sup>`306.40 kB` |      <sup>-22% </sup>`101.94 kB` | <sup>*103x* </sup>`9,431ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                — |                           — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                — |                           — |
----
### [terser v5.7.1](https://www.npmjs.com/package/terser/v/5.7.1)
- Unminified size: `869.97 kB`
- Unminified Gzip size: `174.60 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                       Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | -------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-53% </sup>`407.74 kB`** | **<sup>🏆-34% </sup>`115.42 kB`** | <sup>*69x* </sup>`6,160ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-53% </sup>`411.04 kB` |       <sup>-34% </sup>`115.53 kB` | <sup>*37x* </sup>`3,308ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-51% </sup>`424.97 kB` |       <sup>-33% </sup>`116.33 kB` | <sup>*15x* </sup>`1,364ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-51% </sup>`423.40 kB` |       <sup>-33% </sup>`116.37 kB` | <sup>*13x* </sup>`1,221ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-53% </sup>`412.20 kB` |       <sup>-32% </sup>`118.30 kB` |   **<sup>🏆 </sup>`89ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-51% </sup>`425.58 kB` |       <sup>-28% </sup>`125.77 kB` | <sup>*92x* </sup>`8,272ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                          — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                 — |                          — |
----
### [three v0.124.0](https://www.npmjs.com/package/three/v/0.124.0)
- Unminified size: `1.25 MB`
- Unminified Gzip size: `249.01 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |   <sup>*68x* </sup>`9,638ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-48% </sup>`653.42 kB` |       <sup>-36% </sup>`159.15 kB` |   <sup>*33x* </sup>`4,773ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`161.44 kB` | <sup>*123x* </sup>`17,493ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*12x* </sup>`1,765ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*14x* </sup>`2,046ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-48% </sup>`646.98 kB` |       <sup>-34% </sup>`163.24 kB` |    **<sup>🏆 </sup>`141ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-47% </sup>`660.12 kB` |       <sup>-33% </sup>`167.10 kB` |  <sup>*78x* </sup>`11,097ms` |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                 — |                            — |
----
### [victory v35.8.4](https://www.npmjs.com/package/victory/v/35.8.4)
- Unminified size: `2.14 MB`
- Unminified Gzip size: `312.17 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`715.63 kB` | **<sup>🏆-49% </sup>`158.91 kB`** |  <sup>*32x* </sup>`6,702ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-67% </sup>`707.17 kB`** |       <sup>-49% </sup>`159.20 kB` | <sup>*66x* </sup>`13,667ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |  <sup>*12x* </sup>`2,662ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |  <sup>*11x* </sup>`2,361ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`724.31 kB` |       <sup>-42% </sup>`180.46 kB` |   **<sup>🏆 </sup>`207ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-66% </sup>`727.13 kB` |       <sup>-42% </sup>`180.82 kB` | <sup>*62x* </sup>`12,881ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                           — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                 — |                           — |
----
### [echarts v5.1.1](https://www.npmjs.com/package/echarts/v/5.1.1)
- Unminified size: `3.20 MB`
- Unminified Gzip size: `689.67 kB`

| Minifier                                                                           |                     Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                 |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`322.11 kB`** |  <sup>*30x* </sup>`9,927ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-69% </sup>`983.76 kB`** |       <sup>-53% </sup>`326.06 kB` | <sup>*70x* </sup>`22,901ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-69% </sup>`997.97 kB` |       <sup>-52% </sup>`329.90 kB` | <sup>*57x* </sup>`18,806ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*13x* </sup>`4,475ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |   **<sup>🏆 </sup>`326ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |   <sup>*9x* </sup>`3,123ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                           — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                 — |                           — |
----
### [antd v4.16.1](https://www.npmjs.com/package/antd/v/4.16.1)
- Unminified size: `6.69 MB`
- Unminified Gzip size: `833.49 kB`

| Minifier                                                                           |                   Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-67% </sup>`2.23 MB`** | **<sup>🏆-45% </sup>`458.73 kB`** | <sup>*32x* </sup>`25,879ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`461.39 kB` | <sup>*14x* </sup>`11,422ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |   <sup>*6x* </sup>`5,118ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |   <sup>*5x* </sup>`4,480ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-66% </sup>`2.27 MB` |       <sup>-41% </sup>`490.34 kB` | <sup>*31x* </sup>`25,821ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.15 kB` |   **<sup>🏆 </sup>`807ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                               — |                                 — |                           — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                               — |                                 — |                           — |
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
