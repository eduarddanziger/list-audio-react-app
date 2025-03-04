import React, { useState } from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { List, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDateTimeToSQL } from '../utils/formatDate';
import AudioDeviceDetailsExpanded from './AudioDeviceDetailsExpanded';

interface AudioDeviceListProps {
    audioDevices: AudioDevice[];
    selectedDevice: AudioDevice | null;
    setSelectedDevice: (device: AudioDevice) => void;
}

const AudioDeviceList: React.FC<AudioDeviceListProps> = ({ audioDevices, selectedDevice, setSelectedDevice }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <List>
            {audioDevices.map((device) => (
                <Accordion
                    key={device.pnpId}
                    expanded={expanded === device.pnpId}
                    onChange={handleChange(device.pnpId)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={() => setSelectedDevice(device)}
                        sx={{
                            backgroundColor: selectedDevice?.pnpId === device.pnpId ? '#f0f0f0' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                            cursor: 'pointer',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '1 1 50%', paddingRight: 1 }}>
                                <HeadsetIcon fontSize="small" />
                                <Typography variant="subtitle1">{device.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '1 1 20%', paddingRight: 1, paddingLeft: 1 }}>
                                <Typography variant="body2">{device.hostName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '1 1 30%', paddingLeft: 1 }}>
                                <Typography variant="body2">{formatDateTimeToSQL(device.lastSeen)}</Typography>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AudioDeviceDetailsExpanded device={device} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </List>
    );
};

export default AudioDeviceList;