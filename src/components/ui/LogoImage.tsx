import { useState } from "react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText: string;
  bgColor?: string;
  textColor?: string;
}

export function LogoImage({ src, alt, className = "", fallbackText, bgColor = "bg-white", textColor = "text-blue-900" }: LogoImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} ${bgColor} ${textColor} flex items-center justify-center font-black text-center leading-tight p-2 border border-gray-200 shadow-inner rounded-lg overflow-hidden`}>
        <span className="uppercase tracking-tighter" style={{ fontSize: 'min(2rem, 10%)' }}>
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
}
