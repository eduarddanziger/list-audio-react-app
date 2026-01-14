import type { Metadata } from 'next';
import Providers from './Providers';
import { cookies } from 'next/headers';
import Script from 'next/script';
import React from "react";

export const metadata: Metadata = {
  title: 'Audio Device Repository',
  description: 'Audio Device Repository Client',
  other: {
    'color-scheme': 'dark light',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('theme-mode')?.value;
  const initialMode: 'light' | 'dark' | undefined =
    cookieValue === 'light' || cookieValue === 'dark' ? (cookieValue as 'light' | 'dark') : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function() {
            try {
              function readCookie(name) {
                var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\\/\\+^])/g, '\\$1') + '=([^;]*)'));
                return match ? decodeURIComponent(match[1]) : null;
              }
              var theme = readCookie('theme-mode');
              if (!theme) {
                try { theme = localStorage.getItem('theme'); } catch (e) {}
              }
              if (theme !== 'light' && theme !== 'dark') {
                try { theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { theme = 'dark'; }
              }
              var bg = theme === 'dark' ? '#121212' : '#ffffff';
              document.documentElement.style.setProperty('background-color', bg);
              if (document.body) document.body.style.setProperty('background-color', bg);
              document.documentElement.setAttribute('data-theme', theme);
              var meta = document.querySelector('meta[name="color-scheme"]');
              if (meta) { meta.setAttribute('content', theme); }
            } catch (e) {}
          })();
        `}</Script>
        <Providers initialMode={initialMode}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
