# SETUP DOMAIN VỚI REDIRECTS

## BƯỚC 1: KIỂM TRA NODE.JS APP
1. **Node.js Apps** → Click vào app
2. **Check status**: Running hay Stopped?
3. **Note App URL**: Thường là `http://internal-ip:3000`

## BƯỚC 2: SETUP REDIRECTS
1. **cPanel** → **Redirects**
2. **Add Redirect**:
   - **Type**: `Permanent (301)` 
   - **From**: `your-domain.com` (hoặc `www.your-domain.com`)
   - **To**: `http://internal-app-url:3000` (URL của Node.js app)
   - **Wild Card Redirect**: ✅ Check
   - **Create**

## BƯỚC 3: ALTERNATIVE - REVERSE PROXY
Nếu Redirects không work, cần **Reverse Proxy**:
1. **File Manager** → **public_html**
2. **Create** file `.htaccess`:
```
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## BƯỚC 4: TEST
1. **Start Node.js app** nếu chưa start
2. **Visit** `your-domain.com`
3. **Should redirect** to FUJI website

## LƯU Ý:
- Node.js app phải **Running** trước
- Domain phải **point to Spaceship** (DNS settings)

**Bắt đầu với Redirects setup!**