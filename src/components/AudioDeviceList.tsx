import React, {useState, useMemo} from 'react';
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
    IconButton,
    TextField,
    InputAdornment
} from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {formatDateTimeToSQL} from '../utils/formatDate';
import AudioDeviceDetailsExpanded from './AudioDeviceDetailsExpanded';
import {AudioDevice} from "../types/AudioDevice.ts";

interface AudioDeviceListProps {
    audioDevices: AudioDevice[];
    selectedDevice: AudioDevice | null;
    setSelectedDevice: (device: AudioDevice) => void;
    onSearch: (query: string, field: string | null) => void;
}

const AudioDeviceList: React.FC<AudioDeviceListProps> = ({
                                                             audioDevices,
                                                             selectedDevice,
                                                             setSelectedDevice,
                                                             onSearch
                                                         }) => {
    //const [expanded, setExpanded] = useState<string | false>(false);
    const [sortField, setSortField] = useState<keyof AudioDevice>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState<'all' | keyof AudioDevice>('all');
    const SORT_SEARCH_ACCORDION_ID = 'sort-search-accordion'
    const [expanded, setExpanded] = useState<string | false>(SORT_SEARCH_ACCORDION_ID);
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

    const handleSearch = () => {
        onSearch(searchQuery, searchField === 'all' ? null : searchField);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchField('all');
        onSearch('', null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ flexGrow: 1, paddingTop: '0.5rem' }}>
            <Accordion
                expanded={expanded === SORT_SEARCH_ACCORDION_ID}
                onChange={handleChange(SORT_SEARCH_ACCORDION_ID)}
                sx={{fontSize: '0.8rem'}}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    sx={{
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            order: -1,
                            marginRight: theme.spacing(0),
                        },
                    }}
                >
                    <Typography sx={{fontSize: 'inherit'}}>
                        Sort / Search
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{fontSize: 'inherit', p: 0}}>

                    {/* Combined Sort/Search Controls */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        paddingLeft: 5,
                        mb: 2,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1,
                        boxShadow: theme.shadows[0],
                        fontSize: '0.8rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* Sort Controls */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 'inherit', fontSize: 'inherit'}}>
                            <FormControl size="small" sx={{minWidth: 125, fontSize: 'inherit'}}>
                                <InputLabel sx={{fontSize: 'inherit'}}>Sort by</InputLabel>
                                <Select
                                    sx={{fontSize: 'inherit'}}
                                    value={sortField}
                                    label="Sort by"
                                    onChange={handleSortFieldChange}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                '& .MuiMenuItem-root': {
                                                    fontSize: '0.8rem',
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="name">Device Name</MenuItem>
                                    <MenuItem value="hostName">Host Name</MenuItem>
                                    <MenuItem value="lastSeen">Last Seen</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton onClick={toggleSortDirection} size="small">
                                {sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small"/> :
                                    <ArrowDownwardIcon fontSize="small"/>}
                            </IconButton>
                        </Box>

                        <Box sx={{width: 20}}/>

                        {/* Search Controls */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, fontSize: 'inherit'}}>
                            <FormControl size="small" sx={{minWidth: 125}}>
                                <InputLabel sx={{fontSize: 'inherit'}}>Search in</InputLabel>
                                <Select
                                    value={searchField}
                                    sx={{fontSize: 'inherit'}}
                                    label="Search in"
                                    onChange={(e) => setSearchField(e.target.value as 'all' | keyof AudioDevice)}
                                    MenuProps={{
                                        sx: {
                                            '& .MuiMenuItem-root': {
                                                fontSize: '0.8rem',
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="all">All Fields</MenuItem>
                                    <MenuItem value="name">Device Name</MenuItem>
                                    <MenuItem value="hostName">Host Name</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                size="small"
                                sx={{
                                    width: 200,
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.8rem'
                                    }
                                }}
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" sx={{mr: 1, color: 'action.active'}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchQuery && (
                                        <InputAdornment position="end">
                                            <IconButton onClick={clearSearch} size="small" edge="end">
                                                <ClearIcon fontSize="small"/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Device List */}
            <List>
                {sortedDevices.map((device) => (
                    <Accordion
                        key={device.key}
                        expanded={expanded === device.key}
                        onChange={handleChange(device.key)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
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
                            <Box sx={{display: 'flex', alignItems: 'center', columnGap: 1, width: '100%'}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'inherit',
                                    flex: '1 1 50%',
                                    paddingRight: 1
                                }}>
                                    <HeadsetIcon fontSize="small"/>
                                    <Typography variant="subtitle1">{device.name}</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'inherit',
                                    flex: '1 1 20%',
                                    paddingRight: 1,
                                    paddingLeft: 1
                                }}>
                                    <Typography variant="body2">{device.hostName}</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'inherit',
                                    flex: '1 1 30%',
                                    paddingLeft: 1
                                }}>
                                    <Typography variant="body2">{formatDateTimeToSQL(device.lastSeen)}</Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AudioDeviceDetailsExpanded device={device}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>
        </Box>
    );
};

export default AudioDeviceList;
