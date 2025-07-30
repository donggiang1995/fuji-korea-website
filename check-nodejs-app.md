# KIỂM TRA NODE.JS APP CÓ CHẠY KHÔNG

## BƯỚC 1: KIỂM TRA APP LOGS
**Spaceship cPanel** → **Node.js Apps** → **Click app** → **Error Logs**

### CÁC LỖI THƯỜNG GẶP:

#### A. DATABASE CONNECTION ERROR:
```
Error: connect ETIMEDOUT
```
**FIX**: Kiểm tra DATABASE_URL format

#### B. MODULE NOT FOUND:
```
Cannot find module 'mysql2'
```
**FIX**: npm install modules missing

#### C. PORT BINDING ERROR:
```
Error: listen EADDRINUSE :::5000
```
**FIX**: Port đã được dùng

## BƯỚC 2: TEST DIRECT URL
`http://server37.shared.spaceship.host:5000`

### NẾU KHÔNG WORK:
- Node.js app không start được
- Check error logs
- Fix database connection

### NẾU WORK:
- Node.js app OK
- Domain routing problem

## BƯỚC 3: TERMINAL ACCESS
**Advanced** → **Terminal** → Check process:
```bash
ps aux | grep node
netstat -tulpn | grep :5000
```

## TEMPORARY FIX:
Upload `index.php` to public_html:
```php
<?php
header("Location: http://server37.shared.spaceship.host:5000");
exit();
?>
```

**Check error logs first!**