#!/usr/bin/env node

/**
 * COMPLETE GITHUB SETUP AUTOMATION
 * Run this script to setup GitHub integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 FUJI Korea - Complete GitHub Setup');
console.log('=====================================\n');

// 1. Create GitHub Actions workflow
const workflowDir = '.github/workflows';
const workflowFile = path.join(workflowDir, 'deploy-to-spaceship.yml');

const githubWorkflow = `name: Deploy to Spaceship Hosting

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
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Spaceship via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: \${{ secrets.SPACESHIP_HOST }}
          username: \${{ secrets.SPACESHIP_USERNAME }}
          password: \${{ secrets.SPACESHIP_PASSWORD }}
          local-dir: ./
          server-dir: /public_html/
          exclude: |
            .git*
            .github*
            node_modules*
            **/*.md
            **/*.log
            .env*
            
      - name: Notify deployment status
        run: echo "✅ Deployment completed successfully"`;

// 2. Create deployment configuration
const deployConfig = `# DEPLOYMENT CONFIGURATION

## Spaceship Hosting Setup
- Host: Your Spaceship FTP hostname
- Username: Your cPanel username
- Password: Your cPanel password
- Directory: /public_html/

## GitHub Secrets Required:
- SPACESHIP_HOST
- SPACESHIP_USERNAME  
- SPACESHIP_PASSWORD

## Auto-deploy triggers:
- Push to main branch
- Manual workflow dispatch

## Build process:
1. Install dependencies (npm ci)
2. Build application (npm run build)
3. Deploy via FTP to Spaceship
4. Website updates automatically`;

// 3. Create Replit setup guide
const replitGuide = `# 🚀 EDIT WEBSITE FROM NEW REPLIT ACCOUNT

## Quick Setup (2 minutes):

### 1. Import Repository
- Replit → Create → Import from GitHub
- Repository: https://github.com/YOUR_USERNAME/fuji-korea-website
- Wait for import to complete

### 2. Set Environment Variables
\`\`\`
DATABASE_URL=mysql://user:pass@localhost:3306/database
NODE_ENV=development
\`\`\`

### 3. Install and Run
\`\`\`bash
npm install
npm run dev
\`\`\`

## 🔄 Development Workflow:

### Make Changes:
1. Edit files in Replit
2. Test locally with \`npm run dev\`
3. Commit changes: \`git add . && git commit -m "Update: your changes"\`
4. Push to GitHub: \`git push origin main\`

### Auto-Deploy:
- GitHub Actions automatically deploys to Spaceship
- Website updates in 2-5 minutes
- Check deployment status in GitHub → Actions tab

## 🛠️ Available Commands:
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run deploy\` - Manual deploy trigger
- \`npm run db:push\` - Update database schema

## 🆘 Troubleshooting:
- **Build fails**: Check package.json dependencies
- **Deploy fails**: Verify GitHub Secrets in repository settings
- **Database errors**: Check DATABASE_URL environment variable

**Happy coding! 🎉**`;

// 4. Create package.json scripts for deployment
const deployScripts = {
  "deploy": "echo 'Triggering GitHub Actions deployment...' && git push origin main",
  "deploy:manual": "gh workflow run deploy-to-spaceship.yml",
  "build": "npm run build:client && npm run build:server",
  "build:client": "cd client && vite build",
  "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/server.js --external:node_modules/*",
  "spaceship:setup": "node scripts/spaceship-setup.js"
};

// 5. Execute setup
function setupGitHubIntegration() {
  console.log('📁 Creating GitHub workflow directory...');
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true });
  }
  
  console.log('📝 Creating GitHub Actions workflow...');
  fs.writeFileSync(workflowFile, githubWorkflow);
  
  console.log('📄 Creating deployment configuration...');
  fs.writeFileSync('DEPLOYMENT.md', deployConfig);
  
  console.log('📋 Creating Replit setup guide...');
  fs.writeFileSync('REPLIT-SETUP.md', replitGuide);
  
  console.log('⚙️ Updating package.json scripts...');
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageJson.scripts = { ...packageJson.scripts, ...deployScripts };
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }
  
  console.log('🔧 Creating .gitignore for deployment...');
  const gitignoreContent = `# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Database
*.db
*.sqlite

# Temporary files
.tmp/
temp/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Replit
.replit
replit.nix`;

  fs.writeFileSync('.gitignore', gitignoreContent);
  
  console.log('\n✅ GitHub setup completed successfully!\n');
  
  console.log('📋 NEXT STEPS:');
  console.log('1. Create GitHub repository: fuji-korea-website');
  console.log('2. Push code to GitHub:');
  console.log('   git init');
  console.log('   git add .');
  console.log('   git commit -m "Initial commit: FUJI Korea website"');
  console.log('   git branch -M main');
  console.log('   git remote add origin https://github.com/USERNAME/fuji-korea-website.git');
  console.log('   git push -u origin main');
  console.log('3. Setup GitHub Secrets (SPACESHIP_HOST, SPACESHIP_USERNAME, SPACESHIP_PASSWORD)');
  console.log('4. Test deployment by pushing a small change');
  console.log('\n🎉 Ready for production deployment automation!');
}

// Run setup
setupGitHubIntegration();