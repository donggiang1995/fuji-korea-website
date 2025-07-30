# 📋 **BƯỚC 4: SPACESHIP HOSTING SETUP - CHI TIẾT**

## 🎯 **Mục tiêu:** Setup Spaceship hosting để nhận auto-deploy từ GitHub Actions

---

## **4.1 NODE.JS APPLICATION SETUP**

### **Bước 4.1.1: Truy cập cPanel**
1. **Login vào Spaceship cPanel**
2. **Tìm "Node.js Apps"** (thường ở Software section)
3. **Click "Node.js Apps"**

### **Bước 4.1.2: Create Node.js Application**
1. **Click "Create Application"**
2. **Fill form:**
   - **Node.js Version:** `18.x` hoặc `20.x`  
   - **Application Mode:** `Production`
   - **Application Root:** `/public_html`
   - **Application URL:** `your-domain.com` (domain của bạn)
   - **Application Startup File:** `server/index.js`
3. **Click "Create"**

### **Bước 4.1.3: Verify Application Created**
- Sẽ thấy app trong danh sách
- Status: `Stopped` (chưa có code)
- Application path: `/public_html`

---

## **4.2 ENVIRONMENT VARIABLES SETUP**

### **Bước 4.2.1: Add Environment Variables**
1. **Click vào app vừa tạo** (trong Node.js Apps list)
2. **Tab "Environment Variables"**
3. **Add từng variable:**

#### **Variable 1: DATABASE_URL**
- **Name:** `DATABASE_URL`
- **Value:** `mysql://username_fuji_admin:password@localhost:3306/username_fuji_korea_db`
- **Lưu ý:** Thay `username` bằng cPanel username thật

#### **Variable 2: NODE_ENV**
- **Name:** `NODE_ENV`
- **Value:** `production`

#### **Variable 3: PORT**
- **Name:** `PORT`
- **Value:** `3000`

### **Bước 4.2.2: DATABASE_URL Format**
```
mysql://[USERNAME]:[PASSWORD]@localhost:3306/[DATABASE_NAME]

Thực tế:
mysql://user123_fuji_admin:MyPass123@localhost:3306/user123_fuji_korea_db
```

---

## **4.3 MYSQL DATABASE SETUP**

### **Bước 4.3.1: Create Database**
1. **cPanel → MySQL Databases**
2. **"Create New Database"**
3. **Database Name:** `fuji_korea_db`
4. **Click "Create Database"**
5. **Full name sẽ là:** `cpanel_username_fuji_korea_db`

### **Bước 4.3.2: Create MySQL User**
1. **MySQL Users → "Add New User"**
2. **Username:** `fuji_admin`
3. **Password:** Strong password (lưu lại)
4. **Click "Create User"**
5. **Full name sẽ là:** `cpanel_username_fuji_admin`

### **Bước 4.3.3: Add User to Database**
1. **"Add User to Database"**
2. **User:** `cpanel_username_fuji_admin`
3. **Database:** `cpanel_username_fuji_korea_db`
4. **Check "ALL PRIVILEGES"**
5. **Click "Make Changes"**

### **Bước 4.3.4: Import Database**
1. **cPanel → phpMyAdmin**
2. **Select database:** `cpanel_username_fuji_korea_db`
3. **Tab "Import"**
4. **Choose file:** `mysql-import-data.sql` (từ project)
5. **Click "Go"**
6. **Verify import success:** 5 products, 15 serials, 1 admin

---

## **4.4 FTP ACCOUNT SETUP**

### **Bước 4.4.1: Create FTP Account (Recommended)**
1. **cPanel → FTP Accounts**
2. **"Create FTP Account"**
3. **Fill form:**
   - **Username:** `github_deploy`
   - **Password:** Strong password (save for GitHub Secrets)
   - **Directory:** `/public_html/`
   - **Quota:** `Unlimited`
4. **Click "Create FTP Account"**

### **Bước 4.4.2: FTP Connection Info**
- **Host:** Domain của bạn hoặc FTP hostname từ cPanel
- **Username:** `github_deploy` (hoặc main cPanel username)
- **Password:** FTP password (hoặc cPanel password)
- **Directory:** `/public_html/`

### **Bước 4.4.3: Test FTP (Optional)**
- Download FileZilla
- Connect với FTP info
- Try upload 1 test file
- If success → GitHub Actions sẽ work

---

## **4.5 SSL CERTIFICATE SETUP**

### **Bước 4.5.1: Enable Let's Encrypt SSL**
1. **cPanel → SSL/TLS**
2. **"Let's Encrypt SSL"**
3. **Select domain**
4. **Click "Issue"**
5. **Wait 1-2 minutes**

### **Bước 4.5.2: Force HTTPS Redirect**
1. **cPanel → Redirects**
2. **Type:** `Permanent (301)`
3. **From:** `http://your-domain.com/*`
4. **To:** `https://your-domain.com/$1`
5. **Click "Add"**

### **Bước 4.5.3: Verify SSL**
- Visit `https://your-domain.com`
- Should show padlock icon
- Certificate should be valid

---

## **4.6 FINAL CONFIGURATION CHECK**

### **Checklist trước khi deploy:**
- [ ] **Node.js App** tạo xong (Application Root: `/public_html`)
- [ ] **Environment Variables** đã add (DATABASE_URL, NODE_ENV, PORT)
- [ ] **MySQL Database** tạo và import data xong
- [ ] **FTP Account** tạo xong cho GitHub Actions
- [ ] **SSL Certificate** active
- [ ] **GitHub Secrets** sẵn sàng add FTP info

### **Environment Variables phải chính xác:**
```bash
DATABASE_URL=mysql://your_cpanel_username_fuji_admin:your_password@localhost:3306/your_cpanel_username_fuji_korea_db
NODE_ENV=production
PORT=3000
```

### **GitHub Secrets chuẩn bị:**
- `SPACESHIP_HOST` = domain hoặc FTP hostname
- `SPACESHIP_USERNAME` = `github_deploy` hoặc cPanel username
- `SPACESHIP_PASSWORD` = FTP password hoặc cPanel password

---

## **🆘 TROUBLESHOOTING**

### **Node.js App không tạo được:**
- Check Node.js version available (18.x, 20.x)
- Ensure `/public_html` directory exists
- Contact Spaceship support if needed

### **Database connection fails:**
- Verify DATABASE_URL format exactly
- Check MySQL user has ALL PRIVILEGES
- Test connection in phpMyAdmin

### **FTP connection fails:**
- Try main cPanel credentials first
- Check FTP hostname in cPanel → FTP Accounts
- Ensure `/public_html/` directory accessible

**Setup xong Bước 4 là sẵn sàng nhận GitHub Actions deploy! Bạn đã setup được phần nào?**