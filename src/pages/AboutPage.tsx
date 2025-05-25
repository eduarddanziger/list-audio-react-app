import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import {getInfoApiUrl} from "../utils/getDeviceApiUrl.ts";

const AboutPage = () => {

    const envClientVersion = import.meta.env.VITE_CLIENT_VERSION;
    const clientVersion = envClientVersion && envClientVersion !== '' ? envClientVersion : 'unknown-version';

    const envClientCodeDate = import.meta.env.VITE_CLIENT_LATEST_COMMIT_DATE;
    const clientCodeDate = envClientCodeDate && envClientCodeDate !== '' ? envClientCodeDate : 'unknown-date';

    const serverInfoApiUrl = getInfoApiUrl(process.env.NODE_ENV === 'development');

    const [serverVersion, setServerVersion] = useState<string>('loading...');
    const [serverCodeDate, setServerCodeDate] = useState<string>('loading...');

    useEffect(() => {
        fetch(`${serverInfoApiUrl}/version`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setServerVersion(data.releaseVersion || 'unknown-version');
                setServerCodeDate(data.lastCommitDate || 'unknown-date');
            })
            .catch(() => {
                setServerVersion('version unavailable');
                setServerCodeDate('date unavailable');
            });
    }, [serverInfoApiUrl]);

    return (
        <Container sx={{ marginTop: 2, marginLeft: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <InfoIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    client: {clientVersion}, {clientCodeDate}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <InfoIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    server: {serverVersion}, {serverCodeDate}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <PersonIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">
                    Eduard Danziger
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutPage;