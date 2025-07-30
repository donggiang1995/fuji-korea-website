# CHI TIẾT TỪNG BƯỚC UPLOAD & SETUP

## BƯỚC 1: TẢI PROJECT
1. **Replit** → Click **Files** (bên trái)
2. **3 dots menu** → **Download as zip**
3. Save file `.zip` về máy

## BƯỚC 2: UPLOAD LÊN CPANEL
1. **cPanel** → **File Manager**
2. **Navigate** đến thư mục Node.js app (path đã setup)
3. **Upload** → **Select Files** → Chọn file `.zip`
4. **Chờ upload xong** (thanh progress bar)
5. **Right-click** file `.zip` → **Extract**
6. **Extract Files** → Chọn thư mục extract → **Extract Files**
7. **Xóa** file `.zip` (không cần nữa)

## BƯỚC 3: CẤU HÌNH FILES
Files cần có trong thư mục app:
- `dist/` (folder có `index.js` và `public/`)
- `package.json`
- `node_modules/` (hoặc sẽ install)

## BƯỚC 4: INSTALL DEPENDENCIES
**cPanel** → **Terminal** (hoặc SSH):
```bash
cd /path/to/your/app
npm install --production
```

## BƯỚC 5: UPDATE DATABASE CONFIG
Tạo file `.env` trong app folder:
```
DATABASE_URL=mysql://wodpqkkqov_fuji_admin:YOUR_PASSWORD@localhost:3306/wodpqkkqov_fuji_korea_db
NODE_ENV=production
PORT=3000
```

## BƯỚC 6: START APP
**cPanel** → **Node.js Apps** → Click **Start**

**Có, cần giải nén file zip sau khi upload!**