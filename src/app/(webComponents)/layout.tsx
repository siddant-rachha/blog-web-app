'use client';
import Box from '@mui/material/Box';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Spinner } from '@/components/CommonComponents/Spinner';
import { ToastNotify } from '@/components/CommonComponents/ToastNotify';
import LayoutWithNav from '@/components/WebComponents/LayoutWithNav';
import { RouteHandler } from '@/components/WebComponents/RouteHandler';
import Providers from '@/globalState/rootState/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JKNVFJ95PH"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JKNVFJ95PH');
            `,
          }}
        />
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@siddant-rachha/blog-components@2.0.17/dist/bundle.js"
        ></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <Providers>
            <RouteHandler>
              <LayoutWithNav>
                <Box
                  sx={{
                    width: { lg: '75vw' },
                    margin: 'auto',
                  }}
                >
                  <ToastNotify />
                  {children}
                  <Spinner />
                </Box>
              </LayoutWithNav>
            </RouteHandler>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
