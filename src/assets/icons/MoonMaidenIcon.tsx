import React from 'react';

interface MoonMaidenIconProps {
  className?: string;
  size?: number;
}

const MoonMaidenIcon: React.FC<MoonMaidenIconProps> = ({ className = "", size = 24 }) => {
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
      {/* Moon symbol */}
      <circle cx="12" cy="4" r="1.5" fill="none" stroke="silver" strokeWidth="0.5" />
      <circle cx="11.5" cy="4" r="1.2" fill="silver" />
      {/* Dress pattern */}
      <path d="M8 16L16 16" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <path d="M8 18L16 18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <path d="M8 20L16 20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      {/* Stars */}
      <circle cx="9" cy="15" r="0.3" fill="silver" />
      <circle cx="15" cy="17" r="0.3" fill="silver" />
      <circle cx="10" cy="19" r="0.3" fill="silver" />
    </svg>
  );
};

export default MoonMaidenIcon;
