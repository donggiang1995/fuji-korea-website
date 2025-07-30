# FIX NODE.JS APP CONFIGURATION

## VẤN ĐỀ: localhost:3000 không accessible từ ngoài

## SOLUTION 1: UPDATE NODE.JS APP CONFIG
1. **Node.js Apps** → Click vào app
2. **Environment Variables** → Add/Update:
   - **HOST**: `0.0.0.0` (bind to all interfaces)
   - **PORT**: `3000`
3. **Restart** app

## SOLUTION 2: CHECK APP STARTUP FILE
App startup file phải bind đúng:
```javascript
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on 0.0.0.0:3000');
});
```

## SOLUTION 3: CHANGE APPLICATION URL
**Node.js Apps** → **Application URL**:
- Thay từ `fujiglobal.kr/` thành `fujiglobal.kr`
- **Save** và **Restart**

## SOLUTION 4: DIRECT ACCESS VIA SPACESHIP
Thử access trực tiếp:
- `http://server37.shared.spaceship.host:3000`
- Hoặc IP + port từ Spaceship

## TEST:
Sau khi fix, HTML redirect sẽ work với URL đúng.