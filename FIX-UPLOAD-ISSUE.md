# 🔧 FIXING UPLOAD ISSUE - FUJI GLOBAL KOREA

## CURRENT PROBLEM:
File uploaded but still showing directory listing

## DIAGNOSIS STEPS:

### 1. CHECK FILE LOCATION
**Spaceship cPanel → File Manager:**
- Navigate to **public_html** (not root directory)
- Verify **index.html** exists in public_html folder
- File size should be ~8KB+ (not 0 bytes)

### 2. VERIFY FILENAME
- Must be exactly **"index.html"** (lowercase)
- NOT: Index.html, INDEX.HTML, index.HTML

### 3. CHECK FILE PERMISSIONS
- Right-click index.html → Properties/Permissions
- Should be **644** (rw-r--r--)
- If wrong, change to 644

### 4. TEST ALTERNATIVE METHODS

**Method A: Upload test-upload-minimal.html**
- Smaller file, easier to troubleshoot
- Upload as index.html
- Test: fujiglobal.kr

**Method B: Upload index.php**
- PHP version of same content
- Some servers prioritize PHP over HTML
- Upload index.php (keep HTML version too)

**Method C: Clear Cache**
- cPanel → File Manager → Clear Cache
- Browser: Ctrl+F5 or incognito mode

### 5. DIRECTORY INDEX PRIORITY
Some servers check files in this order:
1. index.php
2. index.html
3. index.htm
4. default.html

Try uploading as **index.php** first!

## FILES TO TRY:
1. **test-upload-minimal.html** → index.html (simple test)
2. **index.php** (PHP version)
3. **simple-fuji-website.html** → default.html (backup name)

**Upload index.php first - many servers prioritize PHP files!**
