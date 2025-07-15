import React from 'react';

interface BossWolfIconProps {
  className?: string;
  size?: number;
}

const BossWolfIcon: React.FC<BossWolfIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C10.5 2 9 3 8 4.5C7 3 5.5 2 4 2C2.5 2 1 3.5 1 6C1 8.5 3 10 4 11C4.5 11.5 5 12 5 13C5 15 6 16 7 16.5C8 17 9 17 10 16.5C11 16 12 15 12 13C12 15 13 16 14 16.5C15 17 16 17 17 16.5C18 16 19 15 19 13C19 12 19.5 11.5 20 11C21 10 23 8.5 23 6C23 3.5 21.5 2 20 2C18.5 2 17 3 16 4.5C15 3 13.5 2 12 2Z"
        fill="currentColor"
      />
      <circle cx="8" cy="8" r="1.5" fill="red" />
      <circle cx="16" cy="8" r="1.5" fill="red" />
      <path
        d="M12 10L10 12L12 14L14 12L12 10Z"
        fill="white"
      />
      <path
        d="M9 14C9 15 10 16 11 16H13C14 16 15 15 15 14"
        stroke="white"
        strokeWidth="1"
        fill="none"
      />
      {/* Crown */}
      <path
        d="M7 4L8 2L9 4L12 3L15 4L16 2L17 4L18 5H6L7 4Z"
        fill="gold"
        stroke="orange"
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default BossWolfIcon;
