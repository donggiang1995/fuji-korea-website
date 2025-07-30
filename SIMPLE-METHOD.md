# DEPLOY SIMPLE - BỎ QUA FTP

## FTP BỊ TIMEOUT → DÙNG CÁCH KHÁC

### CÁCH 1: MANUAL UPLOAD
1. **Build project** trong Replit:
   ```bash
   npm run build
   ```
2. **Download** dist folder
3. **Upload** qua cPanel File Manager
4. **Start** Node.js app

### CÁCH 2: GIT PULL TRỰC TIẾP
Trên Spaceship server (nếu có SSH):
```bash
cd /path/to/app
git pull origin main
npm install
npm run build
```

### CÁCH 3: FIX FTP SETTINGS
Update workflow với FTP passive mode:
```yaml
- name: Deploy to Spaceship via FTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.4
  with:
    server: ${{ secrets.SPACESHIP_HOST }}
    username: ${{ secrets.SPACESHIP_USERNAME }}
    password: ${{ secrets.SPACESHIP_PASSWORD }}
    protocol: ftp
    port: 21
    timeout: 600000
    log-level: verbose
```

**Thử manual upload trước để test website work!**