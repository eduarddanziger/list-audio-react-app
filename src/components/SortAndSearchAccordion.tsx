import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    SelectChangeEvent,
    Box,
    Typography,
    Chip,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {accordionSummaryStyle} from "../styles/accordionStyles.ts";

interface SortSearchAccordionProps {
    appliedSearchQuery: string;
    clearSearch: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;

    sortDirection: 'asc' | 'desc';
    toggleSortDirection: () => void;
    sortField: string;
    handleSortFieldChange: (e: SelectChangeEvent) => void;
}

const SortAndSearchAccordion: React.FC<SortSearchAccordionProps>
    = ({
           appliedSearchQuery,
           clearSearch,
           searchQuery,
           setSearchQuery,
           handleKeyDown,
           sortDirection,
           toggleSortDirection,
           sortField,
           handleSortFieldChange,
       }) => {

    const [expanded, setExpanded] = useState<boolean>(true);
    const handleChange
        = () => (_event: React.SyntheticEvent, isExpanded: boolean) =>
    {
        setExpanded(isExpanded);
    };

    const theme = useTheme();

    return (
        <Accordion
            expanded = {Boolean(expanded)}
            onChange={handleChange()}
            sx={{
                fontSize: '0.8rem',
                padding: 0,
                boxShadow: 'none',
                border: 'none',
                '&:before': {display: 'none'}
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={accordionSummaryStyle(theme)}
            >
                <Box sx={{display: 'flex', fontSize: 'inherit', alignItems: 'center', gap: 1}}>
                    <Typography sx={{fontSize: 'inherit', paddingBottom: 0, display: 'flex', gap: 'inherit', }}>
                        Filter / Sort
                    </Typography>
                    {appliedSearchQuery && (
                        <Box sx={{fontSize: 'inherit', paddingBottom: 0, display: 'flex', gap: 'inherit'}}>
                            <Chip
                                label={`${appliedSearchQuery}`}
                                onDelete={clearSearch}
                                variant="outlined"
                                sx={{
                                    fontSize: '0.72rem',
                                    height: 22,
                                    minHeight: 22,
                                    display: 'flex', gap: 'inherit',
                                    border: `1.8px solid ${theme.palette.divider}`,
                                    backgroundColor: theme.palette.background.paper,
                                    padding: 0,
                                    '& .MuiChip-label': {
                                        padding: '0 0.5rem',
                                        fontSize: '0.75rem',
                                        lineHeight: 1.1,
                                    },
                                    '&  .MuiChip-deleteIcon': {
                                        padding: '0 0.2rem',
                                        fontSize: '1.35rem',
                                    }
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{fontSize: 'inherit', p: 0}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0,
                    mb: 2,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 1,
                    boxShadow: theme.shadows[0],
                    fontSize: 'inherit',
                    paddingLeft: 1,
                }}>
                    <TextField
                        size="small"
                        sx={{
                            width: 180,
                            '& .MuiInputBase-input': {
                                fontSize: '0.8rem'
                            }
                        }}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        //slotProps={}
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

                    <Box sx={{width: 20}}/>

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
                                                fontSize: '0.8rem'
                                            }
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="name">Device Name</MenuItem>
                                <MenuItem value="hostName">Host Name</MenuItem>
                                <MenuItem value="updateDate">Last Update</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={toggleSortDirection} size="small">
                            {sortDirection === 'asc'
                                ? <ArrowUpwardIcon fontSize="small"/>
                                : <ArrowDownwardIcon fontSize="small"/>}
                        </IconButton>
                    </Box>

                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default SortAndSearchAccordion;