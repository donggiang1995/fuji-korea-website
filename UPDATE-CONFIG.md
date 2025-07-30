# FIX PORT CONFIGURATION

## VẤN ĐỀ: App chạy port 5000, không phải 3000

## FIX:

### CÁCH 1: UPDATE HTML REDIRECT
**File Manager** → **public_html** → **index.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>FUJI Global Korea</title>
    <meta http-equiv="refresh" content="0; url=http://localhost:5000">
    <script>window.location.href = "http://localhost:5000";</script>
</head>
<body>
    <h1>Loading FUJI Global Korea...</h1>
    <p>If not redirected, <a href="http://localhost:5000">click here</a></p>
</body>
</html>
```

### CÁCH 2: FIX NODE.JS APP PORT
**Node.js Apps** → **Environment Variables**:
- **PORT**: `5000` (thay vì 3000)
- **HOST**: `0.0.0.0`
- **Restart** app

### CÁCH 3: SPACESHIP INTERNAL URL
Thử URL:
- `http://server37.shared.spaceship.host:5000`
- Hoặc internal Spaceship URL

**Update HTML redirect với port 5000 sẽ work ngay!**