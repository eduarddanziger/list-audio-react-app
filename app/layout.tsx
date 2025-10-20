import type { Metadata } from 'next';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Loading...',
  description: 'Audio Device Repository Client',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  // Set initial background to prevent flash
                  document.documentElement.style.setProperty(
                    'background-color',
                    theme === 'dark' ? '#121212' : '#ffffff'
                  );
                  document.body.style.setProperty(
                    'background-color',
                    theme === 'dark' ? '#121212' : '#ffffff'
                  );
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
