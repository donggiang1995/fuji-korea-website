# FINAL DEBUG - WEBSITE NOT LOADING

## VẤN ĐỀ:
Copy files nhưng website vẫn không hiển thị

## NGUYÊN NHÂN CÓ THỂ:
1. **Browser Cache** - Old files cached
2. **File Upload Failed** - Files không upload đúng
3. **Path Issues** - Files uploaded sai folder
4. **Permissions** - File permissions bị sai

## GIẢI PHÁP DEBUG:

### BƯỚC 1: RUN DEBUG SCRIPT
Upload `clear-cache.php` và chạy:
`http://fujiglobal.kr/clear-cache.php`

Script sẽ:
- ✅ Check file existence 
- ✅ List directory contents
- ✅ Create basic index.html if missing
- ✅ Provide debug info

### BƯỚC 2: CLEAR BROWSER CACHE
- **Chrome**: Ctrl+Shift+R hoặc Ctrl+F5
- **Incognito mode**: Test trong private browsing
- **Different browser**: Try Firefox, Safari

### BƯỚC 3: VERIFY FILE LOCATIONS
Files phải ở:
```
public_html/
├── index.html
├── api/
│   ├── health.php
│   ├── products.php
│   └── serial-search.php
└── assets/ (nếu có React files)
    ├── index-BHJ5syaQ.css
    ├── index-ZF6frZWn.js
    └── *.png images
```

### BƯỚC 4: BASIC TEST
Upload `test-basic.html` as `test.html`:
Test: `http://fujiglobal.kr/test.html`

## KẾT QUẢ MONG ĐỢI:
Sau debug script → Website sẽ hiển thị basic version và work ngay

**Chạy clear-cache.php để debug và fix!**