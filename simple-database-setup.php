<?php
/**
 * SIMPLE DATABASE SETUP - NO PRE-SETUP REQUIRED
 * Just upload and run!
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>FUJI Korea - Simple Database Setup</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 700px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .success { color: green; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .error { color: red; background: #ffeaea; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { color: blue; background: #e8f0ff; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .warning { color: orange; background: #fff8e1; padding: 10px; border-radius: 5px; margin: 10px 0; }
        pre { background: #f0f0f0; padding: 10px; overflow-x: auto; border-radius: 5px; }
        .step { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .btn { background:#007cba; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer; text-decoration:none; display:inline-block; }
        .btn:hover { background:#005a87; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 FUJI Korea - Simple Database Setup</h1>
        <p><strong>Mục tiêu:</strong> Tạo và setup database mà không cần làm gì phức tạp!</p>

<?php
// Check if this is the first run or form submission
if (isset($_POST['action'])) {
    
    if ($_POST['action'] == 'check_cpanel') {
        // Step 1: Get cPanel username
        $cpanel_user = $_POST['cpanel_user'];
        
        echo "<div class='step'>";
        echo "<h2>📋 Bước 1: Thông tin của bạn</h2>";
        echo "<div class='info'>cPanel Username: <strong>$cpanel_user</strong></div>";
        
        // Generate suggested names
        $db_name = $cpanel_user . "_fuji_korea_db";
        $db_user = $cpanel_user . "_fuji_admin";
        
        echo "<div class='warning'>";
        echo "<h3>🎯 BÂY GIỜ LÀM BƯỚC NÀY:</h3>";
        echo "<ol>";
        echo "<li><strong>Mở tab mới</strong> → cPanel → <strong>MySQL Database Wizard</strong></li>";
        echo "<li><strong>Database Name:</strong> <code>fuji_korea_db</code> (chỉ gõ phần này)</li>";
        echo "<li><strong>Username:</strong> <code>fuji_admin</code> (chỉ gõ phần này)</li>";
        echo "<li><strong>Password:</strong> Tạo password mạnh (VD: <code>FujiKorea2025!</code>)</li>";
        echo "<li><strong>Privileges:</strong> Check ALL PRIVILEGES</li>";
        echo "<li>Sau khi tạo xong, quay lại đây điền thông tin</li>";
        echo "</ol>";
        echo "</div>";
        
        echo "<form method='post'>";
        echo "<input type='hidden' name='action' value='setup_database'>";
        echo "<input type='hidden' name='cpanel_user' value='$cpanel_user'>";
        echo "<h3>📝 Điền thông tin vừa tạo:</h3>";
        echo "<p><label>Database Password (vừa tạo): <input type='password' name='db_pass' style='width:250px;padding:5px;' placeholder='FujiKorea2025!' required></label></p>";
        echo "<p><button type='submit' class='btn'>🎯 Setup Database với Data</button></p>";
        echo "</form>";
        echo "</div>";
        
        echo "<div class='info'>";
        echo "<strong>💡 Lưu ý:</strong> Database thật sẽ có tên <code>$db_name</code> và user <code>$db_user</code>";
        echo "</div>";
        
    } elseif ($_POST['action'] == 'setup_database') {
        // Step 2: Setup database with data
        $cpanel_user = $_POST['cpanel_user'];
        $db_pass = $_POST['db_pass'];
        $db_name = $cpanel_user . "_fuji_korea_db";
        $db_user = $cpanel_user . "_fuji_admin";
        
        echo "<div class='step'>";
        echo "<h2>📋 Bước 2: Connecting và Setup Data...</h2>";
        
        try {
            $pdo = new PDO("mysql:host=localhost;dbname=$db_name", $db_user, $db_pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "<div class='success'>✅ Database connection thành công!</div>";
            
            // Create tables and insert data (same as before but simpler output)
            echo "<div class='info'>⚙️ Đang tạo tables và insert data...</div>";
            
            // Products table
            $pdo->exec("CREATE TABLE IF NOT EXISTS products (
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
            )");
            
            // Serial Numbers table
            $pdo->exec("CREATE TABLE IF NOT EXISTS serial_numbers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                serial_number VARCHAR(100) UNIQUE NOT NULL,
                product_id INT,
                installation_date DATE,
                location VARCHAR(255),
                status ENUM('active', 'maintenance', 'retired') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
            )");
            
            // Admin Users table
            $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'super_admin') DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");
            
            echo "<div class='success'>✅ Tables created</div>";
            
            // Insert sample data (simplified)
            $products = [
                ['FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors":"Up to 48 floors","communication":"IoT enabled"}', '["Remote technical support","IoT monitoring","Auto-tuning"]', '스마트 제어 캐비닛', 'Smart control cabinet'],
                ['FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage":"380V","weight":"200kg"}', '["325mm drive sheave","Lightweight design"]', '경량 트랙션 머신', 'Lightweight traction machine'],
                ['FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors":"48 floors","control":"Duplex group"}', '["48 floors support","Group control","UPS backup"]', '고급 제어 캐비닛', 'Advanced control cabinet'],
                ['FJK1-B Traction Machine (400mm)', 'traction', 'FJK1-B-400', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png', '{"voltage":"380V","weight":"285kg"}', '["400mm drive sheave","Heavy-duty"]', '중부하용 트랙션 머신', 'Heavy-duty traction machine'],
                ['FJK2-B450KG Traction Machine (240mm)', 'traction', 'FJK2-B450-240', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png', '{"voltage":"AC380V","weight":"140kg"}', '["Compact design","F class insulation"]', '컴팩트 트랙션 머신', 'Compact traction machine']
            ];
            
            $stmt = $pdo->prepare("INSERT IGNORE INTO products (name, category, model, image, specifications, features, description_ko, description_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($products as $product) {
                $stmt->execute($product);
            }
            echo "<div class='success'>✅ 5 products inserted</div>";
            
            // Insert serial numbers
            $serials = [
                ['123456', 1, '2025-01-01', 'ABC', 'active'],
                ['25A123', 1, '2024-02-20', '부산 해운대구', 'active'],
                ['FJK125001', 2, '2025-01-01', 'Korea', 'active'],
                ['FJK125002', 2, '2025-01-01', 'Korea', 'active'],
                ['FJK125003', 3, '2025-01-01', 'Korea', 'active'],
                ['FJK125004', 1, '2025-01-01', 'Korea', 'active'],
                ['FJK125005', 3, '2025-01-01', 'Korea', 'active'],
                ['TM-800-2024-001', 2, '2024-03-10', '대구 수성구', 'active'],
                ['TM-800-2024-002', 2, '2024-04-05', '인천 연수구', 'maintenance'],
                ['SCP-2024-001', 3, '2024-05-12', '광주 서구', 'active']
            ];
            
            $stmt = $pdo->prepare("INSERT IGNORE INTO serial_numbers (serial_number, product_id, installation_date, location, status) VALUES (?, ?, ?, ?, ?)");
            foreach ($serials as $serial) {
                $stmt->execute($serial);
            }
            echo "<div class='success'>✅ 10 serial numbers inserted</div>";
            
            // Insert admin user
            $admin_password = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE0BXnTSJpBGpL6';
            $stmt = $pdo->prepare("INSERT IGNORE INTO admin_users (username, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->execute(['admin', 'admin@fuji-global-korea.com', $admin_password, 'super_admin']);
            echo "<div class='success'>✅ Admin user created</div>";
            
            // Generate DATABASE_URL
            echo "<h2>🎯 DATABASE_URL (Copy này!):</h2>";
            echo "<pre>DATABASE_URL=mysql://$db_user:$db_pass@localhost:3306/$db_name</pre>";
            
            echo "<div class='success'>";
            echo "<h2>🎉 HOÀN THÀNH!</h2>";
            echo "<ul>";
            echo "<li>✅ Database setup thành công</li>";
            echo "<li>✅ 5 products + 10 serial numbers + 1 admin</li>";
            echo "<li>✅ Admin login: admin / admin123</li>";
            echo "<li>✅ Test serial: 123456, FJK125001</li>";
            echo "</ul>";
            echo "<p><strong>🗑️ Nhớ xóa file này sau khi copy DATABASE_URL!</strong></p>";
            echo "</div>";
            
        } catch (PDOException $e) {
            echo "<div class='error'>❌ Lỗi: " . $e->getMessage() . "</div>";
            echo "<div class='warning'>Có thể database chưa được tạo hoặc password sai. Kiểm tra lại MySQL Database Wizard.</div>";
        }
        echo "</div>";
    }
    
} else {
    // Initial form
    echo "<div class='step'>";
    echo "<h2>📝 Bước 1: Tìm cPanel Username</h2>";
    echo "<p>Vào cPanel → tìm <strong>'Current User'</strong> hoặc username ở góc trên phải</p>";
    echo "<form method='post'>";
    echo "<input type='hidden' name='action' value='check_cpanel'>";
    echo "<p><label>cPanel Username của bạn: <input type='text' name='cpanel_user' style='width:200px;padding:5px;' placeholder='user123' required></label></p>";
    echo "<p><button type='submit' class='btn'>➡️ Tiếp theo</button></p>";
    echo "</form>";
    echo "</div>";
    
    echo "<div class='info'>";
    echo "<strong>💡 Hướng dẫn:</strong> Username thường là dạng user123, abc456, hoặc tên domain không có đuôi.";
    echo "</div>";
}
?>
    </div>
</body>
</html>