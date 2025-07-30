# TROUBLESHOOT: VẪN RA LOCALHOST:3000

## VẤN ĐỀ: 
Website vẫn hiển thị localhost:3000 thay vì fujiglobal.kr

## NGUYÊN NHÂN CÓ THỂ:

### 1. APPLICATION STARTUP FILE SAI
- **Kiểm tra**: Node.js Apps → Application Startup File
- **Phải là**: `dist/index.js` (không phải `server/index.js`)

### 2. APPLICATION URL SAI
- **Kiểm tra**: Node.js Apps → Application URL
- **Phải là**: `fujiglobal.kr` (không có dấu `/`)
- **Không được**: `fujiglobal.kr/`

### 3. PORT CONFIGURATION
- **Environment Variables** → PORT=5000
- **Không được**: PORT=3000

### 4. BROWSER CACHE
- **Clear browser cache** hoặc **Ctrl+F5**
- **Incognito mode** để test

### 5. DNS CHƯA PROPAGATE
- **Wait 15-30 minutes** after changes
- **Test với**: `http://fujiglobal.kr:5000`

## BƯỚC KIỂM TRA:

### A. SPACESHIP NODE.JS APP:
1. Status: **Running**
2. Application Startup File: **dist/index.js**
3. Application URL: **fujiglobal.kr**
4. Environment Variables: **PORT=5000**

### B. TEST URLS:
- `http://fujiglobal.kr` 
- `http://fujiglobal.kr:5000`
- `http://server37.shared.spaceship.host:5000`

### C. FALLBACK SOLUTION:
Tạo **public_html/index.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=http://server37.shared.spaceship.host:5000">
</head>
<body>Loading...</body>
</html>
```

**Kiểm tra từng bước và report lại!**