# LẤY NODE.JS APP URL

## BƯỚC 1: LOGIN SPACESHIP CPANEL
1. **Login** với username/password Spaceship
2. **Access cPanel** dashboard

## BƯỚC 2: TÌM NODE.JS APP URL
1. **cPanel** → **Software** → **Node.js Apps**
2. **Click vào app** bạn đã tạo
3. **App Details** sẽ hiện:
   - **Application URL**: Đây là URL cần dùng
   - **Status**: Running/Stopped
   - **Port**: Thường là 3000

## BƯỚC 3: COPY URL
App URL thường có dạng:
- `http://your-server.spaceship.com:3000`
- `http://internal-ip:3000`
- `http://localhost:3000` (nếu internal)

## BƯỚC 4: SETUP REDIRECT
**Redirects** → **To** field:
- Paste **exact App URL** từ Node.js Apps

## ALTERNATIVE:
Nếu không thấy App URL, dùng:
- **To**: `http://127.0.0.1:3000`
- Hoặc **To**: `http://localhost:3000`

**Login cPanel để xem Node.js app configuration chi tiết!**