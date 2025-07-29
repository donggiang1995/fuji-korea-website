<?php
/**
 * AUTO DATABASE SETUP SCRIPT FOR SPACESHIP HOSTING
 * Upload this file to public_html and run via browser
 * URL: http://your-domain.com/auto-database-setup.php
 */

// Configuration - EDIT THESE VALUES
$DB_HOST = 'localhost';
$DB_USER = 'your_cpanel_username_fuji_admin';  // Replace with your actual username
$DB_PASS = 'your_database_password';           // Replace with your actual password  
$DB_NAME = 'your_cpanel_username_fuji_korea_db'; // Replace with your actual database name

// HTML Header
?>
<!DOCTYPE html>
<html>
<head>
    <title>FUJI Korea - Auto Database Setup</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .success { color: green; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .error { color: red; background: #ffeaea; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { color: blue; background: #e8f0ff; padding: 10px; border-radius: 5px; margin: 10px 0; }
        pre { background: #f0f0f0; padding: 10px; overflow-x: auto; }
        .step { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 FUJI Korea - Auto Database Setup</h1>
        
<?php

// Step 1: Check if this is a form submission
if ($_POST['action'] == 'setup') {
    $DB_USER = $_POST['db_user'];
    $DB_PASS = $_POST['db_pass'];
    $DB_NAME = $_POST['db_name'];
    
    echo "<div class='step'>";
    echo "<h2>📋 Step 1: Testing Database Connection...</h2>";
    
    try {
        $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "<div class='success'>✅ Database connection successful!</div>";
        
        // Step 2: Create Tables
        echo "<h2>📋 Step 2: Creating Tables...</h2>";
        
        // Products table
        $sql_products = "
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category ENUM('control', 'traction') NOT NULL,
            model VARCHAR(100) NOT NULL,
            image VARCHAR(500),
            specifications JSON,
            features JSON,
            description_ko TEXT,
            description_en TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        
        $pdo->exec($sql_products);
        echo "<div class='success'>✅ Products table created</div>";
        
        // Serial Numbers table
        $sql_serials = "
        CREATE TABLE IF NOT EXISTS serial_numbers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            serial_number VARCHAR(100) UNIQUE NOT NULL,
            product_id INT,
            installation_date DATE,
            location VARCHAR(255),
            status ENUM('active', 'maintenance', 'retired') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
        )";
        
        $pdo->exec($sql_serials);
        echo "<div class='success'>✅ Serial Numbers table created</div>";
        
        // Admin Users table
        $sql_admin = "
        CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'super_admin') DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        
        $pdo->exec($sql_admin);
        echo "<div class='success'>✅ Admin Users table created</div>";
        
        // Step 3: Insert Sample Data
        echo "<h2>📋 Step 3: Inserting Sample Data...</h2>";
        
        // Insert Products
        $products_data = [
            ['FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors":"Up to 48 floors","communication":"IoT enabled","noise":"< 50dBA","support":"Remote technical support"}', '["Remote technical support through APP","Remote monitoring through the IoT","Communication encoder supported","Balance coefficient auto-tuning","Noise reduction design < 50dBA"]', '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다.', 'Smart control cabinet with remote technical support and IoT monitoring capabilities.'],
            ['FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x0.84A","weight":"200kg","maxLoad":"2000kg"}', '["325mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","200kg lightweight design","Maximum static load 2000kg"]', '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다.', 'Lightweight traction machine with 325mm drive sheave.'],
            ['FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors":"48 floors standard","communication":"CANbus serial","control":"Duplex group control","backup":"UPS support"}', '["Standard: 48 floors, full collective","Duplex onboard group control","Automatic door control mode","UPS support for rescue operation"]', '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다.', 'Advanced control cabinet supporting 48 floors standard with duplex onboard group control.'],
            ['FJK1-B Traction Machine (400mm)', 'traction', 'FJK1-B-400', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x1.0A","weight":"285kg","maxLoad":"3000kg"}', '["400mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","Heavy-duty 285kg construction","Maximum static load 3000kg"]', '400mm 드라이브 시브를 갖춘 중부하용 트랙션 머신입니다.', 'Heavy-duty traction machine with 400mm drive sheave.'],
            ['FJK2-B450KG Traction Machine (240mm)', 'traction', 'FJK2-B450-240', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png', '{"voltage":"AC380V","brake":"DC110V","weight":"140kg","duty":"S5-40%","maxLoad":"2500kg","protection":"IP41"}', '["Compact 140kg design","Single wrap configuration","F class insulation","IP41 protection rating","Maximum static load 2500kg"]', '240mm 컴팩트 트랙션 머신으로 140kg 경량 설계입니다.', 'Compact 240mm traction machine with lightweight 140kg design.']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO products (name, category, model, image, specifications, features, description_ko, description_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($products_data as $product) {
            $stmt->execute($product);
        }
        echo "<div class='success'>✅ 5 products inserted</div>";
        
        // Insert Serial Numbers
        $serials_data = [
            ['123456', 1, '2025-01-01', 'ABC', 'active'],
            ['25A123', 1, '2024-02-20', '부산 해운대구 센텀로 456', 'active'],
            ['FJK125001', 2, '2025-01-01', 'Korea', 'active'],
            ['FJK125002', 2, '2025-01-01', 'Korea', 'active'],
            ['FJK125003', 3, '2025-01-01', 'Korea', 'active'],
            ['FJK125004', 1, '2025-01-01', 'Korea', 'active'],
            ['FJK125005', 3, '2025-01-01', 'Korea', 'active'],
            ['FJK125006', 1, '2025-01-01', 'Korea', 'active'],
            ['FJK125007', 1, '2025-01-01', 'Korea', 'active'],
            ['FJK125008', 1, '2025-01-01', 'Korea', 'active'],
            ['FJK125009', 1, '2025-01-01', 'Korea', 'active'],
            ['TM-800-2024-001', 2, '2024-03-10', '대구 수성구 범어로 789', 'active'],
            ['TM-800-2024-002', 2, '2024-04-05', '인천 연수구 송도로 321', 'maintenance'],
            ['SCP-2024-001', 3, '2024-05-12', '광주 서구 치평로 654', 'active'],
            ['SCP-2024-002', 3, '2025-01-01', '대전 유성구 대학로 987', 'active']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO serial_numbers (serial_number, product_id, installation_date, location, status) VALUES (?, ?, ?, ?, ?)");
        foreach ($serials_data as $serial) {
            $stmt->execute($serial);
        }
        echo "<div class='success'>✅ 15 serial numbers inserted</div>";
        
        // Insert Admin User
        $admin_password = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE0BXnTSJpBGpL6'; // admin123
        $stmt = $pdo->prepare("INSERT INTO admin_users (username, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->execute(['admin', 'admin@fuji-global-korea.com', $admin_password, 'super_admin']);
        echo "<div class='success'>✅ Admin user created (username: admin, password: admin123)</div>";
        
        // Step 4: Verification
        echo "<h2>📋 Step 4: Verification...</h2>";
        
        $result = $pdo->query("SELECT COUNT(*) as count FROM products")->fetch();
        echo "<div class='info'>Products count: " . $result['count'] . "</div>";
        
        $result = $pdo->query("SELECT COUNT(*) as count FROM serial_numbers")->fetch();
        echo "<div class='info'>Serial numbers count: " . $result['count'] . "</div>";
        
        $result = $pdo->query("SELECT COUNT(*) as count FROM admin_users")->fetch();
        echo "<div class='info'>Admin users count: " . $result['count'] . "</div>";
        
        // Step 5: Generate DATABASE_URL
        echo "<h2>📋 Step 5: Your DATABASE_URL</h2>";
        echo "<div class='info'>";
        echo "<strong>Copy this DATABASE_URL for your Node.js app:</strong><br>";
        echo "<pre>DATABASE_URL=mysql://$DB_USER:$DB_PASS@$DB_HOST:3306/$DB_NAME</pre>";
        echo "</div>";
        
        echo "<div class='success'>";
        echo "<h3>🎉 DATABASE SETUP COMPLETE!</h3>";
        echo "<p>You can now continue with Node.js app configuration.</p>";
        echo "<p><strong>Delete this file after use for security!</strong></p>";
        echo "</div>";
        
    } catch (PDOException $e) {
        echo "<div class='error'>❌ Database Error: " . $e->getMessage() . "</div>";
        echo "<div class='info'>Please check your database credentials and try again.</div>";
    }
    
} else {
    // Show form
    echo "<div class='step'>";
    echo "<h2>📝 Enter Your Database Credentials</h2>";
    echo "<p>You can find these in your Spaceship cPanel → MySQL Databases</p>";
    echo "<form method='post'>";
    echo "<input type='hidden' name='action' value='setup'>";
    echo "<p><label>Database User: <input type='text' name='db_user' style='width:300px;padding:5px;' placeholder='your_username_fuji_admin' required></label></p>";
    echo "<p><label>Database Password: <input type='password' name='db_pass' style='width:300px;padding:5px;' required></label></p>";
    echo "<p><label>Database Name: <input type='text' name='db_name' style='width:300px;padding:5px;' placeholder='your_username_fuji_korea_db' required></label></p>";
    echo "<p><button type='submit' style='background:#007cba;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;'>🚀 Setup Database</button></p>";
    echo "</form>";
    echo "</div>";
    
    echo "<div class='step'>";
    echo "<h3>💡 How to find your credentials:</h3>";
    echo "<ol>";
    echo "<li>Go to Spaceship cPanel</li>";
    echo "<li>Click 'MySQL Databases'</li>";
    echo "<li>Your database user should be: <strong>your_username_fuji_admin</strong></li>";
    echo "<li>Your database name should be: <strong>your_username_fuji_korea_db</strong></li>";
    echo "<li>Password is what you set when creating the user</li>";
    echo "</ol>";
    echo "</div>";
}

?>
    </div>
</body>
</html>