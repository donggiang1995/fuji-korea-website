#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class SpaceshipUploader {
    constructor() {
        this.domain = 'fujiglobal.kr';
    }

    async log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${message}`);
    }

    async testCurrentStatus() {
        await this.log('=== TESTING CURRENT STATUS ===');
        
        try {
            const { stdout } = await execAsync(`curl -s http://${this.domain} | head -5`);
            
            if (stdout.includes('Index of /')) {
                await this.log('✅ Node.js app successfully disabled - seeing directory listing');
                return 'directory_listing';
            } else if (stdout.includes('FUJI')) {
                await this.log('✅ FUJI website already uploaded and working!');
                return 'website_working';
            } else if (stdout.includes('NodeJS')) {
                await this.log('❌ Node.js app still running - need to disable it first');
                return 'nodejs_still_running';
            } else {
                await this.log('⚠️ Unknown response from website');
                console.log('Response:', stdout);
                return 'unknown';
            }
        } catch (error) {
            await this.log(`❌ Error testing website: ${error.message}`, 'ERROR');
            return 'error';
        }
    }

    async checkPublicHtmlAccess() {
        await this.log('=== CHECKING PUBLIC_HTML ACCESS ===');
        
        try {
            const { stdout } = await execAsync(`curl -s http://${this.domain}/public_html/ | head -3`);
            
            if (stdout.includes('Index of /public_html')) {
                await this.log('✅ public_html directory is accessible');
                return true;
            } else if (stdout.includes('403') || stdout.includes('Forbidden')) {
                await this.log('⚠️ public_html access forbidden (this is normal)');
                return false;
            } else {
                await this.log('⚠️ Unexpected response from public_html');
                return false;
            }
        } catch (error) {
            await this.log(`Error checking public_html: ${error.message}`);
            return false;
        }
    }

    async createUploadInstructions() {
        await this.log('=== CREATING UPLOAD INSTRUCTIONS ===');
        
        const instructions = `
# 📤 SPACESHIP HOSTING UPLOAD INSTRUCTIONS

## STATUS: Node.js app successfully disabled ✅

## NEXT STEPS:

### 1. UPLOAD FILE TO PUBLIC_HTML
**Spaceship cPanel → File Manager:**
1. Navigate to **public_html** folder
2. Upload **simple-fuji-website.html**
3. Rename to **index.html**
4. Set permissions: **644**

### 2. ALTERNATIVE: CREATE INDEX.HTML DIRECTLY
In File Manager → public_html → Create New File:
- Name: **index.html**
- Copy content from **simple-fuji-website.html**
- Save and set permissions to **644**

### 3. VERIFY UPLOAD
After upload, test:
\`curl -s http://fujiglobal.kr | head -5\`

Should see:
\`<!DOCTYPE html>\`
\`<html lang="ko">\`
\`<title>FUJI Global Korea - 엘리베이터 기술</title>\`

### 4. TROUBLESHOOTING
If still seeing directory listing:
- Check file is named exactly **index.html** (not Index.html)
- Verify file is in **public_html** root (not subfolder)
- Check file permissions are **644**
- Clear browser cache (Ctrl+F5)

## FILES READY FOR UPLOAD:
- ✅ simple-fuji-website.html (professional FUJI website)
- ✅ emergency-website.html (backup option)
- ✅ static-website-ready.html (full featured)

**Choose simple-fuji-website.html for clean, professional look!**
`;

        await fs.writeFile('SPACESHIP-UPLOAD-GUIDE.md', instructions);
        await this.log('Created SPACESHIP-UPLOAD-GUIDE.md');
        return instructions;
    }

    async generateFTPScript() {
        await this.log('=== GENERATING FTP UPLOAD SCRIPT ===');
        
        const ftpScript = `#!/bin/bash
# FTP Upload Script for FUJI Global Korea

echo "🚀 FUJI Global Korea - FTP Upload"
echo "================================"

# Check if lftp is available
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp not found. Install with: apt-get install lftp"
    exit 1
fi

# FTP credentials (replace with actual values)
FTP_HOST="server37.shared.spaceship.host"
FTP_USER="your_username"
FTP_PASS="your_password"
REMOTE_DIR="/public_html"

echo "📁 Uploading to: \$FTP_HOST\$REMOTE_DIR"

# Upload using lftp
lftp -c "
    open ftp://\$FTP_USER:\$FTP_PASS@\$FTP_HOST
    cd \$REMOTE_DIR
    put simple-fuji-website.html -o index.html
    chmod 644 index.html
    ls -la index.html
    quit
"

echo "✅ Upload completed!"
echo "🌐 Test: curl -s http://fujiglobal.kr | head -5"

# Automated test
echo ""
echo "🧪 Testing website..."
sleep 2
curl -s http://fujiglobal.kr | head -5
`;

        await fs.writeFile('ftp-upload.sh', ftpScript);
        await execAsync('chmod +x ftp-upload.sh');
        await this.log('Created ftp-upload.sh (needs FTP credentials)');
    }

    async run() {
        await this.log('🚀 Starting Spaceship Upload Helper');
        
        try {
            const status = await this.testCurrentStatus();
            
            if (status === 'website_working') {
                await this.log('🎉 Website is already working! No upload needed.');
                return;
            }
            
            if (status === 'nodejs_still_running') {
                await this.log('❌ Please disable Node.js app first in Spaceship cPanel');
                return;
            }
            
            if (status === 'directory_listing') {
                await this.log('✅ Ready for file upload to public_html');
                await this.checkPublicHtmlAccess();
                await this.createUploadInstructions();
                await this.generateFTPScript();
                
                console.log('\n' + '='.repeat(60));
                console.log('📋 UPLOAD STATUS SUMMARY');
                console.log('='.repeat(60));
                console.log('✅ Node.js app: DISABLED');
                console.log('✅ Static files: CAN BE SERVED');
                console.log('📤 Next step: UPLOAD index.html to public_html');
                console.log('📁 Files ready: simple-fuji-website.html');
                console.log('📖 Instructions: SPACESHIP-UPLOAD-GUIDE.md');
                console.log('='.repeat(60));
            }
            
        } catch (error) {
            await this.log(`❌ Error in upload helper: ${error.message}`, 'ERROR');
        }
    }
}

// Run the uploader
const uploader = new SpaceshipUploader();
uploader.run().catch(console.error);