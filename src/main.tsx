// filepath: /c:/Users/Rimma i Masha/DWP/list-audio-react-app/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';

const Root = () => {
    const { t } = useTranslation();

    React.useEffect(() => {
        document.title = t('title');
    }, [t]);

    return <App />;
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <I18nextProvider i18n={i18n}>
        <Root />
    </I18nextProvider>
);