import React, { useState, useMemo } from 'react';
import {
    List,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    MenuItem,
    Select,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    IconButton
} from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatDateTimeToSQL } from '../utils/formatDate';
import AudioDeviceDetailsExpanded from './AudioDeviceDetailsExpanded';
import {AudioDevice} from "../types/AudioDevice.ts";

interface AudioDeviceListProps {
    audioDevices: AudioDevice[];
    selectedDevice: AudioDevice | null;
    setSelectedDevice: (device: AudioDevice) => void;
}

const AudioDeviceList: React.FC<AudioDeviceListProps> = ({
                                                             audioDevices,
                                                             selectedDevice,
                                                             setSelectedDevice
                                                         }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [sortField, setSortField] = useState<keyof AudioDevice>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const theme = useTheme();

    // Sorted devices (cached with useMemo)
    const sortedDevices = useMemo(() => {
        return [...audioDevices].sort((a, b) => {
            const aValue = String(a[sortField]).toLowerCase();
            const bValue = String(b[sortField]).toLowerCase();
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    }, [audioDevices, sortField, sortDirection]);

    const handleSortFieldChange = (e: SelectChangeEvent) => {
        setSortField(e.target.value as keyof AudioDevice);
    };

    const toggleSortDirection = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>
            {/* Sorting Controls */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                paddingTop: 4,
                paddingLeft: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                fontSize: '0.8rem'
            }}>
                <SortIcon color="action" />
                <FormControl size="small" sx={{ minWidth: 120 ,fontSize: 'inherit'}}>
                    <InputLabel sx={{fontSize: 'inherit'}}>Sort by</InputLabel>
                    <Select
                        sx={{ fontSize: 'inherit' }}
                        value={sortField}
                        label="Sort by"
                        onChange={handleSortFieldChange}
                        MenuProps={{
                            sx: {
                                '& .MuiMenu-paper': {
                                    '& .MuiMenuItem-root': {
                                        fontSize: '0.8rem'
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value="name">Device Name</MenuItem>
                        <MenuItem value="hostName">Host Name</MenuItem>
                        <MenuItem value="lastSeen">Last Seen</MenuItem>                    </Select>
                </FormControl>
                <IconButton onClick={toggleSortDirection}>
                    {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
            </Box>

            {/* Device List */}
                <List>
                {sortedDevices.map((device) => (
                    <Accordion
                        key={device.key}
                        expanded={expanded === device.key}
                        onChange={handleChange(device.key)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            onClick={() => setSelectedDevice(device)}
                            sx={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                backgroundColor:
                                    selectedDevice?.key === device.key
                                        ? theme.palette.mode === 'dark'
                                            ? '#424242'
                                            : '#f0f0f0'
                                        : 'inherit',
                                color:
                                    selectedDevice?.key === device.key
                                        ? theme.palette.mode === 'dark'
                                            ? '#ffffff'
                                            : 'inherit'
                                        : 'inherit',
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.mode === 'dark'
                                            ? '#616161'
                                            : '#e0e0e0',
                                },
                                cursor: 'pointer',
                                '& .MuiAccordionSummary-expandIconWrapper': {
                                    order: -1,
                                    marginRight: theme.spacing(1),
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1, width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 'inherit', flex: '1 1 50%', paddingRight: 1 }}>
                                    <HeadsetIcon fontSize="small" />
                                    <Typography variant="subtitle1">{device.name}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 'inherit', flex: '1 1 20%', paddingRight: 1, paddingLeft: 1 }}>
                                    <Typography variant="body2">{device.hostName}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 'inherit', flex: '1 1 30%', paddingLeft: 1 }}>
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
        </Box>
    );
};

export default AudioDeviceList;