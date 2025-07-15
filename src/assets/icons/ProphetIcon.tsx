import React from 'react';

interface ProphetIconProps {
  className?: string;
  size?: number;
}

const ProphetIcon: React.FC<ProphetIconProps> = ({ className = "", size = 24 }) => {
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
      {/* Third eye */}
      <circle cx="12" cy="5" r="0.8" fill="gold" />
      <circle cx="12" cy="5" r="0.4" fill="white" />
      {/* Mystical aura */}
      <circle cx="12" cy="8" r="5" fill="none" stroke="gold" strokeWidth="0.5" opacity="0.5" />
      <circle cx="12" cy="8" r="6" fill="none" stroke="gold" strokeWidth="0.3" opacity="0.3" />
      {/* Crystal ball */}
      <circle cx="12" cy="16" r="2" fill="none" stroke="lightblue" strokeWidth="1" />
      <circle cx="12" cy="16" r="1.5" fill="lightblue" opacity="0.3" />
      <circle cx="11" cy="15" r="0.3" fill="white" />
      {/* Robe patterns */}
      <path d="M8 18L16 18" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <path d="M8 20L16 20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      {/* Mystical symbols */}
      <path d="M6 14L7 15L6 16" stroke="gold" strokeWidth="0.5" fill="none" />
      <path d="M18 14L17 15L18 16" stroke="gold" strokeWidth="0.5" fill="none" />
    </svg>
  );
};

export default ProphetIcon;
