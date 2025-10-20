'use client';

import React, { useState, useMemo, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContext } from './themeContextUtils';
import { GlobalStyles } from '@mui/material';

interface ThemeProviderComponentProps {
    children: ReactNode;
    initialMode?: 'light' | 'dark';
}

export const ThemeProviderComponent: React.FC<ThemeProviderComponentProps> = ({ children, initialMode }) => {
    // Initialize from SSR-provided initialMode to prevent hydration flicker.
    const [darkMode, setDarkMode] = useState<boolean>(initialMode ? initialMode === 'dark' : false);

    useEffect(() => {
        // If SSR didn't specify a mode, fall back to stored preference or system.
        if (!initialMode) {
            try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || savedTheme === 'light') {
                    setDarkMode(savedTheme === 'dark');
                } else {
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setDarkMode(systemPrefersDark);
                }
            } catch {
                // ignore
            }
        }

        // Listen for system preference changes only when no explicit saved theme exists.
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            try {
                if (!localStorage.getItem('theme')) {
                    setDarkMode(event.matches);
                }
            } catch {
                // ignore
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [initialMode]);

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
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            try {
                localStorage.setItem('theme', newMode ? 'dark' : 'light');
                document.cookie = `theme-mode=${newMode ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`;
            } catch {
                // ignore
            }
            return newMode;
        });
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