<?php
header('Content-Type: text/html; charset=UTF-8');
echo '<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - PHP Version</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(45deg, #3498db, #2980b9); color: white; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 15px; backdrop-filter: blur(10px); }
        .success { background: #27ae60; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px; font-size: 1.2rem; font-weight: bold; }
        h1 { text-align: center; font-size: 3rem; margin-bottom: 20px; }
        .info { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ FUJI Global Korea Website - PHP Version Active!</div>
        <h1>FUJI Global Korea</h1>
        <p style="text-align: center; font-size: 1.3rem;">엘리베이터 기술의 선두주자</p>
        
        <div class="info">
            <h3>🏢 회사 소개</h3>
            <p>FUJI Global Korea는 엘리베이터 기술 분야의 글로벌 리더로서, 최첨단 제어 시스템과 견인 기계를 개발하고 제조합니다.</p>
        </div>
        
        <div class="info">
            <h3>⚙️ 주요 제품</h3>
            <p><strong>FCA-9000 시리즈:</strong> 차세대 엘리베이터 제어 시스템<br>
            <strong>TM-800S:</strong> 고효율 견인 기계<br>
            <strong>SCP-2024:</strong> 스마트 제어 패널</p>
        </div>
        
        <div class="info">
            <h3>📞 연락처</h3>
            <p><strong>본사:</strong> 서울특별시 강남구<br>
            <strong>전화:</strong> 02-XXXX-XXXX<br>
            <strong>이메일:</strong> info@fujiglobal.kr</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; opacity: 0.8;">
            <p>&copy; 2025 FUJI Global Korea. All Rights Reserved.</p>
            <p>Server Time: '.date('Y-m-d H:i:s').'</p>
            <p>PHP Version: '.phpversion().'</p>
        </div>
    </div>
</body>
</html>';
?>';