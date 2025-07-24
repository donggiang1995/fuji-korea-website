// Cờ Anh (Union Jack) - sử dụng hình ảnh thật
import ukFlagImage from '@assets/image_2025-07-25_014919516_1753382959524.png';

export function UKFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <img 
      src={ukFlagImage} 
      alt="UK Flag" 
      className={`${className} object-cover rounded-sm border border-gray-200 shadow-sm`}
    />
  );
}