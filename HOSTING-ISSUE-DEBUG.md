# HOSTING ISSUE DEBUG

## VẤN ĐỀ: 
Standalone Node.js app vẫn không phản hồi = Hosting configuration có vấn đề

## NGUYÊN NHÂN CÓ THỂ:

### 1. FILE UPLOAD ISSUE
- `dist/index-standalone.js` chưa upload được
- FTP deployment có lỗi
- File permissions sai

### 2. SPACESHIP HOSTING ISSUE
- Node.js service không running
- Port 5000 bị block
- Server configuration sai

### 3. DOMAIN DNS ISSUE
- fujiglobal.kr chưa point đúng server
- Nameservers chưa propagate
- GoDaddy DNS settings sai

## GIẢI PHÁP BACKUP:

### A. PHP TEST PAGE
Upload `simple-test.php` vào **public_html**:
```php
<?php
echo "FUJI Global Korea - Test Page Working!";
echo "<br>Time: " . date('Y-m-d H:i:s');
?>
```
Test: `http://fujiglobal.kr/simple-test.php`

### B. STATIC HTML VERSION
Tạo static website thay vì Node.js:
- Copy `dist/public/*` vào `public_html/`
- Website sẽ work ngay (không cần Node.js)

### C. SUBDOMAIN TEST
Thử subdomain: `app.fujiglobal.kr` point to Node.js app

### D. CONTACT SPACESHIP SUPPORT
Hỏi tại sao Node.js app không start được

## KIỂM TRA HIỆN TẠI:

1. **Test PHP**: `fujiglobal.kr/simple-test.php`
2. **Nếu PHP work** → Hosting OK, Node.js config issue
3. **Nếu PHP không work** → Domain/DNS issue

**Test PHP page trước để xác định issue!**