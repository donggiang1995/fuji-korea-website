-- FUJI Global Korea - MySQL Migration Script
-- Convert từ PostgreSQL sang MySQL cho Spaceship hosting

-- Tạo database
CREATE DATABASE fuji_korea_db;
USE fuji_korea_db;

-- Bảng products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  model VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  specifications JSON NOT NULL,
  features JSON NOT NULL,
  description_ko TEXT NOT NULL,
  description_en TEXT NOT NULL
);

-- Bảng inquiries
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng serial_numbers
CREATE TABLE serial_numbers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(255) NOT NULL UNIQUE,
  product_id INT,
  installation_date DATE,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Bảng admin_users
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Bảng admin_sessions
CREATE TABLE admin_sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id)
);

-- Insert sample data (cần export từ PostgreSQL hiện tại)
-- Dữ liệu này sẽ được export từ database hiện tại

-- Sample admin user (cần hash password)
INSERT INTO admin_users (username, email, password, role) VALUES 
('admin', 'admin@fuji-global-korea.com', '$2a$12$...', 'super_admin');