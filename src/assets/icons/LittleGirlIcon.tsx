import React from 'react';

interface LittleGirlIconProps {
  className?: string;
  size?: number;
}

const LittleGirlIcon: React.FC<LittleGirlIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="8" r="3.5" fill="currentColor" />
      <circle cx="10.5" cy="7" r="0.5" fill="white" />
      <circle cx="13.5" cy="7" r="0.5" fill="white" />
      <path
        d="M11 9C11 9.5 11.5 10 12 10C12.5 10 13 9.5 13 9"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M7 14C7 11.5 9 10 12 10C15 10 17 11.5 17 14V19C17 20 16 21 15 21H9C8 21 7 20 7 19V14Z"
        fill="currentColor"
      />
      {/* Pigtails */}
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <circle cx="16" cy="6" r="1" fill="currentColor" />
      <circle cx="7" cy="5" r="0.5" fill="currentColor" />
      <circle cx="17" cy="5" r="0.5" fill="currentColor" />
      {/* Hair ribbon */}
      <path d="M8 6L9 5L8 4" stroke="pink" strokeWidth="1" fill="none" />
      <path d="M16 6L15 5L16 4" stroke="pink" strokeWidth="1" fill="none" />
      {/* Dress with polka dots */}
      <rect x="9" y="15" width="6" height="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="10" cy="16" r="0.3" fill="pink" />
      <circle cx="14" cy="17" r="0.3" fill="pink" />
      <circle cx="11" cy="18" r="0.3" fill="pink" />
      <circle cx="13" cy="19" r="0.3" fill="pink" />
      {/* Teddy bear */}
      <circle cx="18" cy="17" r="0.8" fill="brown" />
      <circle cx="17.5" cy="16.5" r="0.2" fill="black" />
      <circle cx="18.5" cy="16.5" r="0.2" fill="black" />
      <circle cx="17.5" cy="16" r="0.3" fill="brown" />
      <circle cx="18.5" cy="16" r="0.3" fill="brown" />
    </svg>
  );
};

export default LittleGirlIcon;
