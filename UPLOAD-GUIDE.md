# 📤 FILEZILLA UPLOAD GUIDE

## 🎯 MỤC TIÊU:
Upload website **index.html** lên fujiglobal.kr qua FTP

## 📋 CHUẨN BỊ:
1. ✅ **File website**: index.html (19KB professional website)
2. ⬇️ **Download FileZilla**: https://filezilla-project.org/download.php?type=client
3. 🔑 **FTP credentials** từ Spaceship hosting control panel

## 🚀 UPLOAD STEPS:

### STEP 1: Cài đặt FileZilla
- Download FileZilla từ link trên
- Chạy installer và hoàn tất cài đặt

### STEP 2: Connect to FTP
**Mở FileZilla và nhập:**
- **Host:** `ftp.fujiglobal.kr`
- **Username:** (từ Spaceship control panel)
- **Password:** (từ Spaceship control panel)
- **Port:** `21`
- Click **Quickconnect**

### STEP 3: Navigate directories
- **Left panel (Local):** Tìm file `index.html` trong project folder
- **Right panel (Remote):** Navigate đến `/public_html/` directory

### STEP 4: Upload file
- **Drag & drop** `index.html` từ left panel sang right panel
- Hoặc **right-click** → Upload
- File sẽ upload tự động

### STEP 5: Set permissions (nếu cần)
- **Right-click** file index.html trên server
- **File permissions** → Set to `644`

### STEP 6: Test website
- Visit: **http://fujiglobal.kr/public_html/**
- Should show professional Korean business website

## 🔍 FIND FTP CREDENTIALS:

### Trong Spaceship Control Panel:
1. **Login** hosting account
2. **FTP Accounts** section
3. **Domain:** fujiglobal.kr
4. **Copy username/password**

### Common FTP settings:
- **Protocol:** FTP (not SFTP)
- **Encryption:** None
- **Transfer mode:** Passive

## ✅ SUCCESS INDICATORS:
- FileZilla shows **"Transfer successful"**
- File appears in `/public_html/` directory
- Website loads at fujiglobal.kr/public_html/
- Shows modern Korean business layout

## 🆘 TROUBLESHOOTING:

**Connection failed?**
- Check FTP credentials
- Try host: `fujiglobal.kr` instead of `ftp.fujiglobal.kr`
- Verify port 21

**Upload failed?**
- Check file permissions
- Ensure `/public_html/` directory exists
- Try uploading to root directory first

**Website not updated?**
- Clear browser cache (Ctrl+F5)
- Wait 5-10 minutes for propagation
- Check file uploaded correctly

## 📁 FILE INFO:
- **Filename:** index.html
- **Size:** 19KB
- **Content:** Professional Korean business website
- **Features:** Company info, products, contact details
- **Design:** Modern gradient layout, responsive mobile

**🎯 Result: Complete professional Korean business website at fujiglobal.kr!**