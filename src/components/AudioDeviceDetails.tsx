import React from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { Box, Typography, Paper } from '@mui/material';
import DeviceIcon from '@mui/icons-material/Devices';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LabelIcon from '@mui/icons-material/Label';
import { formatDateToSQL } from '../utils/formatDate';

interface AudioDeviceDetailsProps {
    device: AudioDevice;
}

const AudioDeviceDetails: React.FC<AudioDeviceDetailsProps> = ({ device }) => {
    return (
        <Paper elevation={3} sx={{ padding: '16px', margin: '16px', maxWidth: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <DeviceIcon fontSize="medium" />
                <Typography variant="h6">{device.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <LabelIcon fontSize="small" />
                <Typography variant="body1">{device.pnpId}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <HostIcon fontSize="small" />
                <Typography variant="body1">{device.hostName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <DateIcon fontSize="small" />
                <Typography variant="body1">{formatDateToSQL(device.lastSeen)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <VolumeUpIcon fontSize="small" />
                <Typography variant="body1">{device.volume} / 1000</Typography>
            </Box>
        </Paper>
    );
};

export default AudioDeviceDetails;