import React, {useState, useMemo, useEffect} from 'react';
import {
    List,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    SelectChangeEvent
} from '@mui/material';
import SpeakerGroupOutlinedIcon from '@mui/icons-material/SpeakerGroupOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {formatDateTimeToSQL} from '../utils/formatDate';
import AudioDeviceDetailsExpanded from './AudioDeviceDetailsExpanded';
import {AudioDevice} from '../types/AudioDevice';
import {DeviceFlowType} from "../types/DeviceFlowType";
import {accordionStyle, accordionSummaryStyle} from "../styles/accordionStyles.ts";
import SortAndSearchAccordion from './SortAndSearchAccordion.tsx'; // adjust path as needed


interface AudioDeviceListProps {
    audioDevices: AudioDevice[];
    onSearch: (query: string) => void;
}

const AudioDeviceList: React.FC<AudioDeviceListProps> = ({
                                                             audioDevices,
                                                             onSearch
                                                         }) => {
    const [sortField, setSortField] = useState<keyof AudioDevice>('updateDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearchQuery, setAppliedSearchQuery] = useState('');

    const [expanded, setExpanded] = useState<string | false>();

    const theme = useTheme();

    useEffect(() => {
        const savedQuery = localStorage.getItem('appliedSearchQuery');
        if (savedQuery) {
            setSearchQuery(savedQuery);
            setAppliedSearchQuery(savedQuery);
        }
    }, []);

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
        setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearch = () => {
        onSearch(searchQuery);
        setAppliedSearchQuery(searchQuery);
        localStorage.setItem('appliedSearchQuery', searchQuery);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setAppliedSearchQuery('');
        onSearch('');
        localStorage.removeItem('appliedSearchQuery');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{flexGrow: 1, paddingTop: '0.1rem'}}>
            <SortAndSearchAccordion
                appliedSearchQuery={appliedSearchQuery}
                clearSearch={clearSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleKeyDown={handleKeyDown}
                sortDirection={sortDirection}
                toggleSortDirection={toggleSortDirection}
                sortField={sortField}
                handleSortFieldChange={handleSortFieldChange}
            />

            <List>
                {sortedDevices.map((device) => (
                    <Accordion
                        key={device.key}
                        expanded={expanded === device.key}
                        onChange={handleAccordionChange(device.key)}
                        sx={accordionStyle}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            sx={accordionSummaryStyle(theme)}
                        >
                            <Box sx={{display: 'flex', columnGap: 1, width: '100%'}}>
                                <Box sx={{ display: 'flex', gap: 'inherit', flex: '1 1 70%', paddingRight: 1, minWidth: '13rem'}}>
                                    {
                                        device.flowType === DeviceFlowType.RenderAndCapture ? (
                                            <SpeakerGroupOutlinedIcon fontSize="medium" />
                                        ) : device.flowType === DeviceFlowType.Capture ? (
                                            <MicOutlinedIcon fontSize="medium" />
                                        ) : ( // Render
                                            <SpeakerOutlinedIcon fontSize="medium" />
                                        )
                                    }
                                    <Typography variant="body2">{device.name}</Typography>
                                </Box>

                                <Box sx={{display: 'flex', gap: 'inherit', flex: '1 1 15%', paddingRight: 1, paddingLeft: 1}}>
                                    <Typography variant="body2">
                                        {device.hostName}
                                        {device.operationSystemName &&
                                            device.operationSystemName !== '' &&
                                            `, ${device.operationSystemName}`}
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: 'inherit', flex: '1 1 15%', paddingLeft: 1}}>
                                    <Typography variant="body2">{formatDateTimeToSQL(device.updateDate)}</Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                paddingTop: '0.3rem',
                                paddingBottom: '0.3rem',
                                paddingLeft: 1.3
                            }}
                        >
                            <AudioDeviceDetailsExpanded device={device}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Box>
    );
};

export default AudioDeviceList;