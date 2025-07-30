# SETUP REDIRECT VỚI APP URL

## THÔNG TIN TỪ SCREENSHOT:
- **App URL**: `fujiglobal.kr/`
- **Status**: `started (v18.24.1)`  
- **Mode**: `development`

## BƯỚC 1: SETUP REDIRECT
**cPanel** → **Redirects** → **Add Redirect**:
- **Type**: `Permanent (301)`
- **From**: `www.fujiglobal.kr` (hoặc domain chính)
- **To**: `http://fujiglobal.kr/` 
- **Wild Card Redirect**: ✅ Check
- **Create**

## BƯỚC 2: ALTERNATIVE - INTERNAL URL
Nếu redirect không work, thử:
- **To**: `http://127.0.0.1:3000`
- **To**: `http://localhost:3000`

## BƯỚC 3: PRODUCTION MODE
App đang ở **development mode**. Để production:
1. **Click vào app** `fujiglobal.kr/`
2. **Change Mode** → `production`
3. **Restart** app

## BƯỚC 4: TEST
Visit domain → Should see FUJI website

**App đã running! Setup redirect từ main domain về app URL.**