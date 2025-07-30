# MANUAL UPLOAD GUIDE

## BƯỚC 1: DOWNLOAD PROJECT
1. **Replit** → **Files** → Click **Download** button (3 dots menu)
2. Hoặc zip toàn bộ project folder

## BƯỚC 2: CHUẨN BỊ FILES
Chỉ cần upload các files này:
- `dist/` folder (toàn bộ)
- `package.json`
- `node_modules/` (nếu cần) hoặc sẽ npm install trên server

## BƯỚC 3: UPLOAD VIA CPANEL
1. **cPanel** → **File Manager**
2. Navigate to Node.js app directory
3. **Upload** → Select zip file hoặc drag & drop
4. **Extract** files nếu upload zip

## BƯỚC 4: INSTALL DEPENDENCIES
**Terminal** trong cPanel hoặc SSH:
```bash
cd /path/to/app
npm install --production
```

## BƯỚC 5: START APP
**cPanel** → **Node.js Apps** → Click **Start**

## BƯỚC 6: TEST
Visit your domain → Website should be live!

**Fastest way to get website online!**