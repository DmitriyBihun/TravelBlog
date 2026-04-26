export const baseTheme = {
    typography: {
        fontFamily: `'Roboto', 'Noto Sans JP', sans-serif`,

        h1: {
            fontFamily: `'Roboto', sans-serif`,
            fontWeight: 600,
            letterSpacing: '-2px',
            fontSize: '64px',
            lineHeight: 1.1,
            '@media (min-width:600px)': { fontSize: '80px' },
            '@media (min-width:900px)': { fontSize: '100px' },
        },

        body1: {
            fontSize: '16px',
            lineHeight: 1.6,
        },

        body2: {
            fontSize: '24px',
            lineHeight: 1.2,
        },

        button: {
            fontFamily: `'Roboto', sans-serif`,
            textTransform: 'none',
        },
    },

    layout: {
        header: {
            height: 50,
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    padding: '8px 14px',
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                    }
                },
                containedSecondary: {
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.secondary.dark,
                    }
                }
            }
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: '5px',
                    '& fieldset': {
                        borderColor: theme.palette.mode === 'light' ? '#ddd' : '#444',
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                    }
                }),
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: (theme) => theme.palette.primary.main,
                    }
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '.5rem',
                    padding: '1.5rem',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                }
            }
        },

        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    author: 'span',
                },
            },
            variants: [
                {
                    props: { variant: 'author' },
                    style: ({ theme }) => ({
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: `1px solid ${theme.palette.text.primary}`,
                        color: theme.palette.text.secondary,
                        display: 'inline-block',
                    }),
                },
                {
                    props: { variant: 'commentAuthor' },
                    style: {
                        fontSize: '1.125rem',
                        fontWeight: 600,
                    },
                },
            ],
        },
    },
};