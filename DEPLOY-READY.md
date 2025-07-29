# 🚀 FUJI Global Korea - DEPLOY READY

## ✅ CHUẨN BỊ HOÀN TẤT

### Database Backup:
- **Products**: 5 records ✅
- **Serial Numbers**: 15 records ✅  
- **Admin Users**: 1 record ✅
- **Latest Change**: Status "Active" → "Original" ✅

### Files sẵn sàng deploy:
- ✅ `mysql-import-data.sql` - Database import script
- ✅ `package-spaceship.json` - Dependencies cho Spaceship
- ✅ `drizzle.config.mysql.ts` - MySQL configuration
- ✅ `shared/schema-mysql.ts` - MySQL schema
- ✅ `.gitignore` - Git ignore rules
- ✅ All source code updated

---

## 🎯 BẮT ĐẦU DEPLOYMENT

### **BƯỚC 1: DOWNLOAD PROJECT (NGAY BÂY GIỜ)**
```
File → Download as ZIP
```
**Quan trọng**: Backup toàn bộ project trước khi Replit account hết hạn!

### **BƯỚC 2: SPACESHIP HOSTING SETUP**

#### 2.1 Domain DNS (GoDaddy)
1. Login GoDaddy → **Manage DNS**
2. **A Record**:
   - Type: A
   - Name: @
   - Value: [IP của Spaceship hosting] 
   - TTL: 1 Hour
3. **CNAME Record**:
   - Type: CNAME  
   - Name: www
   - Value: your-domain.com

#### 2.2 Upload Code (Spaceship cPanel)
1. Login Spaceship cPanel
2. **File Manager** → `public_html`
3. Delete default files
4. Upload project ZIP → **Extract All**
5. Rename `package-spaceship.json` → `package.json`

#### 2.3 Database Setup
1. cPanel → **MySQL Database Wizard**
2. Database name: `fuji_korea_db`
3. Create user + strong password
4. **phpMyAdmin** → Import `mysql-import-data.sql`

#### 2.4 Environment Variables
cPanel → **Node.js** → **Environment Variables**:
```
NODE_ENV=production
DATABASE_URL=mysql://username:password@localhost:3306/fuji_korea_db
PORT=3000
```

#### 2.5 Node.js App Configuration
1. **Setup Node.js App**:
   - Application Path: `/public_html`
   - Application URL: your-domain.com
   - Startup File: `server/index.js`
   - Node.js Version: 18.x or 20.x

2. **Install Dependencies**:
   ```bash
   npm install --production
   ```

3. **Build Application**:
   ```bash
   npm run build
   ```

#### 2.6 SSL Certificate
1. cPanel → **SSL/TLS**
2. **Let's Encrypt** → Enable
3. Force HTTPS redirect

---

## 🧪 TESTING CHECKLIST

### Website Functionality:
- [ ] Homepage loads
- [ ] Language switcher works (한국어/English)
- [ ] Product catalog displays
- [ ] Serial search works (test: `123456`, `FJK125001`)
- [ ] Status shows "Original" (not "Active")
- [ ] Contact form submits
- [ ] Admin panel accessible: `/admin`
- [ ] Admin login: `admin` / `admin123`

---

## 📋 GITHUB SETUP (AFTER DEPLOY)

### Phase 2: GitHub Integration
1. **Create Repository**: `fuji-korea-website`
2. **Upload Source Code**
3. **Setup Auto-Deploy Script**
4. **Test Git Workflow**

---

## 🆘 TROUBLESHOOTING

### Common Issues:
- **Website not loading**: Check Node.js app status
- **Database errors**: Verify DATABASE_URL format
- **Admin login failed**: Reset password in phpMyAdmin
- **Images not loading**: Check image paths in code

### Support:
- Spaceship Support: 24/7 live chat
- cPanel documentation available
- SSH access available if needed

---

## 📞 NEXT STEPS

1. **Download project now** (File → Download ZIP)
2. **Follow this guide step by step**
3. **Test website thoroughly** 
4. **Report any issues** for immediate fix
5. **Setup GitHub** once website is live

**READY TO START? Download the project ZIP file first!**