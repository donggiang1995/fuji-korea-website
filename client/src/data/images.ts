/**
 * 🖼️ WEBSITE IMAGE CONFIGURATION - UNIFIED SYSTEM
 * ================================================================
 * Centralized image management for the entire website.
 * All images are sourced from reliable URLs for consistent display.
 */

export const WEBSITE_IMAGES = {
  // 🏠 HOME PAGE - HERO SECTION
  hero: {
    headquarters: "https://picsum.photos/800/600?random=1"
  },

  // ⭐ HOME PAGE - CORE FEATURES
  features: {
    safety: "https://picsum.photos/800/400?random=2",
    smartTech: "https://picsum.photos/800/400?random=3",
    highPerformance: "https://picsum.photos/800/400?random=4"
  },

  // 🖼️ HOME PAGE - TECHNOLOGY GALLERY
  gallery: {
    manufacturing: "https://picsum.photos/400/300?random=5",
    testing: "https://picsum.photos/400/300?random=6",
    installation: "https://picsum.photos/400/300?random=7",
    maintenance: "https://picsum.photos/400/300?random=8"
  },

  // 📦 PRODUCTS - SHOWCASE
  products: {
    fje1: "https://picsum.photos/800/600?random=9",
    fje2: "https://picsum.photos/800/600?random=10", 
    fjkSeries: "https://picsum.photos/800/600?random=11",
    sectionBackground: "https://picsum.photos/1200/800?random=12"
  },

  // 🏆 AWARDS & ACHIEVEMENTS
  awards: {
    achievements: "https://picsum.photos/800/400?random=13"
  },

  // 🏭 ABOUT PAGE - FACILITIES
  facilities: {
    factory: "https://picsum.photos/800/600?random=14",
    machinery: "https://picsum.photos/800/600?random=15",
    production: "https://picsum.photos/800/600?random=16",
    quality: "https://picsum.photos/800/600?random=17",
    research: "https://picsum.photos/800/600?random=18",
    team: "https://picsum.photos/800/600?random=19"
  },

  // 🛡️ FALLBACK SYSTEM
  fallback: {
    default: "https://picsum.photos/800/400?random=20",
    industrial: "https://picsum.photos/400/300?random=21",
    building: "https://picsum.photos/800/600?random=22"
  }
};

// Export for backward compatibility
export const images = WEBSITE_IMAGES;