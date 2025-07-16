import React, { useState, useMemo, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContext } from './themeContextUtils';
import { GlobalStyles } from '@mui/material';

interface ThemeProviderComponentProps {
    children: ReactNode;
}

export const ThemeProviderComponent: React.FC<ThemeProviderComponentProps> = ({ children }) => {
    const defaultForDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [darkMode, setDarkMode] = useState(defaultForDarkMode);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            setDarkMode(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode]
    );

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        body: {
                            backgroundColor: theme.palette.background.default,
                        },
                    }}
                />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};