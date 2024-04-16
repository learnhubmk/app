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
  siteKey = process.env.REACT_APP_SITE_KEY || '0x4AAAAAAAWq36_j09RgOKQR',
  cData,
  theme = process.env.REACT_APP_THEME || 'auto',
  language = process.env.REACT_APP_LANGUAGE || 'auto',
  tabIndex = parseInt(process.env.REACT_APP_TAB_INDEX || '0', 10),
}) => {
  const widgetIDRef = useRef<string | undefined>();
  const isErrorRef = useRef(false);

  useEffect(() => {
    const renderWidget = () => {
      try {
        const id = window.turnstile.render('#captcha-container', {
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

    const loadCaptchaScript = () => {
      const script = document.createElement('script');
      script.src =
        process.env.REACT_APP_CAPTCHA_SCRIPT_URL ||
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    };

    if (!window.turnstile) {
      loadCaptchaScript();
    } else {
      renderWidget();
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
      <div id="captcha-container" />
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
