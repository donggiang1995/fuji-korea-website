#!/usr/bin/env node

/**
 * SPACESHIP HOSTING CONFIGURATION HELPER
 * This script helps verify and configure Spaceship hosting settings
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 FUJI Korea - Spaceship Hosting Configuration');
console.log('==============================================\n');

// 1. Environment Variables Template
const envTemplate = `# SPACESHIP PRODUCTION ENVIRONMENT VARIABLES
# Add these in cPanel → Node.js Apps → Environment Variables

DATABASE_URL=mysql://username_fuji_admin:your_password@localhost:3306/username_fuji_korea_db
NODE_ENV=production
PORT=3000

# Format explanation:
# username_fuji_admin = your MySQL user (usually cpanel_username_fuji_admin)
# your_password = your MySQL password
# username_fuji_korea_db = your database name (usually cpanel_username_fuji_korea_db)

# Example:
# DATABASE_URL=mysql://user123_fuji_admin:MyPass123@localhost:3306/user123_fuji_korea_db`;

// 2. Node.js App Configuration
const nodeAppConfig = {
  name: "FUJI Korea Website",
  applicationRoot: "/public_html",
  applicationURL: "your-domain.com",
  startupFile: "server/index.js",
  nodeVersion: "18.x",
  environmentVariables: [
    "DATABASE_URL",
    "NODE_ENV", 
    "PORT"
  ]
};

// 3. FTP Configuration
const ftpConfig = `# FTP CONFIGURATION FOR GITHUB ACTIONS

## Method 1: Use Main cPanel Account
Host: your-domain.com (or ftp.your-domain.com)
Username: your_cpanel_username
Password: your_cpanel_password
Directory: /public_html/

## Method 2: Create Separate FTP Account (Recommended)
1. cPanel → FTP Accounts → Create FTP Account
2. Username: github_deploy
3. Password: Strong password (save for GitHub Secrets)
4. Directory: /public_html/
5. Quota: Unlimited

## GitHub Secrets Values:
SPACESHIP_HOST = your-domain.com
SPACESHIP_USERNAME = your_cpanel_username (or github_deploy)
SPACESHIP_PASSWORD = your_cpanel_password (or FTP password)`;

// 4. Database Configuration  
const dbSetup = `# DATABASE SETUP ON SPACESHIP

## Step 1: Create MySQL Database
1. cPanel → MySQL Databases
2. Create Database: fuji_korea_db
3. Full name will be: cpanel_username_fuji_korea_db

## Step 2: Create MySQL User
1. MySQL Users → Add New User
2. Username: fuji_admin
3. Password: Strong password
4. Full name will be: cpanel_username_fuji_admin

## Step 3: Add User to Database
1. Add User to Database
2. User: cpanel_username_fuji_admin
3. Database: cpanel_username_fuji_korea_db
4. Privileges: ALL PRIVILEGES

## Step 4: Import Database
1. phpMyAdmin → Select database
2. Import → Choose file: mysql-import-data.sql
3. Click Go
4. Verify: 5 products, 15 serials, 1 admin user

## Step 5: Update DATABASE_URL
DATABASE_URL=mysql://cpanel_username_fuji_admin:password@localhost:3306/cpanel_username_fuji_korea_db`;

// 5. SSL Configuration
const sslConfig = `# SSL CERTIFICATE SETUP

## Let's Encrypt SSL (Free)
1. cPanel → SSL/TLS
2. Let's Encrypt SSL
3. Select your domain
4. Click Issue
5. Wait 1-2 minutes for activation

## Force HTTPS Redirect
1. cPanel → Redirects
2. Type: Permanent (301)
3. From: http://your-domain.com/*
4. To: https://your-domain.com/$1
5. Click Add

## Verify SSL
- Visit: https://your-domain.com
- Should show secure padlock icon
- Mixed content warnings mean some resources still use HTTP`;

// 6. Deployment Verification
const verificationSteps = `# DEPLOYMENT VERIFICATION CHECKLIST

## After First Deployment:
□ Website loads: https://your-domain.com
□ No 404 errors on main pages
□ Serial search works: Try "FCA-9000-2024-001"
□ Admin panel accessible: /admin
□ Database connection successful
□ Products page shows 5 products
□ SSL certificate active (HTTPS)

## Troubleshooting:
□ 500 Error: Check Node.js app logs in cPanel
□ Database Error: Verify DATABASE_URL format
□ 404 Error: Check file permissions and startup file
□ Build Error: Review GitHub Actions logs
□ FTP Error: Verify GitHub Secrets

## GitHub Actions Status:
□ Repository has 3 secrets configured
□ Workflow file uploaded: .github/workflows/deploy-to-spaceship.yml
□ Actions tab shows successful deployment
□ Build logs show no errors`;

function createConfigFiles() {
  console.log('📁 Creating Spaceship configuration files...');
  
  const configDir = 'deploy';
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Create configuration files
  fs.writeFileSync(path.join(configDir, 'environment-template.txt'), envTemplate);
  fs.writeFileSync(path.join(configDir, 'nodejs-app-config.json'), JSON.stringify(nodeAppConfig, null, 2));
  fs.writeFileSync(path.join(configDir, 'ftp-setup.md'), ftpConfig);
  fs.writeFileSync(path.join(configDir, 'database-setup.md'), dbSetup);
  fs.writeFileSync(path.join(configDir, 'ssl-setup.md'), sslConfig);
  fs.writeFileSync(path.join(configDir, 'verification-checklist.md'), verificationSteps);
  
  console.log('✅ Configuration files created in deploy/ directory\n');
  
  console.log('📋 SPACESHIP SETUP STEPS:');
  console.log('1. **Node.js App** → Create application with provided config');
  console.log('2. **Environment Variables** → Add DATABASE_URL, NODE_ENV, PORT');
  console.log('3. **MySQL Database** → Create database and user');
  console.log('4. **Import Data** → Upload mysql-import-data.sql');
  console.log('5. **FTP Account** → Create for GitHub Actions');
  console.log('6. **SSL Certificate** → Enable Let\'s Encrypt');
  console.log('7. **GitHub Secrets** → Add FTP credentials');
  
  console.log('\n📁 Created configuration files:');
  console.log('- environment-template.txt - Environment variables');
  console.log('- nodejs-app-config.json - Node.js app settings');
  console.log('- ftp-setup.md - FTP configuration guide');
  console.log('- database-setup.md - MySQL setup instructions');
  console.log('- ssl-setup.md - SSL certificate setup');
  console.log('- verification-checklist.md - Deployment verification');
  
  console.log('\n🎯 Next: Setup these configurations in Spaceship cPanel');
}

// Run configuration setup
createConfigFiles();