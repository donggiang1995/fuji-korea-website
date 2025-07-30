# 🚀 EDIT WEBSITE FROM NEW REPLIT ACCOUNT

## Quick Setup (2 minutes):

### 1. Import Repository
- **Replit** → Create → **Import from GitHub**
- **Repository:** `https://github.com/YOUR_USERNAME/fuji-korea-website`
- Wait for import to complete

### 2. Set Environment Variables
Go to Replit **Secrets** tab and add:
```
DATABASE_URL=mysql://user:pass@localhost:3306/database
NODE_ENV=development
```

### 3. Install and Run
```bash
npm install
npm run dev
```

## 🔄 Development Workflow:

### Make Changes:
1. **Edit files** in Replit normally
2. **Test locally** with `npm run dev`
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update: describe your changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

### Auto-Deploy:
- **GitHub Actions** automatically deploys to Spaceship
- **Website updates** in 2-5 minutes
- **Check status** in GitHub → Actions tab

## 🛠️ Available Commands:
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run deploy` - Push to GitHub (triggers auto-deploy)
- `npm run db:push` - Update database schema

## 🎯 Complete Workflow:
```
Edit in Replit → Git Push → GitHub Actions → Spaceship Deploy → Live Website
     (2 min)      (instant)     (2-3 min)        (1-2 min)      (Live!)
```

## 🆘 Troubleshooting:

### Build Fails:
- Check `package.json` dependencies
- Run `npm install` to fix missing packages

### Deploy Fails:
- Verify GitHub Secrets in repository settings
- Check GitHub Actions logs for error details

### Database Errors:
- Verify `DATABASE_URL` in Replit Secrets
- Test database connection locally

### Git Issues:
- Set git config if needed:
  ```bash
  git config user.name "Your Name"
  git config user.email "your.email@example.com"
  ```

## 🔑 Required GitHub Secrets:
Repository → Settings → Secrets → Actions:
- `SPACESHIP_HOST` - Your FTP hostname
- `SPACESHIP_USERNAME` - Your cPanel username  
- `SPACESHIP_PASSWORD` - Your cPanel password

**Happy coding! Any Replit account can now edit the website! 🎉**