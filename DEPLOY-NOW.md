# DEPLOY WEBSITE - BƯỚC CUỐI

## ĐÃ SETUP XONG:
✅ Database (wodpqkkqov_fuji_korea_db)  
✅ Node.js App  
✅ FTP Account  
✅ GitHub Secrets  
✅ GitHub Actions Workflow  

## BƯỚC CUỐI - DEPLOY:

### CÁCH 1: MANUAL TRIGGER
1. Vào **GitHub repo** của bạn
2. **Actions** tab
3. **Deploy to Spaceship Hosting** workflow
4. **Run workflow** button
5. Click **Run workflow**

### CÁCH 2: PUSH CODE  
1. Make any small change trong repo này
2. Git push → Auto trigger deployment

## SAU KHI DEPLOY:
1. **GitHub Actions** sẽ chạy (build + upload files)
2. **Spaceship cPanel** → **Node.js Apps** → Start app
3. Website live tại domain của bạn

## KIỂM TRA:
- **GitHub Actions** → Xem build log
- **cPanel Node.js Apps** → App status
- **Website** → Test functionality

**Deploy ngay để test workflow!**