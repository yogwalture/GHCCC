import React, { useRef, useState } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Maximum rotation in degrees
  scale?: number; // Hover scale
  className?: string;
  glowColor?: string; // Glowing border color on hover
  key?: React.Key;
}

export function TiltCard({
  children,
  maxTilt = 10,
  scale = 1.02,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.15)",
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
  });
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip on touch-based devices to conserve CPU
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate rotation with respect to the center
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Calculate mouse position as a percentage for shining lens flare effect
    const px = (x / width) * 100;
    const py = (y / height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease",
      boxShadow: `0 20px 40px -15px ${glowColor}, 0 0 20px 1px ${glowColor}`,
    });

    setShineStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`,
      transition: "opacity 0.2s ease, background 0.05s ease",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
      boxShadow: "none",
    });
    setShineStyle({
      opacity: 0,
      background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 60%)",
      transition: "opacity 0.5s ease",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative overflow-hidden transition-all duration-300 transform-gpu will-change-transform ${className}`}
      {...props}
    >
      {/* Interactive Glare / Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 select-none mix-blend-overlay"
        style={shineStyle}
      />
      {children}
    </div>
  );
}
