import { IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ['300', '400', '500', '700'],
  subsets: ['arabic'],
  variable: '--font-arabic',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-english',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${ibmPlexArabic.variable} ${poppins.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
