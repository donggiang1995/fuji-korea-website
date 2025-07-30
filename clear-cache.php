<?php
// Clear cache and test basic functionality

echo "<h2>FUJI Global Korea - Cache Clear & Debug</h2>";

// Set no-cache headers
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

echo "<p><strong>Server Time:</strong> " . date('Y-m-d H:i:s') . "</p>";
echo "<p><strong>Server Info:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p><strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
echo "<p><strong>Request URI:</strong> " . $_SERVER['REQUEST_URI'] . "</p>";

// Check if files exist
$files_to_check = [
    'index.html',
    'api/health.php',
    'api/products.php',
    'assets/index-BHJ5syaQ.css',
    'assets/index-ZF6frZWn.js'
];

echo "<h3>File Check:</h3><ul>";
foreach($files_to_check as $file) {
    $exists = file_exists($file);
    $status = $exists ? "✅ EXISTS" : "❌ MISSING";
    echo "<li>$file - $status</li>";
}
echo "</ul>";

// List current directory contents
echo "<h3>Current Directory Contents:</h3>";
echo "<pre>";
$files = scandir('.');
foreach($files as $file) {
    if($file != '.' && $file != '..') {
        echo $file . "\n";
    }
}
echo "</pre>";

// Check assets directory
if(is_dir('assets')) {
    echo "<h3>Assets Directory:</h3><pre>";
    $assets = scandir('assets');
    foreach($assets as $asset) {
        if($asset != '.' && $asset != '..') {
            echo "assets/" . $asset . "\n";
        }
    }
    echo "</pre>";
}

echo "<h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>If index.html is missing → Upload it again</li>";
echo "<li>If assets missing → Create assets folder and upload files</li>";
echo "<li>Clear browser cache (Ctrl+F5)</li>";
echo "<li>Try incognito mode</li>";
echo "</ol>";

// Create a simple working index if missing
if(!file_exists('index.html')) {
    echo "<p><strong>Creating basic index.html...</strong></p>";
    $basic_html = '<!DOCTYPE html>
<html>
<head>
    <title>FUJI Global Korea</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        h1 { color: #1e3a8a; text-align: center; }
        .status { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏢 FUJI GLOBAL KOREA</h1>
        <div class="status">
            <h3>✅ Website is Online!</h3>
            <p>Professional elevator technology solutions</p>
            <p><strong>Products:</strong> Control Panels, Traction Machines, Smart Systems</p>
        </div>
        <div class="status">
            <h3>📞 Contact Information</h3>
            <p><strong>Location:</strong> Seoul, South Korea</p>
            <p><strong>Business:</strong> Elevator Technology & Engineering</p>
            <p><strong>Services:</strong> Installation, Maintenance, Technical Support</p>
        </div>
        <div class="status">
            <h3>🔧 Technical Status</h3>
            <p id="api-status">Testing API connection...</p>
        </div>
    </div>
    
    <script>
    fetch("/api/health.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("api-status").innerHTML = 
                "✅ API Connected: " + data.message;
        })
        .catch(error => {
            document.getElementById("api-status").innerHTML = 
                "⚠️ API Connection: Basic website mode";
        });
    </script>
</body>
</html>';
    
    file_put_contents('index.html', $basic_html);
    echo "<p>✅ Basic index.html created!</p>";
}

echo "<h3>🌐 Test Links:</h3>";
echo "<ul>";
echo '<li><a href="/">Main Website</a></li>';
echo '<li><a href="/api/health.php">API Health Check</a></li>';
echo '<li><a href="/api/products.php">Products API</a></li>';
echo "</ul>";
?>