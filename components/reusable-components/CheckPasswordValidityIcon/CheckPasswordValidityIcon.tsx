import React from 'react';

interface IconProps {
  color?: string;
}

const CheckPasswordValidityIcon = ({ color = '#475569' }: IconProps) => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10" stroke={color} strokeWidth="2" />
      <path
        d="M6 11.5L9.32941 15L16 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckPasswordValidityIcon;
