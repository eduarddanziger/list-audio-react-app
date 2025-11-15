'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ThemeProviderComponent } from '../contexts/ThemeContext';
import RootClient from './RootClient';

export default function Providers({ children, initialMode }: { children: React.ReactNode; initialMode?: 'light' | 'dark' }) {
  return (
    <AppRouterCacheProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProviderComponent initialMode={initialMode}>
          <RootClient>
            {children}
          </RootClient>
        </ThemeProviderComponent>
      </I18nextProvider>
    </AppRouterCacheProvider>
  );
}

