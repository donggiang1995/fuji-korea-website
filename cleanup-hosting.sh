#!/bin/bash
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
for file in "${CLEANUP_FILES[@]}"; do
    echo "- $file"
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
