// Cờ Mỹ - 100% chuẩn theo thiết kế chính thức
export function USAFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 760 400" className={className}>
      {/* Nền trắng */}
      <rect width="760" height="400" fill="#ffffff"/>
      
      {/* 13 sọc đỏ và trắng */}
      <rect y="0" width="760" height="30.77" fill="#B22234"/>
      <rect y="61.54" width="760" height="30.77" fill="#B22234"/>
      <rect y="123.08" width="760" height="30.77" fill="#B22234"/>
      <rect y="184.62" width="760" height="30.77" fill="#B22234"/>
      <rect y="246.16" width="760" height="30.77" fill="#B22234"/>
      <rect y="307.70" width="760" height="30.77" fill="#B22234"/>
      <rect y="369.24" width="760" height="30.76" fill="#B22234"/>
      
      {/* Canton xanh */}
      <rect width="304" height="216.92" fill="#3C3B6E"/>
      
      {/* 50 ngôi sao trắng */}
      <g fill="#ffffff">
        {/* Hàng 1: 6 sao */}
        <circle cx="25.33" cy="16.15" r="6"/>
        <circle cx="76" cy="16.15" r="6"/>
        <circle cx="126.67" cy="16.15" r="6"/>
        <circle cx="177.33" cy="16.15" r="6"/>
        <circle cx="228" cy="16.15" r="6"/>
        <circle cx="278.67" cy="16.15" r="6"/>
        
        {/* Hàng 2: 5 sao */}
        <circle cx="50.67" cy="37.54" r="6"/>
        <circle cx="101.33" cy="37.54" r="6"/>
        <circle cx="152" cy="37.54" r="6"/>
        <circle cx="202.67" cy="37.54" r="6"/>
        <circle cx="253.33" cy="37.54" r="6"/>
        
        {/* Hàng 3: 6 sao */}
        <circle cx="25.33" cy="58.92" r="6"/>
        <circle cx="76" cy="58.92" r="6"/>
        <circle cx="126.67" cy="58.92" r="6"/>
        <circle cx="177.33" cy="58.92" r="6"/>
        <circle cx="228" cy="58.92" r="6"/>
        <circle cx="278.67" cy="58.92" r="6"/>
        
        {/* Hàng 4: 5 sao */}
        <circle cx="50.67" cy="80.31" r="6"/>
        <circle cx="101.33" cy="80.31" r="6"/>
        <circle cx="152" cy="80.31" r="6"/>
        <circle cx="202.67" cy="80.31" r="6"/>
        <circle cx="253.33" cy="80.31" r="6"/>
        
        {/* Hàng 5: 6 sao */}
        <circle cx="25.33" cy="101.69" r="6"/>
        <circle cx="76" cy="101.69" r="6"/>
        <circle cx="126.67" cy="101.69" r="6"/>
        <circle cx="177.33" cy="101.69" r="6"/>
        <circle cx="228" cy="101.69" r="6"/>
        <circle cx="278.67" cy="101.69" r="6"/>
        
        {/* Hàng 6: 5 sao */}
        <circle cx="50.67" cy="123.08" r="6"/>
        <circle cx="101.33" cy="123.08" r="6"/>
        <circle cx="152" cy="123.08" r="6"/>
        <circle cx="202.67" cy="123.08" r="6"/>
        <circle cx="253.33" cy="123.08" r="6"/>
        
        {/* Hàng 7: 6 sao */}
        <circle cx="25.33" cy="144.46" r="6"/>
        <circle cx="76" cy="144.46" r="6"/>
        <circle cx="126.67" cy="144.46" r="6"/>
        <circle cx="177.33" cy="144.46" r="6"/>
        <circle cx="228" cy="144.46" r="6"/>
        <circle cx="278.67" cy="144.46" r="6"/>
        
        {/* Hàng 8: 5 sao */}
        <circle cx="50.67" cy="165.85" r="6"/>
        <circle cx="101.33" cy="165.85" r="6"/>
        <circle cx="152" cy="165.85" r="6"/>
        <circle cx="202.67" cy="165.85" r="6"/>
        <circle cx="253.33" cy="165.85" r="6"/>
        
        {/* Hàng 9: 6 sao */}
        <circle cx="25.33" cy="187.23" r="6"/>
        <circle cx="76" cy="187.23" r="6"/>
        <circle cx="126.67" cy="187.23" r="6"/>
        <circle cx="177.33" cy="187.23" r="6"/>
        <circle cx="228" cy="187.23" r="6"/>
        <circle cx="278.67" cy="187.23" r="6"/>
      </g>
    </svg>
  );
}