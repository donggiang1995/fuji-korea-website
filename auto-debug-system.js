#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

class AutoDebugSystem {
    constructor() {
        this.domain = 'fujiglobal.kr';
        this.expectedIP = '66.29.148.111';
        this.results = {
            dns: null,
            http: null,
            content: null,
            files: null,
            solution: null
        };
    }

    async log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${message}`);
    }

    async executeCommand(command, description) {
        try {
            await this.log(`Executing: ${description}`);
            const { stdout, stderr } = await execAsync(command);
            return { success: true, output: stdout.trim(), error: stderr };
        } catch (error) {
            return { success: false, output: '', error: error.message };
        }
    }

    async checkDNS() {
        await this.log('=== CHECKING DNS RESOLUTION ===');
        
        // Check if domain resolves
        const dnsCheck = await this.executeCommand(
            `getent hosts ${this.domain} 2>/dev/null || echo "DNS_FAILED"`,
            'DNS Resolution'
        );
        
        if (dnsCheck.output.includes('DNS_FAILED')) {
            this.results.dns = { status: 'FAILED', message: 'Domain does not resolve' };
            return false;
        }
        
        const ip = dnsCheck.output.split(/\s+/)[0];
        if (ip === this.expectedIP) {
            this.results.dns = { status: 'SUCCESS', ip, message: 'DNS pointing correctly' };
            return true;
        } else {
            this.results.dns = { status: 'WARNING', ip, expectedIP: this.expectedIP, message: 'DNS pointing to different IP' };
            return true; // Still proceed
        }
    }

    async checkHTTP() {
        await this.log('=== CHECKING HTTP RESPONSE ===');
        
        const httpCheck = await this.executeCommand(
            `curl -I http://${this.domain} 2>/dev/null || echo "HTTP_FAILED"`,
            'HTTP Headers'
        );
        
        if (httpCheck.output.includes('HTTP_FAILED')) {
            this.results.http = { status: 'FAILED', message: 'No HTTP response' };
            return false;
        }
        
        const isSuccess = httpCheck.output.includes('200 OK');
        const server = httpCheck.output.match(/server: (.+)/i)?.[1] || 'Unknown';
        
        this.results.http = {
            status: isSuccess ? 'SUCCESS' : 'WARNING',
            server,
            headers: httpCheck.output,
            message: `HTTP ${isSuccess ? 'responding' : 'has issues'}, Server: ${server}`
        };
        
        return isSuccess;
    }

    async checkContent() {
        await this.log('=== CHECKING WEBSITE CONTENT ===');
        
        const contentCheck = await this.executeCommand(
            `curl -s http://${this.domain} 2>/dev/null | head -10`,
            'Website Content'
        );
        
        const content = contentCheck.output;
        const isNodeJS = content.includes('NodeJS') || content.includes('It works!');
        const isFuji = content.includes('FUJI') || content.includes('fuji');
        
        if (isNodeJS) {
            this.results.content = {
                status: 'NODEJS_OVERRIDE',
                content: content,
                message: 'Node.js default page is overriding website files'
            };
            return false;
        } else if (isFuji) {
            this.results.content = {
                status: 'SUCCESS',
                content: content,
                message: 'FUJI website is loading correctly'
            };
            return true;
        } else {
            this.results.content = {
                status: 'UNKNOWN',
                content: content,
                message: 'Website showing unexpected content'
            };
            return false;
        }
    }

    async analyzeFiles() {
        await this.log('=== ANALYZING PROJECT FILES ===');
        
        try {
            // Check if emergency website exists
            const emergencyExists = await fs.access('emergency-website.html').then(() => true).catch(() => false);
            
            // Check build files
            const distExists = await fs.access('dist').then(() => true).catch(() => false);
            const distIndex = distExists ? await fs.access('dist/index.js').then(() => true).catch(() => false) : false;
            
            // Check static website
            const staticExists = await fs.access('static-website-ready.html').then(() => true).catch(() => false);
            
            this.results.files = {
                emergency: emergencyExists,
                dist: distExists,
                distIndex: distIndex,
                static: staticExists,
                recommendation: emergencyExists ? 'emergency-website.html' : (staticExists ? 'static-website-ready.html' : 'need_to_create')
            };
            
            await this.log(`Files available: Emergency=${emergencyExists}, Dist=${distExists}, Static=${staticExists}`);
            return true;
            
        } catch (error) {
            this.results.files = { error: error.message };
            return false;
        }
    }

    async generateSolution() {
        await this.log('=== GENERATING SOLUTION ===');
        
        let solution = {
            steps: [],
            files: [],
            priority: 'HIGH'
        };
        
        // Analyze results and create action plan
        if (this.results.content?.status === 'NODEJS_OVERRIDE') {
            solution.steps.push('1. DISABLE Node.js app in Spaceship cPanel');
            solution.steps.push('2. Delete all files in public_html directory');
            solution.steps.push('3. Upload new website files');
            solution.steps.push('4. Set correct file permissions (644 for files, 755 for directories)');
            solution.priority = 'CRITICAL';
        }
        
        if (this.results.dns?.status === 'FAILED') {
            solution.steps.unshift('0. Fix DNS configuration in GoDaddy');
            solution.priority = 'CRITICAL';
        }
        
        if (this.results.http?.status === 'FAILED') {
            solution.steps.unshift('0. Check hosting account status');
            solution.priority = 'CRITICAL';
        }
        
        // Determine best file to upload
        if (this.results.files?.emergency) {
            solution.files.push('emergency-website.html → index.html');
        } else if (this.results.files?.static) {
            solution.files.push('static-website-ready.html → index.html');
        } else {
            solution.files.push('CREATE: Simple FUJI website → index.html');
        }
        
        this.results.solution = solution;
        return solution;
    }

    async createCleanupScript() {
        await this.log('=== CREATING CLEANUP SCRIPT ===');
        
        const cleanupScript = `#!/bin/bash
# Auto-generated cleanup script for fujiglobal.kr

echo "🧹 FUJI Global Korea - Cleanup Script"
echo "=================================="

# Files to delete from hosting
CLEANUP_FILES=(
    "index.html"
    "index.php" 
    "default.html"
    "default.php"
    "home.html"
    "welcome.html"
    "test.html"
    "info.php"
    "phpinfo.php"
)

echo "Files to delete:"
for file in "\${CLEANUP_FILES[@]}"; do
    echo "- \$file"
done

echo ""
echo "HOSTING STEPS:"
echo "1. Open Spaceship cPanel"
echo "2. Go to File Manager → public_html"
echo "3. Delete these files manually"
echo "4. Upload new index.html"
echo "5. Set permissions: 644"

echo ""
echo "NODE.JS APP DISABLE:"
echo "1. cPanel → Node.js Apps"
echo "2. Stop or Delete existing app"
echo "3. Clear hosting cache"

echo ""
echo "VERIFICATION:"
echo "curl -s http://fujiglobal.kr | head -5"
`;
        
        await fs.writeFile('cleanup-hosting.sh', cleanupScript);
        await this.executeCommand('chmod +x cleanup-hosting.sh', 'Make cleanup script executable');
        
        return 'cleanup-hosting.sh';
    }

    async createSimpleWebsite() {
        await this.log('=== CREATING SIMPLE WEBSITE ===');
        
        const simpleWebsite = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - 엘리베이터 기술</title>
    <meta name="description" content="FUJI Global Korea - 엘리베이터 기술 및 서비스 전문업체">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .header {
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        }
        .logo {
            font-size: 3rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .tagline {
            font-size: 1.2rem;
            color: #7f8c8d;
            margin-bottom: 20px;
        }
        .content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        }
        .card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.4rem;
        }
        .card p {
            color: #555;
            line-height: 1.6;
        }
        .contact {
            background: rgba(46, 204, 113, 0.9);
            color: white;
        }
        .contact h3 { color: white; }
        .footer {
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 15px;
            color: white;
        }
        .status {
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
        }
        @media (max-width: 768px) {
            .logo { font-size: 2rem; }
            .header, .card { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">
            ✅ Website Successfully Deployed - ${new Date().toLocaleString('ko-KR')}
        </div>
        
        <div class="header">
            <div class="logo">FUJI Global Korea</div>
            <div class="tagline">엘리베이터 기술의 선두주자</div>
            <p>혁신적인 엘리베이터 솔루션으로 더 안전하고 효율적인 수직 이동을 제공합니다</p>
        </div>

        <div class="content">
            <div class="card">
                <h3>🏢 회사 소개</h3>
                <p>FUJI Global Korea는 엘리베이터 기술 분야의 글로벌 리더로서, 최첨단 제어 시스템과 견인 기계를 개발하고 제조합니다. 우리는 안전성, 효율성, 그리고 혁신을 바탕으로 고객에게 최상의 솔루션을 제공합니다.</p>
            </div>

            <div class="card">
                <h3>⚙️ 주요 제품</h3>
                <p><strong>FCA-9000 시리즈:</strong> 차세대 엘리베이터 제어 시스템<br>
                <strong>TM-800S:</strong> 고효율 견인 기계<br>
                <strong>SCP-2024:</strong> 스마트 제어 패널<br>
                모든 제품은 국제 안전 기준을 준수하며 최고 품질을 보장합니다.</p>
            </div>

            <div class="card">
                <h3>🔧 기술 서비스</h3>
                <p>24시간 기술 지원, 정기 점검 서비스, 부품 공급, 시스템 업그레이드 등 포괄적인 애프터서비스를 제공합니다. 숙련된 기술진이 신속하고 정확한 서비스로 고객 만족을 실현합니다.</p>
            </div>

            <div class="card contact">
                <h3>📞 연락처</h3>
                <p><strong>본사:</strong> 서울특별시 강남구<br>
                <strong>전화:</strong> 02-XXXX-XXXX<br>
                <strong>이메일:</strong> info@fujiglobal.kr<br>
                <strong>웹사이트:</strong> www.fujiglobal.kr<br>
                <strong>운영시간:</strong> 평일 09:00-18:00</p>
            </div>
        </div>

        <div class="footer">
            <p>&copy; 2025 FUJI Global Korea. All Rights Reserved.</p>
            <p>엘리베이터 기술의 미래를 함께 만들어갑니다</p>
        </div>
    </div>

    <script>
        // Simple animation
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
    </script>
</body>
</html>`;
        
        await fs.writeFile('simple-fuji-website.html', simpleWebsite);
        return 'simple-fuji-website.html';
    }

    async printReport() {
        console.log('\n' + '='.repeat(60));
        console.log('🔍 FUJI GLOBAL KOREA - SYSTEM DIAGNOSTIC REPORT');
        console.log('='.repeat(60));
        
        console.log('\n📋 DNS STATUS:');
        console.log(`   Status: ${this.results.dns?.status || 'NOT_CHECKED'}`);
        console.log(`   Message: ${this.results.dns?.message || 'N/A'}`);
        if (this.results.dns?.ip) {
            console.log(`   IP: ${this.results.dns.ip}`);
        }
        
        console.log('\n🌐 HTTP STATUS:');
        console.log(`   Status: ${this.results.http?.status || 'NOT_CHECKED'}`);
        console.log(`   Message: ${this.results.http?.message || 'N/A'}`);
        
        console.log('\n📄 CONTENT STATUS:');
        console.log(`   Status: ${this.results.content?.status || 'NOT_CHECKED'}`);
        console.log(`   Message: ${this.results.content?.message || 'N/A'}`);
        
        console.log('\n📁 FILES STATUS:');
        if (this.results.files) {
            console.log(`   Emergency Website: ${this.results.files.emergency ? '✅' : '❌'}`);
            console.log(`   Dist Build: ${this.results.files.dist ? '✅' : '❌'}`);
            console.log(`   Static Website: ${this.results.files.static ? '✅' : '❌'}`);
        }
        
        console.log('\n🔧 SOLUTION:');
        if (this.results.solution) {
            console.log(`   Priority: ${this.results.solution.priority}`);
            console.log('   Steps:');
            this.results.solution.steps.forEach(step => {
                console.log(`     ${step}`);
            });
            console.log('   Files to upload:');
            this.results.solution.files.forEach(file => {
                console.log(`     ${file}`);
            });
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('Generated files:');
        console.log('- cleanup-hosting.sh (hosting cleanup script)');
        console.log('- simple-fuji-website.html (ready to upload)');
        console.log('='.repeat(60));
    }

    async run() {
        await this.log('🚀 Starting FUJI Global Korea Auto Debug System');
        
        try {
            await this.checkDNS();
            await this.checkHTTP();
            await this.checkContent();
            await this.analyzeFiles();
            await this.generateSolution();
            await this.createCleanupScript();
            await this.createSimpleWebsite();
            
            await this.printReport();
            
            await this.log('✅ Auto Debug System completed successfully');
            
        } catch (error) {
            await this.log(`❌ Error in debug system: ${error.message}`, 'ERROR');
            throw error;
        }
    }
}

// Run the system
const debugSystem = new AutoDebugSystem();
debugSystem.run().catch(console.error);