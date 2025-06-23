import React from 'react';
import {AudioDevice} from '../types/AudioDevice';
import {Box, Typography} from '@mui/material';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import {formatDateTimeToSQL} from '../utils/formatDate';
import {DeviceFlowType} from "../types/DeviceFlowType";
import {DeviceMessageType} from "../types/DeviceMessageType";
import LabelOutlined from '@mui/icons-material/LabelOutlined';
import Tag from '@mui/icons-material/Tag';

interface AudioDeviceDetailsExpandedProps {
    device: AudioDevice;
}

const AudioDeviceDetailsExpanded: React.FC<AudioDeviceDetailsExpandedProps> = ({device}) => {
    const deviceMessageTypeToString = (deviceMessageType: DeviceMessageType): string => {
        switch (deviceMessageType) {
            case DeviceMessageType.Confirmed:
                return 'Confirmed';
            case DeviceMessageType.Detached:
                return 'Detached';
            case DeviceMessageType.Discovered:
                return 'Discovered';
            case DeviceMessageType.VolumeRenderChanged:
                return 'Render Volume Updated';
            case DeviceMessageType.VolumeCaptureChanged:
                return 'Capture Volume Updated';
            default:
                return 'Unknown';
        }
    }
    return (
        <Box
            sx={{
                paddingLeft: 3
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                <LabelOutlined fontSize="small"/>
                <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem', marginTop: '0.2rex'}}>{device.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                <Tag fontSize="small"/>
                <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem', marginTop: '0.2rex'}}>{device.pnpId}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                <HostIcon fontSize="small"/>
                <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem', marginTop: '0.2rex'}}>
                    {device.hostName}
                    {device.operationSystemName &&
                        device.operationSystemName !== '' &&
                        `, ${device.operationSystemName}`}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                <DateIcon fontSize="small"/>
                <Typography variant="body1"
                            sx={{
                                fontSize: '0.9rem',
                                lineHeight: '1.1rem',
                                marginTop: '0.2rex'
                            }}>{formatDateTimeToSQL(device.updateDate)} ({deviceMessageTypeToString(device.deviceMessageType)})</Typography>
            </Box>
            {
                (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Render) &&
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1}}>
                    <VolumeUpIcon fontSize="small"/>
                    <Typography variant="body1"
                                sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>{device.renderVolume / 10}%</Typography>
                </Box>
            }
            {
                (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Capture) &&
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1}}>
                    <MicOutlinedIcon fontSize="small"/>
                    <Typography variant="body1"
                                sx={{
                                    fontSize: '0.9rem',
                                    lineHeight: '1.1rem'
                                }}>{device.captureVolume / 10}%</Typography>
                </Box>
            }
        </Box>
    );
};

export default AudioDeviceDetailsExpanded;