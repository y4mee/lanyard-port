/**
 * Discord Avatar Decoration CDN Debug Tool - ES Module Version
 * 
 * Save this file as: discord-decoration-debug.js
 * Run with: node discord-decoration-debug.js
 * 
 * Uses ES modules (import/export) - compatible with "type": "module" in package.json
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import { URL } from 'url';

// Configuration
const CONFIG = {
    decorationAsset: "a_fdfc12b31565ba9f4b54926a01a188d9",
    skuId: "1385015130466680995",
    testTimeout: 5000,
    delayBetweenRequests: 200,
    verbose: true,
    outputFile: 'discord-decoration-debug-results.json'
};

// Test endpoints
const ENDPOINT_PATTERNS = [
    {
        name: "Avatar Decoration Presets (GIF)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{asset}.gif`,
        priority: "HIGH"
    },
    {
        name: "Avatar Decoration Presets (PNG)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{asset}.png`,
        priority: "HIGH"
    },
    {
        name: "Avatar Decoration Presets (WebP)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{asset}.webp`,
        priority: "HIGH"
    },
    {
        name: "Media CDN (GIF)",
        url: `https://media.discordapp.net/avatar-decoration-presets/{asset}.gif`,
        priority: "HIGH"
    },
    {
        name: "Media CDN (PNG)",
        url: `https://media.discordapp.net/avatar-decoration-presets/{asset}.png`,
        priority: "HIGH"
    },
    {
        name: "Avatar Decoration with SKU (GIF)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{sku}/{asset}.gif`,
        priority: "MEDIUM"
    },
    {
        name: "Avatar Decoration with SKU (PNG)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{sku}/{asset}.png`,
        priority: "MEDIUM"
    },
    {
        name: "App Assets (GIF)",
        url: `https://cdn.discordapp.com/app-assets/{sku}/{asset}.gif`,
        priority: "MEDIUM"
    },
    {
        name: "App Assets (PNG)",
        url: `https://cdn.discordapp.com/app-assets/{sku}/{asset}.png`,
        priority: "MEDIUM"
    },
    {
        name: "Store Assets (GIF)",
        url: `https://cdn.discordapp.com/store-assets/{sku}/{asset}.gif`,
        priority: "MEDIUM"
    },
    {
        name: "Store Assets (PNG)",
        url: `https://cdn.discordapp.com/store-assets/{sku}/{asset}.png`,
        priority: "MEDIUM"
    },
    {
        name: "Avatar Decorations (GIF)",
        url: `https://cdn.discordapp.com/avatar-decorations/{asset}.gif`,
        priority: "LOW"
    },
    {
        name: "Decoration with Size 256 (GIF)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{asset}.gif?size=256`,
        priority: "MEDIUM"
    },
    {
        name: "Decoration with Size 128 (PNG)",
        url: `https://cdn.discordapp.com/avatar-decoration-presets/{asset}.png?size=128`,
        priority: "MEDIUM"
    },
    {
        name: "Media CDN with Size (GIF)",
        url: `https://media.discordapp.net/avatar-decoration-presets/{asset}.gif?width=256&height=256`,
        priority: "MEDIUM"
    },
    {
        name: "Attachments Endpoint (GIF)",
        url: `https://cdn.discordapp.com/attachments/avatar-decorations/{asset}.gif`,
        priority: "LOW"
    },
    {
        name: "User Assets (GIF)",
        url: `https://cdn.discordapp.com/user-assets/{asset}.gif`,
        priority: "LOW"
    },
    {
        name: "Profile Assets (GIF)",
        url: `https://cdn.discordapp.com/profile-assets/{asset}.gif`,
        priority: "LOW"
    }
];

class DiscordDecorationDebugger {
    constructor(config = CONFIG) {
        this.config = config;
        this.results = [];
        this.startTime = Date.now();
    }

    // Prepare URLs by replacing placeholders
    prepareUrls() {
        const urls = [];
        const assetClean = this.config.decorationAsset.replace(/^a_/, '');
        
        ENDPOINT_PATTERNS.forEach(pattern => {
            let testUrl = pattern.url
                .replace('{asset}', this.config.decorationAsset)
                .replace('{sku}', this.config.skuId)
                .replace('{asset_clean}', assetClean);
                
            urls.push({
                ...pattern,
                url: testUrl,
                originalPattern: pattern.url
            });
        });
        
        return urls;
    }

    // Make HTTP request using Node.js built-in modules
    makeRequest(testUrl, options = {}) {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(testUrl);
            const isHttps = parsedUrl.protocol === 'https:';
            const client = isHttps ? https : http;
            
            const requestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (isHttps ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: options.method || 'HEAD',
                headers: {
                    'User-Agent': 'Discord-Avatar-Decoration-Debugger/1.0',
                    'Accept': 'image/gif, image/png, image/webp, image/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    ...options.headers
                },
                timeout: this.config.testTimeout
            };

            const req = client.request(requestOptions, (res) => {
                let data = Buffer.alloc(0);
                
                res.on('data', (chunk) => {
                    data = Buffer.concat([data, chunk]);
                });
                
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        statusMessage: res.statusMessage,
                        headers: res.headers,
                        data: data
                    });
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        });
    }

    // Test a single URL
    async testUrl(testCase, index, total) {
        const { url: testUrl, name, priority } = testCase;
        
        console.log(`\n🧪 Test ${index + 1}/${total}: ${name}`);
        console.log(`📍 URL: ${testUrl}`);
        console.log(`🎯 Priority: ${priority}`);
        
        const result = {
            name,
            url: testUrl,
            priority,
            status: 'UNKNOWN',
            httpStatus: null,
            statusMessage: null,
            contentType: null,
            contentLength: null,
            server: null,
            responseTime: 0,
            error: null,
            verified: null,
            timestamp: new Date().toISOString()
        };
        
        const startTime = Date.now();
        
        try {
            // First try HEAD request
            const response = await this.makeRequest(testUrl, { method: 'HEAD' });
            
            result.responseTime = Date.now() - startTime;
            result.httpStatus = response.statusCode;
            result.statusMessage = response.statusMessage;
            result.contentType = response.headers['content-type'] || 'Unknown';
            result.contentLength = response.headers['content-length'];
            result.server = response.headers['server'];
            
            if (response.statusCode >= 200 && response.statusCode < 300) {
                result.status = 'SUCCESS';
                console.log(`✅ SUCCESS (${response.statusCode})`);
                console.log(`📄 Content-Type: ${result.contentType}`);
                if (result.contentLength) {
                    console.log(`📏 Content-Length: ${result.contentLength} bytes`);
                }
                if (result.server) {
                    console.log(`🖥️  Server: ${result.server}`);
                }
                console.log(`⏱️  Response Time: ${result.responseTime}ms`);
                
                // Try to verify it's actually an image by getting first few bytes
                if (result.contentType.includes('image') || result.contentLength > 0) {
                    await this.verifyImage(testUrl, result);
                }
                
            } else if (response.statusCode === 404) {
                result.status = 'NOT_FOUND';
                console.log(`❌ NOT FOUND (404)`);
            } else if (response.statusCode === 403) {
                result.status = 'FORBIDDEN';
                console.log(`🚫 FORBIDDEN (403) - May require authentication`);
            } else if (response.statusCode === 405) {
                result.status = 'METHOD_NOT_ALLOWED';
                console.log(`⚠️  METHOD NOT ALLOWED (405) - HEAD request not supported`);
                // Try GET request instead
                await this.retryWithGet(testUrl, result);
            } else {
                result.status = 'HTTP_ERROR';
                console.log(`⚠️  HTTP ERROR (${response.statusCode} ${response.statusMessage})`);
            }
            
            if (this.config.verbose) {
                console.log(`📋 Key Response Headers:`);
                const importantHeaders = ['content-type', 'content-length', 'server', 'cache-control', 'etag', 'last-modified'];
                importantHeaders.forEach(header => {
                    if (response.headers[header]) {
                        console.log(`   ${header}: ${response.headers[header]}`);
                    }
                });
            }
            
        } catch (error) {
            result.responseTime = Date.now() - startTime;
            result.error = error.message;
            
            if (error.message.includes('timeout')) {
                result.status = 'TIMEOUT';
                console.log(`⏰ TIMEOUT (${this.config.testTimeout}ms)`);
            } else if (error.code === 'ENOTFOUND') {
                result.status = 'DNS_ERROR';
                console.log(`🌐 DNS ERROR: Host not found`);
            } else if (error.code === 'ECONNREFUSED') {
                result.status = 'CONNECTION_REFUSED';
                console.log(`🚫 CONNECTION REFUSED`);
            } else {
                result.status = 'NETWORK_ERROR';
                console.log(`❌ NETWORK ERROR: ${error.message}`);
            }
        }
        
        this.results.push(result);
        return result;
    }

    // Retry with GET request if HEAD fails
    async retryWithGet(testUrl, result) {
        try {
            console.log(`🔄 Retrying with GET request...`);
            const response = await this.makeRequest(testUrl, { 
                method: 'GET',
                headers: { 'Range': 'bytes=0-1023' } // Only get first 1KB
            });
            
            if (response.statusCode >= 200 && response.statusCode < 300) {
                result.status = 'SUCCESS';
                result.httpStatus = response.statusCode;
                result.contentType = response.headers['content-type'] || 'Unknown';
                result.contentLength = response.headers['content-length'];
                console.log(`✅ SUCCESS with GET (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ GET request also failed: ${error.message}`);
        }
    }

    // Verify image by getting first few bytes
    async verifyImage(testUrl, result) {
        try {
            const response = await this.makeRequest(testUrl, { 
                method: 'GET',
                headers: { 'Range': 'bytes=0-1023' } // Only get first 1KB
            });
            
            if (response.statusCode >= 200 && response.statusCode < 300) {
                if (this.isValidImageFormat(response.data)) {
                    result.verified = true;
                    const format = this.getImageFormat(response.data);
                    console.log(`✅ Image format verified: ${format}`);
                } else {
                    result.verified = false;
                    console.log(`⚠️  Response is not a valid image format`);
                }
            }
        } catch (error) {
            console.log(`⚠️  Could not verify image format: ${error.message}`);
            result.verified = null;
        }
    }

    // Check image format signatures and return format name
    getImageFormat(buffer) {
        if (buffer.length < 4) return 'Unknown';
        
        if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
            return 'GIF';
        }
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            return 'PNG';
        }
        if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
            return 'JPEG';
        }
        if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
            return 'WebP';
        }
        
        return 'Unknown';
    }

    // Check if the data starts with valid image format signatures
    isValidImageFormat(buffer) {
        return this.getImageFormat(buffer) !== 'Unknown';
    }

    // Add delay between requests
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Main testing function
    async run() {
        console.log(`🚀 Discord Avatar Decoration CDN Debug Tool (ES Module)`);
        console.log(`=====================================================`);
        console.log(`Asset ID: ${this.config.decorationAsset}`);
        console.log(`SKU ID: ${this.config.skuId}`);
        console.log(`Note: Asset starts with 'a_' indicating it's animated`);
        console.log(`Test Timeout: ${this.config.testTimeout}ms`);
        console.log(`Start Time: ${new Date().toLocaleString()}`);
        
        const testCases = this.prepareUrls();
        console.log(`\n📊 Testing ${testCases.length} different endpoint patterns...`);
        
        // Sort by priority
        const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        testCases.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        
        for (let i = 0; i < testCases.length; i++) {
            await this.testUrl(testCases[i], i, testCases.length);
            
            if (i < testCases.length - 1) {
                await this.delay(this.config.delayBetweenRequests);
            }
        }
        
        this.generateSummary();
        this.exportResults();
        
        return this.results;
    }

    // Generate comprehensive summary
    generateSummary() {
        const totalTime = Date.now() - this.startTime;
        
        console.log(`\n\n📋 COMPREHENSIVE TEST SUMMARY`);
        console.log(`===============================`);
        console.log(`Total Tests: ${this.results.length}`);
        console.log(`Total Time: ${totalTime}ms`);
        console.log(`Average Response Time: ${Math.round(this.results.reduce((acc, r) => acc + r.responseTime, 0) / this.results.length)}ms`);
        
        const statusCounts = {};
        this.results.forEach(result => {
            statusCounts[result.status] = (statusCounts[result.status] || 0) + 1;
        });
        
        console.log(`\n📊 Results by Status:`);
        Object.entries(statusCounts).forEach(([status, count]) => {
            const emoji = {
                'SUCCESS': '✅',
                'NOT_FOUND': '❌',
                'HTTP_ERROR': '⚠️',
                'FORBIDDEN': '🚫',
                'TIMEOUT': '⏰',
                'NETWORK_ERROR': '🔌',
                'DNS_ERROR': '🌐',
                'CONNECTION_REFUSED': '🚫',
                'METHOD_NOT_ALLOWED': '⚠️'
            }[status] || '❓';
            console.log(`   ${emoji} ${status}: ${count}`);
        });
        
        const successful = this.results.filter(r => r.status === 'SUCCESS');
        const forbidden = this.results.filter(r => r.status === 'FORBIDDEN');
        const notFound = this.results.filter(r => r.status === 'NOT_FOUND');
        
        console.log(`\n🎉 WORKING ENDPOINTS (${successful.length}):`);
        if (successful.length > 0) {
            successful.forEach((result, index) => {
                console.log(`\n${index + 1}. ✅ ${result.name}`);
                console.log(`   🔗 URL: ${result.url}`);
                console.log(`   📄 Content-Type: ${result.contentType}`);
                console.log(`   📏 Size: ${result.contentLength || 'Unknown'} bytes`);
                console.log(`   ⏱️  Response Time: ${result.responseTime}ms`);
                if (result.verified === true) {
                    const format = this.getImageFormat(Buffer.alloc(0)); // This is just for display
                    console.log(`   ✅ Image format verified`);
                }
                if (result.verified === false) {
                    console.log(`   ⚠️  Could not verify as valid image`);
                }
            });
        } else {
            console.log(`❌ No working endpoints found.`);
        }
        
        if (forbidden.length > 0) {
            console.log(`\n🚫 ENDPOINTS REQUIRING AUTHENTICATION (${forbidden.length}):`);
            forbidden.forEach((result, index) => {
                console.log(`${index + 1}. 🚫 ${result.name}`);
                console.log(`   URL: ${result.url}`);
            });
        }
        
        console.log(`\n💡 ANALYSIS & TROUBLESHOOTING:`);
        if (successful.length === 0 && forbidden.length > 0) {
            console.log(`🔐 All accessible endpoints require authentication`);
            console.log(`   This suggests the avatar decoration exists but needs Discord auth`);
        } else if (successful.length === 0 && notFound.length === this.results.length) {
            console.log(`❓ All endpoints returned 404 - possible reasons:`);
            console.log(`   • Asset ID format is incorrect`);
            console.log(`   • Avatar decoration doesn't exist or was removed`);
            console.log(`   • Discord uses a different CDN structure`);
        } else if (successful.length > 0) {
            console.log(`🎉 Found working endpoints! You can use these URLs to access the decoration`);
        }
        
        console.log(`\n📝 RECOMMENDATIONS:`);
        console.log(`1. Try using Discord's official API if authentication is required`);
        console.log(`2. Check if the asset ID format is correct (should start with 'a_' for animated)`);
        console.log(`3. Verify the SKU ID corresponds to the correct decoration`);
        console.log(`4. Test in different environments (browser vs server-side)`);
        console.log(`5. Check Discord's developer documentation for official CDN endpoints`);
    }

    // Export results to JSON
    exportResults() {
        try {
            const exportData = {
                config: this.config,
                results: this.results,
                summary: {
                    totalTests: this.results.length,
                    successful: this.results.filter(r => r.status === 'SUCCESS').length,
                    forbidden: this.results.filter(r => r.status === 'FORBIDDEN').length,
                    notFound: this.results.filter(r => r.status === 'NOT_FOUND').length,
                    errors: this.results.filter(r => r.status.includes('ERROR')).length,
                    timestamp: new Date().toISOString(),
                    totalTime: Date.now() - this.startTime,
                    avgResponseTime: Math.round(this.results.reduce((acc, r) => acc + r.responseTime, 0) / this.results.length)
                }
            };
            
            fs.writeFileSync(this.config.outputFile, JSON.stringify(exportData, null, 2));
            console.log(`\n💾 Detailed results exported to ${this.config.outputFile}`);
        } catch (error) {
            console.log(`❌ Could not export results: ${error.message}`);
        }
    }
}

// Run the debugger
console.log('🎯 Starting Discord Avatar Decoration CDN Debug Tool...\n');

const decorationDebugger = new DiscordDecorationDebugger();
decorationDebugger.run().then(results => {
    console.log('\n🏁 Debug complete! Check the results above and the exported JSON file.');
    process.exit(0);
}).catch(error => {
    console.error('❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
});