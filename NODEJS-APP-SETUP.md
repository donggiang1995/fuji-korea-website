# NODE.JS APP SETUP - CHI TIẾT

## BƯỚC 1: TẠO NODE.JS APP
1. **cPanel** → **Node.js Apps**
2. **Create Application**

## BƯỚC 2: ĐIỀN FORM
- **Node.js Version**: 18.x hoặc 20.x
- **Application Mode**: Production
- **Application Root**: `/public_html`  
- **Application URL**: `your-domain.com` (domain thật của bạn)
- **Application Startup File**: `server/index.js`

## BƯỚC 3: CREATE APP
Click **Create** → App được tạo (status: Stopped)

## BƯỚC 4: ENVIRONMENT VARIABLES
1. **Click vào app** trong danh sách
2. **Tab Environment Variables**
3. **Add 3 variables:**

### Variable 1:
- **Name**: `DATABASE_URL`
- **Value**: `mysql://wodpqkkqov_fuji_admin:YOUR_PASSWORD@localhost:3306/wodpqkkqov_fuji_korea_db`
- **Thay YOUR_PASSWORD** bằng password user database thật

### Variable 2:
- **Name**: `NODE_ENV`
- **Value**: `production`

### Variable 3:
- **Name**: `PORT`
- **Value**: `3000`

## BƯỚC 5: SAVE
Click **Save** → Environment variables updated

## BƯỚC 6: START APP (SAU KHI DEPLOY)
App sẽ tự start khi có code từ GitHub Actions

**Xong Node.js App setup. Tiếp tục Bước 4 - GitHub Secrets.**