
# 📤 SPACESHIP HOSTING UPLOAD INSTRUCTIONS

## STATUS: Node.js app successfully disabled ✅

## NEXT STEPS:

### 1. UPLOAD FILE TO PUBLIC_HTML
**Spaceship cPanel → File Manager:**
1. Navigate to **public_html** folder
2. Upload **simple-fuji-website.html**
3. Rename to **index.html**
4. Set permissions: **644**

### 2. ALTERNATIVE: CREATE INDEX.HTML DIRECTLY
In File Manager → public_html → Create New File:
- Name: **index.html**
- Copy content from **simple-fuji-website.html**
- Save and set permissions to **644**

### 3. VERIFY UPLOAD
After upload, test:
`curl -s http://fujiglobal.kr | head -5`

Should see:
`<!DOCTYPE html>`
`<html lang="ko">`
`<title>FUJI Global Korea - 엘리베이터 기술</title>`

### 4. TROUBLESHOOTING
If still seeing directory listing:
- Check file is named exactly **index.html** (not Index.html)
- Verify file is in **public_html** root (not subfolder)
- Check file permissions are **644**
- Clear browser cache (Ctrl+F5)

## FILES READY FOR UPLOAD:
- ✅ simple-fuji-website.html (professional FUJI website)
- ✅ emergency-website.html (backup option)
- ✅ static-website-ready.html (full featured)

**Choose simple-fuji-website.html for clean, professional look!**
