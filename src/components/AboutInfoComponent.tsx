import { useEffect, useState } from 'react';
import { Typography, Box, Container } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import DnsIcon from '@mui/icons-material/Dns';
import PersonIcon from '@mui/icons-material/Person';
import { getInfoApiUrl } from '../utils/ApiUrls.ts';

const AboutInfoComponent = () => {
    const envClientVersion = import.meta.env.VITE_CLIENT_VERSION;
    const clientVersion = envClientVersion && envClientVersion !== '' ? envClientVersion : 'unknown-version';

    const envClientCodeDate = import.meta.env.VITE_CLIENT_LATEST_COMMIT_DATE;
    const clientCodeDate = envClientCodeDate && envClientCodeDate !== '' ? envClientCodeDate : 'unknown-date';

    const serverInfoApiUrl = getInfoApiUrl();

    const [serverVersion, setServerVersion] = useState<string>('loading...');
    const [serverCodeDate, setServerCodeDate] = useState<string>('loading...');
    const [serverRuntime, setServerRuntime] = useState<string>('loading...');

    useEffect(() => {
        fetch(`${serverInfoApiUrl}/version`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setServerVersion(data.releaseVersion || 'unknown-version');
                setServerCodeDate(data.lastCommitDate || 'unknown-date');
                setServerRuntime(data.runtime || 'unknown-runtime');
            })
            .catch(() => {
                setServerVersion('version unavailable');
                setServerCodeDate('date unavailable');
                setServerRuntime('runtime description unavailable');
            });
    }, [serverInfoApiUrl]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, paddingTop: 1 }}>
            <Container sx={{ marginTop: 2, marginLeft: -1.6 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                    <DevicesIcon fontSize={"small"} sx={{ marginRight: 1 }} />
                    <Typography variant="body1" sx={{lineHeight: '1.2rem' }}>
                        Client: {clientVersion}, {clientCodeDate}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                    <DnsIcon fontSize={"small"} sx={{ marginRight: 1 }} />
                    <Typography variant="body1" sx={{lineHeight: '1.2rem' }}>
                        Server: {serverVersion}, {serverCodeDate}; Runtime: {serverRuntime}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                    <PersonIcon fontSize={"small"} sx={{ marginRight: 1 }} />
                    <Typography variant="body1" sx={{lineHeight: '1.2rem' }}>
                        Eduard Danziger
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutInfoComponent;