import React from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { Box, Typography, Paper } from '@mui/material';
import DeviceIcon from '@mui/icons-material/Devices';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LabelIcon from '@mui/icons-material/Label';
import { formatDateTimeToSQL } from '../utils/formatDate';

interface AudioDeviceDetailsProps {
    device: AudioDevice;
}

const AudioDeviceDetails: React.FC<AudioDeviceDetailsProps> = ({ device }) => {
    return (
        <Paper elevation={3} sx={{ padding: '10px', margin: '10px', maxWidth: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <DeviceIcon fontSize="small" />
                <Typography variant="h6" sx= {{ fontSize: '0.9rem' , lineHeight: 1 }}>{device.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <LabelIcon fontSize="small" />
                <Typography variant="body1" sx= {{ fontSize: '0.9rem' , lineHeight: 0.8 }}>{device.pnpId}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <HostIcon fontSize="small" />
                <Typography variant="body1" sx= {{ fontSize: '0.9rem' , lineHeight: 0.8 }}>{device.hostName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <DateIcon fontSize="small" />
                <Typography variant="body1" sx= {{ fontSize: '0.9rem' , lineHeight: 0.8 }}>{formatDateTimeToSQL(device.lastSeen)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <VolumeUpIcon fontSize="small" />
                <Typography variant="body1" sx= {{ fontSize: '0.9rem' , lineHeight: 0.8 }}>{device.volume} / 1000</Typography>
            </Box>
        </Paper>
    );
};

export default AudioDeviceDetails;