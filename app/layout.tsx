import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import React, { Suspense } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import './styles/main.scss';
import { ToastContainer } from 'react-toastify';
import Loading from './loading';
import Footer from '../components/reusable-components/footer/Footer';
import Navigation from '../components/reusable-components/navigation/Navigation';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import { ThemeProvider } from './context/themeContext';
import styles from './page.module.scss';
import { AuthProvider } from './context/authContext';
import { AxiosProvider } from '../api/AxiosProvider';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { EditorProvider } from './context/EditorContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="en" className={montserrat.className}>
      <Head>
        <title>LearnHub.mk</title>
        {isProduction && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KLM9GFDL');
              `,
            }}
          />
        )}
      </Head>
      <body>
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KLM9GFDL"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <ToastContainer />
        <EditorProvider>
          <ThemeProvider>
            <AxiosProvider>
              <ReactQueryProvider>
                <AuthProvider>
                  <Navigation />
                  <main className={styles.main}>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <SpeedInsights />
                  </main>
                  <Footer />
                </AuthProvider>
              </ReactQueryProvider>
            </AxiosProvider>
          </ThemeProvider>
        </EditorProvider>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  other: { 'google-site-verification': 'whz8iFuxS7txbmpgsbhDb_9nc1GgM3I0QUJc-LMkiI8' },
  title: 'LearnHub.mk',
  description: 'Стекни релевантно знаење и ИТ вештини',
  openGraph: {
    images: ['https://learnhub.mk/logo/logo.jpg'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default RootLayout;
