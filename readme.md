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
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6553.14ms` |
| esbuild                 |    `245.73 KB` (`48%`) | 🐷 `82.45 KB` (`69%`) |   🐇 `83.70ms` |
| terser - default        |    `243.04 KB` (`48%`) |    `79.66 KB` (`67%`) |    `2009.86ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `844.34ms` |
| uglify-js - default     |    `241.46 KB` (`47%`) |  🐥 `79.2 KB` (`66%`) |    `3294.52ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |     `552.03ms` |

### jquery
- **File** `node_modules/jquery/dist/jquery.js`
- **Size** `280.89 KB`
- **Gzip size** `82.74 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `90.23 KB` (`32%`) |    `31.19 KB` (`37%`) | 🐢 `2000.13ms` |
| esbuild                 |    `88.71 KB` (`31%`) | 🐷 `31.56 KB` (`38%`) |   🐇 `24.72ms` |
| terser - default        |     `87.9 KB` (`31%`) |    `30.46 KB` (`36%`) |     `678.56ms` |
| terser - no compress    | 🐷 `92.79 KB` (`33%`) |    `31.15 KB` (`37%`) |     `251.26ms` |
| uglify-js - default     | 🐥 `87.05 KB` (`30%`) | 🐥 `30.29 KB` (`36%`) |    `1020.74ms` |
| uglify-js - no compress |    `92.05 KB` (`32%`) |    `30.84 KB` (`37%`) |     `167.61ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1619.33ms` |
| esbuild                 |    `70.31 KB` (`13%`) | 🐷 `25.81 KB` (`27%`) |   🐇 `27.80ms` |
| terser - default        |     `71.6 KB` (`13%`) |    `24.47 KB` (`25%`) |     `671.63ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `270.12ms` |
| uglify-js - default     | 🐥 `68.32 KB` (`12%`) | 🐥 `24.06 KB` (`25%`) |     `993.73ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `180.57ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.75 KB`
- **Gzip size** `35.7 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.83 KB` (`34%`) |    `18.33 KB` (`51%`) | 🐢 `1064.75ms` |
| esbuild                 |    `58.78 KB` (`34%`) |    `19.05 KB` (`53%`) |   🐇 `18.74ms` |
| terser - default        |     `57.8 KB` (`34%`) |    `18.24 KB` (`51%`) |     `330.16ms` |
| terser - no compress    | 🐷 `61.79 KB` (`36%`) | 🐷 `19.25 KB` (`53%`) |     `151.12ms` |
| uglify-js - default     | 🐥 `57.41 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `611.65ms` |
| uglify-js - no compress |    `61.51 KB` (`36%`) |     `19.1 KB` (`53%`) |     `126.92ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) | 🐢 `257.25ms` |
| esbuild                 |    `19.72 KB` (`33%`) |    `7.21 KB` (`44%`) |  🐇 `10.72ms` |
| terser - default        |    `19.11 KB` (`32%`) |    `6.99 KB` (`43%`) |    `163.85ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `45.01ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) |    `190.14ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `27.24ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `778.21 KB`
- **Gzip size** `155.79 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `357.53 KB` (`45%`) | 🐷 `104.22 KB` (`66%`) |   🐇 `52.81ms` |
| terser - default        |  🐥 `355.1 KB` (`45%`) | 🐥 `101.15 KB` (`64%`) | 🐢 `1566.07ms` |
| terser - no compress    | 🐷 `367.96 KB` (`47%`) |    `101.82 KB` (`65%`) |     `633.08ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.77 KB` (`50%`) | 🐢 `1172.83ms` |
| esbuild                 |    `93.43 KB` (`42%`) |    `31.28 KB` (`51%`) |   🐇 `23.56ms` |
| terser - default        |    `92.77 KB` (`42%`) | 🐥 `30.59 KB` (`50%`) |     `392.58ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `223.74ms` |
| uglify-js - default     | 🐥 `92.23 KB` (`42%`) |    `30.59 KB` (`50%`) |     `752.32ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `149.21ms` |

