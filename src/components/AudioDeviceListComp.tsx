import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { handleError } from '../utils/errorHandler';
import AudioDeviceList from './AudioDeviceList';
import AudioDeviceDetails from './AudioDeviceDetails';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);

    useEffect(() => {
        const isDevMode = process.env.NODE_ENV === 'development';
        const apiUrl = isDevMode
            ? 'http://localhost:5027/api/AudioDevices'
            : 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';

        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAudioDevices(data);
                setSelectedDevice(data[0] || null); // Set the initial selection to the first element
                setLoading(false);
            })
            .catch(error => {
                handleError('Audio devices are not yet available. Try refreshing in 15 sec.', error, setError);
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, padding: 2 }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>Audio Devices</Typography>
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