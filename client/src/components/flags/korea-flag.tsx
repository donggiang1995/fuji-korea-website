// Cờ Hàn Quốc (Taegeukgi) - 100% chuẩn theo thiết kế chính thức
export function KoreaFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 600" className={className}>
      {/* Nền trắng */}
      <rect width="900" height="600" fill="#ffffff"/>
      
      {/* Taegeuk (Yin Yang) ở giữa */}
      <g transform="translate(450,300)">
        {/* Nửa đỏ */}
        <path d="M -75,0 A 75,75 0 0,1 0,-75 A 37.5,37.5 0 0,1 0,0 A 37.5,37.5 0 0,0 0,75 A 75,75 0 0,1 -75,0 Z" fill="#c60c30"/>
        {/* Nửa xanh */}
        <path d="M 75,0 A 75,75 0 0,1 0,75 A 37.5,37.5 0 0,1 0,0 A 37.5,37.5 0 0,0 0,-75 A 75,75 0 0,1 75,0 Z" fill="#003478"/>
      </g>
      
      {/* Trigrams - Góc trên trái (Geon - Heaven) */}
      <g transform="translate(200,150)" stroke="#000000" strokeWidth="15">
        <line x1="0" y1="0" x2="120" y2="0"/>
        <line x1="0" y1="25" x2="120" y2="25"/>
        <line x1="0" y1="50" x2="120" y2="50"/>
      </g>
      
      {/* Trigrams - Góc trên phải (Ri - Fire) */}
      <g transform="translate(580,150)" stroke="#000000" strokeWidth="15">
        <line x1="0" y1="0" x2="120" y2="0"/>
        <line x1="0" y1="25" x2="50" y2="25"/>
        <line x1="70" y1="25" x2="120" y2="25"/>
        <line x1="0" y1="50" x2="120" y2="50"/>
      </g>
      
      {/* Trigrams - Góc dưới trái (Gam - Water) */}
      <g transform="translate(200,400)" stroke="#000000" strokeWidth="15">
        <line x1="0" y1="0" x2="50" y2="0"/>
        <line x1="70" y1="0" x2="120" y2="0"/>
        <line x1="0" y1="25" x2="120" y2="25"/>
        <line x1="0" y1="50" x2="50" y2="50"/>
        <line x1="70" y1="50" x2="120" y2="50"/>
      </g>
      
      {/* Trigrams - Góc dưới phải (Gon - Earth) */}
      <g transform="translate(580,400)" stroke="#000000" strokeWidth="15">
        <line x1="0" y1="0" x2="50" y2="0"/>
        <line x1="70" y1="0" x2="120" y2="0"/>
        <line x1="0" y1="25" x2="50" y2="25"/>
        <line x1="70" y1="25" x2="120" y2="25"/>
        <line x1="0" y1="50" x2="50" y2="50"/>
        <line x1="70" y1="50" x2="120" y2="50"/>
      </g>
    </svg>
  );
}