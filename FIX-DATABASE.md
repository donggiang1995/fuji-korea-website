# FIX DATABASE - BƯỚC 3 ĐÚNG

## LỖI: Access denied to database 'fuji_korea_db'
## NGUYÊN NHÂN: Chưa tạo database đúng cách

## CÁCH SỬA:

### 1. TẠO DATABASE TRONG cPANEL
1. cPanel → **MySQL Databases**
2. **Create New Database**
3. Tên database: `fuji_korea_db`
4. **Create Database**
5. Database thật sẽ có tên: `cpses_wo6a6h1r37_fuji_korea_db`

### 2. TẠO USER CHO DATABASE  
1. **MySQL Users** → **Add New User**
2. Username: `fuji_admin`
3. Password: tạo password mạnh (lưu lại)
4. **Create User**
5. Username thật sẽ có tên: `cpses_wo6a6h1r37_fuji_admin`

### 3. ASSIGN USER TO DATABASE
1. **Add User To Database**
2. User: `cpses_wo6a6h1r37_fuji_admin`
3. Database: `cpses_wo6a6h1r37_fuji_korea_db`
4. **ALL PRIVILEGES** → **Make Changes**

### 4. IMPORT DATABASE
1. **phpMyAdmin**
2. **Select database**: `cpses_wo6a6h1r37_fuji_korea_db`
3. **Import** → chọn file `mysql-import-data.sql`
4. **Go**

### 5. UPDATE ENVIRONMENT VARIABLE
Node.js Apps → Environment Variables → Update:
```
DATABASE_URL=mysql://cpses_wo6a6h1r37_fuji_admin:YOUR_PASSWORD@localhost:3306/cpses_wo6a6h1r37_fuji_korea_db
```

Thay YOUR_PASSWORD bằng password user vừa tạo.