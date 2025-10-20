import type { Metadata } from 'next';
import Providers from './Providers';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Loading...',
  description: 'Audio Device Repository Client',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('theme-mode')?.value;
  const cookieMode: 'light' | 'dark' = cookieValue === 'light' ? 'light' : 'dark';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  function readCookie(name) {
                    var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\\/\\+^])/g, '\\$1') + '=([^;]*)'));
                    return match ? decodeURIComponent(match[1]) : null;
                  }
                  var theme = readCookie('theme-mode');
                  if (!theme) {
                    theme = localStorage.getItem('theme');
                  }
                  if (!theme) {
                    theme = 'dark';
                  }
                  // Set initial background to prevent flash
                  var bg = theme === 'dark' ? '#121212' : '#ffffff';
                  document.documentElement.style.setProperty('background-color', bg);
                  document.body.style.setProperty('background-color', bg);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers initialMode={cookieMode}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
