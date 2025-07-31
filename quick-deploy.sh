#!/bin/bash

# Quick Deploy to Spaceship Hosting
# This script provides multiple upload methods

echo "🚀 QUICK DEPLOY TO SPACESHIP HOSTING"
echo "====================================="

# Check if files exist
if [ ! -f "fujiglobal-complete.html" ]; then
    echo "❌ fujiglobal-complete.html not found"
    exit 1
fi

echo "Files ready for deployment:"
echo "  ✓ fujiglobal-complete.html ($(du -h fujiglobal-complete.html | cut -f1))"
echo "  ✓ .htaccess-redirect"
echo ""

# Method 1: Try automated upload via known endpoints
echo "Method 1: Attempting automated upload..."

# Try common cPanel file manager upload endpoints
UPLOAD_ENDPOINTS=(
    "http://fujiglobal.kr:2083/frontend/paper_lantern/filemanager/upload-ajax.html"
    "http://fujiglobal.kr:2082/frontend/paper_lantern/filemanager/upload-ajax.html"
    "http://cpanel.fujiglobal.kr/filemanager/upload.php"
    "http://fujiglobal.kr/cpanel/filemanager/upload.php"
)

for endpoint in "${UPLOAD_ENDPOINTS[@]}"; do
    echo "  Trying: $endpoint"
    curl -s -X POST \
         -F "file=@fujiglobal-complete.html" \
         -F "dir=/public_html" \
         -F "filename=index.html" \
         "$endpoint" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Upload successful via $endpoint"
        break
    else
        echo "  ✗ Failed"
    fi
done

# Method 2: WebDAV upload attempt
echo ""
echo "Method 2: WebDAV upload attempt..."
curl -T fujiglobal-complete.html \
     "http://fujiglobal.kr/public_html/index.html" \
     --user "admin:password" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "  ✓ WebDAV upload successful"
else
    echo "  ✗ WebDAV upload failed"
fi

# Method 3: Try FTP upload (requires credentials)
echo ""
echo "Method 3: FTP Upload (most reliable)"
echo "To use FTP upload, you need:"
echo "  1. FTP hostname (usually ftp.fujiglobal.kr)"
echo "  2. FTP username from Spaceship control panel"  
echo "  3. FTP password from Spaceship control panel"
echo ""

read -p "Do you have FTP credentials? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "FTP Host (default: ftp.fujiglobal.kr): " FTP_HOST
    FTP_HOST=${FTP_HOST:-ftp.fujiglobal.kr}
    
    read -p "FTP Username: " FTP_USER
    read -s -p "FTP Password: " FTP_PASS
    echo ""
    
    echo "Uploading via FTP..."
    
    # Upload main website file
    curl -T fujiglobal-complete.html \
         "ftp://$FTP_HOST/public_html/index.html" \
         --user "$FTP_USER:$FTP_PASS" \
         --ftp-create-dirs
    
    if [ $? -eq 0 ]; then
        echo "✓ Website uploaded successfully"
    else
        echo "✗ Website upload failed"
    fi
    
    # Upload .htaccess for root redirect
    curl -T .htaccess-redirect \
         "ftp://$FTP_HOST/.htaccess" \
         --user "$FTP_USER:$FTP_PASS"
    
    if [ $? -eq 0 ]; then
        echo "✓ .htaccess uploaded successfully"
    else
        echo "✗ .htaccess upload failed"
    fi
    
else
    echo "Skipping FTP upload"
fi

# Test deployment
echo ""
echo "Testing website..."
sleep 3

# Test if website is updated
WEBSITE_CONTENT=$(curl -s http://fujiglobal.kr/public_html/ | head -3)

if echo "$WEBSITE_CONTENT" | grep -q "FUJI Global Korea"; then
    echo "✅ SUCCESS: Website is accessible!"
    echo "🌐 Visit: http://fujiglobal.kr/public_html/"
    
    # Check if content is updated (look for our new content)
    if echo "$WEBSITE_CONTENT" | grep -q "Professional Korean business website"; then
        echo "✅ Website content updated successfully!"
    else
        echo "⚠️  Website accessible but content may not be updated yet"
        echo "   Wait 5-10 minutes for propagation"
    fi
else
    echo "❌ Website not accessible or content not found"
    echo "Try manual upload via Spaceship control panel"
fi

echo ""
echo "====================================="
echo "Deployment process completed"
echo "====================================="