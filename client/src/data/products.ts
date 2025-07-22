export const productsData = [
  {
    id: 1,
    name: 'FJE1 CONTROL CABINET',
    category: 'control',
    model: 'FJE1',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE1-1.png',
    specifications: {},
    features: [
      'Remote technical support through APP.',
      'Remote monitoring through the IoT.',
      'Communication encoder supported.',
      'Balance coefficient auto-tuning.',
      'Noise reduction design < 50dBA'
    ],
    descriptionKo: 'FJE1 제어 캐비닛은 스마트 엘리베이터 시스템의 핵심 구성 요소입니다.',
    descriptionEn: 'FJE1 Control Cabinet is a core component of smart elevator systems.'
  },
  {
    id: 2,
    name: 'FJE2 CONTROL CABINET',
    category: 'control',
    model: 'FJE2',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJE2.png',
    specifications: {},
    features: [
      'Standard: 48 floors, full collective (full serial connection)',
      'Duplex onboard group control (CANbus serial communication)',
      'Automatic door control mode',
      'Selectable fireman operation',
      'Supports 1 ph. 220 Vac UPS (quasi & sine wave) for rescue operation',
      'Comprehensive trip diagnostics'
    ],
    descriptionKo: 'FJE2 제어 캐비닛은 고급 엘리베이터 제어 기능을 제공합니다.',
    descriptionEn: 'FJE2 Control Cabinet provides advanced elevator control features.'
  },
  {
    id: 3,
    name: 'FJK1-B (325mm)',
    category: 'traction',
    model: 'FJK1-B-325',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-325mm.png',
    specifications: {
      'Voltage': '380V',
      'Suspension': '2:1',
      'Brake': 'DC110V 2x0.84A(2x1.1A)',
      'Weight': '200kg',
      'Max Static Load': '2000kg'
    },
    features: [],
    descriptionKo: 'FJK1-B (325mm) 견인 기계는 중소형 엘리베이터에 최적화되어 있습니다.',
    descriptionEn: 'FJK1-B (325mm) traction machine is optimized for small to medium elevators.'
  },
  {
    id: 4,
    name: 'FJK1-B (400mm)',
    category: 'traction',
    model: 'FJK1-B-400',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK1-400mm.png',
    specifications: {
      'Voltage': '380V',
      'Suspension': '2:1',
      'Brake': 'DC110V 2x1.0A(2x1.1A)',
      'Weight': '285kg',
      'Max Static Load': '3000kg'
    },
    features: [],
    descriptionKo: 'FJK1-B (400mm) 견인 기계는 대형 엘리베이터에 적합합니다.',
    descriptionEn: 'FJK1-B (400mm) traction machine is suitable for large elevators.'
  },
  {
    id: 5,
    name: 'FJK2 – B450KG (240mm)',
    category: 'traction',
    model: 'FJK2-B450-240',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-240mm.png',
    specifications: {
      'Rated Voltage': 'AC380V',
      'Brake Voltage': 'DC110V',
      'Weight': '140kg',
      'Duty': 'S5-40%',
      'Max Static Load': '2500kg',
      'Wrap': 'Single',
      'Insulation': 'F',
      'Protection': 'IP41',
      'Traveling Height': '<90'
    },
    features: [],
    descriptionKo: 'FJK2 – B450KG (240mm) 견인 기계는 효율적인 성능을 제공합니다.',
    descriptionEn: 'FJK2 – B450KG (240mm) traction machine provides efficient performance.'
  },
  {
    id: 6,
    name: 'FJK2 – B630-800KG (240mm)',
    category: 'traction',
    model: 'FJK2-B630-240',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-320mm-1.png',
    specifications: {
      'Rated Voltage': 'AC380V',
      'Brake Voltage': 'DC110V',
      'Weight': '200kg',
      'Duty': 'S5-40%',
      'Max Static Load': '2500kg',
      'Wrap': 'Single',
      'Insulation': 'F',
      'Protection': 'IP41',
      'Traveling Height': '<90'
    },
    features: [],
    descriptionKo: 'FJK2 – B630-800KG (240mm) 견인 기계는 고성능을 자랑합니다.',
    descriptionEn: 'FJK2 – B630-800KG (240mm) traction machine boasts high performance.'
  },
  {
    id: 7,
    name: 'FJK2 – B630KG (320mm)',
    category: 'traction',
    model: 'FJK2-B630-320',
    image: 'https://fuji-global-korea.com/wp-content/uploads/2024/05/FJK2-320mm-1.png',
    specifications: {
      'Rated Voltage': 'AC380V',
      'Brake Voltage': 'DC110V',
      'Weight': '200kg',
      'Duty': 'S5-40%',
      'Max Static Load': '2500kg',
      'Wrap': 'Single',
      'Insulation': 'F',
      'Protection': 'IP41',
      'Traveling Height': '<90'
    },
    features: [],
    descriptionKo: 'FJK2 – B630KG (320mm) 견인 기계는 안정적인 운영을 보장합니다.',
    descriptionEn: 'FJK2 – B630KG (320mm) traction machine ensures stable operation.'
  }
];

export type ProductData = typeof productsData[0];
