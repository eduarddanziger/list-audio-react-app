import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { handleError } from '../utils/errorHandler';
import AudioDeviceList from './AudioDeviceList';
import AudioDeviceDetails from './AudioDeviceDetails';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
//import { formatTimeToSQL } from '../utils/formatDate';
import {startCodespace} from "../startCodespace.ts";

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const { t } = useTranslation();
    const isDevMode = process.env.NODE_ENV === 'development';

    useEffect(() => {
        const fetchData = async () => {
            const retryNumber = 25;
            const pauseDurationMs = 1000;

            const deviceApiUrl = isDevMode
                ? 'http://localhost:5027/api/AudioDevices'
                : 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';
            setLoading(true);
            let attempts = 0;
            while (attempts < retryNumber) {
                try {
                    const response = await fetch(deviceApiUrl);
                    const data = await response.json();
                    setAudioDevices(data);
                    setSelectedDevice(data[0] || null); // Set the initial selection to the first element
                    setError(null);
                    break;
                } catch (error) {
                    if (isDevMode || ++attempts === retryNumber) {
                        handleError(t('audioDevicesErrorDevMode'), error, setError);
                        break;
                    } else {
                        handleError(t('audioDevicesErrorProdMode', { currRetry: attempts+1, retryNumber: retryNumber }), error, setError);
                        await startCodespace();
                        await new Promise(resolve => setTimeout(resolve, pauseDurationMs));
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
                {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress />
                        {error && <Typography variant="body2" color="error">{error}</Typography>}
                    </Box>
                ) : (
                    <>
                        {error && <Alert severity="error">{error}</Alert>}
                        <AudioDeviceList
                            audioDevices={audioDevices}
                            selectedDevice={selectedDevice}
                            setSelectedDevice={setSelectedDevice}
                        />
                    </>
                )}
            </Box>
            <Box sx={{ flex: 1 }}>
                {selectedDevice && <AudioDeviceDetails device={selectedDevice} />}
            </Box>
        </Box>
    );
};

export default AudioDeviceListComp;