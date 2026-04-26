import AppContainer from '@/shared/ui/AppContainer/AppContainer'
import { Box, Typography, Link, Divider } from '@mui/material';

const linkStyles = {
    opacity: 0.8,
    transition: 'opacity 0.2s ease',
    '&:hover': {
        opacity: 1,
    }
};

function Footer() {
    const currYear = new Date().getFullYear()

    return (
        <AppContainer>
            <Box sx={{ pt: { xs: 4, md: 6 }, pb: 2, color: 'primary.contrastText' }}>

                <Box sx={{
                    display: 'grid', gap: { xs: '1.5rem', md: '3rem' }, gridTemplateColumns: 'auto 1fr 1fr',
                    '@media (max-width:700px)': {
                        gridTemplateColumns: '1fr 1fr'
                    }
                }}>
                    <Box sx={{
                        '@media (max-width:700px)': {
                            gridColumn: '1 / -1'
                        }
                    }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem' },
                                lineHeight: 1,
                                fontWeight: 400,
                                letterSpacing: '-2px',
                                mb: 2
                            }}
                        >
                            Travel Blog
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Share your travels, inspire others and create memories with us.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                            Navigation
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/" underline="none" color="inherit" sx={linkStyles}>
                                Home
                            </Link>
                            <Link href="/create" underline="none" color="inherit" sx={linkStyles}>
                                New Post
                            </Link>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                            Resources
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="https://unsplash.com"
                                target="_blank"
                                underline="none"
                                color="inherit"
                                sx={linkStyles}
                            >
                                Unsplash Photos
                            </Link>
                            <Link
                                href="https://github.com/DmitriyBihun"
                                target="_blank"
                                underline="none"
                                color="inherit"
                                sx={linkStyles}
                            >
                                GitHub
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: { xs: 2, sm: 3, md: 4 }, borderColor: 'rgba(255,255,255,0.2)' }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,

                        '@media (max-width: 678px)': {
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                    }}
                >
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        © {currYear} Travel Blog. All rights reserved.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link href="#" underline="none" color="inherit" sx={linkStyles}>
                            Privacy
                        </Link>
                        <Link href="#" underline="none" color="inherit" sx={linkStyles}>
                            Terms
                        </Link>
                    </Box>
                </Box>

            </Box>
        </AppContainer>
    );
}

export default Footer;