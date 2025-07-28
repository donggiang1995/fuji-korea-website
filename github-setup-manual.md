# FUJI Global Korea - GitHub Setup Manual

## Tại sao cần GitHub?
- **Backup code** an toàn trên cloud
- **Chỉnh sửa từ nhiều Replit account** khác nhau
- **Version control** - rollback khi có lỗi
- **Professional workflow** cho team

## PHƯƠNG ÁN ĐẦY ĐỦ:

### **Option 1: Deploy trước, GitHub sau (Khuyên dùng)**
```
Replit → Spaceship (Deploy ngay) → GitHub (Setup sau)
```

### **Option 2: GitHub đầu tiên**
```
Replit → GitHub → Spaceship (Deploy từ GitHub)
```

---

## **OPTION 1: Deploy trước, GitHub sau**

### ✅ **BẮT ĐẦU: Deploy lên Spaceship**
1. **Download project** từ Replit (File → Download ZIP)
2. **Deploy lên Spaceship** theo checklist đã có
3. **Test website** hoạt động
4. **Sau đó setup GitHub**

### 📋 **Setup GitHub sau khi deploy:**

#### **Bước 1: Tạo GitHub Repository**
1. Đăng nhập GitHub.com
2. **New Repository**
3. Tên: `fuji-korea-website`
4. **Public** (hoặc Private nếu có GitHub Pro)
5. **Không tick** "Initialize with README"
6. **Create Repository**

#### **Bước 2: Upload code lên GitHub**
**Cách 1: Web Interface (Dễ nhất)**
1. Giải nén project ZIP
2. GitHub repo → **uploading an existing file**
3. Drag & Drop tất cả files vào
4. **Commit** với message: "Initial commit - FUJI Korea Website"

**Cách 2: Git Commands (Chuyên nghiệp)**
```bash
# Trong thư mục project (sau khi extract ZIP)
git init
git add .
git commit -m "Initial commit - FUJI Korea Website"
git remote add origin https://github.com/USERNAME/fuji-korea-website.git
git branch -M main
git push -u origin main
```

#### **Bước 3: Setup Spaceship Auto-Deploy**
1. SSH vào Spaceship cPanel
2. Clone repository:
```bash
cd /tmp
git clone https://github.com/USERNAME/fuji-korea-website.git
cp -r fuji-korea-website/* /home/username/public_html/
```

3. Tạo update script:
```bash
# Tạo file update-from-github.sh
#!/bin/bash
cd /home/username/public_html
git pull origin main
npm install --production
pm2 restart fuji-korea-web
```

---

## **OPTION 2: GitHub trước (Advanced)**

### **Bước 1: Tạo Repository và Upload**
1. Tạo GitHub repo như trên
2. Download project từ Replit
3. Upload lên GitHub

### **Bước 2: Deploy từ GitHub**
1. SSH vào Spaceship
2. Clone trực tiếp:
```bash
cd /home/username/public_html
git clone https://github.com/USERNAME/fuji-korea-website.git .
```

3. Setup như bình thường

---

## **WORKFLOW SAU KHI SETUP GITHUB**

### **Chỉnh sửa từ Replit Account mới:**
1. **Clone repository**:
   - GitHub repo → **Code** → Copy HTTPS URL
   - Replit → **Import from GitHub** → Paste URL

2. **Chỉnh sửa và deploy**:
   ```bash
   # Sau khi chỉnh sửa
   git add .
   git commit -m "Update: [mô tả thay đổi]"
   git push origin main
   
   # Trên Spaceship (SSH)
   ./update-from-github.sh
   ```

### **Chỉnh sửa từ Local Computer:**
1. `git clone https://github.com/USERNAME/fuji-korea-website.git`
2. Chỉnh sửa bằng VS Code
3. `git push origin main`
4. Update trên Spaceship

---

## **FILES CẦN .gitignore**

Tạo file `.gitignore`:
```
# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Database backup files
database-backup.json
mysql-import-data.sql

# Logs
logs/
*.log

# Replit specific
.replit

# Spaceship specific
spaceship-config.js
```

---

## **KẾT LUẬN VÀ KHUYẾN NGHỊ**

### **Cho bạn tôi khuyên:**
**OPTION 1** - Deploy trước, GitHub sau:

**Ưu tiên ngay bây giờ:**
1. ✅ **Deploy lên Spaceship** → Website hoạt động
2. ✅ **Test và fix bugs** nếu có  
3. ✅ **Sau đó setup GitHub** cho việc chỉnh sửa lâu dài

**Lý do:**
- Website live nhanh nhất
- Tránh phức tạp thêm
- GitHub có thể setup sau
- Ưu tiên business trước, workflow sau

### **Timeline đề xuất:**
- **Hôm nay**: Deploy lên Spaceship
- **Ngày mai**: Setup GitHub workflow
- **Tuần sau**: Test chỉnh sửa từ account mới

**Bạn đồng ý plan này không? Bắt đầu deploy Spaceship trước?**