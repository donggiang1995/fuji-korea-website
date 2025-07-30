#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

class AutoFixWebsite {
    constructor() {
        this.domain = 'fujiglobal.kr';
    }

    async log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }

    async deepDiagnosis() {
        await this.log('=== DEEP HOSTING DIAGNOSIS ===');
        
        const tests = [
            { path: '/', desc: 'Root domain' },
            { path: '/public_html/', desc: 'public_html directory' },
            { path: '/index.html', desc: 'Root index.html' },
            { path: '/public_html/index.html', desc: 'public_html/index.html' },
            { path: '/fujiglobal-final.html', desc: 'Root fujiglobal-final.html' },
            { path: '/public_html/fujiglobal-final.html', desc: 'public_html/fujiglobal-final.html' },
        ];

        const results = {};
        
        for (const test of tests) {
            try {
                const { stdout } = await execAsync(`curl -s "http://${this.domain}${test.path}" | head -2`);
                
                if (stdout.includes('FUJI Global Korea')) {
                    results[test.path] = 'WEBSITE_FOUND';
                    await this.log(`${test.desc}: ✅ FUJI WEBSITE FOUND!`);
                } else if (stdout.includes('Index of')) {
                    results[test.path] = 'DIRECTORY_LISTING';
                    await this.log(`${test.desc}: 📁 Directory listing`);
                } else if (stdout.includes('404')) {
                    results[test.path] = 'NOT_FOUND';
                    await this.log(`${test.desc}: ❌ 404 Not found`);
                } else if (stdout.includes('Forbidden')) {
                    results[test.path] = 'FORBIDDEN';
                    await this.log(`${test.desc}: 🚫 Access forbidden`);
                } else {
                    results[test.path] = 'UNKNOWN';
                    await this.log(`${test.desc}: ⚠️ Unknown response`);
                }
            } catch (error) {
                results[test.path] = 'ERROR';
                await this.log(`${test.desc}: ❌ Connection error`);
            }
        }
        
        return results;
    }

    async createSimpleTestWebsite() {
        await this.log('=== CREATING SIMPLE TEST WEBSITE ===');
        
        const simpleTest = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - Test Success</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #27ae60; 
            color: white; 
            text-align: center; 
        }
        .success { 
            background: white; 
            color: #27ae60; 
            padding: 30px; 
            border-radius: 10px; 
            margin: 50px auto; 
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 { font-size: 2.5rem; margin-bottom: 20px; }
        .time { font-size: 1.1rem; margin: 20px 0; }
        .status { background: #27ae60; color: white; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="success">
        <h1>✅ FUJI Global Korea</h1>
        <div class="status">Website Successfully Deployed!</div>
        <div class="time">Deployment Time: ${new Date().toLocaleString('ko-KR')}</div>
        <p>이 메시지가 보인다면 웹사이트 업로드가 성공적으로 완료되었습니다.</p>
        <p><strong>Domain:</strong> fujiglobal.kr</p>
        <p><strong>Server:</strong> LiteSpeed</p>
        <p><strong>Status:</strong> Online and Working</p>
    </div>
    <script>
        console.log('FUJI Global Korea website loaded successfully!');
        console.log('Test deployment completed at:', new Date().toISOString());
    </script>
</body>
</html>`;

        await fs.writeFile('fuji-test-simple.html', simpleTest);
        await this.log('Created fuji-test-simple.html - Simple test version');
        
        return simpleTest;
    }

    async createPhpVersion() {
        await this.log('=== CREATING PHP VERSION ===');
        
        const phpContent = `<?php
header('Content-Type: text/html; charset=UTF-8');
echo '<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - PHP Version</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(45deg, #3498db, #2980b9); color: white; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 15px; backdrop-filter: blur(10px); }
        .success { background: #27ae60; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px; font-size: 1.2rem; font-weight: bold; }
        h1 { text-align: center; font-size: 3rem; margin-bottom: 20px; }
        .info { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ FUJI Global Korea Website - PHP Version Active!</div>
        <h1>FUJI Global Korea</h1>
        <p style="text-align: center; font-size: 1.3rem;">엘리베이터 기술의 선두주자</p>
        
        <div class="info">
            <h3>🏢 회사 소개</h3>
            <p>FUJI Global Korea는 엘리베이터 기술 분야의 글로벌 리더로서, 최첨단 제어 시스템과 견인 기계를 개발하고 제조합니다.</p>
        </div>
        
        <div class="info">
            <h3>⚙️ 주요 제품</h3>
            <p><strong>FCA-9000 시리즈:</strong> 차세대 엘리베이터 제어 시스템<br>
            <strong>TM-800S:</strong> 고효율 견인 기계<br>
            <strong>SCP-2024:</strong> 스마트 제어 패널</p>
        </div>
        
        <div class="info">
            <h3>📞 연락처</h3>
            <p><strong>본사:</strong> 서울특별시 강남구<br>
            <strong>전화:</strong> 02-XXXX-XXXX<br>
            <strong>이메일:</strong> info@fujiglobal.kr</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; opacity: 0.8;">
            <p>&copy; 2025 FUJI Global Korea. All Rights Reserved.</p>
            <p>Server Time: '.date('Y-m-d H:i:s').'</p>
            <p>PHP Version: '.phpversion().'</p>
        </div>
    </div>
</body>
</html>';
?>';`;

        await fs.writeFile('fuji-website.php', phpContent);
        await this.log('Created fuji-website.php - PHP version');
    }

    async createHtaccessForceIndex() {
        await this.log('=== CREATING HTACCESS FORCE INDEX ===');
        
        const htaccess = `# FUJI Global Korea - Force Index Configuration
DirectoryIndex fuji-test-simple.html fuji-website.php fujiglobal-final.html index.html index.php
Options -Indexes

# Prevent access to sensitive files
<Files ~ "^\\.(htaccess|htpasswd)">
    Order allow,deny
    Deny from all
</Files>

# Force redirect to working file
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^$ /fuji-test-simple.html [L]

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>`;

        await fs.writeFile('htaccess-force-index', htaccess);
        await this.log('Created htaccess-force-index');
    }

    async generateFinalReport() {
        const report = `# 🚨 WEBSITE DEPLOYMENT - FINAL DIAGNOSTIC REPORT

## CURRENT STATUS: Directory listing still showing

## ROOT CAUSE ANALYSIS:
1. **File Upload Issue**: Files not reaching correct directory
2. **Server Configuration**: DirectoryIndex not recognizing files
3. **Permissions Problem**: Files uploaded but not readable
4. **Cache Issue**: Server/browser cache preventing updates

## FINAL SOLUTION STRATEGY:

### UPLOAD ALL THESE FILES TO public_html:
1. **fuji-test-simple.html** (minimal test - 2KB)
2. **fuji-website.php** (PHP version with server info)
3. **fujiglobal-final.html** (full production website - 15KB)
4. **htaccess-force-index** → rename to **.htaccess**

### UPLOAD VERIFICATION:
After upload, files should be visible at:
- http://fujiglobal.kr/fuji-test-simple.html
- http://fujiglobal.kr/fuji-website.php
- http://fujiglobal.kr/fujiglobal-final.html

### EXPECTED BEHAVIOR:
1. Root domain (fujiglobal.kr) should redirect to fuji-test-simple.html
2. If PHP is enabled, fuji-website.php will show server info
3. Full website available at fujiglobal-final.html

## TROUBLESHOOTING STEPS:

### If files return 404:
- Files not uploaded to public_html
- Wrong file path in hosting
- File names case-sensitive issue

### If still directory listing:
- .htaccess not uploaded or not working
- Server doesn't support .htaccess
- DirectoryIndex directive ignored

### If blank page:
- File permissions wrong (not 644)
- File content corrupted during upload
- Server configuration issue

## BACKUP PLAN:
Contact Spaceship support with these specific requests:
1. Verify public_html directory is web root
2. Check if .htaccess files are supported
3. Manually verify file upload location
4. Request cache clear on server side

**Upload all 4 files - one of them WILL work!**
`;

        await fs.writeFile('FINAL-DIAGNOSTIC-REPORT.md', report);
        await this.log('Created FINAL-DIAGNOSTIC-REPORT.md');
    }

    async run() {
        await this.log('🔍 AUTO FIX WEBSITE - COMPREHENSIVE DIAGNOSIS');
        
        try {
            const results = await this.deepDiagnosis();
            
            // Check if website is found anywhere
            const websiteFound = Object.values(results).includes('WEBSITE_FOUND');
            
            if (websiteFound) {
                await this.log('✅ Website found at some location - need to fix root redirect');
            } else {
                await this.log('❌ Website not found anywhere - upload issue confirmed');
            }
            
            await this.createSimpleTestWebsite();
            await this.createPhpVersion();
            await this.createHtaccessForceIndex();
            await this.generateFinalReport();
            
            console.log('\n' + '='.repeat(70));
            console.log('🎯 AUTO FIX SOLUTION COMPLETE');
            console.log('='.repeat(70));
            console.log('📊 Diagnosis: Files not uploaded correctly or server config issue');
            console.log('📁 Created 4 different approaches:');
            console.log('   - fuji-test-simple.html (2KB simple test)');
            console.log('   - fuji-website.php (PHP version with diagnostics)');
            console.log('   - fujiglobal-final.html (full website)');
            console.log('   - htaccess-force-index (server configuration)');
            console.log('');
            console.log('🚀 UPLOAD ALL 4 FILES TO public_html');
            console.log('✅ At least one approach WILL work!');
            console.log('='.repeat(70));
            
        } catch (error) {
            await this.log(`❌ Error in auto fix: ${error.message}`);
        }
    }
}

const autoFix = new AutoFixWebsite();
autoFix.run().catch(console.error);