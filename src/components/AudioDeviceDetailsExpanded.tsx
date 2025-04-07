import React from 'react';
import { AudioDevice } from '../types/AudioDevice';
import { Box, Typography } from '@mui/material';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LabelIcon from '@mui/icons-material/Label';
import MicIcon from '@mui/icons-material/Mic';
import { formatDateTimeToSQL } from '../utils/formatDate';
import {DeviceFlowType} from "../types/DeviceFlowType.ts";

interface AudioDeviceDetailsExpandedProps {
    device: AudioDevice;
}

const AudioDeviceDetailsExpanded: React.FC<AudioDeviceDetailsExpandedProps> = ({ device }) => {
    return (
        <Box sx={{ padding: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <LabelIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontSize: '0.9rem', lineHeight: 0.8 }}>{device.pnpId}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <HostIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontSize: '0.9rem', lineHeight: 0.8 }}>{device.hostName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                <DateIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontSize: '0.9rem', lineHeight: 0.8 }}>{formatDateTimeToSQL(device.updateDate)}</Typography>
            </Box>
            {
                (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Render) &&
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <VolumeUpIcon fontSize="small" />
                    <Typography variant="body1" sx={{ fontSize: '0.9rem', lineHeight: 0.8 }}>{device.renderVolume} / 1000</Typography>
                </Box>
            }
            {
                (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Capture) &&
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <MicIcon fontSize="small" />
                    <Typography variant="body1" sx={{ fontSize: '0.9rem', lineHeight: 0.8 }}>{device.captureVolume} / 1000</Typography>
                </Box>
            }
        </Box>
    );
};

export default AudioDeviceDetailsExpanded;