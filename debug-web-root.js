#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class WebRootDebugger {
    constructor() {
        this.domain = 'fujiglobal.kr';
    }

    async log(message) {
        console.log(`[DEBUG] ${message}`);
    }

    async testWebRoot() {
        await this.log('=== DEBUGGING WEB ROOT CONFIGURATION ===');
        
        // Test different possible web roots
        const testPaths = [
            '/',                    // Root directory
            '/public_html/',        // Standard cPanel structure  
            '/www/',               // Alternative web root
            '/htdocs/',            // Another common structure
            '/web/',               // Some hosts use this
            '/public/',            // Another variant
        ];

        const results = {};
        
        for (const path of testPaths) {
            try {
                await this.log(`Testing: ${path}`);
                const { stdout } = await execAsync(`curl -s "http://${this.domain}${path}" | head -5`);
                
                if (stdout.includes('Index of')) {
                    const directoryPath = stdout.match(/Index of ([^<]+)/);
                    results[path] = `DIRECTORY_LISTING: ${directoryPath ? directoryPath[1] : 'unknown'}`;
                    await this.log(`  → Directory listing found: ${path}`);
                } else if (stdout.includes('404')) {
                    results[path] = 'NOT_FOUND';
                    await this.log(`  → 404 Not Found: ${path}`);
                } else if (stdout.includes('403')) {
                    results[path] = 'FORBIDDEN';  
                    await this.log(`  → 403 Forbidden: ${path}`);
                } else if (stdout.trim().length > 0) {
                    results[path] = 'CONTENT_FOUND';
                    await this.log(`  → Some content found: ${path}`);
                } else {
                    results[path] = 'EMPTY_RESPONSE';
                    await this.log(`  → Empty response: ${path}`);
                }
            } catch (error) {
                results[path] = 'ERROR';
                await this.log(`  → Error testing ${path}: ${error.message}`);
            }
        }
        
        return results;
    }

    async analyzeDirectoryStructure() {
        await this.log('=== ANALYZING DIRECTORY STRUCTURE ===');
        
        try {
            // Get the actual directory listing content
            const { stdout } = await execAsync(`curl -s "http://${this.domain}/" | grep -A 20 "Index of"`);
            
            // Extract directory names from the listing
            const directories = [];
            const lines = stdout.split('\n');
            
            for (const line of lines) {
                if (line.includes('href="/') && line.includes('folder')) {
                    const match = line.match(/href="\/([^"]+)\/"/);
                    if (match) {
                        directories.push(match[1]);
                    }
                }
            }
            
            await this.log(`Found directories: ${directories.join(', ')}`);
            
            // Test each directory as potential web root
            for (const dir of directories) {
                await this.log(`Testing directory: /${dir}/`);
                try {
                    const { stdout: dirContent } = await execAsync(`curl -s "http://${this.domain}/${dir}/" | head -3`);
                    if (dirContent.includes('Index of')) {
                        await this.log(`  → ${dir} is accessible and shows directory listing`);
                    } else {
                        await this.log(`  → ${dir} has different content`);
                    }
                } catch (error) {
                    await this.log(`  → Error accessing ${dir}: ${error.message}`);
                }
            }
            
            return directories;
            
        } catch (error) {
            await this.log(`Error analyzing directory structure: ${error.message}`);
            return [];
        }
    }

    async testFileUploadPaths() {
        await this.log('=== TESTING FILE UPLOAD PATHS ===');
        
        // Common file upload paths to test
        const testFiles = [
            '/index.html',
            '/public_html/index.html', 
            '/www/index.html',
            '/htdocs/index.html',
            '/public/index.html'
        ];
        
        for (const filePath of testFiles) {
            try {
                const { stdout } = await execAsync(`curl -I "http://${this.domain}${filePath}" 2>/dev/null | head -1`);
                const status = stdout.includes('200') ? 'EXISTS' : 
                             stdout.includes('404') ? '404_NOT_FOUND' :
                             stdout.includes('403') ? '403_FORBIDDEN' : 'UNKNOWN';
                             
                await this.log(`${filePath}: ${status}`);
            } catch (error) {
                await this.log(`${filePath}: ERROR`);
            }
        }
    }

    async generateDiagnosis() {
        await this.log('=== GENERATING DIAGNOSIS ===');
        
        const webRootResults = await this.testWebRoot();
        const directories = await this.analyzeDirectoryStructure();
        await this.testFileUploadPaths();
        
        console.log('\n' + '='.repeat(60));
        console.log('WEB ROOT DIAGNOSIS REPORT');
        console.log('='.repeat(60));
        
        console.log('\n1. WEB ROOT TEST RESULTS:');
        for (const [path, result] of Object.entries(webRootResults)) {
            console.log(`   ${path}: ${result}`);
        }
        
        console.log('\n2. DISCOVERED DIRECTORIES:');
        console.log(`   ${directories.join(', ')}`);
        
        console.log('\n3. LIKELY ISSUE:');
        if (webRootResults['/'] === 'DIRECTORY_LISTING: /' && webRootResults['/public_html/'] !== 'NOT_FOUND') {
            console.log('   → Server web root is "/" (document root), NOT "/public_html/"');
            console.log('   → Files should be uploaded to root directory, not public_html');
            console.log('   → public_html is just a subdirectory, not the web root');
        } else {
            console.log('   → Need manual investigation of hosting configuration');
        }
        
        console.log('\n4. SOLUTION:');
        console.log('   → Upload index.html to ROOT directory "/" instead of "/public_html/"');
        console.log('   → Or check hosting control panel for correct web root path');
        
        console.log('='.repeat(60));
    }

    async run() {
        await this.log('Starting comprehensive web root debugging...');
        await this.generateDiagnosis();
    }
}

const webRootDebugger = new WebRootDebugger();
webRootDebugger.run().catch(console.error);