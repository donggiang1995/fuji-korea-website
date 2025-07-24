/**
 * 🖼️ CẤU HÌNH HÌNH ẢNH WEBSITE - FUJI GLOBAL KOREA
 * ================================================================
 * File này quản lý tất cả hình ảnh sử dụng trên website.
 * Thay đổi URL ở đây để cập nhật hình ảnh trên toàn bộ website.
 * 
 * 📝 HƯỚNG DẪN SỬ DỤNG:
 * 1. Thay thế URL trong các section tương ứng
 * 2. Website sẽ tự động cập nhật hình ảnh mới
 * 3. Có hệ thống fallback tự động khi hình bị lỗi
 * 4. Hỗ trợ hình từ: Unsplash, FUJI website, hoặc upload riêng
 */

export const WEBSITE_IMAGES = {

  // 🏠 TRANG CHỦ - HERO SECTION
  // Hình ảnh chính trên banner đầu trang
  hero: {
    headquarters: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    // Khuyến nghị: 800x600px, hình tòa nhà/công ty hiện đại
  },

  // ⭐ TRANG CHỦ - TÍNH NĂNG NỔI BẬT
  // 3 hình ảnh showcase các tính năng chính
  features: {
    safety: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    // Chủ đề: An toàn, bảo mật thang máy
    
    smartTech: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    // Chủ đề: Công nghệ thông minh, IoT, AI
    
    highPerformance: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    // Chủ đề: Hiệu suất cao, máy móc hiện đại
    // Khuyến nghị: 800x400px cho tất cả features
  },

  // 🖼️ TRANG CHỦ - THƯ VIỆN CÔNG NGHỆ
  // 4 hình ảnh minh họa quy trình sản xuất
  gallery: {
    manufacturing: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    // Chủ đề: Quy trình sản xuất, nhà máy
    
    testing: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    // Chủ đề: Kiểm tra chất lượng, testing
    
    installation: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    // Chủ đề: Lắp đặt, thi công thang máy
    
    maintenance: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    // Chủ đề: Bảo trì, sửa chữa
    // Khuyến nghị: 400x300px cho tất cả gallery items
  },

  // 📦 TRANG SẢN PHẨM
  // Hình ảnh sản phẩm thực tế từ FUJI Global Korea
  products: {
    fje1: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-2.jpg",
    // Sản phẩm FJE1 Control Cabinet
    
    fje2: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-1.jpg",
    // Sản phẩm FJE2 Advanced System
    
    fjkSeries: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-3.jpg",
    // Dòng sản phẩm FJK Series
    
    sectionBackground: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    // Background cho section sản phẩm
    // Khuyến nghị: Giữ nguyên URL từ FUJI website cho sản phẩm thật
  },

  // 🏆 THÀNH TỰU & GIẢI THƯỞNG
  awards: {
    achievements: "https://fuji-global-korea.com/wp-content/uploads/2024/05/hinh-1.jpg"
    // Hình ảnh thành tựu, giải thưởng công ty
  },

  // 🏭 TRANG ABOUT - NHẰ MÁY & THIẾT BỊ
  // Hình ảnh nhà máy, máy móc để tăng tính uy tín
  facilities: {
    factory: "https://images.unsplash.com/photo-1565088063775-376d37ac2d7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    // Nhà máy sản xuất tổng quan
    
    machinery: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    // Máy móc, thiết bị CNC
    
    production: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    // Dây chuyền sản xuất
    
    quality: "https://images.unsplash.com/photo-1494412519520-f21682fa2bb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    // Kiểm soát chất lượng
    
    research: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    // Phòng nghiên cứu phát triển
    
    team: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    // Đội ngũ kỹ sư chuyên nghiệp
    // Khuyến nghị: 800x600px cho facilities, chủ đề công nghiệp
  },

  // 🛡️ HÌNH ẢNH DỰ PHÒNG
  // Tự động hiển thị khi hình chính bị lỗi
  fallback: {
    default: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    // Fallback chung cho các hình thông thường
    
    industrial: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    // Fallback cho hình công nghiệp, máy móc
  }
};

// 📋 TEMPLATE URL CHO CÁC NGUỒN HÌNH ẢNH PHỔ BIẾN:
// 
// 🔸 UNSPLASH (miễn phí, chất lượng cao):
// "https://images.unsplash.com/photo-[ID]?ixlib=rb-4.0.3&auto=format&fit=crop&w=[WIDTH]&h=[HEIGHT]"
//
// 🔸 FUJI GLOBAL KOREA (hình thật từ website):
// "https://fuji-global-korea.com/wp-content/uploads/2024/05/[FILENAME].jpg"
//
// 🔸 UPLOAD RIÊNG (nếu upload vào attached_assets):
// Sử dụng: import imagePath from '@assets/[FILENAME]'
// Sau đó: imagePath trong code

// 🎯 GỢI Ý CHỦ ĐỀ TÌM KIẾM HÌNH:
// - "modern factory building" - nhà máy hiện đại
// - "industrial machinery" - máy móc công nghiệp  
// - "elevator installation" - lắp đặt thang máy
// - "quality control laboratory" - phòng lab kiểm tra
// - "engineers working" - kỹ sư làm việc
// - "smart technology" - công nghệ thông minh
// - "manufacturing process" - quy trình sản xuất

// Hướng dẫn sử dụng:
// 1. Để thay đổi hình ảnh, chỉ cần cập nhật URL trong file này
// 2. Website sẽ tự động sử dụng hình ảnh mới
// 3. Có thể sử dụng hình từ Unsplash, FUJI website, hoặc upload hình riêng
// 4. Khuyến nghị kích thước:
//    - Hero: 800x600px
//    - Features: 800x400px  
//    - Gallery: 400x300px
//    - Products: kích thước gốc từ FUJI website