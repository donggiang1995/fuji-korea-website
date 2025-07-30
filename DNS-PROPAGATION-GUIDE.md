# BƯỚC 2: UPDATE APPLICATION STARTUP FILE

## VỊ TRÍ: SPACESHIP CPANEL

### CÁCH TRUY CẬP:
1. **Login** Spaceship cPanel
2. **Software** section → **Node.js Apps**
3. **Click vào app** `fujiglobal.kr/` trong danh sách

### TRONG APP SETTINGS:
1. **Application Startup File** field
2. **Hiện tại**: `server/index.js`
3. **Đổi thành**: `dist/index.js`
4. **Save** changes
5. **Restart** app

### TẠI SAO CẦN ĐỔI:
- Deploy đã build code vào `dist/index.js`
- App đang chạy `server/index.js` (development version)
- Cần chạy `dist/index.js` (production version)

### SAU KHI ĐỔI:
- App sẽ restart
- Status: Running
- Ready for domain setup

**Tìm field "Application Startup File" trong Node.js Apps settings!**