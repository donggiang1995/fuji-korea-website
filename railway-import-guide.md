# 🚀 Railway Database Import - Hướng dẫn hoàn chỉnh

## ⚡ Cách import database lên Railway (2 phút)

### Bước 1: Vào Railway Dashboard
1. Đăng nhập vào [Railway Dashboard](https://railway.app)
2. Mở project có PostgreSQL service
3. Click vào **PostgreSQL service**

### Bước 2: Mở Query Console
1. Trong PostgreSQL service, click tab **"Data"**
2. Click **"Query"** button
3. Sẽ mở ra SQL editor

### Bước 3: Copy & Paste SQL
1. Mở file `scripts/setup-railway-db.sql`
2. **Copy toàn bộ nội dung** (Ctrl+A, Ctrl+C)
3. **Paste vào Railway Query Console** (Ctrl+V)
4. Click **"Run Query"** button

### Bước 4: Kiểm tra kết quả
Nếu thành công, bạn sẽ thấy:
```
Products count: 8
Serial numbers count: 15
Admin users count: 1
```

## ✅ Database đã sẵn sàng!

Sau khi import thành công:

### 🔐 Admin Panel
- **URL**: `https://your-app.railway.app/admin`
- **Username**: `admin`
- **Password**: `admin123`

### 🔍 Test Serial Search
- **Serial numbers có sẵn**:
  - `FCA-9000-2024-001`
  - `TM-800-2024-001`
  - `FJK125001`
  - `FJK225001`
  - và 11 serial khác...

### 📊 Data có sẵn
- **8 Products**: Control cabinets và traction machines
- **15 Serial Numbers**: Với locations và status
- **1 Admin User**: Để quản lý hệ thống

## 🔧 Nếu gặp lỗi

### Lỗi "relation already exists"
- **Nguyên nhân**: Tables đã tồn tại
- **Giải pháp**: Thêm `DROP TABLE IF EXISTS` trước mỗi `CREATE TABLE`

### Lỗi "duplicate key value"
- **Nguyên nhân**: Data đã được import
- **Giải pháp**: Thêm `ON CONFLICT DO NOTHING` vào INSERT statements

### Lỗi "syntax error"
- **Nguyên nhân**: Copy thiếu hoặc thừa characters
- **Giải pháp**: Copy lại toàn bộ file SQL

## 📱 Next Steps

1. **Deploy app lên Railway**
2. **Test website hoạt động**
3. **Đổi admin password ngay**
4. **Test tất cả features**

---

## 🎯 Tóm tắt nhanh:

1. Vào Railway PostgreSQL → Data → Query
2. Copy/paste `scripts/setup-railway-db.sql` 
3. Run Query
4. Done! 🎉

Database của bạn đã sẵn sàng để deploy application!