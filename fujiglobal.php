<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUJI Global Korea - Working Website</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f0f0f0; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        h1 { color: #1e3a8a; text-align: center; margin-bottom: 30px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .info { background: #cce7ff; border: 1px solid #b3d9ff; color: #0056b3; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .product { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #1e3a8a; }
        .contact { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .btn { background: #1e3a8a; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; display: inline-block; margin: 10px 5px; }
        .btn:hover { background: #1e40af; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏢 FUJI Global Korea</h1>
        
        <div class="success">
            <h3>✅ Website Successfully Deployed!</h3>
            <p><strong>Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
            <p><strong>Status:</strong> Online and Working</p>
        </div>

        <div class="info">
            <h3>🚀 Company Overview</h3>
            <p><strong>Business:</strong> Elevator Technology Solutions</p>
            <p><strong>Location:</strong> Seoul, South Korea</p>
            <p><strong>Specialization:</strong> Control Systems, Traction Machines, Smart Technology</p>
        </div>

        <h2>🎛️ Our Products</h2>
        
        <div class="product">
            <h3>FCA-9000 Series Control Panel</h3>
            <p><strong>Advanced elevator control system</strong></p>
            <ul>
                <li>Voltage: 220V / Frequency: 50Hz</li>
                <li>Capacity: 1000kg</li>
                <li>Features: Advanced Control, Energy Efficient, Safety Certified</li>
            </ul>
        </div>

        <div class="product">
            <h3>TM-800S Traction Machine</h3>
            <p><strong>High-efficiency traction system</strong></p>
            <ul>
                <li>Power: 7.5kW / Speed: 1.75m/s</li>
                <li>Load: 800kg</li>
                <li>Features: High Efficiency, Low Noise, Compact Design</li>
            </ul>
        </div>

        <div class="product">
            <h3>SCP-2024 Smart Control Panel</h3>
            <p><strong>IoT-enabled smart control system</strong></p>
            <ul>
                <li>Display: 7-inch LCD / Connectivity: IoT Ready</li>
                <li>Floors: Up to 32 floors</li>
                <li>Features: Smart Monitoring, Remote Diagnostics, Energy Management</li>
            </ul>
        </div>

        <div class="contact">
            <h3>📞 Contact Information</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div>
                    <h4>📍 Head Office</h4>
                    <p>Seoul, South Korea<br>Business Registration: 123-45-67890</p>
                </div>
                <div>
                    <h4>🔧 Technical Support</h4>
                    <p>24/7 Support Available<br>Installation & Maintenance</p>
                </div>
                <div>
                    <h4>🕒 Business Hours</h4>
                    <p>Mon-Fri: 9:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 1:00 PM</p>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="/api/health.php" class="btn">Test API</a>
            <a href="/api/products.php" class="btn">View Products Data</a>
        </div>

        <div style="text-align: center; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>&copy; 2025 FUJI Global Korea. All rights reserved.</p>
            <p><strong>Elevator Technology Excellence</strong></p>
        </div>
    </div>

    <script>
        console.log("FUJI Global Korea website loaded successfully!");
        
        // Test API endpoints
        fetch('/api/health.php')
            .then(response => response.json())
            .then(data => {
                console.log('API Health Check:', data);
                document.body.insertAdjacentHTML('beforeend', 
                    '<div style="position: fixed; bottom: 20px; right: 20px; background: green; color: white; padding: 10px; border-radius: 5px;">API Connected ✅</div>'
                );
            })
            .catch(error => {
                console.log('API in static mode');
                document.body.insertAdjacentHTML('beforeend', 
                    '<div style="position: fixed; bottom: 20px; right: 20px; background: orange; color: white; padding: 10px; border-radius: 5px;">Static Mode 📄</div>'
                );
            });
    </script>
</body>
</html>