import React from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { List, ListItem, Typography, Box } from '@mui/material';
import DeviceIcon from '@mui/icons-material/Devices';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import { formatDateTimeToSQL } from '../utils/formatDate';

interface AudioDeviceListProps {
    audioDevices: AudioDevice[];
    selectedDevice: AudioDevice | null;
    setSelectedDevice: (device: AudioDevice) => void;
}

const AudioDeviceList: React.FC<AudioDeviceListProps> = ({ audioDevices, selectedDevice, setSelectedDevice }) => {
    return (
        <List>
            {audioDevices.map((device) => (
                // @ts-expect-error ts-migrate(2769) No overload matches this call.
                <ListItem
                    key={device.pnpId}
                    selected={selectedDevice?.pnpId === device.pnpId}
                    onClick={() => setSelectedDevice(device)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '10px',
                        backgroundColor: selectedDevice?.pnpId === device.pnpId ? '#f0f0f0' : 'inherit',
                        '&:hover': {
                            backgroundColor: '#e0e0e0',
                        },
                        cursor: 'pointer',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeviceIcon fontSize="small" />
                        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>{device.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <HostIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{device.hostName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <DateIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{formatDateTimeToSQL(device.lastSeen)}</Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default AudioDeviceList;