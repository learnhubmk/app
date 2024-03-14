'use client';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="en">
      <body>
        <h2>{error.message}</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
