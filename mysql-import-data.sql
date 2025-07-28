-- FUJI Global Korea - MySQL Import Data
-- Generated: 2025-01-26T06:55:00.000Z

USE fuji_korea_db;

-- Insert Products
INSERT INTO products (name, category, model, image, specifications, features, description_ko, description_en) VALUES
('FJE1 CONTROL CABINET', 'control', 'FJE1', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png', '{"floors":"Up to 48 floors","communication":"IoT enabled","noise":"< 50dBA","support":"Remote technical support"}', '["Remote technical support through APP","Remote monitoring through the IoT","Communication encoder supported","Balance coefficient auto-tuning","Noise reduction design < 50dBA"]', '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다. 50dBA 미만의 저소음 설계와 자동 균형 조정 기능을 제공합니다.', 'Smart control cabinet with remote technical support and IoT monitoring capabilities. Features noise reduction design under 50dBA and automatic balance coefficient tuning.'),
('FJK1-B Traction Machine (325mm)', 'traction', 'FJK1-B-325', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x0.84A","weight":"200kg","maxLoad":"2000kg"}', '["325mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","200kg lightweight design","Maximum static load 2000kg"]', '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다. 2:1 서스펜션 비율과 DC110V 브레이크 시스템을 적용했습니다.', 'Lightweight traction machine with 325mm drive sheave. Features 2:1 suspension ratio and DC110V brake system for reliable operation.'),
('FJE2 CONTROL CABINET', 'control', 'FJE2', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png', '{"floors":"48 floors standard","communication":"CANbus serial","control":"Duplex group control","backup":"UPS support"}', '["Standard: 48 floors, full collective (full serial connection)","Duplex onboard group control (CANbus serial communication)","Automatic door control mode","Selectable fireman operation","Supports 1 ph. 220 Vac UPS for rescue operation","Comprehensive trip diagnostics"]', '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다. 자동 도어 제어와 UPS 백업 시스템을 지원합니다.', 'Advanced control cabinet supporting 48 floors standard with duplex onboard group control. Features automatic door control and UPS backup system support.'),
('FJK1-B Traction Machine (400mm)', 'traction', 'FJK1-B-400', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png', '{"voltage":"380V","suspension":"2:1","brake":"DC110V 2x1.0A","weight":"285kg","maxLoad":"3000kg"}', '["400mm diameter drive sheave","2:1 suspension ratio","DC110V brake system","Heavy-duty 285kg construction","Maximum static load 3000kg"]', '400mm 드라이브 시브를 갖춘 중부하용 트랙션 머신입니다. 285kg 견고한 구조로 최대 3000kg까지 지원합니다.', 'Heavy-duty traction machine with 400mm drive sheave. Robust 285kg construction supports maximum static load up to 3000kg.'),
('FJK2-B450KG Traction Machine (240mm)', 'traction', 'FJK2-B450-240', 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png', '{"voltage":"AC380V","brake":"DC110V","weight":"140kg","duty":"S5-40%","maxLoad":"2500kg","protection":"IP41"}', '["Compact 140kg design","Single wrap configuration","F class insulation","IP41 protection rating","Maximum static load 2500kg","Traveling height <90m"]', '240mm 컴팩트 트랙션 머신으로 140kg 경량 설계입니다. F급 절연과 IP41 보호 등급을 제공합니다.', 'Compact 240mm traction machine with lightweight 140kg design. Features F class insulation and IP41 protection rating.');

-- Insert Serial Numbers
INSERT INTO serial_numbers (serial_number, product_id, installation_date, location, status) VALUES
('123456', 1, '2025-01-01', 'ABC', 'active'),
('25A123', 1, '2024-02-20', '부산 해운대구 센텀로 456', 'active'),
('TM-800-2024-001', 2, '2024-03-10', '대구 수성구 범어로 789', 'active'),
('TM-800-2024-002', 2, '2024-04-05', '인천 연수구 송도로 321', 'maintenance'),
('SCP-2024-001', 3, '2024-05-12', '광주 서구 치평로 654', 'active'),
('SCP-2024-002', 3, '2025-01-01', '대전 유성구 대학로 987', 'active'),
('FJK125001', 2, '2025-01-01', 'Korea', 'active'),
('FJK125002', 2, '2025-01-01', 'Korea', 'active'),
('FJK125003', 3, '2025-01-01', 'Korea', 'active'),
('FJK125004', 1, '2025-01-01', 'Korea', 'active'),
('FJK125005', 3, '2025-01-01', 'Korea', 'active'),
('FJK125006', 1, '2025-01-01', 'Korea', 'active'),
('FJK125007', 1, '2025-01-01', 'Korea', 'active'),
('FJK125008', 1, '2025-01-01', 'Korea', 'active'),
('FJK125009', 1, '2025-01-01', 'Korea', 'active');

-- Admin Users (reset password after import)
-- Default password: admin123 (hashed with bcrypt)
INSERT INTO admin_users (username, email, password, role) VALUES
('admin', 'admin@fuji-global-korea.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE0BXnTSJpBGpL6', 'super_admin');

-- Reset AUTO_INCREMENT values
ALTER TABLE products AUTO_INCREMENT = 6;
ALTER TABLE serial_numbers AUTO_INCREMENT = 16;
ALTER TABLE inquiries AUTO_INCREMENT = 1;
ALTER TABLE admin_users AUTO_INCREMENT = 2;