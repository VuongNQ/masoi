import React from 'react';

interface WitchIconProps {
  className?: string;
  size?: number;
}

const WitchIcon: React.FC<WitchIconProps> = ({ className = "", size = 24 }) => {
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
      {/* Witch hat */}
      <path
        d="M12 4L10 2L14 2L12 4Z"
        fill="purple"
      />
      <path
        d="M9 4L15 4L14 3L10 3L9 4Z"
        fill="purple"
      />
      {/* Potion bottle */}
      <rect x="16" y="16" width="2" height="4" fill="green" opacity="0.7" />
      <rect x="16" y="15" width="2" height="1" fill="brown" />
      {/* Magic wand */}
      <line x1="6" y1="18" x2="8" y2="16" stroke="brown" strokeWidth="1" />
      <circle cx="6" cy="18" r="0.5" fill="gold" />
      {/* Cloak pattern */}
      <path d="M8 16L16 16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M8 18L16 18" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    </svg>
  );
};

export default WitchIcon;
