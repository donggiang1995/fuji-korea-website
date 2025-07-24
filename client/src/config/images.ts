// Cấu hình hình ảnh cho toàn bộ website
// Thay đổi URL hình ảnh tại đây để cập nhật toàn bộ website

export const WEBSITE_IMAGES = {
  // Hero Section
  hero: {
    headquarters: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },

  // Core Features (3 hình)
  features: {
    safety: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    smartTech: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", 
    highPerformance: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },

  // Technology Gallery (4 hình)
  gallery: {
    manufacturing: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    testing: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    installation: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    maintenance: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },

  // Product Showcase (3 hình sản phẩm thật từ FUJI)
  products: {
    fje1: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-2.jpg",
    fje2: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-1.jpg", 
    fjkSeries: "https://fuji-global-korea.com/wp-content/uploads/2024/05/lift-3.jpg",
    sectionBackground: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
  },

  // Awards Section
  awards: {
    achievements: "https://fuji-global-korea.com/wp-content/uploads/2024/05/hinh-1.jpg"
  },

  // Manufacturing & Facilities (cho trang About)
  facilities: {
    factory: "https://images.unsplash.com/photo-1565088063775-376d37ac2d7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    machinery: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    production: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    quality: "https://images.unsplash.com/photo-1494412519520-f21682fa2bb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    research: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    team: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },

  // Fallback images (dự phòng khi hình chính không tải được)
  fallback: {
    default: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    industrial: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  }
};

// Hướng dẫn sử dụng:
// 1. Để thay đổi hình ảnh, chỉ cần cập nhật URL trong file này
// 2. Website sẽ tự động sử dụng hình ảnh mới
// 3. Có thể sử dụng hình từ Unsplash, FUJI website, hoặc upload hình riêng
// 4. Khuyến nghị kích thước:
//    - Hero: 800x600px
//    - Features: 800x400px  
//    - Gallery: 400x300px
//    - Products: kích thước gốc từ FUJI website