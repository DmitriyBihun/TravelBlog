import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Box, Button, Typography, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { logout } from "@/entities/user";
import AppContainer from "@/shared/ui/AppContainer/AppContainer";
import { useTheme } from "@/app/providers/ThemeProvider";
import { auth } from "@/shared/lib/firebase";

function MenuLink({ to, children, onClick }) {
    return (
        <Typography
            component={NavLink}
            to={to}
            onClick={onClick}
            sx={{
                color: 'primary.contrastText',
                fontSize: '1.5rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: '0.3s',
                '&:hover': { transform: 'translateX(5px)', opacity: 0.8 }
            }}
        >
            {children}
        </Typography>
    );
};

function Header() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (open) => () => setIsMenuOpen(open);

    async function handleLogout() {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate('/');
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const userDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "User";

    return (
        <Box
            sx={(theme) => ({
                height: theme.layout.header.height,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                zIndex: 1000,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center'
            })}
        >
            <AppContainer>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                        component={NavLink}
                        to="/"
                        sx={{
                            color: 'text.primary',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}
                    >
                        Travel Blog
                    </Typography>

                    <IconButton
                        onClick={toggleMenu(true)}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            borderRadius: '0px',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </AppContainer>

            <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={toggleMenu(false)}
                disableScrollLock
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: '320px' },
                        bgcolor: 'primary.main',
                        padding: '4.5rem 2.5rem',
                    }
                }}
            >
                <IconButton
                    onClick={toggleMenu(false)}
                    sx={{ position: 'absolute', top: '1rem', right: '2.5rem', color: 'primary.contrastText' }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>

                <Stack spacing={4}>
                    <MenuLink to="/" onClick={toggleMenu(false)}>Home</MenuLink>

                    {currentUser && (
                        <>
                            <MenuLink to="/create" onClick={toggleMenu(false)}>New Post</MenuLink>
                            <Typography sx={{ color: 'primary.contrastText', opacity: 0.8, fontSize: '1.2rem' }}>
                                Hi, {userDisplayName}
                            </Typography>
                        </>
                    )}

                    {currentUser ? (
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                            sx={{
                                bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'common.white',
                                color: mode === 'dark' ? 'common.white' : 'common.black',
                                '&:hover': {
                                    bgcolor: mode === 'dark' ? 'common.black' : 'grey.100'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <MenuLink to="/auth" onClick={toggleMenu(false)}>Account</MenuLink>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Typography sx={{ color: 'primary.contrastText' }}>
                            {mode === 'light' ? 'Light mode' : 'Dark mode'}
                        </Typography>
                        <IconButton onClick={toggleTheme} sx={{ color: 'primary.contrastText' }}>
                            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                        </IconButton>
                    </Box>
                </Stack>
            </Drawer>
        </Box>
    );
}

export default Header;