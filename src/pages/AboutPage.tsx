import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

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
                setVersion(devBuild);
            });
    }, []);

    return (
        <Container sx={{ marginTop: 2, marginLeft: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <InfoIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    {version}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <PersonIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    Eduard Danziger
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <DescriptionIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    List of available audio devices
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutPage;