# Railway Database Setup Guide

## Hướng dẫn deploy database lên Railway

### 1. **Chuẩn bị Railway**

1. Tạo project mới trên Railway
2. Add PostgreSQL service
3. Copy DATABASE_URL từ Railway dashboard

### 2. **Set Environment Variable**

```bash
export DATABASE_URL="postgresql://username:password@host:port/database"
```

Hoặc tạo file `.env`:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. **Chạy Import Script**

```bash
# Cài đặt dependencies nếu chưa có
npm install

# Chạy import script
tsx scripts/import-to-railway.ts
```

### 4. **Kiểm tra kết quả**

Script sẽ:
- ✅ Tạo tất cả tables cần thiết
- ✅ Import 8 products
- ✅ Import 15 serial numbers  
- ✅ Tạo admin user (admin/admin123)
- ✅ Reset sequences để tránh conflict

### 5. **Troubleshooting**

#### Lỗi "database system was not properly shut down"
- **Nguyên nhân**: Database đang recovery
- **Giải pháp**: Đợi 2-3 phút để Railway hoàn tất recovery process

#### Lỗi "relation does not exist"
- **Nguyên nhân**: Tables chưa được tạo
- **Giải pháp**: Script sẽ tự động tạo tables

#### Lỗi "duplicate key value"
- **Nguyên nhân**: Data đã tồn tại
- **Giải pháp**: Script sẽ clear data trước khi import

### 6. **Deployment Check**

Sau khi import thành công:

1. **Test API endpoints**:
   ```bash
   curl https://your-app.railway.app/api/products
   curl https://your-app.railway.app/api/serial-numbers/search?q=FCA-9000
   ```

2. **Test Admin Panel**:
   - Vào `/admin`
   - Login: admin/admin123
   - Check tất cả tabs

3. **Test Serial Search**:
   - Tìm kiếm: `FCA-9000-2024-001`
   - Hoặc: `TM-800-2024-001`

### 7. **Production Notes**

- Change admin password ngay sau khi deploy
- Backup database định kỳ
- Monitor Railway usage limits
- Set up proper environment variables

---

## Sample DATABASE_URL formats:

**Railway PostgreSQL**:
```
postgresql://postgres:password@containers-us-west-xyz.railway.app:5432/railway
```

**Neon**:
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```