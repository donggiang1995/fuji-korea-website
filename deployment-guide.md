# FUJI Global Korea - Deployment Guide

## Phương án: GoDaddy Domain + Spaceship Hosting

### Bước 1: Backup dự án
1. Download toàn bộ project từ Replit (File → Download as ZIP)
2. Export database data từ PostgreSQL
3. Lưu environment variables

### Bước 2: Mua domain và hosting
1. **GoDaddy**: Mua domain (ví dụ: fuji-korea.com)
2. **Spaceship**: Mua hosting plan Essential ($1.21/tháng cho 2 năm)

### Bước 3: Cấu hình DNS
Trong GoDaddy DNS Management:
```
Type: A Record
Name: @
Value: [IP của Spaceship hosting]

Type: CNAME
Name: www
Value: fuji-korea.com
```

### Bước 4: Upload code lên Spaceship
1. Truy cập cPanel của Spaceship
2. File Manager → public_html
3. Upload và extract project files
4. Cấu hình Node.js app

### Bước 5: Setup Database
1. Tạo MySQL database trong cPanel
2. Import dữ liệu từ PostgreSQL (convert format)
3. Update DATABASE_URL trong environment

### Bước 6: Cấu hình Node.js
1. Node.js App Setup trong cPanel
2. Set startup file: server/index.js
3. Install dependencies: npm install

### Bước 7: SSL Certificate
1. Spaceship tự động cấp Let's Encrypt SSL
2. Force HTTPS redirect

## Workflow chỉnh sửa sau này:

### Option 1: FTP/SFTP
1. Chỉnh sửa trên Replit mới (hoặc local)
2. Upload qua FTP client (FileZilla)
3. Restart Node.js app

### Option 2: Git Integration
1. Push code từ Replit lên GitHub
2. Pull từ GitHub xuống Spaceship via SSH
3. Auto restart app

### Environment Variables cần thiết:
- DATABASE_URL (MySQL connection string)
- NODE_ENV=production
- REPL_ID (có thể bỏ qua)

## Lưu ý quan trọng:
- Spaceship dùng MySQL, hiện tại dự án dùng PostgreSQL
- Cần convert database schema từ PostgreSQL sang MySQL
- Cần update Drizzle config cho MySQL