# 📤 UPLOAD SCRIPT TỰ ĐỘNG

## 🎯 BƯỚC ĐƠN GIẢN (3 phút)

### **1. Download Script từ Replit**
- Click vào file `auto-database-setup.php` 
- Right-click → **Download**
- Lưu vào máy tính

### **2. Upload lên Spaceship**
- cPanel → **File Manager**
- Navigate to `public_html/`
- Click **Upload**
- Choose `auto-database-setup.php`
- Wait for upload complete

### **3. Chạy Script**
- Mở browser mới
- Truy cập: `http://your-domain.com/auto-database-setup.php`
- Sẽ thấy form nhập thông tin

### **4. Nếu CHƯA có Database:**
- cPanel → **MySQL Database Wizard** (tab mới)
- Database Name: `fuji_korea_db`
- Username: `fuji_admin`
- Password: tạo strong password (ghi lại!)
- All Privileges: ✓

### **5. Chạy Script với Credentials:**
- Database User: `your_cpanel_username_fuji_admin`
- Database Password: [password vừa tạo]
- Database Name: `your_cpanel_username_fuji_korea_db`
- Click **Setup Database**

### **6. Script Sẽ:**
- Tạo all tables
- Insert sample data
- Show DATABASE_URL

### **7. Copy DATABASE_URL**
Format sẽ là:
```
DATABASE_URL=mysql://user_fuji_admin:password@localhost:3306/user_fuji_korea_db
```

### **8. XÓA Script (Security)**
- File Manager → Delete `auto-database-setup.php`

---

## 🔍 TROUBLESHOOTING

**Script không load:**
- Check file uploaded đúng folder `public_html/`
- Check domain đã point đúng IP

**Database connection failed:**
- Tạo database trước trong MySQL Database Wizard
- Check credentials đúng format

**Permission denied:**
- User cần ALL PRIVILEGES
- Check database name có prefix username

---

## ✅ THÀNH CÔNG KHI:
- Script hiển thị "DATABASE SETUP COMPLETE"
- Có DATABASE_URL
- Data inserted (5 products, 15 serials, 1 admin)

**Ready to start? Download script và upload lên cPanel!**