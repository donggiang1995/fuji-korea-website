# FIX FTP CONNECTION ISSUES

## LỖI: Timeout when trying to open data connection

### SOLUTION 1: UPDATED WORKFLOW
Fixed GitHub workflow với:
- **Protocol**: `ftps` (secure FTP)
- **Security**: `loose` (bypass SSL issues)
- **Retry**: `3` attempts
- **Upload only**: `dist/` folder (built files)
- **Server dir**: `/` (root, không cần public_html)

### SOLUTION 2: ALTERNATIVE FTP ACTION
Nếu vẫn lỗi, thử FTP action khác:

```yaml
- name: Deploy via SFTP
  uses: pressidium/lftp-mirror-action@v1
  with:
    host: ${{ secrets.SPACESHIP_HOST }}
    user: ${{ secrets.SPACESHIP_USERNAME }}
    pass: ${{ secrets.SPACESHIP_PASSWORD }}
    localDir: 'dist'
    remoteDir: '/'
```

### SOLUTION 3: CHECK SPACESHIP SETTINGS
- **FTP Mode**: Passive (PASV) 
- **Port**: 21 (standard) hoặc 990 (FTPS)
- **Firewall**: Allow GitHub IP ranges

### TEST WORKFLOW
Re-run GitHub Actions với updated settings.