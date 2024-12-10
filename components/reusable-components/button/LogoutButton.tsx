'use client';

import React, { ReactNode } from 'react';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  redirectUrl: string;
  className?: string;
  icon?: ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ redirectUrl, className, icon }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => signOut({ callbackUrl: redirectUrl })}
    >
      {icon && <span className="icon-wrapper">{icon}</span>}
      Sign Out
    </button>
  );
};

export default LogoutButton;
