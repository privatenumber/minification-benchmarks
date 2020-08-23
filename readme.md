# Minification benchmarks

Benchmarks are gathered on the following minifiers:
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)

## Results

### d3/dist/d3
- **File** `node_modules/d3/dist/d3.js`
- **Size** `503.62 KB`
- **Gzip size** `118.51 KB`

| Minifier                |                   Size |             Gzip size |           Time |
| :---------------------- | ---------------------: | --------------------: | -------------: |
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6542.27ms` |
| esbuild                 |    `245.33 KB` (`48%`) | 🐷 `82.28 KB` (`69%`) |   🐇 `58.69ms` |
| terser - default        |    `242.96 KB` (`48%`) |    `79.76 KB` (`67%`) |    `2023.86ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `928.52ms` |
| uglify-js - default     |    `241.46 KB` (`47%`) |  🐥 `79.2 KB` (`66%`) |    `3523.49ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |     `628.28ms` |

### jquery
- **File** `node_modules/jquery/dist/jquery.js`
- **Size** `280.89 KB`
- **Gzip size** `82.74 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `90.23 KB` (`32%`) |    `31.19 KB` (`37%`) | 🐢 `2064.25ms` |
| esbuild                 |    `88.52 KB` (`31%`) | 🐷 `31.42 KB` (`37%`) |   🐇 `26.82ms` |
| terser - default        |    `88.23 KB` (`31%`) |    `30.49 KB` (`36%`) |     `784.36ms` |
| terser - no compress    | 🐷 `92.79 KB` (`33%`) |    `31.15 KB` (`37%`) |     `245.16ms` |
| uglify-js - default     | 🐥 `87.05 KB` (`30%`) | 🐥 `30.29 KB` (`36%`) |     `982.63ms` |
| uglify-js - no compress |    `92.05 KB` (`32%`) |    `30.84 KB` (`37%`) |     `175.24ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1658.59ms` |
| esbuild                 |    `70.26 KB` (`13%`) | 🐷 `25.74 KB` (`27%`) |   🐇 `32.29ms` |
| terser - default        |    `69.54 KB` (`13%`) |    `24.64 KB` (`26%`) |     `605.25ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `264.70ms` |
| uglify-js - default     | 🐥 `68.32 KB` (`12%`) | 🐥 `24.06 KB` (`25%`) |     `954.76ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `194.22ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.75 KB`
- **Gzip size** `35.7 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.83 KB` (`34%`) |    `18.33 KB` (`51%`) | 🐢 `1079.67ms` |
| esbuild                 |    `58.71 KB` (`34%`) |    `18.96 KB` (`53%`) |   🐇 `21.21ms` |
| terser - default        |    `57.81 KB` (`34%`) |    `18.26 KB` (`51%`) |     `341.29ms` |
| terser - no compress    | 🐷 `61.79 KB` (`36%`) | 🐷 `19.25 KB` (`53%`) |     `150.24ms` |
| uglify-js - default     |  🐥 `57.4 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `574.82ms` |
| uglify-js - no compress |    `61.51 KB` (`36%`) |     `19.1 KB` (`53%`) |     `108.72ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) | 🐢 `210.85ms` |
| esbuild                 |    `19.65 KB` (`33%`) |    `7.18 KB` (`44%`) |  🐇 `10.82ms` |
| terser - default        |    `19.11 KB` (`32%`) |    `6.99 KB` (`43%`) |    `114.81ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `40.24ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) |    `207.54ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `27.02ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `787.18 KB`
- **Gzip size** `157.4 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `360.71 KB` (`45%`) | 🐷 `104.68 KB` (`66%`) |   🐇 `58.86ms` |
| terser - default        | 🐥 `358.73 KB` (`45%`) | 🐥 `101.89 KB` (`64%`) | 🐢 `1652.92ms` |
| terser - no compress    | 🐷 `371.76 KB` (`47%`) |    `102.58 KB` (`65%`) |     `644.63ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.78 KB` (`50%`) | 🐢 `1208.91ms` |
| esbuild                 |    `93.14 KB` (`42%`) |    `31.12 KB` (`51%`) |   🐇 `24.89ms` |
| terser - default        |    `92.77 KB` (`42%`) |     `30.6 KB` (`50%`) |     `384.21ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `182.39ms` |
| uglify-js - default     | 🐥 `92.23 KB` (`42%`) | 🐥 `30.59 KB` (`50%`) |     `743.20ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `154.73ms` |

