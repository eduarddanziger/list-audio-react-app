import { useEffect, useState } from 'react';
import { Container } from '@mui/material';


const AboutPage = () => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        const versionFile = '/list-audio-react-app/version.json';
        fetch(versionFile)
            .then((response) => response.json())
            .then((data) => setVersion(data.version))
            .catch(error => {
                const devBuild = 'Developer Build';
                console.log(`Exception fetching ${versionFile}: ${error.message}. Set version to:`, devBuild);
                setVersion(devBuild)
            });
    }, []);

    return (
        <Container>
            <h2>About App</h2>
            <p>Version: {version}</p>
            <p>Developer: Eduard Danziger</p>
            <p>Description: List of available audio devices</p>
        </Container>
    );
};
export default AboutPage;