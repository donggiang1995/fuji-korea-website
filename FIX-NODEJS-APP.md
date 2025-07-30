# FIX NODE.JS APP - STANDALONE VERSION

## VẤN ĐỀ:
URL trực tiếp `http://server37.shared.spaceship.host:5000` không work = Node.js app không start

## NGUYÊN NHÂN CÓ THỂ:
1. **Database connection error** - MySQL connection string sai
2. **Missing dependencies** - mysql2, drizzle-orm modules
3. **Build issues** - dist/index.js có lỗi

## GIẢI PHÁP: STANDALONE VERSION

### BƯỚC 1: UPLOAD STANDALONE APP
Upload file `dist/index-standalone.js` (đã tạo)

### BƯỚC 2: UPDATE SPACESHIP SETTINGS
**Node.js Apps** → **Application Startup File**:
- Đổi từ: `dist/index.js`
- Thành: `dist/index-standalone.js`
- **Save** và **Restart**

### BƯỚC 3: TEST
- `http://server37.shared.spaceship.host:5000/api/health`
- Should return: `{"status":"ok","message":"FUJI Global Korea API is running"}`

### BƯỚC 4: TEST DOMAIN
- `http://fujiglobal.kr/api/health`
- Should work if standalone app starts

## STANDALONE APP FEATURES:
- ✅ No database dependencies
- ✅ Basic API endpoints
- ✅ Static file serving
- ✅ Health check endpoint
- ✅ Error handling

## NEXT STEPS:
1. **Test standalone version first**
2. **If works** → Domain setup OK, database was the issue
3. **Fix database connection** later
4. **Switch back to full app** when database ready

**Upload standalone version và test ngay!**