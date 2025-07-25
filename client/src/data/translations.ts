export const translations = {
  ko: {
    nav: {
      home: '홈',
      about: '회사소개',
      products: '제품',
      awards: '수상 및 영예',
      contact: '연락처'
    },
    hero: {
      title: '차세대 스마트 엘리베이터',
      subtitle: '기술의 선두주자',
      description: '후지글로벌(주)는 서울특별시 광진구에 위치하고 있습니다. 일본의 선진 기술과 우수한 장비, 용기와 야망의 힘을 계승하여 클래식 엘리베이터 브랜드 정신을 창조하고 끊임없는 추구와 끊임없이 탐구합니다. IoT, AI 기술을 통합한 스마트 엘리베이터 시스템으로 안전하고 효율적인 수직 교통 솔루션을 제공합니다.',
      viewProducts: '제품 보기',
      readMore: '더 읽어보세요'
    },
    showcase: {
      title: "FJE1, FJE2 '스마트 엘리베이터'의 새로운 시대를 열어갑니다",
      subtitle: '더 많은 고객 가치 창출'
    },
    products: {
      title: '제품',
      subtitle: '전문 엘리베이터 제어 시스템 및 견인 기계',
      control: '제어 장치',
      traction: '견인 기계',
      viewDetails: '자세히 보기'
    },
    awards: {
      title: '수상 및 영예',
      subtitle: '7개 혁신 특허, 30개 이상의 소프트웨어 저작권, 50개 이상의 유틸리티 및 디자인 특허',
      patents: '혁신 특허',
      software: '소프트웨어 저작권',
      utility: '유틸리티 특허',
      design: '디자인 특허'
    },
    contact: {
      title: '연락처',
      subtitle: '언제든지 문의해 주세요',
      companyInfo: '회사 정보',
      address: '주소',
      phone: '전화번호',
      email: '이메일',
      website: '웹사이트',
      quickLinks: '바로가기',
      inquire: '문의하기',
      name: '이름',
      company: '회사명',
      message: '메시지',
      send: '메시지 보내기',
      required: '필수',
      addressText: '서울특별시 광진구 광나루로 361, 파라곤 102동 1901호'
    },
    footer: {
      description: '일본의 선진 기술과 우수한 장비를 기반으로 최고 품질의 엘리베이터 시스템을 제공하는 전문 기업입니다.',
      quickLinks: '바로가기',
      contactInfo: '연락처',
      copyright: '© 2024 FUJI Global Korea. All rights reserved.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      awards: 'Awards & Honors',
      contact: 'Contact'
    },
    hero: {
      title: 'Next-Generation Smart Elevator',
      subtitle: 'Technology Leader',
      description: 'FUJI Global Co., Ltd. is located in Gwangjin-gu, Seoul. Inheriting the power of Japan\'s advanced technology, excellent equipment, courage and ambition, we create the classic elevator brand spirit and continuously pursue and explore.',
      viewProducts: 'View Products',
      readMore: 'Read More'
    },
    showcase: {
      title: "FJE1, FJE2 'Smart Elevator' Opens a New Era",
      subtitle: 'Creating More Customer Value'
    },
    products: {
      title: 'Products',
      subtitle: 'Professional Elevator Control Systems and Traction Machines',
      control: 'Control Systems',
      traction: 'Traction Machines',
      viewDetails: 'View Details'
    },
    awards: {
      title: 'Awards & Honors',
      subtitle: '7 Innovation Patents, 30+ Software Copyrights, 50+ Utility and Design Patents',
      patents: 'Innovation Patents',
      software: 'Software Copyrights',
      utility: 'Utility Patents',
      design: 'Design Patents'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Feel free to contact us anytime',
      companyInfo: 'Company Information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      quickLinks: 'Quick Links',
      inquire: 'Send Inquiry',
      name: 'Name',
      company: 'Company',
      message: 'Message',
      send: 'Send Message',
      required: 'Required',
      addressText: '1901, 102-dong, Paragon, 361 Gwangnaru-ro, Gwangjin-gu, Seoul'
    },
    footer: {
      description: 'A professional company providing the highest quality elevator systems based on Japan\'s advanced technology and excellent equipment.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      copyright: '© 2024 FUJI Global Korea. All rights reserved.'
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ko;
