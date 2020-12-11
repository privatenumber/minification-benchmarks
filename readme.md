# 🏃‍♂️🏃‍♀️🏃 JS minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## 📋 Results
- The measured time an average taken from 10 consecutive runs
- Each table is sorted by smallest minified size
- Minzipped size measures how well the minified file compresses with Gzip

----

<!-- benchmarks:start -->
### [lodash v4.17.20](https://www.npmjs.com/package/lodash/v/4.17.20)
- Size: `542.6 kB`
- Gzip size: `96.8 kB`

| Minifier                                                                         |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -88% </sup>`69.5 kB` | <sup>🏆 -75% </sup>`24.5 kB` |            `2,493.44ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-87% </sup>`71.2 kB` |    <sup>-74% </sup>`25.2 kB` |            `1,103.03ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-87% </sup>`71.9 kB` |    <sup>-74% </sup>`25.3 kB` |             `2,493.2ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-87% </sup>`72.7 kB` |    <sup>-73% </sup>`26.2 kB` |               `34.85ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-87% </sup>`72.7 kB` |    <sup>-73% </sup>`26.2 kB` | <sup>🏆 </sup>`32.85ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-87% </sup>`75.2 kB` |    <sup>-74% </sup>`25.8 kB` |              `686.77ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-87% </sup>`75.8 kB` |    <sup>-73% </sup>`26.3 kB` |              `476.69ms` |
----
### [three v0.123.0](https://www.npmjs.com/package/three/v/0.123.0)
- Size: `1.2 MB`
- Gzip size: `248.7 kB`

| Minifier                                                                         |                      Minified |                     Minzipped |                     Time |
| :------------------------------------------------------------------------------- | ----------------------------: | ----------------------------: | -----------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -49% </sup>`643.9 kB` | <sup>🏆 -37% </sup>`158.9 kB` |             `7,042.06ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-49% </sup>`644.6 kB` |    <sup>-36% </sup>`161.3 kB` |            `14,420.87ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-49% </sup>`647.0 kB` |    <sup>-35% </sup>`163.2 kB` |               `143.98ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-49% </sup>`647.0 kB` |    <sup>-35% </sup>`163.2 kB` | <sup>🏆 </sup>`137.38ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-48% </sup>`652.7 kB` |    <sup>-37% </sup>`159.0 kB` |             `3,916.79ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-46% </sup>`674.6 kB` |    <sup>-35% </sup>`162.7 kB` |             `1,633.69ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-46% </sup>`674.8 kB` |    <sup>-35% </sup>`162.7 kB` |             `1,594.03ms` |
----
### [vue v2.6.12](https://www.npmjs.com/package/vue/v/2.6.12)
- Size: `223.2 kB`
- Gzip size: `62.3 kB`

| Minifier                                                                         |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -58% </sup>`94.2 kB` | <sup>🏆 -50% </sup>`31.2 kB` |            `1,459.62ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-58% </sup>`95.0 kB` |    <sup>-50% </sup>`31.3 kB` |              `849.34ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-58% </sup>`95.3 kB` |    <sup>-50% </sup>`31.5 kB` |            `2,548.05ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-58% </sup>`95.4 kB` |    <sup>-49% </sup>`31.9 kB` |               `33.05ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-58% </sup>`95.4 kB` |    <sup>-49% </sup>`31.9 kB` | <sup>🏆 </sup>`29.04ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |   <sup>-55% </sup>`101.0 kB` |    <sup>-49% </sup>`32.2 kB` |              `394.48ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |   <sup>-55% </sup>`101.3 kB` |    <sup>-49% </sup>`32.2 kB` |              `362.04ms` |
----
### [react v16.13.1](https://www.npmjs.com/package/react/v/16.13.1)
- Size: `60.6 kB`
- Gzip size: `16.5 kB`

| Minifier                                                                         |                     Minified |                   Minzipped |                    Time |
| :------------------------------------------------------------------------------- | ---------------------------: | --------------------------: | ----------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -69% </sup>`19.1 kB` | <sup>🏆 -58% </sup>`6.9 kB` |              `734.13ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-68% </sup>`19.6 kB` |    <sup>-57% </sup>`7.1 kB` |              `403.45ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`19.9 kB` |    <sup>-57% </sup>`7.2 kB` |              `971.11ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-67% </sup>`20.1 kB` |    <sup>-56% </sup>`7.3 kB` | <sup>🏆 </sup>`17.03ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-67% </sup>`20.1 kB` |    <sup>-56% </sup>`7.3 kB` |               `17.05ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-66% </sup>`21.0 kB` |    <sup>-56% </sup>`7.3 kB` |              `136.04ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-66% </sup>`21.2 kB` |    <sup>-55% </sup>`7.5 kB` |              `185.82ms` |
----
### [moment v2.28.0](https://www.npmjs.com/package/moment/v/2.28.0)
- Size: `173.9 kB`
- Gzip size: `36.5 kB`

| Minifier                                                                         |                     Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ----------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -67% </sup>`58.4 kB` | <sup>🏆 -50% </sup>`18.5 kB` |            `1,511.88ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-66% </sup>`59.2 kB` |    <sup>-49% </sup>`18.7 kB` |              `866.78ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-66% </sup>`59.3 kB` |    <sup>-49% </sup>`18.8 kB` |            `2,130.77ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-66% </sup>`60.2 kB` |    <sup>-47% </sup>`19.4 kB` |               `23.21ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-66% </sup>`60.2 kB` |    <sup>-47% </sup>`19.4 kB` | <sup>🏆 </sup>`22.62ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-64% </sup>`63.0 kB` |    <sup>-47% </sup>`19.6 kB` |              `323.76ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-64% </sup>`63.3 kB` |    <sup>-47% </sup>`19.7 kB` |               `367.5ms` |
----
### [d3 v5.16.0](https://www.npmjs.com/package/d3/v/5.16.0)
- Size: `515.7 kB`
- Gzip size: `121.4 kB`

| Minifier                                                                         |                      Minified |                    Minzipped |                    Time |
| :------------------------------------------------------------------------------- | ----------------------------: | ---------------------------: | ----------------------: |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   | <sup>🏆 -53% </sup>`246.0 kB` |    <sup>-33% </sup>`82.3 kB` |            `8,208.15ms` |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         |    <sup>-53% </sup>`246.6 kB` | <sup>🏆 -34% </sup>`80.8 kB` |            `4,250.95ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-52% </sup>`248.8 kB` |    <sup>-33% </sup>`81.7 kB` |            `3,058.54ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-52% </sup>`251.2 kB` |    <sup>-31% </sup>`84.2 kB` | <sup>🏆 </sup>`75.16ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-52% </sup>`251.2 kB` |    <sup>-31% </sup>`84.2 kB` |               `76.22ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-51% </sup>`255.5 kB` |    <sup>-33% </sup>`82.2 kB` |              `716.76ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-51% </sup>`255.9 kB` |    <sup>-32% </sup>`82.8 kB` |            `1,151.22ms` |
----
### [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
- Size: `287.6 kB`
- Gzip size: `84.7 kB`

| Minifier                                                                         |                     Minified |                    Minzipped |                   Time |
| :------------------------------------------------------------------------------- | ---------------------------: | ---------------------------: | ---------------------: |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js)                         | <sup>🏆 -70% </sup>`88.9 kB` | <sup>🏆 -64% </sup>`31.0 kB` |            `1,779.7ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                               |    <sup>-69% </sup>`90.3 kB` |    <sup>-64% </sup>`31.2 kB` |           `1,064.59ms` |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                             |    <sup>-69% </sup>`90.6 kB` |    <sup>-63% </sup>`32.2 kB` |              `30.06ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)   |    <sup>-69% </sup>`90.6 kB` |    <sup>-63% </sup>`32.2 kB` | <sup>🏆 </sup>`29.3ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js)                   |    <sup>-68% </sup>`92.4 kB` |    <sup>-63% </sup>`31.9 kB` |           `2,982.86ms` |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) |    <sup>-68% </sup>`94.3 kB` |    <sup>-63% </sup>`31.6 kB` |             `363.05ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)       |    <sup>-67% </sup>`95.0 kB` |    <sup>-63% </sup>`31.9 kB` |             `439.78ms` |
----
### [terser v5.5.1](https://www.npmjs.com/package/terser/v/5.5.1)
- Size: `632 B`
- Gzip size: `298 B`

| Minifier                                                                                             |                   Minified |                  Minzipped |                   Time |
| :--------------------------------------------------------------------------------------------------- | -------------------------: | -------------------------: | ---------------------: |
| [esbuild](/lib/tasks/benchmark/minifiers/esbuild.js)                                                 | <sup>🏆 -41% </sup>`374 B` | <sup>🏆 -22% </sup>`235 B` |               `8.49ms` |
| [esbuild.tree-shaking](/lib/tasks/benchmark/minifiers/esbuild.tree-shaking.js)                       |    <sup>-41% </sup>`374 B` |    <sup>-22% </sup>`235 B` | <sup>🏆 </sup>`8.43ms` |
| [terser](/lib/tasks/benchmark/minifiers/terser.js)                                                   |    <sup>-35% </sup>`411 B` |    <sup>-21% </sup>`238 B` |              `31.32ms` |
| [terser.no-compress](/lib/tasks/benchmark/minifiers/terser.no-compress.js)                           |    <sup>-35% </sup>`411 B` |    <sup>-22% </sup>`235 B` |              `18.33ms` |
| [babel-minify](/lib/tasks/benchmark/minifiers/babel-minify.js) <sub>_Failed_</sub>                   |                          — |                          — |                      — |
| [uglify-js](/lib/tasks/benchmark/minifiers/uglify-js.js) <sub>_Failed_</sub>                         |                          — |                          — |                      — |
| [uglify-js.no-compress](/lib/tasks/benchmark/minifiers/uglify-js.no-compress.js) <sub>_Failed_</sub> |                          — |                          — |                      — |
<!-- benchmarks:end -->

