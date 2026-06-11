import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bsingh.dev'),
  title: "BSingh's Portfolio",
  description:
    'CS undergrad at SRM Delhi-NCR. Building things, breaking servers, figuring it out.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "BSingh's Portfolio",
    description: 'Building things. Breaking servers. Figuring it out.',
    url: 'https://www.bsingh.dev',
    siteName: 'BSingh',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BSingh's Portfolio",
    description: 'Building things. Breaking servers. Figuring it out.',
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
