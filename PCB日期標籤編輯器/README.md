# PCB 日期標籤編輯器

純前端、單一 HTML 的 PCB 日期標籤編輯器，可直接部署到 GitHub Pages。

## 功能

- 日期與文字內容編輯
- 深色介面主題
- Logo 上傳與位置調整
- 本機字體讀取與字體檔導入
- SVG／高解析 PNG 輸出
- 使用瀏覽器 localStorage 記住一般設定
- 透明背景預覽
- 標題、日期與版面位置微調

## GitHub Pages 部署

1. 在 GitHub 建立新的 Repository。
2. 將本資料夾內的 `index.html`、`.nojekyll` 和 `README.md` 上傳到 Repository 根目錄。
3. 開啟 Repository 的 `Settings`。
4. 選擇左側 `Pages`。
5. 在 `Build and deployment` 中將 Source 設為 `Deploy from a branch`。
6. Branch 選擇 `main`，資料夾選擇 `/(root)`，然後按 `Save`。
7. 等待 GitHub 完成部署後，Pages 頁面會顯示網站網址。

## 記憶功能說明

一般設定使用瀏覽器的 `localStorage` 儲存，因此：

- 重新整理或關閉瀏覽器後，設定通常仍會保留。
- 設定只存在目前瀏覽器、目前裝置與目前網站網址。
- 清除網站資料、使用無痕模式或更換網址後，設定可能消失。
- 不會自動同步到其他電腦或手機。
- 手動加入的字體名稱可保留。
- 基於瀏覽器安全限制，本機字體權限通常需要重新授權；導入的字體檔目前不保證跨重新整理保留。

## 檔案結構

```text
.
├── index.html
├── .nojekyll
└── README.md
```
