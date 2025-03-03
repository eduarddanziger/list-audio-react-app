import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Root from './Root'; // Import the Root component

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <I18nextProvider i18n={i18n}>
        <Root />
    </I18nextProvider>
);