import React from 'react';
import { useTranslation } from 'react-i18next';
import App from './App';

const Root = () => {
    const { t } = useTranslation();
    const appTitle = process.env.NODE_ENV === 'development' ? t('appTitle') + ' (Dev)' : t('appTitle');

    React.useEffect(() => {
        document.title = appTitle;
    }, [appTitle]);

    return <App appTitle={appTitle} />; // Pass appTitle as a prop to App
};

export default Root;