# CÁCH TRỰC TIẾP - SETUP DOMAIN

## BƯỚC 1: XÓA REDIRECT
**Redirects** → Xóa redirect vừa tạo (nếu có)

## BƯỚC 2: SETUP DOMAIN TRỰC TIẾP
### CÁCH A: NODE.JS APP DOMAIN SETTING
1. **Node.js Apps** → Click vào app `fujiglobal.kr/`
2. **Application URL** → Đổi thành: `fujiglobal.kr`
3. **Save** changes
4. **Restart** app

### CÁCH B: FILE MANAGER APPROACH
1. **File Manager** → **public_html**
2. **Delete** tất cả files trong public_html
3. **Create** file `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=http://localhost:3000">
</head>
<body>
    <p>Redirecting to FUJI Global Korea...</p>
</body>
</html>
```

### CÁCH C: .HTACCESS REVERSE PROXY
**File Manager** → **public_html** → Create `.htaccess`:
```
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

## BƯỚC 3: TEST
Visit `fujiglobal.kr` → Should work with one of these methods

**Thử Cách A trước - change Application URL trong Node.js Apps!**