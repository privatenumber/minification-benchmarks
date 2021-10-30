# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

The following JavaScript minifiers are benchmarked to compare quality and speed:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Oct 30, 2021<!-- lastUpdated:end -->._

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process with a 1 minute timeout
- _"Time"_ is the average of 5 consecutive runs
- _"Minzipped size"_ (minified & gzipped) measures how well the minified file compresses with Gzip
- Results are sorted by smallest minzipped size
- Each _"Time"_ is annotated with a multiplier relative to the fastest minifier
- Minified artifacts are validated by a smoke test
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                          | Original size |  Gzip size |
| :---------------------------------------------------------------- | ------------: | ---------: |
| [**react v17.0.1**](https://www.npmjs.com/package/react/v/17.0.1) |    `72.14 kB` | `19.46 kB` |

| Minifier                                                                           |                    Minified size |                  Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-68% </sup>`22.83 kB`** | **<sup>🏆-58% </sup>`8.21 kB`** |    <sup>*48x* </sup>`971 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*23x* </sup>`470 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.33 kB` |      <sup>*2x* </sup>`44 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |  <sup>*65x* </sup>`1,301 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-67% </sup>`23.73 kB` |       <sup>-56% </sup>`8.56 kB` |    **<sup>🏆 </sup>`20 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*8x* </sup>`173 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |    <sup>*11x* </sup>`222 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-55% </sup>`32.76 kB` |      <sup>-43% </sup>`11.10 kB` | <sup>*251x* </sup>`5,034 ms` |
----
| Artifact                                                            | Original size |  Gzip size |
| :------------------------------------------------------------------ | ------------: | ---------: |
| [**moment v2.29.1**](https://www.npmjs.com/package/moment/v/2.29.1) |   `173.90 kB` | `36.53 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-66% </sup>`58.33 kB`** | **<sup>🏆-49% </sup>`18.49 kB`** |  <sup>*78x* </sup>`2,268 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`59.05 kB` |       <sup>-49% </sup>`18.59 kB` |  <sup>*42x* </sup>`1,228 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` | <sup>*104x* </sup>`3,011 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`58.97 kB` |       <sup>-49% </sup>`18.80 kB` |      <sup>*3x* </sup>`98 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`59.88 kB` |       <sup>-47% </sup>`19.30 kB` |    **<sup>🏆 </sup>`29 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*14x* </sup>`404 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*17x* </sup>`501 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-65% </sup>`60.94 kB` |       <sup>-46% </sup>`19.68 kB` | <sup>*186x* </sup>`5,352 ms` |
----
| Artifact                                                      | Original size |  Gzip size |
| :------------------------------------------------------------ | ------------: | ---------: |
| [**vue v2.6.12**](https://www.npmjs.com/package/vue/v/2.6.12) |   `223.16 kB` | `62.27 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-58% </sup>`94.18 kB`** | **<sup>🏆-50% </sup>`31.19 kB`** |  <sup>*58x* </sup>`2,343 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-57% </sup>`94.91 kB` |       <sup>-50% </sup>`31.25 kB` |  <sup>*32x* </sup>`1,308 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-57% </sup>`94.87 kB` |       <sup>-50% </sup>`31.35 kB` |     <sup>*3x* </sup>`122 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-57% </sup>`95.18 kB` |       <sup>-50% </sup>`31.44 kB` |  <sup>*84x* </sup>`3,418 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-57% </sup>`95.06 kB` |       <sup>-49% </sup>`31.76 kB` |    **<sup>🏆 </sup>`40 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |      <sup>-55% </sup>`101.18 kB` |       <sup>-48% </sup>`32.07 kB` |    <sup>*14x* </sup>`586 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |      <sup>-55% </sup>`101.05 kB` |       <sup>-48% </sup>`32.15 kB` |    <sup>*12x* </sup>`504 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-55% </sup>`99.44 kB` |       <sup>-47% </sup>`32.99 kB` | <sup>*143x* </sup>`5,797 ms` |
----
| Artifact                                                          | Original size |  Gzip size |
| :---------------------------------------------------------------- | ------------: | ---------: |
| [**jquery v3.5.1**](https://www.npmjs.com/package/jquery/v/3.5.1) |   `287.63 kB` | `84.73 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-69% </sup>`88.83 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** |  <sup>*74x* </sup>`3,159 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*39x* </sup>`1,666 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-69% </sup>`89.35 kB` |       <sup>-63% </sup>`31.09 kB` |     <sup>*4x* </sup>`176 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-67% </sup>`94.25 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*13x* </sup>`580 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*15x* </sup>`670 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-68% </sup>`91.92 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*117x* </sup>`4,979 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-69% </sup>`90.20 kB` |       <sup>-62% </sup>`31.98 kB` |    **<sup>🏆 </sup>`42 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-67% </sup>`96.09 kB` |       <sup>-59% </sup>`34.34 kB` | <sup>*144x* </sup>`6,106 ms` |
----
| Artifact                                                              | Original size |  Gzip size |
| :-------------------------------------------------------------------- | ------------: | ---------: |
| [**lodash v4.17.21**](https://www.npmjs.com/package/lodash/v/4.17.21) |   `544.10 kB` | `97.26 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.58 kB`** |  <sup>*74x* </sup>`3,202 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` | <sup>*103x* </sup>`4,448 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-87% </sup>`71.07 kB` |       <sup>-74% </sup>`25.16 kB` |  <sup>*42x* </sup>`1,821 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-86% </sup>`73.89 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*6x* </sup>`289 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.89 kB` |    <sup>*14x* </sup>`638 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.14 kB` |    **<sup>🏆 </sup>`43 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*17x* </sup>`734 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-86% </sup>`77.39 kB` |       <sup>-73% </sup>`26.25 kB` | <sup>*148x* </sup>`6,376 ms` |
----
| Artifact                                                  | Original size |   Gzip size |
| :-------------------------------------------------------- | ------------: | ----------: |
| [**d3 v6.3.1**](https://www.npmjs.com/package/d3/v/6.3.1) |   `555.77 kB` | `130.55 kB` |

| Minifier                                                                           |                     Minified size |                   Minzipped size |                          Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ----------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-52% </sup>`265.30 kB`** | **<sup>🏆-33% </sup>`87.23 kB`** |   <sup>*96x* </sup>`9,113 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |   <sup>*46x* </sup>`4,370 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |   <sup>*14x* </sup>`1,359 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |   <sup>*19x* </sup>`1,858 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-51% </sup>`270.88 kB` |       <sup>-31% </sup>`90.05 kB` |   <sup>*12x* </sup>`1,165 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-51% </sup>`270.19 kB` |       <sup>-31% </sup>`90.63 kB` |     **<sup>🏆 </sup>`94 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-45% </sup>`306.40 kB` |      <sup>-22% </sup>`101.94 kB` | <sup>*110x* </sup>`10,408 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                — |                             — |
----
| Artifact                                                          | Original size |   Gzip size |
| :---------------------------------------------------------------- | ------------: | ----------: |
| [**terser v5.9.0**](https://www.npmjs.com/package/terser/v/5.9.0) |   `900.82 kB` | `180.72 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-54% </sup>`410.97 kB`** | **<sup>🏆-36% </sup>`116.48 kB`** |  <sup>*76x* </sup>`7,044 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-54% </sup>`414.42 kB` |       <sup>-35% </sup>`116.65 kB` |  <sup>*41x* </sup>`3,831 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-52% </sup>`428.63 kB` |       <sup>-35% </sup>`117.53 kB` |  <sup>*17x* </sup>`1,648 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-53% </sup>`427.11 kB` |       <sup>-35% </sup>`117.61 kB` |  <sup>*14x* </sup>`1,352 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-54% </sup>`414.85 kB` |       <sup>-35% </sup>`117.77 kB` |     <sup>*5x* </sup>`506 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-54% </sup>`415.58 kB` |       <sup>-34% </sup>`119.42 kB` |    **<sup>🏆 </sup>`93 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-52% </sup>`429.18 kB` |       <sup>-30% </sup>`127.06 kB` | <sup>*100x* </sup>`9,313 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                            — |
----
| Artifact                                                            | Original size |   Gzip size |
| :------------------------------------------------------------------ | ------------: | ----------: |
| [**three v0.124.0**](https://www.npmjs.com/package/three/v/0.124.0) |     `1.25 MB` | `249.01 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                          Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |  <sup>*68x* </sup>`10,708 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-48% </sup>`653.37 kB` |       <sup>-36% </sup>`159.13 kB` |   <sup>*35x* </sup>`5,466 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-48% </sup>`649.78 kB` |       <sup>-36% </sup>`160.07 kB` |    <sup>*7x* </sup>`1,169 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`161.44 kB` | <sup>*123x* </sup>`19,233 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*12x* </sup>`1,934 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*15x* </sup>`2,452 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-48% </sup>`646.98 kB` |       <sup>-34% </sup>`163.24 kB` |    **<sup>🏆 </sup>`156 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-47% </sup>`660.12 kB` |       <sup>-33% </sup>`167.10 kB` |  <sup>*80x* </sup>`12,535 ms` |
----
| Artifact                                                              | Original size |   Gzip size |
| :-------------------------------------------------------------------- | ------------: | ----------: |
| [**victory v35.8.4**](https://www.npmjs.com/package/victory/v/35.8.4) |     `2.14 MB` | `312.17 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-49% </sup>`159.01 kB`** |  <sup>*36x* </sup>`7,770 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-67% </sup>`707.17 kB`** |       <sup>-49% </sup>`159.20 kB` | <sup>*72x* </sup>`15,364 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`716.98 kB` |       <sup>-48% </sup>`160.99 kB` |   <sup>*7x* </sup>`1,484 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |  <sup>*14x* </sup>`3,105 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |  <sup>*12x* </sup>`2,655 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`724.29 kB` |       <sup>-42% </sup>`180.44 kB` |   **<sup>🏆 </sup>`212 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-66% </sup>`727.13 kB` |       <sup>-42% </sup>`180.82 kB` | <sup>*68x* </sup>`14,410 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                            — |
----
| Artifact                                                            | Original size |   Gzip size |
| :------------------------------------------------------------------ | ------------: | ----------: |
| [**echarts v5.1.1**](https://www.npmjs.com/package/echarts/v/5.1.1) |     `3.20 MB` | `689.67 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                 |         <sup>-69% </sup>`1.00 MB` | **<sup>🏆-53% </sup>`322.12 kB`** | <sup>*33x* </sup>`11,319 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-69% </sup>`983.77 kB`** |       <sup>-53% </sup>`326.09 kB` | <sup>*74x* </sup>`25,121 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-69% </sup>`997.97 kB` |       <sup>-52% </sup>`329.90 kB` | <sup>*59x* </sup>`19,906 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |         <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*15x* </sup>`5,262 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |         <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |   **<sup>🏆 </sup>`337 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |         <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |  <sup>*10x* </sup>`3,504 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                                 — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Failed_</sub>                                   |                                 — |                                 — |                            — |
----
| Artifact                                                        | Original size |   Gzip size |
| :-------------------------------------------------------------- | ------------: | ----------: |
| [**antd v4.16.1**](https://www.npmjs.com/package/antd/v/4.16.1) |     `6.69 MB` | `833.49 kB` |

| Minifier                                                                           |                   Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-67% </sup>`2.23 MB`** | **<sup>🏆-45% </sup>`458.73 kB`** | <sup>*43x* </sup>`26,969 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`2.25 MB` |       <sup>-45% </sup>`461.42 kB` | <sup>*20x* </sup>`12,723 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`2.28 MB` |       <sup>-44% </sup>`463.44 kB` |   <sup>*5x* </sup>`3,561 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |   <sup>*9x* </sup>`5,997 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |   <sup>*7x* </sup>`4,873 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-66% </sup>`2.27 MB` |       <sup>-41% </sup>`490.34 kB` | <sup>*52x* </sup>`32,638 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.09 kB` |   **<sup>🏆 </sup>`625 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed_</sub>                 |                               — |                                 — |                            — |
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
