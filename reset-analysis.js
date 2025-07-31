#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class ResetAnalysis {
    constructor() {
        this.domain = 'fujiglobal.kr';
        this.expectedIP = '66.29.148.111';
    }

    async log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`[${timestamp}] ${prefix} ${message}`);
    }

    async step1_DNSCheck() {
        await this.log('STEP 1: DNS Resolution Check', 'info');
        
        try {
            const { stdout } = await execAsync(`nslookup ${this.domain}`);
            if (stdout.includes(this.expectedIP)) {
                await this.log(`DNS resolves to correct IP: ${this.expectedIP}`, 'success');
                return true;
            } else {
                await this.log('DNS resolution issue detected', 'error');
                console.log(stdout);
                return false;
            }
        } catch (error) {
            await this.log(`DNS lookup failed: ${error.message}`, 'error');
            return false;
        }
    }

    async step2_ServerResponse() {
        await this.log('STEP 2: Server Response Analysis', 'info');
        
        try {
            // Get headers
            const { stdout: headers } = await execAsync(`curl -I "${this.domain}" 2>/dev/null`);
            console.log('Headers:', headers);
            
            // Get content
            const { stdout: content } = await execAsync(`curl -s "${this.domain}" | head -10`);
            console.log('Content preview:', content);
            
            if (headers.includes('200 OK')) {
                await this.log('Server responding with 200 OK', 'success');
            } else {
                await this.log('Server not returning 200 OK', 'error');
            }
            
            if (content.includes('Index of')) {
                await this.log('Server showing directory listing - DirectoryIndex problem', 'warning');
                return 'DIRECTORY_LISTING';
            } else if (content.includes('FUJI')) {
                await this.log('Website content found!', 'success');
                return 'WORKING';
            } else if (content.includes('404')) {
                await this.log('404 error - file not found', 'error');
                return 'FILE_NOT_FOUND';
            } else {
                await this.log('Unknown response type', 'warning');
                return 'UNKNOWN';
            }
        } catch (error) {
            await this.log(`Server check failed: ${error.message}`, 'error');
            return 'CONNECTION_ERROR';
        }
    }

    async step3_FileLocationTest() {
        await this.log('STEP 3: File Location Testing', 'info');
        
        const testPaths = [
            '/index.html',
            '/public_html/index.html',
            '/www/index.html',
            '/htdocs/index.html'
        ];
        
        for (const path of testPaths) {
            try {
                const { stdout } = await execAsync(`curl -s "${this.domain}${path}" | head -3`);
                
                if (stdout.includes('FUJI') || stdout.includes('<!DOCTYPE html>')) {
                    await this.log(`File found at: ${path}`, 'success');
                    return path;
                } else if (stdout.includes('404')) {
                    await this.log(`File not found at: ${path}`, 'error');
                } else {
                    await this.log(`Unknown response at: ${path}`, 'warning');
                }
            } catch (error) {
                await this.log(`Error testing ${path}: ${error.message}`, 'error');
            }
        }
        
        return null;
    }

    async step4_ServerConfigCheck() {
        await this.log('STEP 4: Server Configuration Check', 'info');
        
        try {
            // Check server type from headers
            const { stdout: headers } = await execAsync(`curl -I "${this.domain}" 2>/dev/null`);
            
            if (headers.includes('LiteSpeed')) {
                await this.log('LiteSpeed server detected', 'info');
                return 'LITESPEED';
            } else if (headers.includes('Apache')) {
                await this.log('Apache server detected', 'info');
                return 'APACHE';
            } else if (headers.includes('nginx')) {
                await this.log('Nginx server detected', 'info');
                return 'NGINX';
            } else {
                await this.log('Unknown server type', 'warning');
                return 'UNKNOWN';
            }
        } catch (error) {
            await this.log(`Server config check failed: ${error.message}`, 'error');
            return 'ERROR';
        }
    }

    async step5_DocumentRootAnalysis() {
        await this.log('STEP 5: Document Root Analysis', 'info');
        
        try {
            // Try to access .well-known/test (common path)
            const { stdout: wellKnown } = await execAsync(`curl -s "${this.domain}/.well-known/" 2>/dev/null || echo "not_found"`);
            
            // Try to access common admin paths
            const { stdout: admin } = await execAsync(`curl -s "${this.domain}/admin/" 2>/dev/null || echo "not_found"`);
            
            // Check if cPanel default page exists
            const { stdout: cpanel } = await execAsync(`curl -s "${this.domain}/cpanel/" 2>/dev/null || echo "not_found"`);
            
            if (!wellKnown.includes('not_found')) {
                await this.log('.well-known directory accessible', 'info');
            }
            
            if (!admin.includes('not_found')) {
                await this.log('Admin directory found', 'info');
            }
            
            if (!cpanel.includes('not_found')) {
                await this.log('cPanel interface accessible', 'info');
            }
            
        } catch (error) {
            await this.log(`Document root analysis failed: ${error.message}`, 'error');
        }
    }

    async step6_ComprehensiveDiagnosis() {
        await this.log('STEP 6: Comprehensive Problem Diagnosis', 'info');
        
        // Run all checks
        const dnsOK = await this.step1_DNSCheck();
        const serverStatus = await this.step2_ServerResponse();
        const fileLocation = await this.step3_FileLocationTest();
        const serverType = await this.step4_ServerConfigCheck();
        await this.step5_DocumentRootAnalysis();
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 COMPREHENSIVE DIAGNOSIS RESULTS');
        console.log('='.repeat(60));
        console.log(`🌐 DNS Resolution: ${dnsOK ? 'OK' : 'FAILED'}`);
        console.log(`🖥️ Server Type: ${serverType}`);
        console.log(`📄 Server Response: ${serverStatus}`);
        console.log(`📁 File Location: ${fileLocation || 'NOT FOUND'}`);
        console.log('='.repeat(60));
        
        // Determine root cause
        if (!dnsOK) {
            await this.log('ROOT CAUSE: DNS resolution problem', 'error');
            return 'DNS_ISSUE';
        } else if (serverStatus === 'DIRECTORY_LISTING') {
            await this.log('ROOT CAUSE: DirectoryIndex not configured properly', 'error');
            return 'DIRECTORYINDEX_ISSUE';
        } else if (serverStatus === 'FILE_NOT_FOUND') {
            await this.log('ROOT CAUSE: Files not in correct location', 'error');
            return 'FILE_LOCATION_ISSUE';
        } else if (fileLocation) {
            await this.log(`ROOT CAUSE: Files exist but not being served from root`, 'warning');
            return 'DOCUMENT_ROOT_ISSUE';
        } else {
            await this.log('ROOT CAUSE: Unknown - needs manual investigation', 'error');
            return 'UNKNOWN_ISSUE';
        }
    }

    async generateSolution(rootCause) {
        await this.log('STEP 7: Generating Targeted Solution', 'info');
        
        console.log('\n' + '🔧 SOLUTION STRATEGY:');
        
        switch (rootCause) {
            case 'DNS_ISSUE':
                console.log('- Contact GoDaddy to fix DNS configuration');
                console.log('- Verify A record points to 66.29.148.111');
                break;
                
            case 'DIRECTORYINDEX_ISSUE':
                console.log('- Create proper .htaccess with DirectoryIndex');
                console.log('- Use server-specific configuration');
                break;
                
            case 'FILE_LOCATION_ISSUE':
                console.log('- Upload files to correct document root');
                console.log('- Check Spaceship hosting file structure');
                break;
                
            case 'DOCUMENT_ROOT_ISSUE':
                console.log('- Files exist but in wrong directory');
                console.log('- Move files to proper document root');
                break;
                
            default:
                console.log('- Manual server investigation required');
                console.log('- Contact Spaceship hosting support');
        }
    }

    async run() {
        await this.log('🔄 RESET ANALYSIS - STARTING FROM SCRATCH', 'info');
        console.log('Comprehensive system analysis to identify root cause...\n');
        
        const rootCause = await this.step6_ComprehensiveDiagnosis();
        await this.generateSolution(rootCause);
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ RESET ANALYSIS COMPLETE');
        console.log('Next: Implement targeted solution based on root cause');
        console.log('='.repeat(60));
        
        return rootCause;
    }
}

const resetAnalysis = new ResetAnalysis();
resetAnalysis.run().catch(console.error);