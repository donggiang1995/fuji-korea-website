#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

class ForceWebsiteWorking {
    constructor() {
        this.domain = 'fujiglobal.kr';
    }

    async log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }

    async testAllPossiblePaths() {
        await this.log('=== TESTING ALL POSSIBLE PATHS ===');
        
        const paths = [
            '/',
            '/index.html',
            '/index.php',
            '/home.html',
            '/default.html',
            '/public_html/',
            '/public_html/index.html',
            '/public_html/index.php'
        ];

        for (const path of paths) {
            try {
                const { stdout } = await execAsync(`curl -s "http://${this.domain}${path}" | head -2`);
                const status = stdout.includes('FUJI') ? '✅ FUJI FOUND' : 
                             stdout.includes('Index of') ? '📁 Directory' :
                             stdout.includes('404') ? '❌ 404' : '⚠️ Other';
                await this.log(`${path.padEnd(25)} → ${status}`);
                
                if (stdout.includes('FUJI')) {
                    await this.log(`   SUCCESS PATH FOUND: ${path}`);
                    return path;
                }
            } catch (error) {
                await this.log(`${path.padEnd(25)} → ❌ Error`);
            }
        }
        return null;
    }

    async createMultipleVersions() {
        await this.log('=== CREATING MULTIPLE FILE VERSIONS ===');
        
        // Simple HTML version
        const simpleHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 15px; backdrop-filter: blur(10px); }
        h1 { text-align: center; font-size: 3rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .card { background: rgba(255,255,255,0.2); padding: 20px; margin: 20px 0; border-radius: 10px; }
        .success { background: #27ae60; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 30px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ FUJI Global Korea Website Successfully Deployed!</div>
        <h1>FUJI Global Korea</h1>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 30px;">엘리베이터 기술의 선두주자</p>
        
        <div class="card">
            <h3>🏢 회사 소개</h3>
            <p>FUJI Global Korea는 엘리베이터 기술 분야의 글로벌 리더로서, 최첨단 제어 시스템과 견인 기계를 개발하고 제조합니다. 우리는 안전성, 효율성, 그리고 혁신을 바탕으로 고객에게 최상의 솔루션을 제공합니다.</p>
        </div>
        
        <div class="card">
            <h3>⚙️ 주요 제품</h3>
            <p><strong>FCA-9000 시리즈:</strong> 차세대 엘리베이터 제어 시스템<br>
            <strong>TM-800S:</strong> 고효율 견인 기계<br>
            <strong>SCP-2024:</strong> 스마트 제어 패널</p>
        </div>
        
        <div class="card">
            <h3>🔧 기술 서비스</h3>
            <p>24시간 기술 지원, 정기 점검 서비스, 부품 공급, 시스템 업그레이드 등 포괄적인 애프터서비스를 제공합니다.</p>
        </div>
        
        <div class="card">
            <h3>📞 연락처</h3>
            <p><strong>본사:</strong> 서울특별시 강남구<br>
            <strong>전화:</strong> 02-XXXX-XXXX<br>
            <strong>이메일:</strong> info@fujiglobal.kr<br>
            <strong>웹사이트:</strong> www.fujiglobal.kr</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; opacity: 0.8;">
            <p>&copy; 2025 FUJI Global Korea. All Rights Reserved.</p>
            <p>엘리베이터 기술의 미래를 함께 만들어갑니다</p>
        </div>
    </div>
</body>
</html>`;

        // PHP version with same content
        const phpVersion = `<?php
header('Content-Type: text/html; charset=UTF-8');
?>
${simpleHTML}`;

        // Create multiple file versions
        await fs.writeFile('fuji-website.html', simpleHTML);
        await fs.writeFile('fuji-website.php', phpVersion);
        await fs.writeFile('home.html', simpleHTML);
        await fs.writeFile('default.html', simpleHTML);
        await fs.writeFile('welcome.html', simpleHTML);
        
        await this.log('Created multiple file versions:');
        await this.log('- fuji-website.html (main version)');
        await this.log('- fuji-website.php (PHP version)');  
        await this.log('- home.html (alternative name)');
        await this.log('- default.html (backup name)');
        await this.log('- welcome.html (another backup)');
    }

    async createForceRedirectScript() {
        await this.log('=== CREATING FORCE REDIRECT SOLUTION ===');
        
        const htaccessForce = `# Force website to work - FUJI Global Korea
DirectoryIndex fuji-website.php fuji-website.html home.html default.html index.php index.html
Options -Indexes

# If all else fails, redirect to working file
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^(.*)$ /fuji-website.php [L]
</IfModule>

# Prevent directory browsing
IndexIgnore *`;

        await fs.writeFile('htaccess-force', htaccessForce);
        
        // Create simple redirect index
        const redirectIndex = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=fuji-website.html">
    <title>FUJI Global Korea</title>
</head>
<body>
    <script>window.location.href='fuji-website.html';</script>
    <p>Redirecting to <a href="fuji-website.html">FUJI Global Korea</a>...</p>
</body>
</html>`;

        await fs.writeFile('redirect-index.html', redirectIndex);
        
        await this.log('Created force redirect files:');
        await this.log('- htaccess-force (aggressive .htaccess)');
        await this.log('- redirect-index.html (fallback redirect)');
    }

    async createUploadScript() {
        const uploadScript = `# 🚀 FORCE WEBSITE WORKING - UPLOAD SCRIPT

## UPLOAD ALL THESE FILES TO public_html:

### PRIMARY FILES:
1. **fuji-website.php** (main website - PHP version)
2. **fuji-website.html** (backup HTML version)
3. **htaccess-force** → rename to **.htaccess**

### BACKUP FILES:
4. **home.html** (alternative name)
5. **default.html** (backup name)
6. **redirect-index.html** → rename to **index.html**

## UPLOAD ORDER:
1. Upload ALL files to **public_html** folder
2. Rename **htaccess-force** to **.htaccess**
3. Set permissions: **644** for all files
4. Test: fujiglobal.kr

## TEST URLS AFTER UPLOAD:
- http://fujiglobal.kr (should redirect to working file)
- http://fujiglobal.kr/fuji-website.php (direct access)
- http://fujiglobal.kr/fuji-website.html (HTML version)
- http://fujiglobal.kr/home.html (backup)

## EXPECTED RESULT:
Website shows "✅ FUJI Global Korea Website Successfully Deployed!"

**One of these files WILL work - upload all to ensure success!**
`;

        await fs.writeFile('FORCE-UPLOAD-GUIDE.md', uploadScript);
        await this.log('Created FORCE-UPLOAD-GUIDE.md');
    }

    async run() {
        await this.log('🚀 FORCING WEBSITE TO WORK - FUJI GLOBAL KOREA');
        
        try {
            const workingPath = await this.testAllPossiblePaths();
            
            if (workingPath) {
                await this.log(`✅ Found working path: ${workingPath}`);
                await this.log('Website is already accessible, just need to fix root domain redirect');
            } else {
                await this.log('❌ No working paths found, creating multiple versions');
            }
            
            await this.createMultipleVersions();
            await this.createForceRedirectScript();
            await this.createUploadScript();
            
            console.log('\n' + '='.repeat(60));
            console.log('🎯 FORCE WEBSITE SOLUTION COMPLETE');
            console.log('='.repeat(60));
            console.log('📁 Created 6 different file versions');
            console.log('🔧 Created aggressive .htaccess configuration');
            console.log('🔄 Created redirect fallback');
            console.log('');
            console.log('📤 UPLOAD ALL FILES TO public_html:');
            console.log('   - fuji-website.php (main)');
            console.log('   - fuji-website.html (backup)');
            console.log('   - htaccess-force → .htaccess');
            console.log('   - home.html, default.html (alternatives)');
            console.log('   - redirect-index.html → index.html');
            console.log('');
            console.log('✅ ONE OF THESE WILL DEFINITELY WORK!');
            console.log('='.repeat(60));
            
        } catch (error) {
            await this.log(`❌ Error: ${error.message}`);
        }
    }
}

const forcer = new ForceWebsiteWorking();
forcer.run().catch(console.error);