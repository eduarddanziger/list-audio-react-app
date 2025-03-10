import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { handleError } from '../utils/errorHandler';
import AudioDeviceList from './AudioDeviceList';
import { Box, Alert, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { startCodespace } from '../startCodespace.ts';
import LoadingComponent from './LoadingComponent';

const AudioDeviceListComponent: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const { t } = useTranslation();
    const isDevMode = process.env.NODE_ENV === 'development';

    useEffect(() => {
        const fetchData = async () => {
            const retryNumber = 30;
            const pauseDurationMs = 1000;

            const deviceApiUrl = isDevMode
                ? 'http://localhost:5027/api/AudioDevices'
                : 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';
            setLoading(true);
            setProgress(100 / retryNumber); // ~7%
            let attempts = 0;
            while (attempts < retryNumber) {
                try {
                    const response = await fetch(deviceApiUrl);
                    const data = await response.json();
                    setAudioDevices(data);
                    setSelectedDevice(data[0] || null); // Set the initial selection to the first element
                    setError(null);
                    setProgress(100); // 100%
                    break;
                } catch (error) {
                    if (isDevMode || ++attempts === retryNumber) {
                        handleError(t('audioDevicesErrorDevMode'), error, setError);
                        break;
                    } else {
                        handleError(t('audioDevicesErrorProdMode'), error, setError);
                        await startCodespace();
                        await new Promise(resolve => setTimeout(resolve, pauseDurationMs));
                        setProgress((attempts+1) * 100 / retryNumber);
                    }
                }
            }
            setLoading(false);
        };

        fetchData().then(r => console.log(r));
    }, [t, isDevMode]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, padding: 2 }}>
            <Box sx={{ flex: 1 }}>
                <Accordion sx={{ fontSize: '0.8rem' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontSize: 'inherit' }}>This repository shows collected audio devices. Expand to learn more...</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ fontSize: 'inherit' }}>
                            This repository shows a list of audio devices that were collected on connected host computers.<br />
                            The application is built using React (TypeScript + Vite).<br />
                            The server part is implemented as ASP.Net Core Web API with MongoDB as a database.<br />
                            Note: Initializing could delay due to the infrastructure starting process.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {loading ? (
                    <LoadingComponent progress={progress} error={error} />
                ) : (
                    <>
                        {error && <Alert severity="info" sx={{ mt: 1 }}>{error}</Alert>}
                        <AudioDeviceList
                            audioDevices={audioDevices}
                            selectedDevice={selectedDevice}
                            setSelectedDevice={setSelectedDevice}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AudioDeviceListComponent;