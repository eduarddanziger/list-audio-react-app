import React, { useState, useEffect } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { handleError } from '../utils/errorHandler';
import AudioDeviceList from './AudioDeviceList';
import AudioDeviceDetails from './AudioDeviceDetails';
import { Box, CircularProgress, Alert, Typography, Button, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { startCodespace } from '../startCodespace.ts';

const AudioDeviceListComp: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const [progress, setProgress] = useState<number>(0); // Fortschrittszustand
    const { t } = useTranslation();
    const isDevMode =  process.env.NODE_ENV === 'development';

    useEffect(() => {
        const fetchData = async () => {
            const retryNumber = 22;
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
                        setProgress((attempts+1) * 100 / retryNumber); // Fortschritt aktualisieren
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}> {/* Gap verringert */}
                        <Button
                            variant="contained"
                            color="primary"
                            disabled
                            sx={{ position: 'relative', width: '200px' }}
                        >
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: 'white',
                                    position: 'absolute',
                                    left: '50%',
                                    marginLeft: '-12px',
                                }}
                            />
                            <Typography variant="button" sx={{ opacity: 0 }}>
                                {t('loading')}
                            </Typography>
                        </Button>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ width: '200px', mt: -0.5 }}
                        />
                        {error && <Typography variant="body2" color="info" sx={{ mt: 1 }}>{error}</Typography>}
                    </Box>
                ) : (
                    <>
                        {error && <Alert severity="info">{error}</Alert>}
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