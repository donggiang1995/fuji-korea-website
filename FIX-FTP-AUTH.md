# FIX FTP AUTHENTICATION ERROR

## LỖI: 530 Login authentication failed

## KIỂM TRA GITHUB SECRETS:

### 1. VÀO GITHUB REPO:
Settings → Secrets and variables → Actions

### 2. KIỂM TRA 3 SECRETS:
- **SPACESHIP_HOST**: Thường là `server.spaceship.com` hoặc IP của Spaceship
- **SPACESHIP_USERNAME**: FTP username bạn tạo (không phải cPanel username)
- **SPACESHIP_PASSWORD**: FTP password bạn tạo (không phải cPanel password)

### 3. FTP HOST CÓ THỂ SAI:
- Thử: `ftp.spaceship.com`
- Thử: `your-domain.com`
- Thử: IP address từ cPanel

### 4. TEST FTP TRƯỚC:
```bash
# Test FTP connection trước khi deploy
ftp SPACESHIP_HOST
# Login with FTP username/password
```

### 5. SỬA SECRETS:
- Delete old secrets
- Add new secrets với thông tin đúng
- Re-run workflow

**FTP credentials phải chính xác 100%**