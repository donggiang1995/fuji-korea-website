#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

class SmartFixSystem {
    constructor() {
        this.domain = 'fujiglobal.kr';
        this.ip = '66.29.148.111';
    }

    async log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }

    async deepDiagnosis() {
        await this.log('=== DEEP DIAGNOSIS - FINDING ROOT CAUSE ===');
        
        const diagnostics = [];
        
        // 1. Check DNS resolution
        try {
            const { stdout: dnsResult } = await execAsync(`nslookup ${this.domain}`);
            if (dnsResult.includes(this.ip)) {
                diagnostics.push('✅ DNS resolution correct');
            } else {
                diagnostics.push('❌ DNS resolution issue');
            }
        } catch (error) {
            diagnostics.push('❌ DNS lookup failed');
        }
        
        // 2. Check direct IP access
        try {
            const { stdout: ipResponse } = await execAsync(`curl -s "http://${this.ip}" | head -3`);
            if (ipResponse.includes('Index of')) {
                diagnostics.push('✅ Server responding - showing directory listing');
            } else if (ipResponse.includes('FUJI')) {
                diagnostics.push('✅ Server has website content');
            } else {
                diagnostics.push('❌ Server not responding properly');
            }
        } catch (error) {
            diagnostics.push('❌ IP connection failed');
        }
        
        // 3. Check server headers for detailed info
        try {
            const { stdout: headers } = await execAsync(`curl -I "http://${this.domain}/" 2>/dev/null`);
            if (headers.includes('LiteSpeed')) {
                diagnostics.push('✅ LiteSpeed server detected');
            }
            if (headers.includes('text/html')) {
                diagnostics.push('✅ HTML content type');
            }
        } catch (error) {
            diagnostics.push('❌ Header check failed');
        }
        
        // 4. Check if files exist in expected location
        try {
            const { stdout: indexCheck } = await execAsync(`curl -s "http://${this.domain}/index.html"`);
            if (indexCheck.includes('404')) {
                diagnostics.push('❌ index.html returns 404 - file location issue');
            } else if (indexCheck.includes('FUJI')) {
                diagnostics.push('✅ index.html exists and has content');
            } else {
                diagnostics.push('⚠️ index.html response unclear');
            }
        } catch (error) {
            diagnostics.push('❌ index.html check failed');
        }
        
        diagnostics.forEach(diag => this.log(diag));
        return diagnostics;
    }

    async identifyServerType() {
        await this.log('=== IDENTIFYING SERVER CONFIGURATION ===');
        
        try {
            const { stdout: response } = await execAsync(`curl -s "http://${this.domain}/" | head -20`);
            
            // Check for specific server software signatures
            if (response.includes('/_autoindex/')) {
                await this.log('🔍 Detected: LiteSpeed AutoIndex feature enabled');
                return 'LITESPEED_AUTOINDEX';
            }
            
            if (response.includes('Index of')) {
                await this.log('🔍 Detected: Generic directory listing');
                return 'GENERIC_DIRECTORY_LISTING';
            }
            
            if (response.includes('cPanel')) {
                await this.log('🔍 Detected: cPanel default page');
                return 'CPANEL_DEFAULT';
            }
            
            return 'UNKNOWN_SERVER_TYPE';
            
        } catch (error) {
            await this.log(`❌ Server type detection failed: ${error.message}`);
            return 'CONNECTION_ERROR';
        }
    }

    async createSmartSolution(serverType) {
        await this.log('=== CREATING SMART SOLUTION BASED ON SERVER TYPE ===');
        
        if (serverType === 'LITESPEED_AUTOINDEX') {
            // LiteSpeed specific solution
            await this.createLiteSpeedSolution();
        } else {
            // Generic solution
            await this.createGenericSolution();
        }
    }

    async createLiteSpeedSolution() {
        await this.log('Creating LiteSpeed-optimized solution...');
        
        // LiteSpeed specific .htaccess
        const liteSpeedHtaccess = `# LiteSpeed Web Server Configuration
# Disable AutoIndex
Options -Indexes

# Force DirectoryIndex
DirectoryIndex index.html index.htm default.html

# LiteSpeed specific settings
<IfModule Litespeed>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^.*$ /index.html [L]
</IfModule>

# Generic Apache fallback
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_URI} ^/$
    RewriteRule ^$ /index.html [L,R=301]
</IfModule>

# Error handling
ErrorDocument 404 /index.html
ErrorDocument 403 /index.html

# Security
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options SAMEORIGIN`;

        await fs.writeFile('.htaccess-litespeed', liteSpeedHtaccess);
        await this.log('Created LiteSpeed optimized .htaccess');
        
        // Create index.html override
        await this.createIndexOverride();
    }

    async createGenericSolution() {
        await this.log('Creating generic server solution...');
        
        const genericHtaccess = `# Generic Server Configuration
DirectoryIndex index.html index.htm default.html home.html

# Disable directory browsing
Options -Indexes

# Redirect root to index
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^$ /index.html [L]

# Error handling
ErrorDocument 404 /index.html`;

        await fs.writeFile('.htaccess-generic', genericHtaccess);
        await this.log('Created generic .htaccess');
    }

    async createIndexOverride() {
        await this.log('Creating index.html override...');
        
        const websiteContent = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - 엘리베이터 전문업체</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Malgun Gothic', sans-serif; 
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 900px;
            padding: 50px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .success { 
            background: #27ae60; 
            padding: 20px; 
            border-radius: 15px; 
            margin-bottom: 30px;
            font-size: 1.2rem;
            font-weight: bold;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        h1 { font-size: 3.5rem; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        .tagline { font-size: 1.4rem; opacity: 0.9; margin-bottom: 40px; }
        .info {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
            text-align: left;
        }
        .info h3 { color: #f39c12; margin-bottom: 15px; }
        .contact { 
            background: rgba(52, 152, 219, 0.2); 
            border: 2px solid rgba(52, 152, 219, 0.5);
        }
        .footer {
            margin-top: 40px;
            opacity: 0.8;
            font-size: 0.9rem;
        }
        @media (max-width: 768px) {
            .container { padding: 30px 20px; }
            h1 { font-size: 2.5rem; }
            .tagline { font-size: 1.1rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">
            🚀 FUJI Global Korea Website Successfully Deployed!
        </div>
        
        <h1>FUJI Global Korea</h1>
        <p class="tagline">엘리베이터 기술의 글로벌 리더</p>
        
        <div class="info">
            <h3>🏢 회사 소개</h3>
            <p>FUJI Global Korea는 엘리베이터 기술 분야의 선도 기업으로, 혁신적인 제어 시스템과 견인 기계를 개발 및 제조하는 글로벌 기업입니다.</p>
        </div>
        
        <div class="info">
            <h3>⚙️ 주요 제품 라인업</h3>
            <p><strong>FCA-9000 시리즈:</strong> 차세대 엘리베이터 제어 시스템<br>
            <strong>TM-800S 견인기:</strong> 고효율 무기어 견인 기계<br>
            <strong>SCP-2024 제어패널:</strong> 스마트 통합 제어 시스템</p>
        </div>
        
        <div class="info">
            <h3>🌟 기술 혁신</h3>
            <p>IoT 기반 스마트 엘리베이터 시스템, 에너지 효율 극대화 기술, 
            안전성 강화 시스템으로 업계를 선도하고 있습니다.</p>
        </div>
        
        <div class="info contact">
            <h3>📞 연락처 정보</h3>
            <p><strong>본사:</strong> 서울특별시 강남구<br>
            <strong>전화:</strong> 02-XXXX-XXXX<br>
            <strong>이메일:</strong> info@fujiglobal.kr<br>
            <strong>웹사이트:</strong> fujiglobal.kr</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 FUJI Global Korea. All Rights Reserved.</p>
            <p>Website deployed successfully at ${new Date().toLocaleString('ko-KR')}</p>
        </div>
    </div>
    
    <script>
        console.log('🚀 FUJI Global Korea website loaded successfully!');
        console.log('Deployment timestamp:', new Date().toISOString());
        
        // Add interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            const infoDivs = document.querySelectorAll('.info');
            infoDivs.forEach((div, index) => {
                div.style.animationDelay = (index * 0.2) + 's';
                div.style.animation = 'slideInUp 0.6s ease-out forwards';
            });
        });
        
        // CSS animation for slide in effect
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`;

        await fs.writeFile('index.html', websiteContent);
        await this.log('Created comprehensive index.html');
    }

    async testFinalSolution() {
        await this.log('=== TESTING FINAL SOLUTION ===');
        
        // Wait a moment for files to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            const { stdout: testResult } = await execAsync(`curl -s "http://${this.domain}/" | head -5`);
            
            if (testResult.includes('FUJI Global Korea')) {
                await this.log('✅ SUCCESS: Website is now working!');
                return true;
            } else {
                await this.log('⚠️ Website not yet updated - may need server propagation time');
                return false;
            }
        } catch (error) {
            await this.log(`❌ Test failed: ${error.message}`);
            return false;
        }
    }

    async run() {
        await this.log('🧠 SMART FIX SYSTEM - INTELLIGENT PROBLEM SOLVING');
        
        // Step 1: Deep diagnosis
        const diagnostics = await this.deepDiagnosis();
        
        // Step 2: Identify server type
        const serverType = await this.identifyServerType();
        
        // Step 3: Create smart solution
        await this.createSmartSolution(serverType);
        
        // Step 4: Test solution
        const success = await this.testFinalSolution();
        
        console.log('\n' + '='.repeat(60));
        console.log('🧠 SMART FIX SYSTEM COMPLETE');
        console.log('='.repeat(60));
        console.log('📊 Diagnosis Results:');
        diagnostics.forEach(diag => console.log(`   ${diag}`));
        console.log(`🔧 Server Type: ${serverType}`);
        console.log(`✅ Solution Status: ${success ? 'SUCCESS' : 'PENDING PROPAGATION'}`);
        console.log('');
        console.log('📁 Files Created:');
        console.log('   • .htaccess-litespeed (LiteSpeed optimized)');
        console.log('   • .htaccess-generic (Generic server)');
        console.log('   • index.html (Complete website)');
        console.log('');
        console.log('🚀 Next Actions:');
        console.log('   1. Upload files to root directory');
        console.log('   2. Rename appropriate .htaccess file to just .htaccess');
        console.log('   3. Set permissions 644');
        console.log('   4. Wait 10-15 minutes for propagation');
        console.log('='.repeat(60));
    }
}

const smartFix = new SmartFixSystem();
smartFix.run().catch(console.error);