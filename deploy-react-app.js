#!/usr/bin/env node

// Deploy full React app to Netlify
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function deployReactApp() {
    console.log('🚀 DEPLOYING FULL REACT APP TO NETLIFY');
    console.log('=====================================');
    
    try {
        // Create Netlify deployment folder
        await execAsync('rm -rf netlify-deploy && mkdir -p netlify-deploy');
        
        // Copy built React app
        await execAsync('cp -r dist/public/* netlify-deploy/');
        console.log('✓ Copied React build files');
        
        // Create _redirects for SPA routing
        const redirects = `# Netlify SPA redirects
/api/* https://fuji-global-korea-bacuahhi.replit.app/api/:splat 200
/* /index.html 200`;
        
        await fs.writeFile('netlify-deploy/_redirects', redirects);
        console.log('✓ Created SPA routing redirects');
        
        // Create netlify.toml for optimized deployment
        const netlifyConfig = `[build]
  publish = "netlify-deploy"
  command = "echo 'React app ready'"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://fuji-global-korea-bacuahhi.replit.app/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 3000
  publish = "dist/public"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`;

        await fs.writeFile('netlify.toml', netlifyConfig);
        console.log('✓ Created Netlify configuration');
        
        // Create environment variables template
        const envTemplate = `# Netlify Environment Variables
# Add these in Netlify dashboard: Site settings > Environment variables

DATABASE_URL=your_database_url_here
NODE_ENV=production
REPL_ID=your_repl_id_here

# API endpoints will proxy to Replit backend
# Frontend will be served from Netlify CDN`;

        await fs.writeFile('netlify-deploy/.env.example', envTemplate);
        console.log('✓ Created environment template');
        
        // Check build size and contents
        const { stdout: buildSize } = await execAsync('du -sh netlify-deploy');
        console.log(`✓ Build size: ${buildSize.trim()}`);
        
        const { stdout: fileCount } = await execAsync('find netlify-deploy -type f | wc -l');
        console.log(`✓ Total files: ${fileCount.trim()}`);
        
        // List key files
        const { stdout: keyFiles } = await execAsync('ls -la netlify-deploy/');
        console.log('✓ Key files ready:');
        console.log(keyFiles);
        
        console.log('\n✅ REACT APP DEPLOYMENT READY');
        console.log('===============================');
        console.log('📁 Folder to deploy: netlify-deploy/');
        console.log('🎯 Deployment method:');
        console.log('1. Go to: https://app.netlify.com/drop');
        console.log('2. Drag "netlify-deploy" folder');
        console.log('3. Full React app will be live!');
        console.log('\n🔧 FEATURES INCLUDED:');
        console.log('- Complete React application');
        console.log('- Admin panel (/admin route)');
        console.log('- Database integration (via API proxy)');
        console.log('- Modern UI with all components');
        console.log('- Korean/English language support');
        console.log('- Product management system');
        console.log('- Serial number search');
        console.log('- Contact forms');
        console.log('\n🌐 API BACKEND:');
        console.log('- APIs will proxy to Replit backend');
        console.log('- Database operations handled by Replit');
        console.log('- Frontend served by Netlify CDN');

    } catch (error) {
        console.log('❌ React app deployment failed:', error.message);
    }
}

deployReactApp();