import React from 'react';
import {AudioDevice} from '../types/AudioDevice';
import { Box, Typography} from '@mui/material';
import HostIcon from '@mui/icons-material/Computer';
import DateIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import {formatDateTimeToSQL} from '../utils/formatDate';
import {DeviceFlowType} from "../types/DeviceFlowType";
import {DeviceMessageType} from "../types/DeviceMessageType";
import LabelOutlined from '@mui/icons-material/LabelOutlined';
import Tag from '@mui/icons-material/Tag';
/*
// Uncomment these if refresh and delete functionality continued
import { useTheme} from '@mui/material';
import { Paper, IconButton} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {getAudioDevicesApiUrl} from '../utils/ApiUrls';
*/


interface AudioDeviceDetailsExpandedProps {
    device: AudioDevice;
}

const AudioDeviceDetailsExpanded: React.FC<AudioDeviceDetailsExpandedProps> = ({device}) => {

    const deviceMessageTypeToString
        = (deviceMessageType: DeviceMessageType): string => {
        switch (deviceMessageType) {
            case DeviceMessageType.Confirmed:
                return 'Existence confirmed';
            case DeviceMessageType.Detached:
                return 'Device detached';
            case DeviceMessageType.Discovered:
                return 'Device discovered';
            case DeviceMessageType.VolumeRenderChanged:
                return 'Output volume updated';
            case DeviceMessageType.VolumeCaptureChanged:
                return 'Input volume updated';
            default:
                return 'Unknown';
        }
    }

    const deviceTypeToString
        = (flowType: DeviceFlowType): string => {
        switch (flowType) {
            case DeviceFlowType.RenderAndCapture:
                return 'Render-and-capture';
            case DeviceFlowType.Capture:
                return 'Capture';
            case DeviceFlowType.Render:
                return 'Render';
            default:
                return 'Unknown';
        }
    };

/*
    // Uncomment these if refresh and delete functionality continued
    const theme = useTheme();

    const handleRefresh = async (deviceKey: string) => {
        try {
            const response = await axios.get(`${getAudioDevicesApiUrl()}/${deviceKey}`);
            console.log('Refresh successful:', response.data);
            //state updates!
        } catch (error) {
            console.error('Error refreshing device:', error);
        }
    };

    const handleDelete = async (deviceKey: string) => {
        try {
            const response = await axios.delete(`${getAudioDevicesApiUrl()}/${deviceKey}`);
            console.log('Delete successful:', response.data);
            //state updates!
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };
*/


    return (
        <Box>
            <Box
                sx={{
                    paddingLeft: '1.5rem'
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                    <LabelOutlined fontSize="small"/>
                    <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                        {deviceTypeToString(device.flowType)}
                        {' device: '}
                        {device.name}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                    <Tag fontSize="small"/>
                    <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                        {' PnP Id: '}
                        {device.pnpId}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                    <HostIcon fontSize="small"/>
                    <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                        {' End point: '}
                        {device.hostName}
                        {' (hashed)'}
                        {device.operationSystemName &&
                            device.operationSystemName !== '' &&
                            `, ${device.operationSystemName}`}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1, marginBottom: 1}}>
                    <DateIcon fontSize="small"/>
                    <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                        {formatDateTimeToSQL(device.updateDate)}
                        {': '}
                        {deviceMessageTypeToString(device.deviceMessageType)}
                    </Typography>
                </Box>
                {
                    (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Render) &&
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1}}>
                        <VolumeUpIcon fontSize="small"/>
                        <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                            {' Output volume: '}
                            {device.renderVolume / 10}
                            %
                        </Typography>
                    </Box>
                }
                {
                    (device.flowType === DeviceFlowType.RenderAndCapture || device.flowType === DeviceFlowType.Capture) &&
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1}}>
                        <MicOutlinedIcon fontSize="small"/>
                        <Typography variant="body1" sx={{fontSize: '0.9rem', lineHeight: '1.1rem'}}>
                            {' Input volume: '}
                            {device.captureVolume / 10}
                            %
                        </Typography>
                    </Box>
                }
            </Box>
{/*
// Uncomment these if refresh and delete functionality continued
            <Box
                sx={{
                    paddingLeft: '0.0rem'
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: '0.5rem',
                        py: '0.25rem',
                        borderRadius: '16px',
                        width: 'fit-content',
                        border: `1.6px solid ${theme.palette.divider}`,
                        transition: 'border-color 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                            borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                        },
                    }}
                >
                    <IconButton size="small" onClick={() => handleRefresh(device.key)}>
                        <RefreshIcon fontSize="small"/>
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(device.key)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </Paper>
            </Box>
*/}

        </Box>
    );
};

export default AudioDeviceDetailsExpanded;