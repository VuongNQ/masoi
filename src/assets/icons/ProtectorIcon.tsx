import React from 'react';

interface ProtectorIconProps {
  className?: string;
  size?: number;
}

const ProtectorIcon: React.FC<ProtectorIconProps> = ({ className = "", size = 24 }) => {
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
      {/* Shield */}
      <path
        d="M12 13C10 13 8 14 8 16C8 18 10 19 12 19C14 19 16 18 16 16C16 14 14 13 12 13Z"
        fill="none"
        stroke="silver"
        strokeWidth="1"
      />
      <path
        d="M12 15L11 16L12 17L13 16L12 15Z"
        fill="silver"
      />
      {/* Armor details */}
      <rect x="9" y="14" width="6" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="9" y="16" width="6" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="9" y="18" width="6" height="1" fill="rgba(255,255,255,0.3)" />
      {/* Cross symbol */}
      <path d="M12 15L12 17" stroke="white" strokeWidth="0.5" />
      <path d="M11 16L13 16" stroke="white" strokeWidth="0.5" />
    </svg>
  );
};

export default ProtectorIcon;
