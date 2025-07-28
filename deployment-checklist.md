# FUJI Global Korea - Deployment Checklist
## Hướng dẫn từng bước cho GoDaddy + Spaceship

### ✅ HOÀN TẤT: Database Backup
- Products: 5 records
- Serial Numbers: 15 records  
- Admin Users: 1 record
- MySQL script: mysql-import-data.sql

### 📋 BƯỚC TIẾP THEO (Làm theo thứ tự):

#### **BƯỚC 1: Chuẩn bị files**
1. Download project: **File → Download as ZIP**
2. Lưu các file quan trọng:
   - `mysql-import-data.sql` (database)
   - `package-spaceship.json` (dependencies)
   - `drizzle.config.mysql.ts` (config)
   - `shared/schema-mysql.ts` (schema)

#### **BƯỚC 2: Setup Domain DNS (GoDaddy)**
1. Login GoDaddy → Manage DNS
2. Tìm **A Record**:
   - Type: A
   - Name: @
   - Value: [IP của Spaceship] (sẽ có trong email hoặc cPanel)
3. Tìm **CNAME Record**:
   - Type: CNAME
   - Name: www
   - Value: [tên-domain].com

#### **BƯỚC 3: Upload lên Spaceship**
1. Login Spaceship cPanel
2. **File Manager** → `public_html`
3. Delete file mặc định (nếu có)
4. Upload ZIP project và **Extract**
5. Rename `package-spaceship.json` → `package.json`

#### **BƯỚC 4: Setup MySQL Database**
1. cPanel → **MySQL Database Wizard**
2. Tạo database: `fuji_korea_db`
3. Tạo user + password
4. **phpMyAdmin** → Import `mysql-import-data.sql`

#### **BƯỚC 5: Environment Variables**
Trong cPanel → **Environment Variables**:
```
NODE_ENV=production
DATABASE_URL=mysql://username:password@localhost:3306/fuji_korea_db
PORT=3000
```

#### **BƯỚC 6: Node.js App Setup**
1. cPanel → **Setup Node.js App**
2. **Create Application**:
   - Application Path: `/public_html`
   - Application URL: [domain].com
   - Startup File: `server/index.js`
   - Node.js Version: 18.x hoặc 20.x

#### **BƯỚC 7: Install Dependencies**
1. Trong Node.js App → **Terminal**
2. Chạy: `npm install --production`
3. Build: `npm run build` (nếu cần)

#### **BƯỚC 8: SSL Certificate**
1. cPanel → **SSL/TLS**
2. **Let's Encrypt** → Enable cho domain
3. Force HTTPS redirect

#### **BƯỚC 9: Test Website**
1. Truy cập https://[domain].com
2. Test serial search: FJK125001
3. Admin login: /admin (admin/admin123)

### 🔧 TROUBLESHOOTING

**Website không load:**
- Check Node.js app status
- Xem error logs trong cPanel
- Verify database connection

**Database error:**
- Check DATABASE_URL format
- Verify MySQL user permissions
- Re-import mysql-import-data.sql

**Admin login không được:**
- Default: admin/admin123
- Reset password trong phpMyAdmin

### 🚀 SAU KHI DEPLOY THÀNH CÔNG

**Setup GitHub Repo:**
1. Tạo GitHub repository mới
2. Upload code lên GitHub
3. Setup SSH key cho Spaceship
4. Clone repo vào Spaceship

**Future Updates:**
1. Edit code trên Replit mới
2. Push lên GitHub
3. SSH vào Spaceship: `git pull`
4. Restart Node.js app

### 📞 HỖ TRỢ
Nếu gặp vấn đề ở bước nào, cho tôi biết:
- Bước đang làm
- Error message cụ thể
- Screenshot (nếu có)

**BẮT ĐẦU TỪ BƯỚC 2 - SETUP DNS GODADDY!**