import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { Box, CircularProgress } from "@mui/material";

function MainLayout() {

    // The Division 2016p
    // Ghost of Tsushimа DIRECTOR'S CUT 2024p

    const location = useLocation()
    const routesWithFooter = ['/']
    const showFooter = routesWithFooter.includes(location.pathname)

    return (
        <>
            <Box
                component='header'
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    bgcolor: 'background.paper'
                }}
            >
                <Header />

                <Box component="main"
                    sx={(theme) => ({
                        pt: `${theme.layout.header.height}px`,
                        minHeight: `calc(100vh - ${theme.layout.header.height}px)`,
                    })}
                >
                    <Suspense fallback={
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                            <CircularProgress />
                        </Box>
                    }>
                        <Outlet />
                    </Suspense>
                </Box>
            </Box>

            {showFooter && (
                <Box component="footer"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '@media (min-width: 48rem)': {
                            position: 'sticky',
                            bottom: 0,
                        }
                    }}
                >
                    <Footer />
                </Box>
            )}
        </>
    );
}

export default MainLayout;