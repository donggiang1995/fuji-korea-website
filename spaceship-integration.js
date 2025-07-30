#!/usr/bin/env node

/**
 * SPACESHIP HOSTING INTEGRATION SETUP
 * Configure auto-deployment from GitHub to Spaceship
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 FUJI Korea - Spaceship Integration Setup');
console.log('==========================================\n');

// 1. Create FTP deployment configuration
const ftpConfig = `# SPACESHIP FTP CONFIGURATION

## Required Information:
1. **FTP Host**: Usually your-domain.com or server IP
2. **FTP Username**: Your cPanel username
3. **FTP Password**: Your cPanel password
4. **FTP Directory**: /public_html/

## Setup Steps in Spaceship cPanel:
1. **FTP Accounts** → Create FTP account for GitHub Actions
2. **File Manager** → Ensure public_html/ is accessible
3. **Node.js App** → Configure startup file and environment

## GitHub Secrets Setup:
Repository → Settings → Secrets and Variables → Actions → New Repository Secret:
- Name: SPACESHIP_HOST, Value: your-ftp-host.com
- Name: SPACESHIP_USERNAME, Value: your-ftp-username
- Name: SPACESHIP_PASSWORD, Value: your-ftp-password

## Test FTP Connection:
Use FileZilla or similar FTP client to verify connection works.`;

// 2. Create deployment verification script
const verifyDeployment = `#!/bin/bash
# DEPLOYMENT VERIFICATION SCRIPT
# Run this on Spaceship server after each deployment

echo "🔍 Verifying FUJI Korea deployment..."

# Check required files exist
FILES=("package.json" "server/index.js" "client/dist/index.html")
for file in "\${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check Node.js dependencies
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "⚠️ Running npm install..."
    npm install --production
fi

# Verify database connection
if [ ! -z "$DATABASE_URL" ]; then
    echo "✅ DATABASE_URL configured"
else
    echo "⚠️ DATABASE_URL not set"
fi

# Check build files
if [ -d "client/dist" ]; then
    echo "✅ Frontend build exists"
else
    echo "⚠️ Frontend not built - running build..."
    npm run build:client
fi

echo "🎉 Deployment verification completed!"`;

// 3. Create Node.js app configuration for Spaceship
const nodeAppConfig = `{
  "name": "fuji-korea-website",
  "version": "1.0.0",
  "description": "FUJI Global Korea Corporate Website",
  "main": "server/index.js",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "NODE_ENV=production node server/index.js",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && npm run build",
    "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=server/index.js --external:node_modules/*",
    "postinstall": "npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "drizzle-orm": "^0.29.0",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "esbuild": "^0.19.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}`;

// 4. Create environment configuration
const envConfig = `# SPACESHIP ENVIRONMENT CONFIGURATION

## Required Environment Variables:
DATABASE_URL=mysql://username:password@localhost:3306/database_name
NODE_ENV=production
PORT=3000

## Spaceship cPanel Setup:
1. **Node.js Apps** → Create Application
2. **Application Root**: /public_html
3. **Application URL**: your-domain.com
4. **Application Startup File**: server/index.js
5. **Node.js Version**: 18.x or higher

## Environment Variables in cPanel:
Node.js Apps → Environment Variables → Add:
- DATABASE_URL: mysql://user:pass@localhost:3306/db
- NODE_ENV: production
- PORT: 3000

## SSL Configuration:
1. **SSL/TLS** → Let's Encrypt SSL
2. **Force HTTPS Redirect**: Enable
3. **Auto-renewal**: Enable

## Domain Configuration:
1. **Addon Domains** or **Subdomains** → Add your domain
2. **Document Root**: /public_html
3. **DNS Management**: Point A record to Spaceship IP`;

// 5. Create deployment hooks
const deploymentHooks = `#!/bin/bash
# DEPLOYMENT HOOKS FOR SPACESHIP
# These scripts run automatically after deployment

# Pre-deployment hook
pre_deploy() {
    echo "🔄 Pre-deployment setup..."
    
    # Backup current version
    if [ -d "backup" ]; then
        rm -rf backup
    fi
    mkdir -p backup
    cp -r server client package.json backup/ 2>/dev/null || true
    
    echo "✅ Backup created"
}

# Post-deployment hook  
post_deploy() {
    echo "🔄 Post-deployment setup..."
    
    # Install/update dependencies
    npm install --production
    
    # Build application
    npm run build
    
    # Restart Node.js app (if using PM2 or similar)
    # pm2 reload fuji-korea-app || pm2 start server/index.js --name fuji-korea-app
    
    # Clear caches
    # redis-cli flushall 2>/dev/null || true
    
    echo "✅ Post-deployment completed"
}

# Rollback function
rollback() {
    echo "🔄 Rolling back deployment..."
    
    if [ -d "backup" ]; then
        cp -r backup/* ./
        npm install --production
        npm run build
        echo "✅ Rollback completed"
    else
        echo "❌ No backup found"
        exit 1
    fi
}

# Execute based on argument
case "$1" in
    pre)
        pre_deploy
        ;;
    post)
        post_deploy
        ;;
    rollback)
        rollback
        ;;
    *)
        echo "Usage: $0 {pre|post|rollback}"
        exit 1
        ;;
esac`;

// 6. Execute setup
function setupSpaceshipIntegration() {
    console.log('📁 Creating deployment configuration files...');
    
    const deployDir = 'deploy';
    if (!fs.existsSync(deployDir)) {
        fs.mkdirSync(deployDir, { recursive: true });
    }
    
    // Create configuration files
    fs.writeFileSync(path.join(deployDir, 'ftp-config.md'), ftpConfig);
    fs.writeFileSync(path.join(deployDir, 'verify-deployment.sh'), verifyDeployment);
    fs.writeFileSync(path.join(deployDir, 'package-spaceship.json'), nodeAppConfig);
    fs.writeFileSync(path.join(deployDir, 'environment.md'), envConfig);
    fs.writeFileSync(path.join(deployDir, 'deployment-hooks.sh'), deploymentHooks);
    
    // Make shell scripts executable
    try {
        fs.chmodSync(path.join(deployDir, 'verify-deployment.sh'), '755');
        fs.chmodSync(path.join(deployDir, 'deployment-hooks.sh'), '755');
    } catch (error) {
        console.log('⚠️ Could not set execute permissions (Windows/permissions issue)');
    }
    
    console.log('✅ Spaceship integration files created!\n');
    
    console.log('📋 NEXT STEPS FOR SPACESHIP SETUP:');
    console.log('1. **cPanel Login** → Access your Spaceship hosting account');
    console.log('2. **Node.js Apps** → Create new application');
    console.log('3. **FTP Setup** → Create FTP account for GitHub Actions');
    console.log('4. **Environment Variables** → Add DATABASE_URL, NODE_ENV, PORT');
    console.log('5. **SSL Certificate** → Enable Let\'s Encrypt SSL');
    console.log('6. **GitHub Secrets** → Add Spaceship FTP credentials');
    console.log('7. **Test Deployment** → Push changes to trigger auto-deploy');
    
    console.log('\n📁 Created files in deploy/ directory:');
    console.log('- ftp-config.md - FTP setup instructions');
    console.log('- verify-deployment.sh - Deployment verification');
    console.log('- package-spaceship.json - Production package.json');
    console.log('- environment.md - Environment setup guide');
    console.log('- deployment-hooks.sh - Pre/post deployment hooks');
    
    console.log('\n🎉 Spaceship integration ready!');
}

// Run setup
setupSpaceshipIntegration();