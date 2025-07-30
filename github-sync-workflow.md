# 🚀 GITHUB WORKFLOW IMPLEMENTATION - STEP BY STEP

## 📋 PHASE 1: CREATE GITHUB REPOSITORY

### 1.1 GitHub Repository Setup
1. **Go to GitHub.com** → New Repository
2. **Repository name:** `fuji-korea-website`
3. **Description:** `FUJI Global Korea Corporate Website - Production Ready`
4. **Visibility:** Public (easier for Replit import)
5. **Initialize:** ✓ Add README file
6. **Click:** Create repository

### 1.2 Prepare Project Files
Download current project từ Replit:
- **File menu** → Download as ZIP
- **Extract** ZIP file
- **Clean up** unnecessary files (.replit, node_modules)

## 📋 PHASE 2: UPLOAD PROJECT TO GITHUB

### 2.1 Required Files Structure:
```
fuji-korea-website/
├── .github/
│   └── workflows/
│       └── deploy-to-spaceship.yml    # ✅ Auto-deploy script
├── client/                            # ✅ React frontend
├── server/                            # ✅ Express backend
├── shared/                            # ✅ Database schemas
├── deploy/                            # ✅ Spaceship configs
├── mysql-import-data.sql              # ✅ Database
├── REPLIT-SETUP.md                    # ✅ New account guide
├── package.json                       # ✅ Dependencies
├── vite.config.ts                     # ✅ Build config
├── tailwind.config.ts                 # ✅ Styling
└── README.md                          # ✅ Project info
```

### 2.2 Upload Methods:
**Option A: Web Upload**
- GitHub repo → Upload files → Drag & drop all files
- Commit message: "Initial commit: FUJI Korea website"

**Option B: Git Commands (if available)**
```bash
git clone https://github.com/username/fuji-korea-website.git
cd fuji-korea-website
# Copy all project files here
git add .
git commit -m "Initial commit: FUJI Korea website with auto-deploy"
git push origin main
```

## 📋 PHASE 3: GITHUB SECRETS SETUP

### 3.1 Repository Secrets
GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 3 secrets:
1. **Name:** `SPACESHIP_HOST`
   **Value:** Your Spaceship FTP hostname (e.g., `your-domain.com`)

2. **Name:** `SPACESHIP_USERNAME` 
   **Value:** Your cPanel username or FTP username

3. **Name:** `SPACESHIP_PASSWORD`
   **Value:** Your cPanel/FTP password

### 3.2 Verify Secrets
- Should see 3 secrets listed
- Names must match exactly as in workflow file
- Values are hidden for security

## 📋 PHASE 4: SPACESHIP HOSTING SETUP

### 4.1 Node.js App Setup
**cPanel → Node.js Apps → Create Application:**
- **Application Root:** `/public_html`
- **Application URL:** `your-domain.com`
- **Application Startup File:** `server/index.js`
- **Node.js Version:** 18.x or 20.x

### 4.2 Environment Variables
**Add in Node.js Apps → Environment Variables:**
```
DATABASE_URL=mysql://username_fuji_admin:password@localhost:3306/username_fuji_korea_db
NODE_ENV=production
PORT=3000
```

### 4.3 FTP Account (Optional - for manual access)
**cPanel → FTP Accounts:**
- **Username:** `github_deploy`
- **Password:** Strong password
- **Directory:** `/public_html/`
- **Quota:** Unlimited

## 📋 PHASE 5: FIRST DEPLOYMENT TEST

### 5.1 Trigger Deployment
**Method 1: Push to main branch**
- Make small change in GitHub (edit README)
- Commit change → Auto-deploy triggers

**Method 2: Manual trigger**
- GitHub repo → Actions tab
- Deploy to Spaceship Hosting → Run workflow

### 5.2 Monitor Deployment
- **Actions tab** → View running workflow
- **Check logs** for any errors
- **Wait 2-5 minutes** for completion

### 5.3 Verify Website
- **Visit:** `https://your-domain.com`
- **Test:** Serial search (try: `FCA-9000-2024-001`)
- **Admin:** `https://your-domain.com/admin`
- **Database:** Products and serials should load

## 📋 PHASE 6: REPLIT INTEGRATION TEST

### 6.1 New Replit Account Test
1. **Different Replit account** (or ask someone)
2. **Create → Import from GitHub**
3. **Repository:** `https://github.com/username/fuji-korea-website`
4. **Wait** for import completion

### 6.2 Setup New Environment
```bash
# Install dependencies
npm install

# Set environment variable in Replit Secrets
DATABASE_URL=mysql://your-connection-string

# Start development
npm run dev
```

### 6.3 Test Edit & Deploy
1. **Make small change** (edit text, color)
2. **Git commands:**
   ```bash
   git add .
   git commit -m "Test: update from new Replit account"
   git push origin main
   ```
3. **Watch GitHub Actions** auto-deploy
4. **Verify change** live on website

## ✅ SUCCESS INDICATORS

### Deployment Success:
- ✅ GitHub Actions shows green checkmark
- ✅ Website loads on domain
- ✅ Serial search works
- ✅ Admin panel accessible
- ✅ Database connections work

### Workflow Success:
- ✅ Can import into new Replit account
- ✅ Can edit and push changes
- ✅ Changes auto-deploy to production
- ✅ Website updates within 5 minutes

## 🆘 TROUBLESHOOTING

### GitHub Actions Fails:
- Check repository secrets are correct
- Verify FTP credentials in Spaceship
- Review build logs in Actions tab

### Website 500 Error:
- Check Node.js app logs in cPanel
- Verify DATABASE_URL format
- Ensure all environment variables set

### Replit Import Issues:
- Ensure repository is public
- Check all required files uploaded
- Verify package.json structure

---

## 🎯 READY TO START?

**Estimated Time:** 30-40 minutes

**Current Status:** All automation files ready, just need to execute steps

**Next Action:** Create GitHub repository and upload project files

**Cần tôi hướng dẫn chi tiết bước nào?**