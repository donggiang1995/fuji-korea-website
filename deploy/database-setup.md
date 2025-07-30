# DATABASE SETUP ON SPACESHIP

## Step 1: Create MySQL Database
1. cPanel → MySQL Databases
2. Create Database: fuji_korea_db
3. Full name will be: cpanel_username_fuji_korea_db

## Step 2: Create MySQL User
1. MySQL Users → Add New User
2. Username: fuji_admin
3. Password: Strong password
4. Full name will be: cpanel_username_fuji_admin

## Step 3: Add User to Database
1. Add User to Database
2. User: cpanel_username_fuji_admin
3. Database: cpanel_username_fuji_korea_db
4. Privileges: ALL PRIVILEGES

## Step 4: Import Database
1. phpMyAdmin → Select database
2. Import → Choose file: mysql-import-data.sql
3. Click Go
4. Verify: 5 products, 15 serials, 1 admin user

## Step 5: Update DATABASE_URL
DATABASE_URL=mysql://cpanel_username_fuji_admin:password@localhost:3306/cpanel_username_fuji_korea_db