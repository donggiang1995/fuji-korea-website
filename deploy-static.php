<?php
// Copy static files from dist/public to public_html
echo "<h2>FUJI Global Korea - Deploy Static Website</h2>";

// Create API mock for products
$api_dir = 'api';
if (!file_exists($api_dir)) {
    mkdir($api_dir, 0755, true);
}

// Create products API endpoint
$products_api = $api_dir . '/products.php';
$products_content = '<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit(0);
}

echo json_encode([
    [
        "id" => 1,
        "name" => "FCA-9000 Series Control Panel",
        "category" => "control", 
        "model" => "FCA-9000",
        "image" => "/assets/LOGO%20FUJI%20KOREA%20trang_1753265215012-DRxhmWdx.png",
        "specifications" => [
            "voltage" => "220V",
            "frequency" => "50Hz",
            "capacity" => "1000kg"
        ],
        "features" => ["Advanced Control System", "Energy Efficient", "Safety Certified"],
        "descriptionKo" => "고급 엘리베이터 제어판 시스템으로 안전하고 효율적인 운영을 보장합니다.",
        "descriptionEn" => "Advanced elevator control panel system ensuring safe and efficient operation."
    ],
    [
        "id" => 2,
        "name" => "TM-800S Traction Machine",
        "category" => "traction",
        "model" => "TM-800S", 
        "image" => "/assets/download_1753383075920-Cq0-p3Zj.jpg",
        "specifications" => [
            "power" => "7.5kW",
            "speed" => "1.75m/s",
            "load" => "800kg"
        ],
        "features" => ["High Efficiency", "Low Noise", "Compact Design"],
        "descriptionKo" => "고효율 견인기로 조용하고 안정적인 엘리베이터 운행을 제공합니다.",
        "descriptionEn" => "High-efficiency traction machine providing quiet and stable elevator operation."
    ],
    [
        "id" => 3,
        "name" => "SCP-2024 Smart Control Panel",
        "category" => "control",
        "model" => "SCP-2024",
        "image" => "/assets/image_2025-07-25_014919516_1753382959524-BaTWpH2M.png",
        "specifications" => [
            "display" => "7-inch LCD",
            "connectivity" => "IoT Ready", 
            "floors" => "Up to 32 floors"
        ],
        "features" => ["Smart Monitoring", "Remote Diagnostics", "Energy Management"],
        "descriptionKo" => "스마트 제어판으로 IoT 연결 및 원격 모니터링이 가능합니다.",
        "descriptionEn" => "Smart control panel with IoT connectivity and remote monitoring capabilities."
    ]
]);
?>';

file_put_contents($products_api, $products_content);

// Create health check API
$health_api = $api_dir . '/health.php';
$health_content = '<?php
header("Content-Type: application/json");
echo json_encode([
    "status" => "ok",
    "message" => "FUJI Global Korea API is running",
    "timestamp" => date("c"),
    "version" => "static-php"
]);
?>';

file_put_contents($health_api, $health_content);

// Create serial search API
$search_api = $api_dir . '/serial-search.php';
$search_content = '<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$serial = $_GET["serial"] ?? "";

if ($serial === "FCA-9000-2024-001") {
    echo json_encode([
        "serialNumber" => [
            "id" => 1,
            "serialNumber" => "FCA-9000-2024-001",
            "productId" => 1,
            "installationDate" => "2024-01-15",
            "location" => "Seoul Office Building",
            "status" => "active"
        ],
        "product" => [
            "id" => 1,
            "name" => "FCA-9000 Series Control Panel",
            "model" => "FCA-9000"
        ]
    ]);
} else if ($serial === "TM-800-2024-001") {
    echo json_encode([
        "serialNumber" => [
            "id" => 2, 
            "serialNumber" => "TM-800-2024-001",
            "productId" => 2,
            "installationDate" => "2024-02-10",
            "location" => "Busan Shopping Mall", 
            "status" => "active"
        ],
        "product" => [
            "id" => 2,
            "name" => "TM-800S Traction Machine",
            "model" => "TM-800S"
        ]
    ]);
} else {
    echo json_encode(null);
}
?>';

file_put_contents($search_api, $search_content);

echo "<p>✅ API endpoints created:</p>";
echo "<ul>";
echo "<li><a href='/api/health.php'>/api/health.php</a></li>";
echo "<li><a href='/api/products.php'>/api/products.php</a></li>";
echo "<li><a href='/api/serial-search.php?serial=FCA-9000-2024-001'>/api/serial-search.php</a></li>";
echo "</ul>";

echo "<p>📁 Now copy dist/public/* files to public_html/</p>";
echo "<p>🌐 Website will be available at: <a href='http://fujiglobal.kr'>fujiglobal.kr</a></p>";
?>