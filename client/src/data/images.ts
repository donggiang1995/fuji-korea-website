/**
 * 🖼️ WEBSITE IMAGE CONFIGURATION - UNIFIED SYSTEM
 * ================================================================
 * Centralized image management for the entire website.
 * All images are sourced from reliable URLs for consistent display.
 */

export const WEBSITE_IMAGES = {
  // 🏠 HOME PAGE - HERO SECTION
  hero: {
    headquarters: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },

  // ⭐ HOME PAGE - CORE FEATURES
  features: {
    safety: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    smartTech: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    highPerformance: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },

  // 🖼️ HOME PAGE - TECHNOLOGY GALLERY
  gallery: {
    manufacturing: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    testing: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    installation: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    maintenance: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },

  // 📦 PRODUCTS - SHOWCASE
  products: {
    fje1: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    fje2: "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
    fjkSeries: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },

  // 🏆 AWARDS & ACHIEVEMENTS
  awards: {
    achievements: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },

  // 🏭 ABOUT PAGE - FACILITIES
  facilities: {
    factory: "https://images.unsplash.com/photo-1565088063775-376d37ac2d7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    machinery: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    production: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    quality: "https://images.unsplash.com/photo-1494412519520-f21682fa2bb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    research: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    team: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },

  // 🛡️ FALLBACK SYSTEM
  fallback: {
    default: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    industrial: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    building: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
};

// Export for backward compatibility
export const images = WEBSITE_IMAGES;