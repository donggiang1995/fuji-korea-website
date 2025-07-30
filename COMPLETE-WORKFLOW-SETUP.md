# 🔄 COMPLETE WORKFLOW: REPLIT ↔ GITHUB ↔ SPACESHIP ↔ GODADDY

## 🎯 MỤC TIÊU: EDIT WEBSITE TỪ BẤT KỲ REPLIT ACCOUNT NÀO

### **KIẾN TRÚC TỔNG QUAN:**
```
Replit (New Account) → GitHub Repository → Auto Deploy → Spaceship Hosting → GoDaddy Domain
```

## 📋 PHASE 1: SETUP GITHUB REPOSITORY (BÂY GIỜ)

### **1.1 Tạo GitHub Repository**
1. **GitHub.com** → New Repository
2. **Name:** `fuji-korea-website`
3. **Description:** `FUJI Global Korea Corporate Website - Production`
4. **Public** (để dễ clone)
5. **Initialize:** README, .gitignore (Node.js)

### **1.2 Upload Source Code**
1. **Download project từ Replit** (ZIP)
2. **Extract** → clean up files
3. **GitHub:** Upload files hoặc push via Git
4. **Structure:**
```
fuji-korea-website/
├── client/           # Frontend React
├── server/           # Backend Express  
├── shared/           # Database schemas
├── .github/workflows/ # Auto-deploy scripts
├── deploy/           # Deployment configs
├── README.md         # Documentation
└── package.json      # Dependencies
```

## 📋 PHASE 2: AUTO-DEPLOY SETUP

### **2.1 GitHub Actions Workflow**
File: `.github/workflows/deploy-to-spaceship.yml`
```yaml
name: Deploy to Spaceship Hosting

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Spaceship via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.SPACESHIP_HOST }}
          username: ${{ secrets.SPACESHIP_USERNAME }}
          password: ${{ secrets.SPACESHIP_PASSWORD }}
          local-dir: ./
          server-dir: /public_html/
          exclude: |
            .git*
            .github*
            node_modules*
            **/*.md
```

### **2.2 GitHub Secrets Setup**
Repository → Settings → Secrets → Add:
- `SPACESHIP_HOST`: FTP hostname
- `SPACESHIP_USERNAME`: cPanel username  
- `SPACESHIP_PASSWORD`: cPanel password

## 📋 PHASE 3: SPACESHIP AUTO-DEPLOY CONFIG

### **3.1 FTP Access Setup**
1. **Spaceship cPanel** → FTP Accounts
2. **Create FTP User** for GitHub Actions
3. **Permissions:** Full access to public_html/
4. **Note credentials** for GitHub Secrets

### **3.2 Auto-Update Script**
File: `deploy/spaceship-update.sh`
```bash
#!/bin/bash
# Auto-update script on Spaceship server
cd /home/username/public_html
git pull origin main
npm install --production
npm run build
pm2 reload fuji-korea-app
```

## 📋 PHASE 4: REPLIT INTEGRATION

### **4.1 Replit Template Setup**
Create `.replit` config:
```
modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["npm", "run", "dev"]
deploymentTarget = "cloudrun"

[env]
DATABASE_URL = "mysql://user:pass@host:3306/db"
GITHUB_TOKEN = "your_github_token"
```

### **4.2 GitHub Integration Script**
File: `scripts/sync-with-github.js`
```javascript
const { execSync } = require('child_process');

// Auto-sync with GitHub when starting Replit
function syncWithGitHub() {
  try {
    console.log('🔄 Syncing with GitHub...');
    execSync('git pull origin main', { stdio: 'inherit' });
    console.log('✅ Sync completed');
  } catch (error) {
    console.log('⚠️ First time setup - cloning repo...');
    execSync('git clone https://github.com/username/fuji-korea-website.git .', { stdio: 'inherit' });
  }
}

syncWithGitHub();
```

## 📋 PHASE 5: WORKFLOW CHO REPLIT ACCOUNT MỚI

### **5.1 Setup Instructions**
File: `REPLIT-SETUP-GUIDE.md`
```markdown
# 🚀 SETUP WEBSITE EDITING IN NEW REPLIT ACCOUNT

## Quick Start (3 minutes):
1. **Create new Replit** → Import from GitHub
2. **Repository:** https://github.com/username/fuji-korea-website
3. **Run:** npm install && npm run dev
4. **Edit files** → changes auto-sync to GitHub
5. **GitHub Actions** auto-deploy to Spaceship
6. **Website updates** in 2-5 minutes

## Environment Variables:
- DATABASE_URL: (from Spaceship database)
- GITHUB_TOKEN: (for push access)
```

### **5.2 Auto-Setup Script**
File: `setup-new-replit.sh`
```bash
#!/bin/bash
echo "🚀 Setting up FUJI Korea website in new Replit..."

# Install dependencies
npm install

# Setup git config
git config user.name "FUJI Korea Dev"
git config user.email "dev@fuji-global-korea.com"

# Install development tools
npm install -g nodemon tsx

# Start development server
echo "✅ Setup complete! Run: npm run dev"
```

## 📋 PHASE 6: COMPLETE AUTOMATION

### **6.1 Edit → Deploy Flow:**
1. **New Replit Account** → Import GitHub repo
2. **Make changes** → Edit files normally
3. **Git push** → Changes pushed to GitHub
4. **GitHub Actions** → Auto-build & deploy
5. **Spaceship Hosting** → Website updated
6. **GoDaddy Domain** → Live changes visible

### **6.2 Database Sync (Optional):**
- **Production DB:** Spaceship MySQL
- **Development DB:** Replit PostgreSQL (for testing)
- **Sync script:** Export/import data between environments

## 🎯 FINAL WORKFLOW

### **For Any New Replit Account:**
```
1. Import: https://github.com/username/fuji-korea-website
2. Set environment variables
3. Run: npm run dev
4. Edit → Save → Push → Auto-deploy (2-5 min)
```

### **Benefits:**
- ✅ Edit from any Replit account
- ✅ Auto-deploy to production  
- ✅ Version control via GitHub
- ✅ Backup & rollback capability
- ✅ Team collaboration ready
- ✅ Professional development workflow

**Ready to implement this complete workflow?**