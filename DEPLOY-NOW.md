# 🚀 DEPLOY NGAY - 4 BƯỚC

## BƯỚC 1: TẠO GITHUB REPO (2 phút)
1. github.com → New repository
2. Tên: `fuji-korea-website`
3. Public
4. Create repository

## BƯỚC 2: UPLOAD PROJECT (5 phút)
1. Download project này từ Replit (File → Download ZIP)
2. GitHub repo → Upload files → kéo thả tất cả files
3. Commit message: "Initial commit"
4. Commit changes

## BƯỚC 3: SPACESHIP SETUP (10 phút)
### Database:
1. cPanel → phpMyAdmin
2. Import file: `mysql-import-data.sql`

### Node.js App:
1. cPanel → Node.js Apps → Create
2. Application Root: `/public_html`
3. Startup File: `server/index.js`
4. Environment Variables:
   - `DATABASE_URL=mysql://your_user:your_pass@localhost:3306/your_db`
   - `NODE_ENV=production`
   - `PORT=3000`

### FTP:
1. cPanel → FTP Accounts → Create
2. Username: `github_deploy`
3. Password: tạo password mạnh
4. Directory: `/public_html/`

## BƯỚC 4: GITHUB SECRETS (1 phút)
GitHub repo → Settings → Secrets → Actions → Add:
- `SPACESHIP_HOST`: domain của bạn
- `SPACESHIP_USERNAME`: github_deploy
- `SPACESHIP_PASSWORD`: FTP password vừa tạo

## AUTO-DEPLOY
Push bất kỳ thay đổi nào → website tự động update trong 5 phút

## EDIT TỪ REPLIT KHÁC
1. Replit mới → Import from GitHub
2. Repository: https://github.com/username/fuji-korea-website
3. Edit code → git push → auto deploy

XONG.