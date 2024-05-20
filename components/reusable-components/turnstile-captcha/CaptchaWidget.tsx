import React, { useEffect, useRef } from 'react';

interface CaptchaProps {
  onSuccess?: () => void;
  onError?: () => void;
  onExpired?: () => void;
  siteKey?: string;
  cData?: string;
  theme?: 'auto' | 'light' | 'dark';
  language?: string;
  tabIndex?: number;
}

const CaptchaWidget: React.FC<CaptchaProps> = ({
  onSuccess,
  onError,
  onExpired,
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE,
  cData,
  theme = 'auto',
  language = 'auto',
  tabIndex = 0,
}) => {
  const widgetIDRef = useRef<string | undefined>();
  const isErrorRef = useRef(false);

  useEffect(() => {
    const renderWidget = () => {
      try {
        const id = window.turnstile.render(`#turnstile-captcha`, {
          sitekey: siteKey,
          'error-callback': onError,
          'expired-callback': onExpired,
          theme,
          language,
          tabindex: tabIndex,
          cData,
          callback: () => {
            if (onSuccess) {
              onSuccess();
            }
          },
        });
        if (!id) {
          throw new Error('Failed to render Captcha widget');
        }
        widgetIDRef.current = id;
      } catch (error) {
        isErrorRef.current = true;
        if (onError) onError();
      }
    };

    const scriptId = 'turnstile-loader';
    const loadCaptchaScript = () => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.id = scriptId;
      script.onload = renderWidget;
      document.body.appendChild(script);
      return script.id;
    };

    const loadedScript = document.getElementById(scriptId);
    if (loadedScript === null) {
      loadCaptchaScript();
    }

    return () => {
      if (widgetIDRef.current) {
        window.turnstile.remove(widgetIDRef.current);
        widgetIDRef.current = undefined;
      }
    };
  }, [siteKey, cData, language, onError, onExpired, onSuccess, tabIndex, theme]);

  return (
    <>
      <div id="turnstile-captcha" />
      {isErrorRef.current && (
        <div
          className="text-red-500 bg-white shadow-lg"
          onClick={() => {
            isErrorRef.current = false;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              isErrorRef.current = false;
            }
          }}
          role="button"
          tabIndex={0}
        >
          Load captcha error{' '}
          <span className="text-blue-500 cursor-pointer inline-block text-sm font-semibold ml-2">
            Retry
          </span>
        </div>
      )}
    </>
  );
};

export default CaptchaWidget;
