# Minification benchmarks

Benchmarks are gathered on the following minifiers:
<!-- minifiersList:start -->
- [babel-minify](https://github.com/babel/minify)
- [esbuild](https://github.com/evanw/esbuild)
- [terser](https://github.com/terser/terser)
- [uglify-js](https://github.com/mishoo/UglifyJS)
<!-- minifiersList:end -->

## Results
<!-- results:start -->
### d3/dist/d3
- **File** `node_modules/d3/dist/d3.js`
- **Size** `503.62 KB`
- **Gzip size** `118.51 KB`

| Minifier                |                   Size |             Gzip size |           Time |
| :---------------------- | ---------------------: | --------------------: | -------------: |
| babel-minify - default  | 🐥 `240.19 KB` (`47%`) |    `80.38 KB` (`67%`) | 🐢 `6068.56ms` |
| esbuild                 |    `245.26 KB` (`48%`) | 🐷 `82.26 KB` (`69%`) |  🐇 `195.07ms` |
| terser - default        |    `242.96 KB` (`48%`) |    `79.76 KB` (`67%`) |    `1919.28ms` |
| terser - no compress    |  🐷 `249.9 KB` (`49%`) |    `80.89 KB` (`68%`) |     `844.81ms` |
| uglify-js - default     |    `241.43 KB` (`47%`) | 🐥 `79.21 KB` (`66%`) |    `3108.20ms` |
| uglify-js - no compress |    `249.56 KB` (`49%`) |    `80.29 KB` (`67%`) |     `529.71ms` |

### jquery
- **File** `node_modules/jquery/dist/jquery.js`
- **Size** `280.89 KB`
- **Gzip size** `82.74 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `90.23 KB` (`32%`) |    `31.19 KB` (`37%`) | 🐢 `1901.94ms` |
| esbuild                 |    `88.51 KB` (`31%`) | 🐷 `31.42 KB` (`37%`) |   🐇 `25.92ms` |
| terser - default        |    `88.23 KB` (`31%`) |    `30.49 KB` (`36%`) |     `637.80ms` |
| terser - no compress    | 🐷 `92.79 KB` (`33%`) |    `31.15 KB` (`37%`) |     `268.84ms` |
| uglify-js - default     | 🐥 `87.05 KB` (`30%`) | 🐥 `30.29 KB` (`36%`) |     `996.13ms` |
| uglify-js - no compress |    `92.05 KB` (`32%`) |    `30.84 KB` (`37%`) |     `171.00ms` |

### lodash
- **File** `node_modules/lodash/lodash.js`
- **Size** `529.85 KB`
- **Gzip size** `94.54 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `70.25 KB` (`13%`) |    `24.66 KB` (`26%`) | 🐢 `1622.93ms` |
| esbuild                 |    `70.22 KB` (`13%`) | 🐷 `25.73 KB` (`27%`) |   🐇 `28.19ms` |
| terser - default        |    `69.54 KB` (`13%`) |    `24.64 KB` (`26%`) |     `699.60ms` |
| terser - no compress    | 🐷 `74.01 KB` (`13%`) |    `25.64 KB` (`27%`) |     `256.23ms` |
| uglify-js - default     | 🐥 `68.31 KB` (`12%`) | 🐥 `24.05 KB` (`25%`) |     `947.65ms` |
| uglify-js - no compress |    `73.46 KB` (`13%`) |     `25.2 KB` (`26%`) |     `184.44ms` |

### moment
- **File** `node_modules/moment/moment.js`
- **Size** `169.78 KB`
- **Gzip size** `35.69 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `57.87 KB` (`34%`) |    `18.34 KB` (`51%`) | 🐢 `1044.32ms` |
| esbuild                 |    `58.74 KB` (`34%`) |    `18.96 KB` (`53%`) |   🐇 `19.93ms` |
| terser - default        |    `57.84 KB` (`34%`) |    `18.27 KB` (`51%`) |     `321.43ms` |
| terser - no compress    | 🐷 `61.82 KB` (`36%`) | 🐷 `19.26 KB` (`53%`) |     `143.58ms` |
| uglify-js - default     | 🐥 `57.43 KB` (`33%`) | 🐥 `18.16 KB` (`50%`) |     `513.57ms` |
| uglify-js - no compress |    `61.54 KB` (`36%`) |     `19.1 KB` (`53%`) |      `97.99ms` |

### react/cjs/react.development.js
- **File** `node_modules/react/cjs/react.development.js`
- **Size** `59.22 KB`
- **Gzip size** `16.1 KB`

| Minifier                |                  Size |            Gzip size |          Time |
| :---------------------- | --------------------: | -------------------: | ------------: |
| babel-minify - default  |     `19.4 KB` (`32%`) |    `7.03 KB` (`43%`) |    `194.08ms` |
| esbuild                 |    `19.65 KB` (`33%`) |    `7.18 KB` (`44%`) |  🐇 `10.82ms` |
| terser - default        |    `19.12 KB` (`32%`) |    `6.97 KB` (`43%`) |    `147.05ms` |
| terser - no compress    | 🐷 `20.71 KB` (`34%`) | 🐷 `7.34 KB` (`45%`) |     `46.68ms` |
| uglify-js - default     |  🐥 `18.7 KB` (`31%`) | 🐥 `6.83 KB` (`42%`) | 🐢 `229.91ms` |
| uglify-js - no compress |    `20.46 KB` (`34%`) |    `7.15 KB` (`44%`) |     `35.83ms` |

### terser
- **File** `node_modules/terser/dist/bundle.min.js`
- **Size** `835.03 KB`
- **Gzip size** `167.85 KB`

| Minifier                |                   Size |              Gzip size |           Time |
| :---------------------- | ---------------------: | ---------------------: | -------------: |
| babel-minify - default  |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| esbuild                 |    `398.14 KB` (`47%`) | 🐷 `114.27 KB` (`68%`) |   🐇 `60.89ms` |
| terser - default        | 🐥 `396.16 KB` (`47%`) | 🐥 `111.45 KB` (`66%`) | 🐢 `1629.41ms` |
| terser - no compress    | 🐷 `409.27 KB` (`49%`) |    `112.18 KB` (`66%`) |     `653.76ms` |
| uglify-js - default     |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |
| uglify-js - no compress |              ⚠️ Failed |              ⚠️ Failed |      ⚠️ Failed |

### vue/dist/vue.runtime.common.dev
- **File** `node_modules/vue/dist/vue.runtime.common.dev.js`
- **Size** `217.93 KB`
- **Gzip size** `60.81 KB`

| Minifier                |                  Size |             Gzip size |           Time |
| :---------------------- | --------------------: | --------------------: | -------------: |
| babel-minify - default  |    `93.04 KB` (`42%`) |    `30.78 KB` (`50%`) | 🐢 `1158.12ms` |
| esbuild                 |    `93.13 KB` (`42%`) |    `31.11 KB` (`51%`) |   🐇 `25.82ms` |
| terser - default        |    `92.77 KB` (`42%`) |     `30.6 KB` (`50%`) |     `412.77ms` |
| terser - no compress    | 🐷 `98.89 KB` (`45%`) |     `31.4 KB` (`51%`) |     `229.36ms` |
| uglify-js - default     |  🐥 `92.2 KB` (`42%`) | 🐥 `30.58 KB` (`50%`) |     `723.04ms` |
| uglify-js - no compress |    `98.68 KB` (`45%`) |  🐷 `31.4 KB` (`51%`) |     `143.85ms` |


<!-- results:end -->

