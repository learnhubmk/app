import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import React, { Suspense } from 'react';
import './styles/main.scss';
import Loading from './loading';
import Footer from '../components/reusable-components/footer/Footer';
import Navigation from '../components/reusable-components/navigation/Navigation';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import { ThemeProvider } from './context/themeContext';
import styles from './page.module.scss';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={montserrat.className}>
    <body>
      <ThemeProvider>
        <ReactQueryProvider>
          <Navigation />
          <main className={styles.main}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <SpeedInsights />
          </main>
          <Footer />
        </ReactQueryProvider>
      </ThemeProvider>
    </body>
  </html>
);

export const metadata: Metadata = {
  title: 'Learnhub.mk',
  description: 'Стекни релевантно знаење и ИТ вештини',
  openGraph: {
    images: ['https://learnhub.mk/logo/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default RootLayout;
