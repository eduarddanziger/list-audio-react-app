import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Box, Tooltip} from '@mui/material';
import {Link} from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import InfoIcon from '@mui/icons-material/Info';
import {useThemeContext} from '../contexts/themeContextUtils';
import {useTheme} from '@mui/material/styles';


const Navbar: React.FC = () => {
    const {toggleTheme, theme} = useThemeContext();
    const muiTheme = useTheme();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor:
                    muiTheme.palette.mode === 'dark'
                        ? 'rgba(30,30,30,0.7)'
                        : 'rgba(255,255,255,0.7)',
                color: muiTheme.palette.text.primary,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.02)',
                borderRadius: '0 0 12px 12px',
                minHeight: '48px',
            }}
        >
            <Box
                sx={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: '48px !important',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            flex: 1,
                        }}
                    >
                        Audio Device Repository
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexBasis: '80px',
                        gap: 1
                    }}>
                        <Tooltip title="Device List">
                            <IconButton color="inherit" component={Link} to="/" size="small">
                                <SpeakerGroupIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={theme.palette.mode === 'dark' ? "Light Mode" : "Dark Mode"}>
                            <IconButton color="inherit" onClick={toggleTheme} size="small">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="small"/> : <Brightness4Icon fontSize="small"/>}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="About">
                            <IconButton color="inherit" component={Link} to="/about" size="small">
                                <InfoIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Navbar;