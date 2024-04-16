import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import React, { Suspense } from 'react';
import './styles/main.scss';
import Loading from './loading';
import Footer from '../components/reusable-components/footer/Footer';
import Navigation from '../components/reusable-components/navigation/Navigation';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className={roboto.className}>
      <Navigation />
      <main>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </body>
  </html>
);

export const metadata: Metadata = {
  title: 'Learnhub.mk',
  description: 'Развијте Го Вашиот Потенцијал Со LearnHub',
  openGraph: {
    images: ['/logo/logo.svg'],
  },
};

export default RootLayout;
