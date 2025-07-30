# UPDATE CONFIG CHO DATABASE MỚI

## DATABASE INFO MỚI:
- Database: `wodpqkkqov_fuji_korea_db`
- Username: `wodpqkkqov_fuji_admin`

## ENVIRONMENT VARIABLE MỚI:
```
DATABASE_URL=mysql://wodpqkkqov_fuji_admin:YOUR_PASSWORD@localhost:3306/wodpqkkqov_fuji_korea_db
```

## CÁCH UPDATE:

### 1. NODE.JS APP
cPanel → Node.js Apps → Your App → Environment Variables:
- Update `DATABASE_URL` với thông tin mới

### 2. IMPORT DATABASE
- phpMyAdmin → Select `wodpqkkqov_fuji_korea_db`
- Import `mysql-import-data.sql`
- Should work now với database name đúng

### 3. TEST CONNECTION
- Website sẽ connect được database
- Serial search sẽ work với data đã import