import React from 'react';

interface CursedIconProps {
  className?: string;
  size?: number;
}

const CursedIcon: React.FC<CursedIconProps> = ({ className = "", size = 24 }) => {
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
      <circle cx="10" cy="7" r="0.5" fill="purple" />
      <circle cx="14" cy="7" r="0.5" fill="purple" />
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
      {/* Cursed mark on forehead */}
      <path
        d="M12 4L11 3L13 3L12 4Z"
        fill="red"
      />
      <circle cx="12" cy="3.5" r="0.5" fill="red" />
      {/* Dark aura */}
      <circle cx="12" cy="12" r="9" fill="none" stroke="purple" strokeWidth="0.5" opacity="0.4" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="purple" strokeWidth="0.3" opacity="0.3" />
      {/* Cursed symbols */}
      <path d="M8 16L10 16L9 18L8 16Z" fill="purple" opacity="0.5" />
      <path d="M16 16L14 16L15 18L16 16Z" fill="purple" opacity="0.5" />
      {/* Tattered clothing */}
      <path d="M9 14L11 16L9 18L11 20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M15 14L13 16L15 18L13 20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
      {/* Curse effects */}
      <circle cx="7" cy="15" r="0.3" fill="purple" opacity="0.7" />
      <circle cx="17" cy="17" r="0.3" fill="purple" opacity="0.7" />
      <circle cx="10" cy="21" r="0.3" fill="purple" opacity="0.7" />
      <circle cx="14" cy="21" r="0.3" fill="purple" opacity="0.7" />
      {/* Pentagram */}
      <path d="M12 15L11 16L12.5 16.5L11.5 17.5L13 17L12 15Z" stroke="red" strokeWidth="0.5" fill="none" />
    </svg>
  );
};

export default CursedIcon;
