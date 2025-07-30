# BƯỚC 4: MAKE WEBSITE PUBLIC

## ĐÃ XONG:
✅ GitHub deploy working  
✅ Files uploaded to Spaceship  

## TIẾP THEO:

### BƯỚC 1: START NODE.JS APP
1. **Spaceship cPanel** → **Node.js Apps**
2. **Click vào app** trong danh sách
3. **Status**: Stopped → **Click Start**
4. **Wait** → Status: Running

### BƯỚC 2: CHECK APP RUNNING
App sẽ chạy trên internal port (3000). Test:
- **App URL**: Có thể là `http://internal-ip:3000`
- **Logs**: Check app logs để thấy "Server running"

### BƯỚC 3: POINT DOMAIN
**2 cách setup domain:**

#### CÁCH A: SUBDOMAIN
1. **cPanel** → **Subdomains**
2. **Create subdomain**: `app.your-domain.com`
3. **Document Root**: Point to app directory
4. **Save**

#### CÁCH B: MAIN DOMAIN  
1. **cPanel** → **Addon Domains** hoặc **Main Domain**
2. **Document Root**: Point to app directory
3. **Save**

### BƯỚC 4: TEST WEBSITE
Visit `your-domain.com` → Should see FUJI website

### BƯỚC 5: SSL CERTIFICATE
**cPanel** → **SSL/TLS** → **Let's Encrypt** → Enable

**Website sẽ public sau khi start app + point domain!**