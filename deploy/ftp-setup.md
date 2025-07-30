# FTP CONFIGURATION FOR GITHUB ACTIONS

## Method 1: Use Main cPanel Account
Host: your-domain.com (or ftp.your-domain.com)
Username: your_cpanel_username
Password: your_cpanel_password
Directory: /public_html/

## Method 2: Create Separate FTP Account (Recommended)
1. cPanel → FTP Accounts → Create FTP Account
2. Username: github_deploy
3. Password: Strong password (save for GitHub Secrets)
4. Directory: /public_html/
5. Quota: Unlimited

## GitHub Secrets Values:
SPACESHIP_HOST = your-domain.com
SPACESHIP_USERNAME = your_cpanel_username (or github_deploy)
SPACESHIP_PASSWORD = your_cpanel_password (or FTP password)