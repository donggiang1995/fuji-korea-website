#!/bin/bash
# FTP Upload Script for FUJI Global Korea

echo "🚀 FUJI Global Korea - FTP Upload"
echo "================================"

# Check if lftp is available
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp not found. Install with: apt-get install lftp"
    exit 1
fi

# FTP credentials (replace with actual values)
FTP_HOST="server37.shared.spaceship.host"
FTP_USER="your_username"
FTP_PASS="your_password"
REMOTE_DIR="/public_html"

echo "📁 Uploading to: $FTP_HOST$REMOTE_DIR"

# Upload using lftp
lftp -c "
    open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST
    cd $REMOTE_DIR
    put simple-fuji-website.html -o index.html
    chmod 644 index.html
    ls -la index.html
    quit
"

echo "✅ Upload completed!"
echo "🌐 Test: curl -s http://fujiglobal.kr | head -5"

# Automated test
echo ""
echo "🧪 Testing website..."
sleep 2
curl -s http://fujiglobal.kr | head -5
