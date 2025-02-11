// src/pages/AboutPage.tsx
import { useEffect, useState } from 'react';

const AboutPage = () => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        fetch('/list-audio-react-app/version.json')
            .then((response) => response.json())
            .then((data) => setVersion(data.version))
            .catch(() => {
                console.log(`Exception!`);
                setVersion('Unknown')});
    }, []);

    return (
        <div>
            <h1>About-Info</h1>
            <p>Version: {version}</p>
            <p>Developer: Eduard Danziger</p>
            <p>Description: List of available audio devices</p>
        </div>
    );
};
export default AboutPage;