// components/CheckPasswordValidityIcon.tsx
import React from 'react';

interface PasswordValidityIconProps {
  color?: string;
}

const PasswordValidityIcon = ({ color = '#ccc' }: PasswordValidityIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <path
        d="M9 11l3 3L22 4M22 12a10 10 0 11-8-4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PasswordValidityIcon;
