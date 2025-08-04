-- FUJI Global Korea Database Export
-- Exported on: 2025-08-04T09:40:36.374Z
-- 
-- This file contains the complete database structure and data
-- for the FUJI Global Korea corporate website.

-- ================================
-- Table: products
-- ================================

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

INSERT INTO products (id, name, category, model, image, specifications, features, description_ko, description_en) VALUES
(1, 'FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors":"Up to 48 floors","communication":"IoT enabled","noise":"< 50dBA","support":"Remote technical support"}'::jsonb, '["Remote technical support through APP","Remote monitoring through the IoT","Communication encoder supported","Balance coefficient auto-tuning","Noise reduction design < 50dBA"]'::jsonb, '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다. 50dBA 미만의 저소음 설계와 자동 균형 조정 기능을 제공합니다.', 'Smart control cabinet with remote technical support and IoT monitoring capabilities. Features noise reduction design under 50dBA and automatic balance coefficient tuning.'),
(3, 'FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors":"48 floors standard","communication":"CANbus serial","control":"Duplex group control","backup":"UPS support"}'::jsonb, '["Standard: 48 floors, full collective (full serial connection)","Duplex onboard group control (CANbus serial communication)","Automatic door control mode","Selectable fireman operation","Supports 1 ph. 220 Vac UPS for rescue operation","Comprehensive trip diagnostics"]'::jsonb, '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다. 자동 도어 제어와 UPS 백업 시스템을 지원합니다.', 'Advanced control cabinet supporting 48 floors standard with duplex onboard group control. Features automatic door control and UPS backup system support.'),
(2, 'FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x0.84A","weight":"200kg","maxLoad":"2000kg"}'::jsonb, '["325mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","200kg lightweight design","Maximum static load 2000kg"]'::jsonb, '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다. 2:1 서스펜션 비율과 DC110V 브레이크 시스템을 적용했습니다.', 'Lightweight traction machine with 325mm drive sheave. Features 2:1 suspension ratio and DC110V brake system for reliable operation.'),
(4, 'FJK1-B Traction Machine (400mm)', 'traction', 'FJK1-B-400', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x1.0A","weight":"285kg","maxLoad":"3000kg"}'::jsonb, '["400mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","Heavy-duty 285kg construction","Maximum static load 3000kg"]'::jsonb, '400mm 드라이브 시브를 갖춘 중부하용 트랙션 머신입니다. 285kg 견고한 구조로 최대 3000kg까지 지원합니다.', 'Heavy-duty traction machine with 400mm drive sheave. Robust 285kg construction supports maximum static load up to 3000kg.'),
(5, 'FJK2-B450KG Traction Machine (240mm)', 'traction', 'FJK2-B450-240', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png', '{"voltage":"AC380V","brake":"DC110V","weight":"140kg","duty":"S5-40%","maxLoad":"2500kg","protection":"IP41"}'::jsonb, '["Compact 140kg design","Single wrap configuration","F class insulation","IP41 protection rating","Maximum static load 2500kg","Traveling height <90m"]'::jsonb, '240mm 컴팩트 트랙션 머신으로 140kg 경량 설계입니다. F급 절연과 IP41 보호 등급을 제공합니다.', 'Compact 240mm traction machine with lightweight 140kg design. Features F class insulation and IP41 protection rating.'),
(6, 'FUJI Smart Elevator Controller', 'control-systems', 'FSC-2000', '/images/elevator-controller.jpg', '{"voltage":"220V/380V","frequency":"50/60Hz","capacity":"1000kg-3000kg"}'::jsonb, '["스마트 제어","에너지 절약","안전 시스템"]'::jsonb, '차세대 스마트 엘리베이터 제어 시스템', 'Next-generation smart elevator control system'),
(7, 'FUJI Traction Machine', 'traction-machines', 'FTM-1800', '/images/traction-machine.jpg', '{"power":"7.5kW-22kW","speed":"1.0-4.0 m/s","load":"630kg-2500kg"}'::jsonb, '["고효율 모터","저소음","내구성"]'::jsonb, '고성능 엘리베이터 견인기', 'High-performance elevator traction machine'),
(8, 'FUJI Safety Components', 'safety-components', 'FSP-300', '/images/safety-parts.jpg', '{"standard":"EN81-1/2","certification":"CE/KS","temperature":"-40°C to +85°C"}'::jsonb, '["안전 인증","고신뢰성","긴급 정지"]'::jsonb, '엘리베이터 안전 부품 세트', 'Elevator safety component set');

-- ================================
-- Table: serial_numbers
-- ================================

CREATE TABLE IF NOT EXISTS serial_numbers (
    id SERIAL PRIMARY KEY,
    serial_number TEXT NOT NULL UNIQUE,
    product_id INTEGER REFERENCES products(id),
    installation_date TEXT,
    location TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO serial_numbers (id, serial_number, product_id, installation_date, location, status, created_at) VALUES
(3, 'TM-800-2024-001', 2, '2024-03-10', '대구 수성구 범어로 789', 'active', '2025-07-22T08:21:20.533Z'),
(4, 'TM-800-2024-002', 2, '2024-04-05', '인천 연수구 송도로 321', 'maintenance', '2025-07-22T08:21:20.533Z'),
(5, 'SCP-2024-001', 3, '2024-05-12', '광주 서구 치평로 654', 'active', '2025-07-22T08:21:20.533Z'),
(2, '25A123', 1, '2024-02-20', '부산 해운대구 센텀로 456', 'active', '2025-07-22T08:21:20.533Z'),
(6, 'SCP-2024-002', 3, '2025', '대전 유성구 대학로 987', 'active', '2025-07-22T08:21:20.533Z'),
(1, '123456', 1, '2025', 'ABC', 'active', '2025-07-22T08:21:20.533Z'),
(7, 'FJK125001', 2, '2025', 'Korea', 'active', '2025-07-25T08:09:02.801Z'),
(8, 'FJK125002', 2, '2025', 'Korea', 'active', '2025-07-25T08:09:02.858Z'),
(9, 'FJK125003', 3, '2025', 'Korea', 'active', '2025-07-25T08:09:02.908Z'),
(10, 'FJK125004', 1, '2025', 'Korea', 'active', '2025-07-25T08:09:02.955Z'),
(11, 'FJK125005', 3, '2025', 'Korea', 'active', '2025-07-25T08:09:03.002Z'),
(12, 'FJK125006', 1, '2025', 'Korea', 'active', '2025-07-25T08:09:03.051Z'),
(13, 'FJK125007', 1, '2025', 'Korea', 'active', '2025-07-25T08:09:03.097Z'),
(14, 'FJK125008', 1, '2025', 'Korea', 'active', '2025-07-25T08:09:03.144Z'),
(15, 'FJK125009', 1, '2025', 'Korea', 'active', '2025-07-25T08:09:03.189Z');

-- ================================
-- Table: inquiries
-- ================================

CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Table: admin_users (structure only)
-- ================================

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Note: Admin user data not exported for security reasons
-- You'll need to create admin users manually in the new system

-- ================================
-- Table: admin_sessions (structure only)
-- ================================

CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reset sequences to correct values
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('serial_numbers_id_seq', (SELECT MAX(id) FROM serial_numbers));
SELECT setval('inquiries_id_seq', (SELECT MAX(id) FROM inquiries));
SELECT setval('admin_users_id_seq', 1);

-- Export completed successfully!
