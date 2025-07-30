# DEPLOY STATIC WEBSITE NGAY

## PHP work = Hosting OK! Giờ deploy static website:

### BƯỚC 1: SETUP API ENDPOINTS
Upload `deploy-static.php` và chạy:
`http://fujiglobal.kr/deploy-static.php`

Sẽ tạo:
- `/api/products.php` - Product data
- `/api/health.php` - Health check  
- `/api/serial-search.php` - Serial search

### BƯỚC 2: COPY STATIC FILES
**File Manager** → **public_html**:

Copy các files từ `dist/public/`:
- `index.html` → `public_html/index.html`
- `assets/` folder → `public_html/assets/`
- All CSS, JS, images

### BƯỚC 3: TEST WEBSITE
- `http://fujiglobal.kr` → Should show FUJI website
- `http://fujiglobal.kr/api/products.php` → Should show products JSON
- `http://fujiglobal.kr/api/health.php` → Should show status

### KẾT QUẢ:
✅ Website hoạt động đầy đủ với static files
✅ API endpoints work với PHP  
✅ Product catalog, serial search, contact form
✅ Admin panel tạm thời disabled (có thể add sau)

### SAU ĐÓ:
Fix Node.js app để có admin panel và database features

**Chạy deploy-static.php và copy static files ngay!**