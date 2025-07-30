<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - Elevator Technology Solutions</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: #f8fafc;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        header { 
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); 
            color: white; 
            padding: 1rem 0; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header-content { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            flex-wrap: wrap;
        }
        .logo { 
            font-size: 1.8rem; 
            font-weight: bold; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        nav ul { display: flex; list-style: none; gap: 2rem; flex-wrap: wrap; }
        nav a { 
            color: white; 
            text-decoration: none; 
            transition: all 0.3s; 
            padding: 0.5rem 1rem;
            border-radius: 5px;
        }
        nav a:hover { 
            background: rgba(255,255,255,0.2); 
            transform: translateY(-2px);
        }
        
        .hero { 
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); 
            padding: 4rem 0; 
            text-align: center; 
        }
        .hero h1 { 
            font-size: 3.5rem; 
            margin-bottom: 1rem; 
            color: #1e3a8a; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .hero p { 
            font-size: 1.3rem; 
            color: #64748b; 
            max-width: 700px; 
            margin: 0 auto 2rem; 
        }
        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        .btn-primary {
            background: #1e3a8a;
            color: white;
        }
        .btn-primary:hover {
            background: #1e40af;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: white;
            color: #1e3a8a;
            border: 2px solid #1e3a8a;
        }
        .btn-secondary:hover {
            background: #1e3a8a;
            color: white;
        }
        
        .features {
            padding: 4rem 0;
            background: white;
        }
        .features h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #1e3a8a;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .feature-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .products {
            padding: 4rem 0;
            background: #f1f5f9;
        }
        .products h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #1e3a8a;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        .product-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .product-card:hover {
            transform: translateY(-5px);
        }
        .product-card h3 {
            color: #1e3a8a;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .product-specs {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        .spec-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .spec-item:last-child {
            border-bottom: none;
        }
        
        .contact {
            background: #1e3a8a;
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        .contact h2 {
            margin-bottom: 2rem;
            font-size: 2.5rem;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .contact-item {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 12px;
        }
        .contact-item h3 {
            margin-bottom: 1rem;
            color: #93c5fd;
        }
        
        footer {
            background: #0f172a;
            color: #94a3b8;
            padding: 3rem 0;
            text-align: center;
        }
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .footer-section h4 {
            color: white;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .header-content { flex-direction: column; gap: 1rem; }
            .hero h1 { font-size: 2.5rem; }
            .hero-buttons { flex-direction: column; align-items: center; }
            nav ul { justify-content: center; }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">🏢 FUJI GLOBAL KOREA</div>
                <nav>
                    <ul>
                        <li><a href="#home">홈</a></li>
                        <li><a href="#products">제품</a></li>
                        <li><a href="#services">서비스</a></li>
                        <li><a href="#contact">연락처</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero" id="home">
        <div class="container">
            <h1>엘리베이터 기술의 선두주자</h1>
            <p>현대 건물을 위한 첨단 엘리베이터 제어 시스템과 견인기를 제공하는 선도 기업입니다. 안전성, 효율성, 혁신을 통해 최고의 수직 교통 솔루션을 제공합니다.</p>
            <div class="hero-buttons">
                <a href="#products" class="btn btn-primary">제품 보기</a>
                <a href="#contact" class="btn btn-secondary">문의하기</a>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2>핵심 역량</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>첨단 기술</h3>
                    <p>최신 IoT 및 스마트 기술을 적용한 차세대 엘리베이터 솔루션</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🛡️</div>
                    <h3>안전 보증</h3>
                    <p>국제 안전 기준을 충족하는 신뢰성 높은 제품과 서비스</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔧</div>
                    <h3>전문 서비스</h3>
                    <p>설치부터 유지보수까지 원스톱 기술 지원 서비스</p>
                </div>
            </div>
        </div>
    </section>

    <section class="products" id="products">
        <div class="container">
            <h2>주요 제품</h2>
            <div class="product-grid">
                <div class="product-card">
                    <h3>🎛️ FCA-9000 시리즈 제어판</h3>
                    <p>안전하고 효율적인 운영을 보장하는 고급 엘리베이터 제어판 시스템</p>
                    <div class="product-specs">
                        <div class="spec-item">
                            <span><strong>전압:</strong></span>
                            <span>220V</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>주파수:</strong></span>
                            <span>50Hz</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>용량:</strong></span>
                            <span>1000kg</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>특징:</strong></span>
                            <span>첨단 제어, 에너지 효율</span>
                        </div>
                    </div>
                </div>
                
                <div class="product-card">
                    <h3>⚙️ TM-800S 견인기</h3>
                    <p>조용하고 안정적인 엘리베이터 운행을 제공하는 고효율 견인기</p>
                    <div class="product-specs">
                        <div class="spec-item">
                            <span><strong>출력:</strong></span>
                            <span>7.5kW</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>속도:</strong></span>
                            <span>1.75m/s</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>하중:</strong></span>
                            <span>800kg</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>특징:</strong></span>
                            <span>고효율, 저소음, 컴팩트</span>
                        </div>
                    </div>
                </div>
                
                <div class="product-card">
                    <h3>📱 SCP-2024 스마트 제어판</h3>
                    <p>IoT 연결 및 원격 모니터링이 가능한 스마트 제어판</p>
                    <div class="product-specs">
                        <div class="spec-item">
                            <span><strong>디스플레이:</strong></span>
                            <span>7인치 LCD</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>연결성:</strong></span>
                            <span>IoT 지원</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>층수:</strong></span>
                            <span>최대 32층</span>
                        </div>
                        <div class="spec-item">
                            <span><strong>기능:</strong></span>
                            <span>스마트 모니터링, 원격 진단</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact" id="contact">
        <div class="container">
            <h2>연락처 정보</h2>
            <p>엘리베이터 솔루션 및 기술 지원을 위해 연락주세요</p>
            <div class="contact-grid">
                <div class="contact-item">
                    <h3>📍 본사</h3>
                    <p>대한민국 서울특별시<br>
                    사업자등록번호: 123-45-67890</p>
                </div>
                <div class="contact-item">
                    <h3>🔧 기술 지원</h3>
                    <p>24시간 지원 가능<br>
                    유지보수 및 설치 서비스</p>
                </div>
                <div class="contact-item">
                    <h3>🕒 운영 시간</h3>
                    <p>월-금: 오전 9시 - 오후 6시<br>
                    토요일: 오전 9시 - 오후 1시</p>
                </div>
                <div class="contact-item">
                    <h3>💼 사업 분야</h3>
                    <p>엘리베이터 기술<br>
                    제어 시스템 · 견인기 · 유지보수</p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>FUJI Global Korea</h4>
                    <p>엘리베이터 기술의 혁신을 선도하는 기업</p>
                </div>
                <div class="footer-section">
                    <h4>제품</h4>
                    <p>제어판 시스템<br>견인기<br>스마트 솔루션</p>
                </div>
                <div class="footer-section">
                    <h4>서비스</h4>
                    <p>설치<br>유지보수<br>기술 지원</p>
                </div>
                <div class="footer-section">
                    <h4>품질</h4>
                    <p>국제 안전 기준<br>품질 보증<br>고객 만족</p>
                </div>
            </div>
            <p>&copy; 2025 FUJI Global Korea. All rights reserved. | 엘리베이터 기술의 선두주자</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('nav a, .btn').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // API Status check
        <?php echo "console.log('FUJI Global Korea website loaded: " . date('Y-m-d H:i:s') . "');"; ?>
        
        // Test API if available
        setTimeout(() => {
            fetch('/api/health.php')
                .then(response => response.json())
                .then(data => console.log('API Health:', data))
                .catch(error => console.log('Static mode - API not available'));
        }, 1000);
    </script>
</body>
</html>