# SSL CERTIFICATE SETUP

## Let's Encrypt SSL (Free)
1. cPanel → SSL/TLS
2. Let's Encrypt SSL
3. Select your domain
4. Click Issue
5. Wait 1-2 minutes for activation

## Force HTTPS Redirect
1. cPanel → Redirects
2. Type: Permanent (301)
3. From: http://your-domain.com/*
4. To: https://your-domain.com/$1
5. Click Add

## Verify SSL
- Visit: https://your-domain.com
- Should show secure padlock icon
- Mixed content warnings mean some resources still use HTTP