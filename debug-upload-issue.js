#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

class UploadDebugger {
    constructor() {
        this.domain = 'fujiglobal.kr';
    }

    async log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${message}`);
    }

    async testDirectAccess() {
        await this.log('=== TESTING DIRECT FILE ACCESS ===');
        
        const tests = [
            { url: `http://${this.domain}/index.html`, desc: 'Direct index.html access' },
            { url: `http://${this.domain}/public_html/`, desc: 'public_html directory' },
            { url: `http://${this.domain}/public_html/index.html`, desc: 'index.html in public_html' },
            { url: `http://${this.domain}/`, desc: 'Root domain' }
        ];

        for (const test of tests) {
            try {
                const { stdout } = await execAsync(`curl -s "${test.url}" | head -3`);
                await this.log(`${test.desc}: ${stdout.includes('FUJI') ? '✅ FUJI website' : stdout.includes('Index of') ? '📁 Directory listing' : stdout.includes('404') ? '❌ Not found' : '⚠️ Unknown response'}`);
                
                if (stdout.includes('FUJI')) {
                    console.log(`   Content preview: ${stdout.substring(0, 100)}...`);
                }
            } catch (error) {
                await this.log(`${test.desc}: ❌ Error - ${error.message}`);
            }
        }
    }

    async analyzeUploadIssue() {
        await this.log('=== ANALYZING UPLOAD ISSUE ===');
        
        console.log('\n🔍 POSSIBLE CAUSES:');
        console.log('1. File uploaded to wrong directory (root instead of public_html)');
        console.log('2. File named incorrectly (Index.html vs index.html)');
        console.log('3. File permissions issue (not 644)');
        console.log('4. File content corrupted during upload');
        console.log('5. Server cache not cleared');
        console.log('6. Directory index priority issue');
        
        console.log('\n💡 SOLUTIONS TO TRY:');
        console.log('A. Check file location: Should be in /public_html/ not root');
        console.log('B. Verify filename: Must be exactly "index.html" (lowercase)');
        console.log('C. Check file size: Should be ~8KB+ (not empty)');
        console.log('D. Clear hosting cache in cPanel');
        console.log('E. Try uploading with different name: home.html, test.html');
        
        return true;
    }

    async createAlternativeFiles() {
        await this.log('=== CREATING ALTERNATIVE FILES ===');
        
        // Create minimal test file
        const testFile = `<!DOCTYPE html>
<html>
<head><title>FUJI Test Upload</title></head>
<body>
<h1>FUJI Global Korea - Upload Test Success!</h1>
<p>If you see this, upload is working. Time: ${new Date().toISOString()}</p>
</body>
</html>`;
        
        await fs.writeFile('test-upload-minimal.html', testFile);
        
        // Create PHP redirect file
        const phpRedirect = `<?php
// PHP redirect to ensure index works
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>FUJI Global Korea - 엘리베이터 기술</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 15px; }
        h1 { color: #fff; text-align: center; font-size: 2.5rem; margin-bottom: 20px; }
        .status { background: #27ae60; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .info { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">
            ✅ Website Successfully Deployed - <?php echo date('Y-m-d H:i:s'); ?>
        </div>
        
        <h1>FUJI Global Korea</h1>
        <p style="text-align: center; font-size: 1.2rem;">엘리베이터 기술의 선두주자</p>
        
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
        </div>
    </div>
</body>
</html>`;
        
        await fs.writeFile('index.php', phpRedirect);
        
        await this.log('Created alternative files:');
        await this.log('- test-upload-minimal.html (simple test file)');
        await this.log('- index.php (PHP version with same content)');
    }

    async generateFixInstructions() {
        const instructions = `# 🔧 FIXING UPLOAD ISSUE - FUJI GLOBAL KOREA

## CURRENT PROBLEM:
File uploaded but still showing directory listing

## DIAGNOSIS STEPS:

### 1. CHECK FILE LOCATION
**Spaceship cPanel → File Manager:**
- Navigate to **public_html** (not root directory)
- Verify **index.html** exists in public_html folder
- File size should be ~8KB+ (not 0 bytes)

### 2. VERIFY FILENAME
- Must be exactly **"index.html"** (lowercase)
- NOT: Index.html, INDEX.HTML, index.HTML

### 3. CHECK FILE PERMISSIONS
- Right-click index.html → Properties/Permissions
- Should be **644** (rw-r--r--)
- If wrong, change to 644

### 4. TEST ALTERNATIVE METHODS

**Method A: Upload test-upload-minimal.html**
- Smaller file, easier to troubleshoot
- Upload as index.html
- Test: fujiglobal.kr

**Method B: Upload index.php**
- PHP version of same content
- Some servers prioritize PHP over HTML
- Upload index.php (keep HTML version too)

**Method C: Clear Cache**
- cPanel → File Manager → Clear Cache
- Browser: Ctrl+F5 or incognito mode

### 5. DIRECTORY INDEX PRIORITY
Some servers check files in this order:
1. index.php
2. index.html
3. index.htm
4. default.html

Try uploading as **index.php** first!

## FILES TO TRY:
1. **test-upload-minimal.html** → index.html (simple test)
2. **index.php** (PHP version)
3. **simple-fuji-website.html** → default.html (backup name)

**Upload index.php first - many servers prioritize PHP files!**
`;

        await fs.writeFile('FIX-UPLOAD-ISSUE.md', instructions);
        await this.log('Created FIX-UPLOAD-ISSUE.md with detailed solutions');
    }

    async run() {
        await this.log('🔍 Starting Upload Issue Debugger');
        
        try {
            await this.testDirectAccess();
            await this.analyzeUploadIssue();
            await this.createAlternativeFiles();
            await this.generateFixInstructions();
            
            console.log('\n' + '='.repeat(60));
            console.log('📋 UPLOAD ISSUE ANALYSIS COMPLETE');
            console.log('='.repeat(60));
            console.log('🔍 Problem: File uploaded but not serving');
            console.log('💡 Solution: Try uploading index.php instead');
            console.log('📁 Files created:');
            console.log('   - test-upload-minimal.html (simple test)');
            console.log('   - index.php (PHP version)');
            console.log('   - FIX-UPLOAD-ISSUE.md (detailed guide)');
            console.log('='.repeat(60));
            console.log('🚀 NEXT: Upload index.php to public_html folder');
            
        } catch (error) {
            await this.log(`❌ Error in debugger: ${error.message}`, 'ERROR');
        }
    }
}

// Run the debugger
const uploader = new UploadDebugger();
uploader.run().catch(console.error);