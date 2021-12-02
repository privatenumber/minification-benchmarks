# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

The following JavaScript minifiers are benchmarked to compare quality and speed:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [google-closure-compiler](https://github.com/google/closure-compiler-npm/tree/master/packages/google-closure-compiler)
- [swc](https://github.com/swc-project/swc)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

_Benchmarks last updated on <!-- lastUpdated:start -->Dec 2, 2021<!-- lastUpdated:end -->._

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 👟 Methodology

- Each minifier is executed in its own process with a 20 second timeout
- _"Time"_ is the average of 5 consecutive runs
- _"Minzipped size"_ (minified & gzipped) measures how well the minified file compresses with Gzip
- Results are sorted by smallest minzipped size
- Each _"Time"_ is annotated with a multiplier relative to the fastest minifier
- Minified artifacts are validated by a smoke test
- Minified artifacts can be downloaded and verified in each [action run](https://github.com/privatenumber/minification-benchmarks/actions/workflows/benchmark.yml)

## 📋 Results

<!-- benchmarks:start -->
| Artifact                                                                                                                              | Original size |  Gzip size |
| :------------------------------------------------------------------------------------------------------------------------------------ | ------------: | ---------: |
| [**react v17.0.1**](https://www.npmjs.com/package/react/v/17.0.1) ([Source](https://unpkg.com/react@17.0.1/cjs/react.development.js)) |    `72.14 kB` | `19.46 kB` |

| Minifier                                                                           |                    Minified size |                  Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | ------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-68% </sup>`22.83 kB`** | **<sup>🏆-58% </sup>`8.21 kB`** |  <sup>*47x* </sup>`1,014 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-68% </sup>`23.12 kB` |       <sup>-57% </sup>`8.29 kB` |    <sup>*23x* </sup>`510 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-68% </sup>`23.10 kB` |       <sup>-57% </sup>`8.33 kB` |      <sup>*2x* </sup>`46 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-67% </sup>`23.53 kB` |       <sup>-57% </sup>`8.38 kB` |  <sup>*58x* </sup>`1,256 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-67% </sup>`23.73 kB` |       <sup>-56% </sup>`8.56 kB` |    **<sup>🏆 </sup>`21 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`25.06 kB` |       <sup>-56% </sup>`8.65 kB` |     <sup>*8x* </sup>`192 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-65% </sup>`25.08 kB` |       <sup>-55% </sup>`8.72 kB` |    <sup>*11x* </sup>`242 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-55% </sup>`32.76 kB` |      <sup>-43% </sup>`11.10 kB` | <sup>*228x* </sup>`4,870 ms` |
----
| Artifact                                                                                                                  | Original size |  Gzip size |
| :------------------------------------------------------------------------------------------------------------------------ | ------------: | ---------: |
| [**moment v2.29.1**](https://www.npmjs.com/package/moment/v/2.29.1) ([Source](https://unpkg.com/moment@2.29.1/moment.js)) |   `173.90 kB` | `36.53 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-66% </sup>`58.33 kB`** | **<sup>🏆-49% </sup>`18.49 kB`** |  <sup>*67x* </sup>`2,270 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`59.05 kB` |       <sup>-49% </sup>`18.59 kB` |  <sup>*38x* </sup>`1,303 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-66% </sup>`59.11 kB` |       <sup>-49% </sup>`18.67 kB` |  <sup>*88x* </sup>`2,960 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`58.98 kB` |       <sup>-49% </sup>`18.79 kB` |     <sup>*3x* </sup>`103 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`59.88 kB` |       <sup>-47% </sup>`19.30 kB` |    **<sup>🏆 </sup>`34 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-64% </sup>`63.01 kB` |       <sup>-47% </sup>`19.53 kB` |    <sup>*12x* </sup>`410 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`63.15 kB` |       <sup>-46% </sup>`19.60 kB` |    <sup>*16x* </sup>`539 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-65% </sup>`60.94 kB` |       <sup>-46% </sup>`19.68 kB` | <sup>*157x* </sup>`5,292 ms` |
----
| Artifact                                                                                                                    | Original size |  Gzip size |
| :-------------------------------------------------------------------------------------------------------------------------- | ------------: | ---------: |
| [**jquery v3.5.1**](https://www.npmjs.com/package/jquery/v/3.5.1) ([Source](https://unpkg.com/jquery@3.5.1/dist/jquery.js)) |   `287.63 kB` | `84.73 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-69% </sup>`88.83 kB`** | **<sup>🏆-63% </sup>`30.97 kB`** |  <sup>*72x* </sup>`3,242 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-69% </sup>`89.88 kB` |       <sup>-63% </sup>`31.02 kB` |  <sup>*37x* </sup>`1,696 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-69% </sup>`89.35 kB` |       <sup>-63% </sup>`31.09 kB` |     <sup>*4x* </sup>`184 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-67% </sup>`94.25 kB` |       <sup>-63% </sup>`31.58 kB` |    <sup>*12x* </sup>`582 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-67% </sup>`94.55 kB` |       <sup>-63% </sup>`31.69 kB` |    <sup>*14x* </sup>`657 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-68% </sup>`91.92 kB` |       <sup>-63% </sup>`31.73 kB` | <sup>*104x* </sup>`4,682 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-69% </sup>`90.20 kB` |       <sup>-62% </sup>`31.98 kB` |    **<sup>🏆 </sup>`45 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-67% </sup>`96.09 kB` |       <sup>-59% </sup>`34.34 kB` | <sup>*134x* </sup>`6,038 ms` |
----
| Artifact                                                                                                           | Original size |  Gzip size |
| :----------------------------------------------------------------------------------------------------------------- | ------------: | ---------: |
| [**vue v2.6.12**](https://www.npmjs.com/package/vue/v/2.6.12) ([Source](https://unpkg.com/vue@2.6.12/dist/vue.js)) |   `342.15 kB` | `90.12 kB` |

| Minifier                                                                           |                     Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-66% </sup>`115.10 kB`** | **<sup>🏆-53% </sup>`42.58 kB`** |  <sup>*76x* </sup>`4,219 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`116.77 kB` |       <sup>-52% </sup>`42.91 kB` |  <sup>*36x* </sup>`2,031 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`116.92 kB` |       <sup>-52% </sup>`43.00 kB` |     <sup>*5x* </sup>`284 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-66% </sup>`117.61 kB` |       <sup>-51% </sup>`43.72 kB` |  <sup>*92x* </sup>`5,126 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-65% </sup>`118.31 kB` |       <sup>-51% </sup>`44.29 kB` |    **<sup>🏆 </sup>`55 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-63% </sup>`126.39 kB` |       <sup>-51% </sup>`44.47 kB` |    <sup>*11x* </sup>`659 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-63% </sup>`126.58 kB` |       <sup>-50% </sup>`44.64 kB` |    <sup>*14x* </sup>`825 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-65% </sup>`120.01 kB` |       <sup>-50% </sup>`45.42 kB` | <sup>*122x* </sup>`6,752 ms` |
----
| Artifact                                                                                                                     | Original size |  Gzip size |
| :--------------------------------------------------------------------------------------------------------------------------- | ------------: | ---------: |
| [**lodash v4.17.21**](https://www.npmjs.com/package/lodash/v/4.17.21) ([Source](https://unpkg.com/lodash@4.17.21/lodash.js)) |   `544.10 kB` | `97.26 kB` |

| Minifier                                                                           |                    Minified size |                   Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | -------------------------------: | -------------------------------: | ---------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-87% </sup>`69.66 kB`** | **<sup>🏆-75% </sup>`24.58 kB`** |  <sup>*55x* </sup>`3,211 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-87% </sup>`71.81 kB` |       <sup>-74% </sup>`25.13 kB` |  <sup>*70x* </sup>`4,105 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-87% </sup>`71.07 kB` |       <sup>-74% </sup>`25.16 kB` |  <sup>*32x* </sup>`1,863 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-86% </sup>`73.89 kB` |       <sup>-74% </sup>`25.18 kB` |     <sup>*5x* </sup>`296 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-86% </sup>`75.44 kB` |       <sup>-73% </sup>`25.89 kB` |    <sup>*10x* </sup>`633 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-87% </sup>`72.49 kB` |       <sup>-73% </sup>`26.14 kB` |    **<sup>🏆 </sup>`58 ms`** |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-86% </sup>`75.67 kB` |       <sup>-73% </sup>`26.17 kB` |    <sup>*13x* </sup>`755 ms` |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-86% </sup>`77.39 kB` |       <sup>-73% </sup>`26.25 kB` | <sup>*103x* </sup>`6,021 ms` |
----
| Artifact                                                                                                    | Original size |   Gzip size |
| :---------------------------------------------------------------------------------------------------------- | ------------: | ----------: |
| [**d3 v6.3.1**](https://www.npmjs.com/package/d3/v/6.3.1) ([Source](https://unpkg.com/d3@6.3.1/dist/d3.js)) |   `555.77 kB` | `130.55 kB` |

| Minifier                                                                           |                     Minified size |                   Minzipped size |                          Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | -------------------------------: | ----------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-52% </sup>`265.30 kB`** | **<sup>🏆-33% </sup>`87.23 kB`** |   <sup>*88x* </sup>`8,708 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-52% </sup>`267.99 kB` |       <sup>-33% </sup>`87.92 kB` |   <sup>*42x* </sup>`4,135 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-50% </sup>`276.12 kB` |       <sup>-32% </sup>`88.63 kB` |   <sup>*14x* </sup>`1,404 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-50% </sup>`276.47 kB` |       <sup>-32% </sup>`89.16 kB` |   <sup>*18x* </sup>`1,780 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-51% </sup>`270.89 kB` |       <sup>-31% </sup>`90.05 kB` |   <sup>*12x* </sup>`1,245 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-51% </sup>`270.19 kB` |       <sup>-31% </sup>`90.63 kB` |     **<sup>🏆 </sup>`98 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-45% </sup>`306.40 kB` |      <sup>-22% </sup>`101.94 kB` | <sup>*102x* </sup>`10,091 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>       |                                 — |                                — |                             — |
----
| Artifact                                                                                                                        | Original size |   Gzip size |
| :------------------------------------------------------------------------------------------------------------------------------ | ------------: | ----------: |
| [**terser v5.9.0**](https://www.npmjs.com/package/terser/v/5.9.0) ([Source](https://unpkg.com/terser@5.9.0/dist/bundle.min.js)) |   `900.82 kB` | `180.72 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                        Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | --------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-54% </sup>`410.97 kB`** | **<sup>🏆-36% </sup>`116.47 kB`** | <sup>*66x* </sup>`6,705 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-54% </sup>`414.42 kB` |       <sup>-35% </sup>`116.65 kB` | <sup>*37x* </sup>`3,740 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-52% </sup>`428.63 kB` |       <sup>-35% </sup>`117.53 kB` | <sup>*15x* </sup>`1,579 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-53% </sup>`427.11 kB` |       <sup>-35% </sup>`117.61 kB` | <sup>*12x* </sup>`1,293 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-54% </sup>`415.58 kB` |       <sup>-34% </sup>`119.42 kB` |  **<sup>🏆 </sup>`101 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-52% </sup>`429.18 kB` |       <sup>-30% </sup>`127.06 kB` | <sup>*92x* </sup>`9,304 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>       |                                 — |                                 — |                           — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: TypeError_</sub>                |                                 — |                                 — |                           — |
----
| Artifact                                                                                                                       | Original size |   Gzip size |
| :----------------------------------------------------------------------------------------------------------------------------- | ------------: | ----------: |
| [**three v0.124.0**](https://www.npmjs.com/package/three/v/0.124.0) ([Source](https://unpkg.com/three@0.124.0/build/three.js)) |     `1.25 MB` | `249.01 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                          Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ----------------------------: |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-48% </sup>`644.18 kB`** | **<sup>🏆-36% </sup>`158.60 kB`** |  <sup>*63x* </sup>`10,212 ms` |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-48% </sup>`653.37 kB` |       <sup>-36% </sup>`159.13 kB` |   <sup>*34x* </sup>`5,557 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-48% </sup>`649.78 kB` |       <sup>-36% </sup>`160.07 kB` |    <sup>*7x* </sup>`1,206 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts)                                     |       <sup>-48% </sup>`645.34 kB` |       <sup>-35% </sup>`161.44 kB` | <sup>*109x* </sup>`17,671 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-46% </sup>`675.43 kB` |       <sup>-35% </sup>`162.89 kB` |   <sup>*11x* </sup>`1,907 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-46% </sup>`675.60 kB` |       <sup>-35% </sup>`162.91 kB` |   <sup>*14x* </sup>`2,367 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-48% </sup>`646.98 kB` |       <sup>-34% </sup>`163.24 kB` |    **<sup>🏆 </sup>`161 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-47% </sup>`660.12 kB` |       <sup>-33% </sup>`167.10 kB` |  <sup>*74x* </sup>`12,007 ms` |
----
| Artifact                                                                                                                           | Original size |   Gzip size |
| :--------------------------------------------------------------------------------------------------------------------------------- | ------------: | ----------: |
| [**victory v35.8.4**](https://www.npmjs.com/package/victory/v/35.8.4) ([Source](https://unpkg.com/victory@35.8.4/dist/victory.js)) |     `2.14 MB` | `312.17 kB` |

| Minifier                                                                           |                     Minified size |                    Minzipped size |                         Time |
| :--------------------------------------------------------------------------------- | --------------------------------: | --------------------------------: | ---------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                 |       <sup>-66% </sup>`715.74 kB` | **<sup>🏆-49% </sup>`159.01 kB`** |  <sup>*32x* </sup>`7,469 ms` |
| [uglify-js](/lib/minifiers/uglify-js.ts)                                           | **<sup>🏆-67% </sup>`707.17 kB`** |       <sup>-49% </sup>`159.20 kB` | <sup>*63x* </sup>`14,560 ms` |
| [swc](/lib/minifiers/swc.ts)                                                       |       <sup>-66% </sup>`716.98 kB` |       <sup>-48% </sup>`160.99 kB` |   <sup>*6x* </sup>`1,503 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                         |       <sup>-64% </sup>`759.34 kB` |       <sup>-47% </sup>`166.63 kB` |  <sup>*12x* </sup>`2,976 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                   |       <sup>-65% </sup>`756.58 kB` |       <sup>-46% </sup>`167.61 kB` |  <sup>*11x* </sup>`2,526 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                               |       <sup>-66% </sup>`724.29 kB` |       <sup>-42% </sup>`180.44 kB` |   **<sup>🏆 </sup>`229 ms`** |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) |       <sup>-66% </sup>`727.13 kB` |       <sup>-42% </sup>`180.82 kB` | <sup>*64x* </sup>`14,791 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Failed to minify_</sub>       |                                 — |                                 — |                            — |
----
| Artifact                                                                                                                        | Original size |   Gzip size |
| :------------------------------------------------------------------------------------------------------------------------------ | ------------: | ----------: |
| [**echarts v5.1.1**](https://www.npmjs.com/package/echarts/v/5.1.1) ([Source](https://unpkg.com/echarts@5.1.1/dist/echarts.js)) |     `3.20 MB` | `689.67 kB` |

| Minifier                                                                                                  |                   Minified size |                    Minzipped size |                         Time |
| :-------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                                        | **<sup>🏆-69% </sup>`1.00 MB`** | **<sup>🏆-53% </sup>`322.12 kB`** | <sup>*24x* </sup>`10,867 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                |       <sup>-66% </sup>`1.07 MB` |       <sup>-52% </sup>`330.73 kB` |  <sup>*11x* </sup>`4,959 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                      |       <sup>-68% </sup>`1.01 MB` |       <sup>-52% </sup>`331.66 kB` |   **<sup>🏆 </sup>`435 ms`** |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                          |       <sup>-67% </sup>`1.07 MB` |       <sup>-52% </sup>`331.66 kB` |   <sup>*7x* </sup>`3,253 ms` |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                     |                               — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub> |                               — |                                 — |                            — |
| [swc](/lib/minifiers/swc.ts) <sub>_Invalid output: SyntaxError_</sub>                                     |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                           |                               — |                                 — |                            — |
----
| Artifact                                                                                                               | Original size |   Gzip size |
| :--------------------------------------------------------------------------------------------------------------------- | ------------: | ----------: |
| [**antd v4.16.1**](https://www.npmjs.com/package/antd/v/4.16.1) ([Source](https://unpkg.com/antd@4.16.1/dist/antd.js)) |     `6.69 MB` | `833.49 kB` |

| Minifier                                                                                                  |                   Minified size |                    Minzipped size |                         Time |
| :-------------------------------------------------------------------------------------------------------- | ------------------------------: | --------------------------------: | ---------------------------: |
| [terser](/lib/minifiers/terser.ts)                                                                        | **<sup>🏆-66% </sup>`2.25 MB`** | **<sup>🏆-45% </sup>`461.42 kB`** | <sup>*18x* </sup>`12,731 ms` |
| [swc](/lib/minifiers/swc.ts)                                                                              |       <sup>-66% </sup>`2.28 MB` |       <sup>-44% </sup>`463.44 kB` |   <sup>*6x* </sup>`4,595 ms` |
| [terser.no-compress](/lib/minifiers/terser.no-compress.ts)                                                |       <sup>-64% </sup>`2.43 MB` |       <sup>-42% </sup>`479.86 kB` |   <sup>*8x* </sup>`5,989 ms` |
| [uglify-js.no-compress](/lib/minifiers/uglify-js.no-compress.ts)                                          |       <sup>-64% </sup>`2.42 MB` |       <sup>-42% </sup>`482.98 kB` |   <sup>*6x* </sup>`4,828 ms` |
| [esbuild](/lib/minifiers/esbuild.ts)                                                                      |       <sup>-65% </sup>`2.31 MB` |       <sup>-41% </sup>`491.09 kB` |   **<sup>🏆 </sup>`704 ms`** |
| [babel-minify](/lib/minifiers/babel-minify.ts) <sub>_Timed out_</sub>                                     |                               — |                                 — |                            — |
| [google-closure-compiler.simple](/lib/minifiers/google-closure-compiler.simple.ts) <sub>_Timed out_</sub> |                               — |                                 — |                            — |
| [uglify-js](/lib/minifiers/uglify-js.ts) <sub>_Timed out_</sub>                                           |                               — |                                 — |                            — |
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
