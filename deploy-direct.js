const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function deployToSpaceship() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
        console.log('Connecting to Spaceship hosting...');
        await client.access({
            host: process.env.SPACESHIP_HOST || 'server37.shared.spaceship.host',
            user: process.env.SPACESHIP_USERNAME,
            password: process.env.SPACESHIP_PASSWORD,
            secure: true
        });
        
        console.log('Connected! Uploading files...');
        
        // Upload index.php
        const indexContent = fs.readFileSync('./public_html/index.php', 'utf8');
        await client.uploadFrom('./public_html/index.php', '/index.php');
        console.log('✅ Uploaded index.php');
        
        // Upload .htaccess
        await client.uploadFrom('./public_html/.htaccess', '/.htaccess');
        console.log('✅ Uploaded .htaccess');
        
        console.log('🚀 Deployment completed successfully!');
        console.log('🌐 Website should be live at: fujiglobal.kr');
        
    } catch (err) {
        console.error('❌ Deployment failed:', err.message);
        console.log('Fallback: Manual upload required');
    }
    
    client.close();
}

// Run if environment variables are set
if (process.env.SPACESHIP_USERNAME && process.env.SPACESHIP_PASSWORD) {
    deployToSpaceship();
} else {
    console.log('⚠️ FTP credentials not available');
    console.log('Files ready for manual upload:');
    console.log('- public_html/index.php → Upload as index.php');
    console.log('- public_html/.htaccess → Upload as .htaccess');
}