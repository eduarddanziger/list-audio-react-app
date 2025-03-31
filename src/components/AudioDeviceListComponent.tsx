import React, { useState, useEffect } from 'react';
import { AudioDeviceFetchService } from '../services/AudioDeviceFetchService.ts';
import { AudioDevice } from '../types/AudioDevice';
import AudioDeviceList from './AudioDeviceList';
import { Box, Alert, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import LoadingComponent from './LoadingComponent';
import { useTheme } from '@mui/material/styles';
import { getDeviceApiUrl } from '../utils/getDeviceApiUrl';

const AudioDeviceListComponent: React.FC = () => {
    const theme = useTheme();
    const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [searchParams, setSearchParams] = useState<{ query: string; field: string | null }>({
        query: '',
        field: null
    });
    const { t: translate } = useTranslation();

    const isDevMode = process.env.NODE_ENV === 'development';
    const deviceApiUrl = getDeviceApiUrl(isDevMode);

    useEffect(() => {
        const savedQuery = localStorage.getItem('appliedSearchQuery');
        if (savedQuery) {
            setSearchParams({ query: savedQuery, field: null });
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

        const fetchData = async (searchQuery: string = '', searchField: string | null = null) => {
            setLoading(true);
            setProgress(3);

            try {
                const audioDeviceInstances = searchQuery
                    ? await service.searchAudioDevices(searchQuery, searchField ?? undefined)
                    : await service.fetchAudioDevices();

                setAudioDevices(audioDeviceInstances);
                setSelectedDevice(audioDeviceInstances[0] || null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData(searchParams.query, searchParams.field).catch(console.error);
    }, [translate, isDevMode, deviceApiUrl, searchParams]);

    const handleSearch = (query: string, field: string | null) => {
        setSearchParams({ query, field });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, padding: 2 }}>
            <Box sx={{ flex: 1 }}>
                <Accordion sx={{ fontSize: '0.8rem', padding: 0 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            '& .MuiAccordionSummary-expandIconWrapper': {
                                order: -1,
                                marginRight: theme.spacing(0),
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: 'inherit' }}>
                            This repository shows collected audio devices...
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ fontSize: 'inherit'}}>
                        <Typography sx={{ fontSize: 'inherit' }}>
                            This repository shows a list of audio devices that were collected on connected host
                            computers.<br />
                            The application is built using React (TypeScript + Vite).<br />
                            The server part is implemented as ASP.Net Core Web API with MongoDB as a database.<br /><br />
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
                                selectedDevice={selectedDevice}
                                setSelectedDevice={setSelectedDevice}
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