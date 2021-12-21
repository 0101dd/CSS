# 使用 PostCSS 壓縮 css 檔案

1. npm init -y

2. [PostCSS](https://www.npmjs.com/package/postcss)
   npm i postcss

3. [postcss-cli](https://www.npmjs.com/package/postcss-cli)
   npm i -D postcss postcss-cli

4. [PostCSS Purgecss](https://www.npmjs.com/package/@fullhuman/postcss-purgecss)
   npm i -D @fullhuman/postcss-purgecss postcss

5. 建立 postcss.config.js 檔案

   ```js
   const purgecss = require('@fullhuman/postcss-purgecss')
   module.exports = {
     plugins: [
       purgecss({
         content: ['./**/*.html']
       })
     ]
   }
   ```

6. package.json 修改指令

   ```js
   "scripts": {
   "postcss": "postcss ./css/ -r ./css/",
   "postcssmin": "postcss ./dist/ -r ./dist/"
   },
   ```

7. 輸出壓縮過後的檔案

   - 產出 .css

     > npm run postcss

   - 產出 .min.css

     > npm run postcssmin
