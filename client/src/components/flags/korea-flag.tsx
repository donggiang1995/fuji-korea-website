// Cờ Hàn Quốc - sử dụng hình ảnh thật
import koreaFlagImage from '@assets/download_1753383075920.jpg';

export function KoreaFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <img 
      src={koreaFlagImage} 
      alt="Korea Flag" 
      className={`${className} object-cover rounded-sm border border-gray-200 shadow-sm`}
    />
  );
}