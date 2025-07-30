# SIMPLE HTML REDIRECT METHOD

## NHANH NHẤT - HTML REDIRECT:

### BƯỚC 1: FILE MANAGER
**cPanel** → **File Manager** → **public_html**

### BƯỚC 2: TẠO FILE index.html
**Create New File** → `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>FUJI Global Korea</title>
    <meta http-equiv="refresh" content="0; url=http://fujiglobal.kr:3000">
    <script>window.location.href = "http://fujiglobal.kr:3000";</script>
</head>
<body>
    <h1>Redirecting to FUJI Global Korea...</h1>
    <p>If not redirected, <a href="http://fujiglobal.kr:3000">click here</a></p>
</body>
</html>
```

### BƯỚC 3: TEST
Visit `fujiglobal.kr` → Auto redirect to Node.js app

**Cách này chắc chắn work - browser sẽ tự redirect!**