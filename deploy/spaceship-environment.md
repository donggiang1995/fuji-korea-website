# 🌐 SPACESHIP HOSTING ENVIRONMENT SETUP

## 🎯 Node.js App Configuration

### 1. cPanel → Node.js Apps → Create Application
- **Application Root:** `/public_html`
- **Application URL:** `your-domain.com`
- **Application Startup File:** `server/index.js`
- **Node.js Version:** `18.x` or `20.x`

### 2. Environment Variables
Add in Node.js Apps → Environment Variables:
```
DATABASE_URL=mysql://wodpqkkqov_fuji_admin:password@localhost:3306/wodpqkkqov_fuji_korea_db
NODE_ENV=production
PORT=3000
```

### 3. SSL Certificate Setup
- **cPanel → SSL/TLS**
- **Let's Encrypt SSL** → Enable for your domain
- **Force HTTPS Redirect** → Enable

## 🔧 FTP Configuration for GitHub Actions

### 1. Create FTP Account
- **cPanel → FTP Accounts**
- **Username:** `github_deploy`
- **Password:** Strong password (save for GitHub Secrets)
- **Directory:** `/public_html/`
- **Quota:** Unlimited

### 2. GitHub Repository Secrets
Repository → Settings → Secrets and Variables → Actions:
- **SPACESHIP_HOST:** `your-domain.com` or FTP hostname
- **SPACESHIP_USERNAME:** `your-cpanel-username` or `github_deploy`
- **SPACESHIP_PASSWORD:** Your FTP password

## 🗄️ Database Configuration

### MySQL Database Info:
- **Host:** `localhost`
- **Port:** `3306`
- **Database:** `cpanel_username_fuji_korea_db`
- **Username:** `cpanel_username_fuji_admin`
- **Password:** Your MySQL password

### Connection String Format:
```
mysql://username:password@localhost:3306/database_name
```

### Example:
```
mysql://user123_fuji_admin:MyPassword123@localhost:3306/user123_fuji_korea_db
```

## 🚀 Deployment Process

### Automatic Deploy Triggers:
- **Push to main branch** → Auto-deploy via GitHub Actions
- **Manual trigger** → GitHub Actions tab → Run workflow

### Build Process:
1. **Install dependencies** (`npm ci`)
2. **Build React frontend** (`vite build`)
3. **Build Node.js server** (`esbuild`)
4. **Deploy via FTP** to `/public_html/`
5. **Restart Node.js app** (automatic)

### Deployment Files:
- `server/index.js` - Production server
- `client/dist/` - Built React app
- `package.json` - Production dependencies
- `mysql-import-data.sql` - Database structure

## 🔍 Verification Checklist

### After Deployment:
- [ ] Website loads at `https://your-domain.com`
- [ ] Admin panel accessible at `/admin`
- [ ] Serial search works (test: `123456`)
- [ ] Database connection successful
- [ ] SSL certificate active (HTTPS)
- [ ] GitHub Actions deployment successful

### Troubleshooting:
- **500 Error:** Check Node.js app logs in cPanel
- **Database Error:** Verify DATABASE_URL format
- **Build Fails:** Check GitHub Actions logs
- **FTP Error:** Verify GitHub Secrets

## 📊 Monitoring

### Check Website Status:
- **Website:** `https://your-domain.com`
- **Admin:** `https://your-domain.com/admin`
- **Health:** `https://your-domain.com/api/health`

### GitHub Actions:
- **Status:** Repository → Actions tab
- **Logs:** Click on workflow run for details
- **History:** View all deployment history

### cPanel Monitoring:
- **Node.js Apps:** App status and logs
- **File Manager:** Verify files deployed
- **MySQL:** Database status and connections

**🎉 Production environment ready for continuous deployment!**