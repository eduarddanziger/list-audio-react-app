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
import {formatDateToSQL} from '../utils/formatDate';
import AudioDeviceDetailsExpanded from './AudioDeviceDetailsExpanded';
import {AudioDevice} from '../types/AudioDevice';
import {DeviceFlowType} from "../types/DeviceFlowType";
import {accordionStyle, accordionSummaryStyle} from "../styles/accordionStyles";
import SortAndSearchAccordion from './SortAndSearchAccordion';
import {ellipsisTextStyle, getFlexStylePercent} from "../styles/listStyles";


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

    const [expanded, setExpanded] = useState<string | false>();

    const theme = useTheme();

    useEffect(() => {
        const savedQuery = localStorage.getItem('appliedSearchQuery');
        if (savedQuery) {
            setSearchQuery(savedQuery);
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
        localStorage.setItem('appliedSearchQuery', searchQuery);
    };

    const clearSearch = () => {
        setSearchQuery('');
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
                                <Box
                                    sx={getFlexStylePercent(116)}
                                >
                                    {device.flowType === DeviceFlowType.RenderAndCapture ? (
                                        <SpeakerGroupOutlinedIcon fontSize="medium" />
                                    ) : device.flowType === DeviceFlowType.Capture ? (
                                        <MicOutlinedIcon fontSize="medium" />
                                    ) : ( // Render
                                        <SpeakerOutlinedIcon fontSize="medium" />
                                    )}
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        sx={ellipsisTextStyle}
                                    >
                                        {device.name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={getFlexStylePercent(92)}
                                >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        sx={ellipsisTextStyle}
                                    >
                                        {device.hostName}
                                        {device.operationSystemName &&
                                            device.operationSystemName !== '' &&
                                            `, ${device.operationSystemName}`}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flex: `1 1 30rex`
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        sx={ellipsisTextStyle}
                                    >
                                        {formatDateToSQL(device.updateDate)}
                                    </Typography>
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