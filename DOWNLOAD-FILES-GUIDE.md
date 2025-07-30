# 📁 FILES TO DOWNLOAD AND UPLOAD

## DANH SÁCH FILES CẦN TẢI:

### 1. PRIORITY FILES (bắt buộc):
- **.htaccess** - Server configuration
- **static-website-ready.html** - Main website (rename to index.html)
- **default.html** - Backup redirect

### 2. BACKUP FILES (optional):
- **index.htm** - Alternative index
- **index.php** - PHP version
- **default.htm** - Additional backup
- **home.html** - Another fallback

## 🚀 UPLOAD INSTRUCTIONS:

### STEP 1: DOWNLOAD FILES
Download tất cả files từ Replit project này

### STEP 2: UPLOAD TO SPACESHIP
**Spaceship cPanel → File Manager → Root Directory**
1. Upload tất cả files vào root directory (nơi có adminftp, public_html folders)
2. **QUAN TRỌNG**: Upload vào ROOT, không phải public_html

### STEP 3: RENAME FILES
- **static-website-ready.html** → rename thành **index.html**
- Các files khác giữ nguyên tên

### STEP 4: SET PERMISSIONS
- Set permissions **644** cho tất cả files
- Đặc biệt quan trọng với .htaccess file

### STEP 5: WAIT AND TEST
- Wait 5-10 minutes
- Clear browser cache (Ctrl+F5)
- Test fujiglobal.kr

## 📋 FILE STRUCTURE AFTER UPLOAD:
```
/home/wodpqkkqov/ (ROOT)
├── .htaccess
├── index.html (renamed from static-website-ready.html)
├── default.html
├── index.htm
├── index.php
├── default.htm
├── home.html
├── adminftp/
├── public_html/
└── other folders...
```

**Multiple files ensure at least one method will work!**