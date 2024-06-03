import React from 'react';
import Turnstile from 'react-turnstile';

const TurnstileWidget: React.FC = () => {
  const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;

  if (!siteKey) {
    throw new Error('NEXT_PUBLIC_SITE_KEY is not defined. Please set it in your .env file.');
  }

  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={(token) => {
        fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }).then((response) => {
          // eslint-disable-next-line no-unused-vars, no-alert
          if (!response.ok) alert('Verification failed');
        });
      }}
    />
  );
};

export default TurnstileWidget;
