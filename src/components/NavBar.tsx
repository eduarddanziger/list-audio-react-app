import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useThemeContext } from '../contexts/themeContextUtils';
import SpeakerGroupOutlinedIcon from '@mui/icons-material/SpeakerGroupOutlined';

const Navbar: React.FC<{ appTitle: string }> = ({ appTitle }) => {

    const { toggleTheme, theme } = useThemeContext();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? 'rgba(30,30,30,0.7)'
                        : 'rgba(255,255,255,0.7)',
                color: theme.palette.text.primary,
                backdropFilter: 'blur(8px)',
                minHeight: '3.4rem',
            }}
        >
            <Box
                sx={{
                    maxWidth: '70rem',
                    margin: '0 auto',
                    width: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: '48px !important',
                        paddingTop: '0.5rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: 'flex',
                                fontSize: '1.2rem',
                                fontWeight: 500,
                                textAlign: 'left',
                                paddingLeft: '0.3rem',
                                flex: 1,
                                cursor: 'pointer',
                                lineHeight: '1.4rem'
                            }}
                        >
                            <SpeakerGroupOutlinedIcon fontSize="medium" sx={{ mr: 1 }} />
                            {appTitle}
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                        }}
                    >
                        <Tooltip title="Refresh">
                            <IconButton
                                color="inherit"
                                onClick={() => window.location.reload()}
                                size="small"
                            >
                                <RefreshIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                            <IconButton color="inherit" onClick={toggleTheme} size="small">
                                {theme.palette.mode === 'dark' ? (
                                    <Brightness7Icon fontSize="small" />
                                ) : (
                                    <Brightness4Icon fontSize="small" />
                                )}
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