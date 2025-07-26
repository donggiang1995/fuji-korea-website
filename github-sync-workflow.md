# FUJI Global Korea - GitHub Sync Workflow (Option B)

## Tổng quan Workflow

```
Replit (Dev) → GitHub (Repository) → Spaceship (Production)
      ↑                                        ↓
   Edit Code                              Auto Deploy
```

## Bước 1: Setup GitHub Repository

### 1.1 Tạo Repository trên GitHub
1. Đăng nhập GitHub → New Repository
2. Tên: `fuji-korea-website`
3. Chọn **Public** (hoặc Private nếu có GitHub Pro)
4. **Không** tick "Initialize with README"

### 1.2 Connect Replit với GitHub
```bash
# Trong Replit Terminal, chạy:
git init
git remote add origin https://github.com/USERNAME/fuji-korea-website.git
git add .
git commit -m "Initial commit - FUJI Korea Website"
git branch -M main
git push -u origin main
```

### 1.3 Tạo .gitignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Database
database-export.json
mysql-import-data.sql

# Logs
logs/
*.log

# Replit specific
.replit
```

## Bước 2: Cấu hình Spaceship SSH

### 2.1 Enable SSH trong cPanel
1. Login Spaceship cPanel
2. **Advanced** → **SSH Access**
3. **Generate SSH Key** hoặc import public key
4. Copy SSH details (host, port, username)

### 2.2 Setup Git trên Spaceship
```bash
# SSH vào Spaceship server
ssh username@server.spaceship.com -p 2222

# Navigate to website directory
cd public_html

# Clone repository
git clone https://github.com/USERNAME/fuji-korea-website.git .

# Install dependencies
npm install --production

# Build project
npm run build

# Setup environment
cp .env.example .env
nano .env  # Edit database connection
```

## Bước 3: Development Workflow

### 3.1 Trên Replit Account Mới
```bash
# Clone repository
git clone https://github.com/USERNAME/fuji-korea-website.git

# Install dependencies
npm install

# Start development
npm run dev

# Make changes...
# Test locally...
```

### 3.2 Deploy Changes
```bash
# Commit changes
git add .
git commit -m "Update: [mô tả thay đổi]"
git push origin main
```

### 3.3 Pull Changes trên Spaceship
```bash
# SSH vào Spaceship
ssh username@server.spaceship.com -p 2222
cd public_html

# Pull latest changes
git pull origin main

# Rebuild if needed
npm run build

# Restart Node.js app (trong cPanel hoặc)
pm2 restart fuji-korea-web
```

## Bước 4: Automation Scripts

### 4.1 Deploy Script cho Spaceship
Tạo file `deploy.sh` trên Spaceship:
```bash
#!/bin/bash
# Auto deployment script

cd /home/username/public_html

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Install new dependencies
npm install --production

# Build project
npm run build

# Restart application
pm2 restart fuji-korea-web

echo "✅ Deployment completed!"
```

### 4.2 GitHub Actions (Advanced)
Tạo `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Spaceship

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        port: 2222
        script: |
          cd /home/username/public_html
          git pull origin main
          npm install --production
          npm run build
          pm2 restart fuji-korea-web
```

## Bước 5: Quản lý Environment

### 5.1 Environment Variables
**Development (.env.development):**
```
NODE_ENV=development
DATABASE_URL=postgresql://...
PORT=5000
```

**Production (.env.production) trên Spaceship:**
```
NODE_ENV=production
DATABASE_URL=mysql://username:password@localhost/fuji_korea_db
PORT=3000
```

### 5.2 Database Migration
```bash
# Trên Spaceship, khi có thay đổi schema:
npm run db:push
```

## Bước 6: Workflow Hàng Ngày

### Khi Chỉnh Sửa Code:
1. **Replit** → Chỉnh sửa code
2. **Test locally** → `npm run dev`
3. **Commit** → `git add . && git commit -m "Fix: [issue]"`
4. **Push** → `git push origin main`
5. **Deploy** → SSH Spaceship → `./deploy.sh`

### Khi Thay Đổi Database:
1. Update `shared/schema-mysql.ts`
2. Test migration locally
3. Commit schema changes
4. SSH Spaceship → `npm run db:push`

## Ưu Điểm Option B:

### ✅ **Professional Workflow**
- Version control với Git history
- Code review capability
- Backup tự động trên GitHub
- Team collaboration ready

### ✅ **Easy Account Migration**
- Clone repository trên Replit account mới
- Instant project setup
- Consistent development environment

### ✅ **Deployment Control**
- One-command deployment
- Rollback capability (`git revert`)
- Environment separation
- Automated testing possible

### ✅ **Cost Effective**
- GitHub free plan đủ dùng
- No additional hosting costs
- Efficient resource usage

## Nhược Điểm:

### ❌ **Learning Curve**
- Cần biết Git commands
- SSH knowledge required
- More complex setup

### ❌ **Initial Setup Time**
- 30-60 phút setup ban đầu
- SSH key configuration
- Environment setup

## Kết Luận:

**Option B phù hợp nếu bạn:**
- Muốn workflow chuyên nghiệp
- Có thể học Git/SSH commands
- Cần collaborate với team
- Muốn backup code an toàn

**Workflow này sẽ cho phép bạn:**
- Chỉnh sửa từ bất kỳ Replit account nào
- Deploy nhanh chóng với 1 command
- Quản lý version history
- Rollback khi có lỗi

Bạn có muốn tôi hướng dẫn setup từng bước không?