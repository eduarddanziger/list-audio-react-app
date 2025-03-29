import React, {useState, useEffect} from 'react';
import { AudioDeviceFetchService } from '../services/AudioDeviceFetchService.ts';
import {AudioDevice} from '../types/AudioDevice';
import AudioDeviceList from './AudioDeviceList';
import {Box, Alert, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTranslation} from 'react-i18next';
import LoadingComponent from './LoadingComponent';
import {useTheme} from '@mui/material/styles';
import CryptoJS from "crypto-js";

const AudioDeviceListComponent: React.FC = () => {
    const theme = useTheme();
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const {t} = useTranslation();
    const isDevMode = process.env.NODE_ENV === 'development';
    let deviceApiUrl: string;
    if (isDevMode) {
        const encryptedDeviceApiUrlFromEnv = import.meta.env.VITE_API_URL_DEV_MODE;
        if (encryptedDeviceApiUrlFromEnv && encryptedDeviceApiUrlFromEnv !== '') {
            console.log('Encrypted secret read out of environment:', encryptedDeviceApiUrlFromEnv);
            const bytes = CryptoJS.AES.decrypt(encryptedDeviceApiUrlFromEnv, '32-characters-long-secure-key-12');
            deviceApiUrl = bytes.toString(CryptoJS.enc.Utf8);
            if (deviceApiUrl === '') {
                deviceApiUrl = encryptedDeviceApiUrlFromEnv;
            }
        } else {
            deviceApiUrl = 'http://localhost:5027/api/AudioDevices';
        }
    } else {
        deviceApiUrl = 'https://studious-bassoon-7vp9wvpw7rxjf4wg-5027.app.github.dev/api/AudioDevices';
    }

    useEffect(() => {
        const service = new AudioDeviceFetchService(
            deviceApiUrl,
            isDevMode,
            ({ progress, error }) => {
                setProgress(progress);
                setError(error);
            },
            t
        );

        const fetchData = async () => {
            setLoading(true);
            setProgress(3);

            const audioDeviceInstances = await service.fetchAudioDevices();
            setAudioDevices(audioDeviceInstances);
            setSelectedDevice(audioDeviceInstances[0] || null);

            setLoading(false);
        };

        fetchData().catch(console.error);
    }, [t, isDevMode, deviceApiUrl]);

    return (
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2, padding: 2}}>
            <Box sx={{flex: 1}}>
                <Accordion sx={{fontSize: '0.8rem'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        sx={{
                            '& .MuiAccordionSummary-expandIconWrapper': {
                                order: -1,
                                marginRight: theme.spacing(1),
                            },
                        }}
                    >
                    <Typography sx={{fontSize: 'inherit'}}>This repository shows collected audio devices. Expand to
                        learn more...</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontSize: 'inherit'}}>
                            This repository shows a list of audio devices that were collected on connected host
                            computers.<br/>
                            The application is built using React (TypeScript + Vite).<br/>
                            The server part is implemented as ASP.Net Core Web API with MongoDB as a database.<br/>
                            Note: Initializing could delay due to the infrastructure starting process.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {loading ? (
                    <LoadingComponent progress={progress} error={error}/>
                ) : (
                    <>
                        {error && <Alert severity="info" sx={{mt: 1}}>{error}</Alert>}
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
