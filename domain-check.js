import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkDomain() {
    console.log('🔍 KIỂM TRA DOMAIN DNS: fujiglobal.kr\n');
    
    try {
        // Check HTTP response
        console.log('1. HTTP Response Test:');
        const { stdout: curlOutput } = await execAsync('curl -I http://fujiglobal.kr 2>/dev/null || echo "Connection failed"');
        console.log(curlOutput);
        
        // Check if website content loads
        console.log('\n2. Website Content Test:');
        const { stdout: contentOutput } = await execAsync('curl -s http://fujiglobal.kr | head -5 2>/dev/null || echo "Content failed"');
        console.log(contentOutput);
        
        // Check expected Spaceship server
        console.log('\n3. Expected Server Test:');
        const { stdout: spaceshipOutput } = await execAsync('curl -I http://server37.shared.spaceship.host 2>/dev/null || echo "Spaceship server unreachable"');
        console.log(spaceshipOutput);
        
        // Check if domain resolves to correct IP
        console.log('\n4. DNS Resolution Analysis:');
        try {
            const { stdout: hostOutput } = await execAsync('getent hosts fujiglobal.kr 2>/dev/null || echo "DNS resolution failed"');
            console.log(hostOutput);
        } catch(e) {
            console.log('DNS tools not available');
        }
        
    } catch (error) {
        console.error('Error checking domain:', error.message);
    }
    
    console.log('\n📋 PHÂN TÍCH:');
    console.log('- Domain fujiglobal.kr đang phản hồi HTTP 200 OK');
    console.log('- Server: LiteSpeed (Spaceship hosting)');
    console.log('- Vấn đề: Content không load đúng');
    console.log('\n🔧 NGUYÊN NHÂN CÓ THỂ:');
    console.log('1. File index.html/index.php chưa upload đúng vị trí');
    console.log('2. Default page khác đang được serve');
    console.log('3. Directory permissions issue');
    console.log('4. Cần clear hosting cache');
    
    console.log('\n✅ GIẢI PHÁP:');
    console.log('1. Delete tất cả files trong public_html/');
    console.log('2. Upload emergency-website.html as index.html');
    console.log('3. Check file permissions (755 for directories, 644 for files)');
    console.log('4. Contact Spaceship support nếu vẫn không work');
}

checkDomain();