import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { handleError } from '../utils/errorHandler';
import AudioDeviceList from './AudioDeviceList';
import AudioDeviceDetails from './AudioDeviceDetails';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatTimeToSQL } from '../utils/formatDate';

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const { t } = useTranslation();
    const isDevMode = process.env.NODE_ENV === 'development';


    useEffect(() => {
        const deviceApiUrl = isDevMode
            ? 'http://localhost:5027/api/AudioDevices'
            : 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';
        setLoading(true);
        fetch(deviceApiUrl)
            .then(response => response.json())
            .then(data => {
                setAudioDevices(data);
                setSelectedDevice(data[0] || null); // Set the initial selection to the first element
            })
            .catch(error => {
                const laterIn20sec = new Date(); laterIn20sec.setSeconds(laterIn20sec.getSeconds() + 20);
                const currTime = { sqlTime: formatTimeToSQL(laterIn20sec.toString()) };
                const delayMessage = isDevMode
                    ? t('audioDevicesErrorDevMode')
                    : t('audioDevicesErrorProdMode', currTime);
                handleError(delayMessage, error, setError);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [t, isDevMode]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, padding: 2 }}>
            <Box sx={{ flex: 1 }}>
                {loading ? (
                    <CircularProgress />
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