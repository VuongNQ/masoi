import React from 'react';

interface GrudgeIconProps {
  className?: string;
  size?: number;
}

const GrudgeIcon: React.FC<GrudgeIconProps> = ({ className = "", size = 24 }) => {
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
      <circle cx="10" cy="7" r="0.5" fill="red" />
      <circle cx="14" cy="7" r="0.5" fill="red" />
      <path
        d="M11 10C11 9.5 11.5 9 12 9C12.5 9 13 9.5 13 10"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M6 14C6 11 8.5 9 12 9C15.5 9 18 11 18 14V20C18 21 17 22 16 22H8C7 22 6 21 6 20V14Z"
        fill="currentColor"
      />
      {/* Ghostly aura */}
      <circle cx="12" cy="12" r="8" fill="none" stroke="gray" strokeWidth="0.5" opacity="0.3" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="gray" strokeWidth="0.3" opacity="0.2" />
      {/* Chains */}
      <path d="M8 16L10 18L8 20" stroke="silver" strokeWidth="1" fill="none" />
      <path d="M16 16L14 18L16 20" stroke="silver" strokeWidth="1" fill="none" />
      <circle cx="8" cy="18" r="0.5" fill="none" stroke="silver" strokeWidth="0.5" />
      <circle cx="16" cy="18" r="0.5" fill="none" stroke="silver" strokeWidth="0.5" />
      {/* Torn clothing */}
      <path d="M9 14L11 16L9 18L11 20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M15 14L13 16L15 18L13 20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
      {/* Scars */}
      <path d="M9 15L11 15" stroke="red" strokeWidth="0.5" />
      <path d="M13 17L15 17" stroke="red" strokeWidth="0.5" />
      {/* Vengeful spirit effects */}
      <path d="M6 10L8 12L6 14" stroke="red" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M18 10L16 12L18 14" stroke="red" strokeWidth="0.5" fill="none" opacity="0.5" />
    </svg>
  );
};

export default GrudgeIcon;
