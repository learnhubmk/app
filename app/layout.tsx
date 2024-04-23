import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import React, { Suspense } from 'react';
import './styles/main.scss';
import Loading from './loading';
import Footer from '../components/reusable-components/footer/Footer';
import Navigation from '../components/reusable-components/navigation/Navigation';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import { ThemeProvider } from './context/themeContext';
import { TagFilterProvider } from './context/tagFilterContext';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={montserrat.className}>
    <body>
      <TagFilterProvider>
        <ThemeProvider>
          <ReactQueryProvider>
            <Navigation />
            <main>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
            <Footer />
          </ReactQueryProvider>
        </ThemeProvider>
      </TagFilterProvider>
    </body>
  </html>
);

export const metadata: Metadata = {
  title: 'Learnhub.mk',
  description: 'Развијте Го Вашиот Потенцијал Со LearnHub',
  openGraph: {
    images: ['https://learnhub.mk/logo/logo.png'],
  },
};

export default RootLayout;
