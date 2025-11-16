'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/NavBar';

export default function RootClient({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const appTitle = process.env.NODE_ENV === 'development' ? t('appTitle') + ' (Dev)' : t('appTitle');

    React.useEffect(() => {
        document.title = appTitle;
    }, [appTitle]);

    return (
        <>
            <NavBar appTitle={appTitle} />
            {children}
        </>
    );
}

