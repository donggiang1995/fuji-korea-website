<?php
/**
 * MANUAL DATABASE GUIDE - NO PHP SCRIPT NEEDED
 * Just view this file for step-by-step instructions
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>Manual Database Setup Guide</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .step { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background: #f9f9f9; }
        .code { background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace; margin: 10px 0; }
        .success { color: green; font-weight: bold; }
        .warning { color: orange; background: #fff8e1; padding: 10px; border-radius: 5px; }
        .info { color: blue; background: #e3f2fd; padding: 10px; border-radius: 5px; }
        h2 { color: #007cba; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠️ MANUAL DATABASE SETUP GUIDE</h1>
        <p>Follow these steps to create database manually without running PHP scripts.</p>

        <div class="step">
            <h2>STEP 1: Create Database</h2>
            <ol>
                <li>cPanel → <strong>MySQL Database Wizard</strong></li>
                <li>Database Name: <code>fuji_korea_db</code></li>
                <li>Click "Next Step"</li>
                <li>Username: <code>fuji_admin</code></li>
                <li>Password: <code>FujiKorea2025!</code> (or your choice)</li>
                <li>Click "Create User"</li>
                <li>Select <strong>ALL PRIVILEGES</strong></li>
                <li>Click "Next Step"</li>
            </ol>
            <div class="info">✅ Database created successfully!</div>
        </div>

        <div class="step">
            <h2>STEP 2: Create Tables</h2>
            <p>cPanel → <strong>phpMyAdmin</strong> → Select your database</p>
            <p>Run these SQL commands one by one:</p>
            
            <h3>2.1 Products Table:</h3>
            <div class="code">
CREATE TABLE products (
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
);
            </div>

            <h3>2.2 Serial Numbers Table:</h3>
            <div class="code">
CREATE TABLE serial_numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    product_id INT,
    installation_date DATE,
    location VARCHAR(255),
    status ENUM('active', 'maintenance', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
            </div>

            <h3>2.3 Admin Users Table:</h3>
            <div class="code">
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
            </div>
        </div>

        <div class="step">
            <h2>STEP 3: Insert Sample Data</h2>
            
            <h3>3.1 Insert Products:</h3>
            <div class="code">
INSERT INTO products (name, category, model, image, specifications, features, description_ko, description_en) VALUES
('FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors":"Up to 48 floors","communication":"IoT enabled"}', '["Remote technical support","IoT monitoring","Auto-tuning"]', '스마트 제어 캐비닛', 'Smart control cabinet'),
('FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage":"380V","weight":"200kg"}', '["325mm drive sheave","Lightweight design"]', '경량 트랙션 머신', 'Lightweight traction machine'),
('FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors":"48 floors","control":"Duplex group"}', '["48 floors support","Group control","UPS backup"]', '고급 제어 캐비닛', 'Advanced control cabinet'),
('FJK1-B Traction Machine (400mm)', 'traction', 'FJK1-B-400', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png', '{"voltage":"380V","weight":"285kg"}', '["400mm drive sheave","Heavy-duty"]', '중부하용 트랙션 머신', 'Heavy-duty traction machine'),
('FJK2-B450KG Traction Machine (240mm)', 'traction', 'FJK2-B450-240', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png', '{"voltage":"AC380V","weight":"140kg"}', '["Compact design","F class insulation"]', '컴팩트 트랙션 머신', 'Compact traction machine');
            </div>

            <h3>3.2 Insert Serial Numbers:</h3>
            <div class="code">
INSERT INTO serial_numbers (serial_number, product_id, installation_date, location, status) VALUES
('123456', 1, '2025-01-01', 'ABC', 'active'),
('25A123', 1, '2024-02-20', '부산 해운대구', 'active'),
('FJK125001', 2, '2025-01-01', 'Korea', 'active'),
('FJK125002', 2, '2025-01-01', 'Korea', 'active'),
('FJK125003', 3, '2025-01-01', 'Korea', 'active'),
('FJK125004', 1, '2025-01-01', 'Korea', 'active'),
('FJK125005', 3, '2025-01-01', 'Korea', 'active'),
('TM-800-2024-001', 2, '2024-03-10', '대구 수성구', 'active'),
('TM-800-2024-002', 2, '2024-04-05', '인천 연수구', 'maintenance'),
('SCP-2024-001', 3, '2024-05-12', '광주 서구', 'active');
            </div>

            <h3>3.3 Insert Admin User:</h3>
            <div class="code">
INSERT INTO admin_users (username, email, password, role) VALUES
('admin', 'admin@fuji-global-korea.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE0BXnTSJpBGpL6', 'super_admin');
            </div>
            <div class="warning">Admin Login: username = <strong>admin</strong>, password = <strong>admin123</strong></div>
        </div>

        <div class="step">
            <h2>STEP 4: Get DATABASE_URL</h2>
            <p>Your DATABASE_URL format:</p>
            <div class="code">
DATABASE_URL=mysql://YOUR_CPANEL_USERNAME_fuji_admin:FujiKorea2025!@localhost:3306/YOUR_CPANEL_USERNAME_fuji_korea_db
            </div>
            <div class="info">
                <strong>Example:</strong><br>
                If your cPanel username is "user123", then:<br>
                <code>DATABASE_URL=mysql://user123_fuji_admin:FujiKorea2025!@localhost:3306/user123_fuji_korea_db</code>
            </div>
        </div>

        <div class="step">
            <h2>✅ VERIFICATION</h2>
            <p>Run these queries to verify:</p>
            <div class="code">
SELECT COUNT(*) as products_count FROM products;  -- Should return 5
SELECT COUNT(*) as serials_count FROM serial_numbers;  -- Should return 10
SELECT username FROM admin_users;  -- Should return 'admin'
            </div>
            <div class="success">If all queries return expected results, database setup is complete!</div>
        </div>

        <div class="step">
            <h2>🎯 NEXT STEP</h2>
            <p>After completing database setup:</p>
            <ol>
                <li>Copy your DATABASE_URL</li>
                <li>Continue to Node.js app configuration</li>
                <li>Setup environment variables</li>
                <li>Test the website</li>
            </ol>
        </div>
    </div>
</body>
</html>