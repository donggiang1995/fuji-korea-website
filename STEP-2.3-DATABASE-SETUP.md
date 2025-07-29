# 🗄️ BƯỚC 2.3: DATABASE SETUP

## 🎯 TẠO VÀ IMPORT DATABASE (10-15 phút)

### **A. TẠO MYSQL DATABASE**

#### 1. Access MySQL Database Wizard
- cPanel Dashboard → **MySQL Database Wizard**
- Hoặc tìm "MySQL" trong search box

#### 2. Create Database
- **Database Name**: `fuji_korea_db`
- Click **Next Step**
- **Note**: Tên đầy đủ sẽ là `username_fuji_korea_db`

#### 3. Create Database User
- **Username**: `fuji_admin`
- **Password**: Tạo strong password (ghi lại!)
- **Password Strength**: Must be "Very Strong"
- Click **Create User**

#### 4. Add User to Database
- **User**: `fuji_admin`
- **Database**: `fuji_korea_db`
- **Privileges**: **ALL PRIVILEGES** (check all boxes)
- Click **Next Step**

### **B. IMPORT DATABASE DATA**

#### 1. Access phpMyAdmin
- cPanel Dashboard → **phpMyAdmin**
- Login automatically (single sign-on)

#### 2. Select Database
- Left sidebar → Click `username_fuji_korea_db`
- Ensure database is selected (highlighted)

#### 3. Import Data
- Top menu → **Import** tab
- **Choose File** → Select `mysql-import-data.sql`
- **Format**: SQL
- **Character set**: utf8_general_ci
- Click **Import**

#### 4. Verify Import Success
Should see tables created:
- `products` (5 records)
- `serial_numbers` (15 records) 
- `admin_users` (1 record)

### **C. DATABASE CONNECTION STRING**

#### Format for Environment Variables:
```
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

#### Your Specific Format:
```
DATABASE_URL=mysql://cpanel_username_fuji_admin:your_password@localhost:3306/cpanel_username_fuji_korea_db
```

**Example** (replace with your actual values):
```
DATABASE_URL=mysql://user123_fuji_admin:MyStr0ngP@ss!@localhost:3306/user123_fuji_korea_db
```

### **D. TEST DATABASE CONNECTION**

#### Quick Test Query in phpMyAdmin:
```sql
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_serials FROM serial_numbers;
SELECT username FROM admin_users;
```

**Expected Results:**
- total_products: 5
- total_serials: 15
- username: admin

### **E. NOTES FOR NEXT STEP**

#### Save These Credentials:
- **Database Host**: localhost
- **Database Name**: `cpanel_username_fuji_korea_db`
- **Database User**: `cpanel_username_fuji_admin`
- **Database Password**: [your strong password]
- **Full DATABASE_URL**: [complete connection string]

### **F. TROUBLESHOOTING**

#### Import Issues:
- **File not found**: Upload `mysql-import-data.sql` again
- **Import failed**: Check file encoding (should be UTF-8)
- **Tables empty**: Re-run import, check for errors

#### Connection Issues:
- **Access denied**: Verify user has ALL PRIVILEGES
- **Database not found**: Check exact database name with prefix
- **Password wrong**: Reset user password in MySQL Users

---

## ✅ VERIFICATION CHECKLIST

- [ ] Database `fuji_korea_db` created
- [ ] User `fuji_admin` created with strong password
- [ ] All privileges granted to user
- [ ] Data imported successfully (5+15+1 records)
- [ ] Connection string formatted correctly
- [ ] Credentials saved for next step

---

## 🎯 NEXT: BƯỚC 2.4 - ENVIRONMENT VARIABLES

Ready to configure Node.js app with database connection!

**⏰ Estimated Time: 10-15 minutes**