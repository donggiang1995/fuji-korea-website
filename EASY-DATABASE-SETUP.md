# SETUP DOMAIN ĐỂ WEBSITE HIỂN THỊ

## BƯỚC 1: KIỂM TRA NODE.JS APP
1. **Spaceship cPanel** → **Node.js Apps**
2. **Click vào app** `fujiglobal.kr/`
3. **Kiểm tra Status**: Phải là **Running**
4. Nếu **Stopped** → Click **Start**

## BƯỚC 2: UPDATE ENVIRONMENT VARIABLES
**Node.js Apps** → **Environment Variables**:
```
DATABASE_URL=mysql://wodpqkkqov_fuji_admin:YOUR_PASSWORD@localhost:3306/wodpqkkqov_fuji_korea_db
NODE_ENV=production
PORT=5000
```

## BƯỚC 3: UPDATE APPLICATION STARTUP FILE
**Node.js Apps** → **Application Startup File**:
- Thay từ `server/index.js` thành `dist/index.js`
- **Save** và **Restart** app

## BƯỚC 4: SETUP DOMAIN POINTING
**2 cách setup:**

### CÁCH A: APPLICATION URL
**Node.js Apps** → **Application URL**:
- Thay từ `fujiglobal.kr/` thành `fujiglobal.kr`
- **Save** và **Restart**

### CÁCH B: HTML REDIRECT
**File Manager** → **public_html** → Tạo `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=http://server37.shared.spaceship.host:5000">
    <script>window.location.href = "http://server37.shared.spaceship.host:5000";</script>
</head>
<body>
    <h1>Loading FUJI Global Korea...</h1>
</body>
</html>
```

## BƯỚC 5: TEST WEBSITE
Visit `fujiglobal.kr` → Should see FUJI website

**Bắt đầu với Bước 1 - kiểm tra app status!**