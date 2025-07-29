# 📁 BƯỚC 2.2: UPLOAD CODE LÊN SPACESHIP cPANEL

## 🎯 QUY TRÌNH UPLOAD (15-20 phút)

### **A. CHUẨN BỊ FILES**

#### 1. Download Project từ Replit
```
File → Download as ZIP
```
- Tên file: `workspace.zip` hoặc `fuji-korea-website.zip`
- Size: khoảng 50-80MB
- Extract để kiểm tra có đầy đủ folders không

#### 2. Kiểm tra Structure
```
project/
├── client/          ✅ Frontend code
├── server/          ✅ Backend code  
├── shared/          ✅ Shared schemas
├── attached_assets/ ✅ Images
├── mysql-import-data.sql     ✅ Database
├── package-spaceship.json   ✅ Dependencies
├── drizzle.config.mysql.ts  ✅ DB config
└── DEPLOY-READY.md  ✅ Instructions
```

### **B. SPACESHIP cPANEL UPLOAD**

#### 1. Login Spaceship cPanel
- URL: `https://cpanel.spaceship.com`
- Username: [your spaceship username] 
- Password: [your spaceship password]

#### 2. Access File Manager
- Dashboard → **File Manager**
- Navigate to: `public_html/`
- **Important**: Xóa tất cả files mặc định (index.html, etc.)

#### 3. Upload Project
- Click **Upload** button (top menu)
- Select `workspace.zip` 
- Wait for upload (3-5 phút)
- **Extract All** khi upload xong
- Delete ZIP file sau khi extract

#### 4. File Structure Check
Sau extract, structure phải như này:
```
public_html/
├── client/
├── server/
├── shared/
├── attached_assets/
├── mysql-import-data.sql
├── package-spaceship.json
├── drizzle.config.mysql.ts
├── package.json (old file)
└── ... other files
```

#### 5. **QUAN TRỌNG**: Rename Package File
- Delete `package.json` (file cũ)
- Rename `package-spaceship.json` → `package.json`
- **Double-check**: File mới phải có MySQL dependencies

### **C. VERIFICATION STEPS**

#### 1. Check Essential Files Present:
- [ ] `server/index.ts` - Main server file
- [ ] `client/src/` - Frontend source  
- [ ] `shared/schema-mysql.ts` - MySQL schema
- [ ] `mysql-import-data.sql` - Database data
- [ ] `package.json` (renamed from spaceship version)

#### 2. Check File Permissions:
- All folders: 755
- All files: 644
- No permission errors in File Manager

#### 3. Check File Sizes:
- `mysql-import-data.sql`: ~5-8KB
- `package.json`: ~3-4KB 
- Total project: ~20-50MB uncompressed

### **D. TROUBLESHOOTING**

#### Upload Issues:
- **File too large**: Use File Manager upload, not browser
- **Extract failed**: Re-upload ZIP, extract again
- **Missing folders**: Check ZIP was created properly

#### File Issues:
- **package.json wrong**: Must be spaceship version with MySQL
- **Permissions denied**: Set folder permissions to 755
- **Structure wrong**: Should match Replit exactly

### **E. NEXT STEPS AFTER UPLOAD**

✅ **Files uploaded successfully**
→ **Continue to Bước 2.3: Database Setup**

#### Quick Commands for Next Step:
1. cPanel → **MySQL Database Wizard**
2. Create database: `fuji_korea_db`
3. Import `mysql-import-data.sql`
4. Note down database credentials

---

## 🆘 CẦN HELP?

**Stuck on upload?**
- Check internet connection
- Try smaller ZIP files
- Use File Manager upload only

**Files missing after extract?**  
- Re-download from Replit
- Check ZIP integrity
- Extract manually if needed

**Ready for next step?**
- Confirm files uploaded ✅
- package.json renamed ✅  
- Structure looks correct ✅
- Continue to Database Setup!

---

**⏰ Estimated Time: 15-20 minutes**
**🎯 Next: Database Setup (Bước 2.3)**