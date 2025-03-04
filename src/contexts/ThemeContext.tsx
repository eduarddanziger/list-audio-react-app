import React, { useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './themeContextUtils';

interface ThemeProviderComponentProps {
    children: ReactNode;
}

export const ThemeProviderComponent: React.FC<ThemeProviderComponentProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

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
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};