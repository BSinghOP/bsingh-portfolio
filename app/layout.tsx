import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Inter as the body font — clean, neutral, free, ships with next/font.
// (Originally planned Geist, but Geist needs the separate `geist` package.)
const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BSingh — Bibekpreet Singh Chugh',
  description:
    'CS undergrad at SRM Delhi-NCR. Building things, breaking servers, figuring it out.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'BSingh — Portfolio',
    description: 'Building things. Breaking servers. Figuring it out.',
    url: 'https://bsingh.codes',
    siteName: 'BSingh',
    images: ['/logo.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'light' || stored === 'dark') {
                  document.documentElement.dataset.theme = stored;
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${jetbrains.variable} ${geist.variable}`}>{children}</body>
    </html>
  );
}
