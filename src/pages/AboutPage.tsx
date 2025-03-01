import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';


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
        <Container>
            <h2>About App</h2>
            <p>Version: {version}</p>
            <p>Developer: Eduard Danziger</p>
            <p>Description: List of available audio devices</p>
        </Container>
    );
};
export default AboutPage;