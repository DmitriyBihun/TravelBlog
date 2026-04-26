import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { createContext, useContext, useMemo, useState } from "react";
import { baseTheme } from "../theme/baseTheme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem('themeMode');
        return saved === 'dark' ? 'dark' : 'light';
    });

    const toggleTheme = () => {
        setMode(prev => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    const theme = useMemo(() => {
        const palette = {
            light: {
                primary: {
                    main: '#3558a2',
                    dark: '#2a437c',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#fde863',
                    dark: '#e6d255',
                    contrastText: '#000',
                },
                text: {
                    primary: '#1a1a1a',
                    secondary: '#666',
                },
                background: {
                    default: '#f5f7fb',
                    paper: '#ffffff',
                },
                error: {
                    main: '#e74c3c',
                },
                divider: '#eaeaea',
            },
            dark: {
                primary: {
                    main: '#fde863',
                    dark: '#e6d255',
                    contrastText: '#1a1a1a',
                },
                secondary: {
                    main: '#3558a2',
                    dark: '#2a437c',
                    contrastText: '#fff',
                },
                text: {
                    primary: '#e0e0e0',
                    secondary: '#a0a0a0',
                },
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                error: {
                    main: '#f44336',
                },
                divider: '#333333',
            },
        }

        const selectedPalette = palette[mode];

        return createTheme({
            ...baseTheme,
            palette: {
                mode,
                ...selectedPalette
            },
            components: {
                ...baseTheme.components,
                
                MuiCard: {
                    styleOverrides: {
                        root: {
                            boxShadow: mode === 'light'
                                ? '0 20px 60px rgba(0, 0, 0, 0.15)'
                                : '0 20px 60px rgba(0, 0, 0, 0.4)',
                        },
                    },
                },
            }
        })
    }, [mode])


    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;