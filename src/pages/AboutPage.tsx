import { Container, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const AboutPage = () => {

    const envClientVersion = import.meta.env.VITE_CLIENT_VERSION;
    const clientVersion = envClientVersion && envClientVersion !== '' ? envClientVersion : 'unknown-build';

    return (
        <Container sx={{ marginTop: 2, marginLeft: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <InfoIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    {clientVersion}
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
                    Audio device repository viewer
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutPage;