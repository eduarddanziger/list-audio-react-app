import React, { useState, useEffect } from 'react';
import { AudioDeviceFetchService } from '../services/AudioDeviceFetchService.ts';
import { AudioDevice } from '../types/AudioDevice';
import AudioDeviceList from './AudioDeviceList';
import { Box, Alert, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import LoadingComponent from './LoadingComponent';
import { getDeviceApiUrl } from '../utils/getDeviceApiUrl';
import { accordionStyles } from '../styles/accordionStyles.ts';


const AudioDeviceListComponent: React.FC = () => {
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const { t: translate } = useTranslation();

    const isDevMode = process.env.NODE_ENV === 'development';
    const deviceApiUrl = getDeviceApiUrl(isDevMode);

    useEffect(() => {
        const savedQuery = localStorage.getItem('appliedSearchQuery');
        if (savedQuery) {
            setSearchQuery(savedQuery);
        }
    }, []);

    useEffect(() => {
        const service = new AudioDeviceFetchService(
            deviceApiUrl,
            isDevMode,
            ({ progress, error }) => {
                setProgress(progress);
                setError(error);
            },
            translate
        );

        const fetchData = async (searchQuery: string = '') => {
            setLoading(true);
            setProgress(3);

            try {
                const audioDeviceInstances = searchQuery
                    ? await service.searchAudioDevices(searchQuery)
                    : await service.fetchAudioDevices();

                setAudioDevices(audioDeviceInstances);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData(searchQuery).catch(console.error);
    }, [translate, isDevMode, deviceApiUrl, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, paddingTop: 1 }}>
            <Box sx={{ flex: 1 }}>
                <Accordion
                    sx={{
                        fontSize: '0.8rem',
                        padding: 0,
                        boxShadow: 'none'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={accordionStyles.accordionSummary}
                    >
                        <Typography sx={{ fontSize: 'inherit' }}>
                            List of collected audio devices
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: 'inherit',
                            paddingTop: '0.3rem',
                            paddingBottom: '0.3rem',
                            paddingLeft: 1.3
                        }}
                    >
                        <Typography sx={{ fontSize: 'inherit' }}>
                            This repository shows a list of audio devices that were collected on connected hosts.<br />
                            The application is built using React (TypeScript + Vite).<br />
                            The server part is implemented as ASP.Net Core Web API with MongoDB as a database.<br />
                            NOTE: Initializing could delay due to the infrastructure starting process.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {loading ? (
                    <LoadingComponent progress={progress} error={error} />
                ) : (
                    <>
                        {error ? (
                            <Alert severity="info" sx={{ mt: 1 }}>
                                {error}
                            </Alert>
                        ) : (
                            <AudioDeviceList
                                audioDevices={audioDevices}
                                onSearch={handleSearch}
                            />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AudioDeviceListComponent;