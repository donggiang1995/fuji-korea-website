# Railway Deployment Guide

## Prerequisites

Để deploy FUJI Global Korea website lên Railway, bạn cần:

1. Tài khoản Railway (railway.app)
2. Repository GitHub với source code
3. PostgreSQL database

## Steps để Deploy

### 1. Tạo PostgreSQL Database

1. Đăng nhập vào Railway
2. Tạo New Project
3. Thêm PostgreSQL service:
   - Click "Add Service" → "Database" → "PostgreSQL"
   - Railway sẽ tự động tạo DATABASE_URL environment variable

### 2. Deploy Application

1. Thêm GitHub repository:
   - Click "Add Service" → "GitHub Repo"
   - Chọn repository của bạn
   - Railway sẽ tự động detect và build

### 3. Environment Variables

Railway cần các environment variables sau:

```
DATABASE_URL=postgresql://... (được tạo tự động bởi PostgreSQL service)
NODE_ENV=production
```

### 4. Database Migration

Sau khi deploy thành công:

1. Vào Railway dashboard
2. Mở terminal của service
3. Chạy: `npm run db:push`

## Troubleshooting

### Lỗi "DATABASE_URL must be set"

**Nguyên nhân**: PostgreSQL service chưa được tạo hoặc chưa connect với main service.

**Giải pháp**:
1. Tạo PostgreSQL service trong cùng project
2. Kiểm tra Variables tab có DATABASE_URL chưa
3. Nếu chưa có, manually connect services

### Build Errors

**Nguyên nhân**: Dependencies hoặc build process lỗi.

**Giải pháp**:
1. Kiểm tra Build Logs
2. Đảm bảo tất cả dependencies có trong package.json
3. Kiểm tra Node.js version compatibility

### WebSocket Connection Issues

**Nguyên nhân**: Neon database WebSocket configuration.

**Giải pháp**: Code đã được cập nhật để handle production environment properly.

## File Configuration

Các file quan trọng cho deployment:

- `Procfile`: Định nghĩa command để start app
- `railway.json`: Railway-specific configuration
- `package.json`: Scripts và dependencies
- `server/db.ts`: Database connection với error handling

## Post-Deployment

1. Kiểm tra app hoạt động tại Railway URL
2. Test admin panel tại `/admin`
3. Kiểm tra database connection
4. Thử search serial numbers