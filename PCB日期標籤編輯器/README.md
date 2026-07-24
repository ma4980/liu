# PCB 日期標籤編輯器

此版本修正「整體加粗後水平／垂直分隔線消失」的問題。

修正方式：

- Logo 與文字繼續使用 SVG morphology 濾鏡加粗。
- 外框、水平線與垂直線改為直接增加 `stroke-width`。
- SVG 與 PNG 輸出都會保留修正後效果。
- 預設日期為開啟網頁當天。
- 保留字體篩選與細明體預設功能。

## GitHub Pages

將資料夾內容上傳至 Repository 根目錄，再設定：

`Settings → Pages → Deploy from a branch → main → /(root)`
