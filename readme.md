# Minification benchmarks

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
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6048.55ms` |
| esbuild                 |    `245.73 KB` (`48%`) | 🐷 `82.45 KB` (`69%`) |   🐇 `51.23ms` |
| terser - default        |    `243.04 KB` (`48%`) |    `79.66 KB` (`67%`) |    `1951.42ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `841.60ms` |
| uglify-js - default     |    `241.46 KB` (`47%`) |  🐥 `79.2 KB` (`66%`) |    `3175.79ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |     `532.14ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1631.95ms` |
| esbuild                 |    `70.31 KB` (`13%`) | 🐷 `25.81 KB` (`27%`) |   🐇 `29.09ms` |
| terser - default        |     `71.6 KB` (`13%`) |    `24.47 KB` (`25%`) |     `763.77ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `260.67ms` |
| uglify-js - default     | 🐥 `68.32 KB` (`12%`) | 🐥 `24.06 KB` (`25%`) |    `1030.09ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `198.43ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.75 KB`
- **Gzip size** `35.7 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.83 KB` (`34%`) |    `18.33 KB` (`51%`) | 🐢 `1095.05ms` |
| esbuild                 |    `58.78 KB` (`34%`) |    `19.05 KB` (`53%`) |   🐇 `18.93ms` |
| terser - default        |     `57.8 KB` (`34%`) |    `18.24 KB` (`51%`) |     `414.25ms` |
| terser - no compress    | 🐷 `61.79 KB` (`36%`) | 🐷 `19.25 KB` (`53%`) |     `148.23ms` |
| uglify-js - default     | 🐥 `57.41 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `635.62ms` |
| uglify-js - no compress |    `61.51 KB` (`36%`) |     `19.1 KB` (`53%`) |     `106.89ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) | 🐢 `237.34ms` |
| esbuild                 |    `19.72 KB` (`33%`) |    `7.21 KB` (`44%`) |   🐇 `9.48ms` |
| terser - default        |    `19.11 KB` (`32%`) |    `6.99 KB` (`43%`) |    `109.47ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `33.73ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) |    `192.69ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `24.66ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `778.21 KB`
- **Gzip size** `155.79 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `357.53 KB` (`45%`) | 🐷 `104.22 KB` (`66%`) |   🐇 `54.31ms` |
| terser - default        |  🐥 `355.1 KB` (`45%`) | 🐥 `101.15 KB` (`64%`) | 🐢 `1616.89ms` |
| terser - no compress    | 🐷 `367.96 KB` (`47%`) |    `101.82 KB` (`65%`) |     `629.64ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.77 KB` (`50%`) | 🐢 `1246.73ms` |
| esbuild                 |    `93.43 KB` (`42%`) |    `31.28 KB` (`51%`) |   🐇 `38.73ms` |
| terser - default        |    `92.77 KB` (`42%`) | 🐥 `30.59 KB` (`50%`) |     `487.74ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `184.81ms` |
| uglify-js - default     | 🐥 `92.23 KB` (`42%`) |    `30.59 KB` (`50%`) |     `771.17ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `147.18ms` |

