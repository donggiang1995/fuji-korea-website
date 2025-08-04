-- FUJI Global Korea Database Setup for Railway
-- Run this SQL script in Railway PostgreSQL Query Console

-- Create tables
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    model TEXT NOT NULL,
    image TEXT NOT NULL,
    specifications JSONB NOT NULL,
    features JSONB NOT NULL,
    description_ko TEXT NOT NULL,
    description_en TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS serial_numbers (
    id SERIAL PRIMARY KEY,
    serial_number TEXT NOT NULL UNIQUE,
    product_id INTEGER REFERENCES products(id),
    installation_date TEXT,
    location TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert products data
INSERT INTO products (id, name, category, model, image, specifications, features, description_ko, description_en) VALUES
(1, 'FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors": "Up to 48 floors", "communication": "IoT enabled", "noise": "< 50dBA", "support": "Remote technical support"}'::jsonb, '["Remote technical support through APP", "Remote monitoring through the IoT", "Communication encoder supported", "Balance coefficient auto-tuning", "Noise reduction design < 50dBA"]'::jsonb, '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다. 50dBA 미만의 저소음 설계와 자동 균형 조정 기능을 제공합니다.', 'Smart control cabinet with remote technical support and IoT monitoring capabilities. Features noise reduction design under 50dBA and automatic balance coefficient tuning.'),
(3, 'FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors": "48 floors standard", "communication": "CANbus serial", "control": "Duplex group control", "backup": "UPS support"}'::jsonb, '["Standard: 48 floors, full collective (full serial connection)", "Duplex onboard group control (CANbus serial communication)", "Automatic door control mode", "Selectable fireman operation", "Supports 1 ph. 220 Vac UPS for rescue operation", "Comprehensive trip diagnostics"]'::jsonb, '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다. 자동 도어 제어와 UPS 백업 시스템을 지원합니다.', 'Advanced control cabinet supporting 48 floors standard with duplex onboard group control. Features automatic door control and UPS backup system support.'),
(2, 'FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x0.84A", "weight": "200kg", "maxLoad": "2000kg"}'::jsonb, '["325mm diameter drive sheave", "2:1 suspension ratio", "DC110V brake system", "200kg lightweight design", "Maximum static load 2000kg"]'::jsonb, '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다. 2:1 서스펜션 비율과 DC110V 브레이크 시스템을 적용했습니다.', 'Lightweight traction machine with 325mm drive sheave. Features 2:1 suspension ratio and DC110V brake system for reliable operation.'),
(4, 'FJK1-B Traction Machine (375mm)', 'traction', 'FJK1-B-375', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-375mm.png', '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x0.84A", "weight": "220kg", "maxLoad": "2500kg"}'::jsonb, '["375mm diameter drive sheave", "2:1 suspension ratio", "DC110V brake system", "220kg robust design", "Maximum static load 2500kg"]'::jsonb, '375mm 드라이브 시브를 갖춘 견고한 트랙션 머신입니다. 2500kg까지의 하중을 안전하게 처리할 수 있습니다.', 'Robust traction machine with 375mm drive sheave. Capable of safely handling loads up to 2500kg with reliable performance.'),
(5, 'FJK2-B Traction Machine (450mm)', 'traction', 'FJK2-B-450', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-450mm.png', '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x1.2A", "weight": "280kg", "maxLoad": "3500kg"}'::jsonb, '["450mm diameter drive sheave", "2:1 suspension ratio", "Enhanced DC110V brake system", "280kg heavy-duty design", "Maximum static load 3500kg"]'::jsonb, '450mm 대형 드라이브 시브를 갖춘 고용량 트랙션 머신입니다. 3500kg까지의 대형 승강기에 최적화되어 있습니다.', 'High-capacity traction machine with 450mm large drive sheave. Optimized for large elevators handling up to 3500kg loads.'),
(6, 'FJM1-B Gearless Traction Machine (530mm)', 'traction', 'FJM1-B-530', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJM1-530mm.png', '{"voltage": "380V", "type": "Gearless", "brake": "DC110V 2x1.5A", "weight": "450kg", "maxLoad": "5000kg"}'::jsonb, '["530mm gearless drive system", "High-efficiency permanent magnet motor", "Advanced DC110V brake system", "450kg professional grade", "Maximum static load 5000kg"]'::jsonb, '530mm 기어리스 드라이브 시스템을 갖춘 고효율 트랙션 머신입니다. 영구자석 모터로 최고의 에너지 효율을 제공합니다.', 'High-efficiency gearless traction machine with 530mm drive system. Features permanent magnet motor for optimal energy efficiency.'),
(7, 'FJM2-B Gearless Traction Machine (650mm)', 'traction', 'FJM2-B-650', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJM2-650mm.png', '{"voltage": "380V", "type": "Gearless", "brake": "DC110V 4x1.5A", "weight": "580kg", "maxLoad": "8000kg"}'::jsonb, '["650mm large gearless drive system", "Ultra-high efficiency permanent magnet motor", "Quad DC110V brake system", "580kg heavy-duty construction", "Maximum static load 8000kg"]'::jsonb, '650mm 대형 기어리스 드라이브 시스템을 갖춘 초고효율 트랙션 머신입니다. 8000kg까지의 초대형 승강기에 적용 가능합니다.', 'Ultra-high efficiency gearless traction machine with 650mm large drive system. Suitable for super-heavy elevators up to 8000kg capacity.'),
(8, 'TM-800S Traction Machine', 'traction', 'TM-800S', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/TM-800S.png', '{"voltage": "380V", "power": "7.5kW", "brake": "DC110V", "weight": "300kg", "efficiency": "95%"}'::jsonb, '["High-efficiency 7.5kW motor", "Advanced traction control", "95% energy efficiency", "300kg compact design", "Maintenance-free operation"]'::jsonb, '7.5kW 고효율 모터를 탑재한 컴팩트 트랙션 머신입니다. 95% 에너지 효율과 무정비 운전이 특징입니다.', 'Compact traction machine with high-efficiency 7.5kW motor. Features 95% energy efficiency and maintenance-free operation.');

-- Insert serial numbers data
INSERT INTO serial_numbers (id, serial_number, product_id, installation_date, location, status, created_at) VALUES
(15, 'FJK125001', 1, '2024-01-15', 'Seoul Tower', 'active', '2025-01-22T07:25:42.123Z'),
(16, 'FJK225001', 3, '2024-02-20', 'Busan Convention Center', 'active', '2025-01-22T07:25:42.123Z'),
(17, 'FJK325001', 2, '2024-03-10', 'Incheon Airport', 'active', '2025-01-22T07:25:42.123Z'),
(18, 'FJK375001', 4, '2024-04-05', 'Gangnam Office', 'active', '2025-01-22T07:25:42.123Z'),
(19, 'FJK450001', 5, '2024-05-12', 'Daegu Hospital', 'active', '2025-01-22T07:25:42.123Z'),
(20, 'FJM530001', 6, '2024-06-18', 'Jeju Resort', 'active', '2025-01-22T07:25:42.123Z'),
(21, 'FJM650001', 7, '2024-07-22', 'Ulsan Factory', 'active', '2025-01-22T07:25:42.123Z'),
(22, 'TM800S001', 8, '2024-08-30', 'Gwangju Mall', 'active', '2025-01-22T07:25:42.123Z'),
(23, 'FJK125002', 1, '2024-09-15', 'Suwon Station', 'maintenance', '2025-01-22T07:25:42.123Z'),
(24, 'FJK225002', 3, '2024-10-08', 'Pohang Steel', 'active', '2025-01-22T07:25:42.123Z'),
(25, 'FJK325002', 2, '2024-11-20', 'Cheonan Office', 'active', '2025-01-22T07:25:42.123Z'),
(26, 'FJK375002', 4, '2024-12-05', 'Jeonju City Hall', 'active', '2025-01-22T07:25:42.123Z'),
(1, 'FCA-9000-2024-001', 1, '2024-01-15', 'Seoul Headquarters', 'active', '2025-01-22T07:25:42.123Z'),
(2, 'TM-800-2024-001', 8, '2024-02-20', 'Busan Branch', 'active', '2025-01-22T07:25:42.123Z'),
(3, 'SCP-2024-001', 3, '2024-03-10', 'Incheon Factory', 'maintenance', '2025-01-22T07:25:42.123Z');

-- Create admin user with bcrypt hashed password (admin123)
INSERT INTO admin_users (username, password, email, role) VALUES 
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXhFkfnHnJoC', 'admin@fuji-korea.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('serial_numbers_id_seq', (SELECT MAX(id) FROM serial_numbers));
SELECT setval('inquiries_id_seq', 1);
SELECT setval('admin_users_id_seq', (SELECT MAX(id) FROM admin_users));

-- Verify data
SELECT 'Products count:' as info, COUNT(*) as count FROM products
UNION ALL
SELECT 'Serial numbers count:' as info, COUNT(*) as count FROM serial_numbers
UNION ALL
SELECT 'Admin users count:' as info, COUNT(*) as count FROM admin_users;