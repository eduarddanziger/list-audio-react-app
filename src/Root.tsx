import React from 'react';
import { useTranslation } from 'react-i18next';
import App from './App';

const Root = () => {
    const { t } = useTranslation();

    React.useEffect(() => {
        document.title = t('title');
    }, [t]);

    return <App />;
};

export default Root;