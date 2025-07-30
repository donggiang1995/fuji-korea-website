# FINAL SOLUTION - SPACESHIP INTERNAL URL

## VẤN ĐỀ: localhost không accessible từ domain

## SOLUTION: TÌM INTERNAL SERVER URL

### BƯỚC 1: KIỂM TRA NODE.JS APP DETAILS
1. **Node.js Apps** → Click vào app
2. **Tìm Application URL** hoặc **Server URL**
3. **Copy exact URL** (không phải localhost)

### BƯỚC 2: CHECK CPANEL URL PATTERN
URL của cPanel hiện tại: `server37.shared.spaceship.host:2083`
→ App URL có thể là: `server37.shared.spaceship.host:5000`

### BƯỚC 3: UPDATE HTML REDIRECT
**File Manager** → **public_html** → **index.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>FUJI Global Korea</title>
    <meta http-equiv="refresh" content="0; url=http://server37.shared.spaceship.host:5000">
    <script>window.location.href = "http://server37.shared.spaceship.host:5000";</script>
</head>
<body>
    <h1>Loading FUJI Global Korea...</h1>
    <p>If not redirected, <a href="http://server37.shared.spaceship.host:5000">click here</a></p>
</body>
</html>
```

### BƯỚC 4: ALTERNATIVE - REVERSE PROXY
**File Manager** → **public_html** → **.htaccess**:
```
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:5000/$1 [P,L]
```

**Dùng server37.shared.spaceship.host:5000 thay vì localhost!**