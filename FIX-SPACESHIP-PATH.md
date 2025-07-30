# FIX SPACESHIP DIRECTORY

## SPACESHIP HOSTING PATHS:

### THƯỜNG DÙNG:
- `/home/wodpqkkqov/domains/your-domain.com/public_html`
- `/home/wodpqkkqov/www`
- `/home/www/wodpqkkqov/htdocs`

### THỬ TỪNG CÁCH:

#### CÁCH 1: DOMAIN PATH
**Application Root**: `/home/wodpqkkqov/domains/your-domain.com/public_html`

#### CÁCH 2: WWW PATH  
**Application Root**: `/home/wodpqkkqov/www`

#### CÁCH 3: HTDOCS PATH
**Application Root**: `/home/www/wodpqkkqov/htdocs`

### HOẶC:
Để trống **Application Root** → System sẽ tự detect path đúng.

### UPDATE GITHUB WORKFLOW:
Sau khi biết path đúng, update `.github/workflows/deploy-to-spaceship.yml`:
- `server-dir: /path/to/correct/directory/`