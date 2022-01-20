# Tailwind CSS 安裝

版本：v3.0.13

- 整合了 PurgeCSS
  保留使用的 class，可大量減少檔案大小。

- JIT 模式（just-in-time）
  可在結構任意寫樣式屬性或值，編譯後自動產生對應的 class。

## 安裝 VSCode 套件

- Tailwind CSS IntelliSense

  - 自動完成 (autocomplete) 智慧提示 class 名稱，以及 CSS 函數與指令。
  - 語法檢查 (Linting) 突顯在你 CSS 和 HTML 中的錯誤和潛在 bugs。
  - 懸停預覽 (Hover Previews) 在 Tailwind class 名稱上懸停可看到完整的 CSS。
  - 語法強調 (Syntax Highlighting) 提供語法定義來正確地強調 Tailwind 功能。

- PostCSS Language Support
  Tailwind 自訂許多 @（at-rules）指令，安裝此套件才不會有警告，沒有使用 Tailwind 時建議停用此套件，它會影響 CSS 套件的語法提示。

## 初始化 node 專案

> npm init -y

## 安裝 tailwindcss、postcss、autoprefixer

> npm install -D tailwindcss postcss autoprefixer

## 完整配置 tailwind.config.js 設定檔及建立 postcss.config.js

> npx tailwindcss init -f -p

- 單獨建立 tailwind.config.js 設定檔

  預設配置：內容自行選擇

  > npx tailwindcss init

  ```js
  module.exports = {
    content: [],
    theme: {
      extend: {}
    },
    plugins: []
  }
  ```

  完整配置：

  > npx tailwindcss init -f

- 修改 tailwind.config.js 檔名，例如 kaifu-config.js

  > npx tailwindcss init kaifu-config.js

## 新增 css 檔案

檔案名稱、路徑自訂，例如：src\css\tailwind.css， 內容如下：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 設定 tailwind.config.js 編譯的檔案路徑

指定那些路徑的文件要被 tailwind 監控處理。

```js
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
```

## package.json 指令

- 開發版本指令

> npm run dev

- 生產版本指令，檔案最小化

> npm run prod

```js
"scripts": {
 "dev": "npx tailwindcss -i ./src/css/tailwind.css -o ./src/css/style.css --watch",
 "prod": "npx tailwindcss -i ./src/css/tailwind.css -o ./src/css/style.min.css --minify",
},
```
