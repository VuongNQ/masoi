import React from 'react';

interface HunterIconProps {
  className?: string;
  size?: number;
}

const HunterIcon: React.FC<HunterIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <circle cx="10" cy="7" r="0.5" fill="white" />
      <circle cx="14" cy="7" r="0.5" fill="white" />
      <path
        d="M11 9C11 9.5 11.5 10 12 10C12.5 10 13 9.5 13 9"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M6 14C6 11 8.5 9 12 9C15.5 9 18 11 18 14V20C18 21 17 22 16 22H8C7 22 6 21 6 20V14Z"
        fill="currentColor"
      />
      {/* Bow */}
      <path
        d="M4 12C4 10 5 8 6 8C7 8 8 10 8 12C8 14 7 16 6 16C5 16 4 14 4 12Z"
        fill="none"
        stroke="brown"
        strokeWidth="1"
      />
      <line x1="6" y1="10" x2="6" y2="14" stroke="brown" strokeWidth="1" />
      {/* Arrow */}
      <line x1="6" y1="12" x2="10" y2="12" stroke="brown" strokeWidth="1" />
      <path d="M10 12L9 11.5L9 12.5Z" fill="brown" />
      {/* Quiver */}
      <rect x="17" y="15" width="2" height="5" fill="brown" />
      <line x1="18" y1="15" x2="18" y2="17" stroke="orange" strokeWidth="0.5" />
      <line x1="18" y1="15" x2="18" y2="17" stroke="orange" strokeWidth="0.5" />
      {/* Clothing details */}
      <rect x="9" y="16" width="6" height="1" fill="rgba(255,255,255,0.2)" />
      <rect x="9" y="18" width="6" height="1" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
};

export default HunterIcon;
