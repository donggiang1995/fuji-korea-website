# IMPORT DATABASE - ĐÚNG THỨ TỰ

## BƯỚC 1: TẠO TABLES
1. phpMyAdmin → Select database `wodpqkkqov_fuji_korea_db`
2. SQL tab
3. Copy paste toàn bộ nội dung file `mysql-create-tables.sql`
4. Go
5. Verify: 5 tables created

## BƯỚC 2: IMPORT DATA
1. Import tab
2. Choose file: `mysql-import-data.sql`
3. Go
4. Verify: Data inserted (5 products, 15 serials, 1 admin)

## BƯỚC 3: TEST
- Products table: 5 rows
- Serial_numbers table: 15 rows  
- Admin_users table: 1 row
- Inquiries table: 0 rows (empty)
- Admin_sessions table: 0 rows (empty)

Làm theo thứ tự này sẽ work.