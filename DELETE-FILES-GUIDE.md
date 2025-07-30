# XÓA FILES TRONG PUBLIC_HTML

## QUAN TRỌNG: CHỈ XÓA FILES, KHÔNG XÓA FOLDERS

### SPACESHIP CPANEL → FILE MANAGER → PUBLIC_HTML:

**XÓA CÁC FILES SAU (nếu có):**
- `index.html`
- `index.php` 
- `default.html`
- `default.php`
- `home.html`
- `welcome.html`
- Bất kỳ file `.html` hoặc `.php` nào khác

**GIỮ LẠI:**
- Thư mục `api/` (nếu có)
- Thư mục `assets/` (nếu có)  
- Thư mục `.well-known/` (SSL certs)
- File `.htaccess` (có thể giữ hoặc xóa)

### SAU KHI XÓA:
1. **Upload** `emergency-website.html`
2. **Rename** thành `index.html`
3. **Set permissions** 644

### TẠI SAO PHẢI XÓA:
Hiện tại có file default đang hiển thị "It works! NodeJS 10.24.1" - file này override website của bạn.

**Chỉ xóa files index.* và upload file mới!**