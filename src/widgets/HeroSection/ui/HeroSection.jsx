import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, useTheme, Box } from '@mui/material';
import style from './HeroSection.module.css';
import heroImage from '@/assets/hero-img.jpg';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';

function HeroSection() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const duotoneVars = useMemo(() => {
        return {
            '--duotone-bg': isDark ? '#7588a6' : '#fde863',
            '--duotone-overlay': isDark ? '#111827' : '#3558a2',
            '--img-filter': isDark ? 'grayscale(100%)' : 'grayscale(100%)',
        };
    }, [isDark]);

    const handleCreatePost = () => {
        if (currentUser) {
            navigate('/create');
        } else {
            navigate('/auth');
        }
    };

    return (
        <Box className={style.hero} style={duotoneVars}
            sx={(theme) => ({
                minHeight: `calc(100vh - ${theme.layout.header.height}px)`
            })}>
            <AppContainer>
                <div className={style.wrapper}>
                    <div className={style.content}>
                        <div className={style.title}>
                            {[
                                { main: 'Explore.', sub: '世界' },
                                { main: 'Share.', sub: '想い', before: true },
                                { main: 'Connect.', sub: '絆' }
                            ].map((item, idx) => (
                                <span key={idx}>
                                    <Typography
                                        variant="h1"
                                        className={style.titleWord}
                                        data-after={!item.before ? item.sub : ''}
                                        data-before={item.before ? item.sub : ''}
                                        sx={{
                                            color: 'text.primary',
                                            display: 'inline-block',
                                            animationDelay: `${0.3 + (idx * 0.25)}s`
                                        }}
                                    >
                                        {item.main}
                                    </Typography>
                                </span>
                            ))}
                        </div>

                        <div className={style.info}>
                            <Typography variant="body2" sx={{ maxWidth: { xs: '100%', md: 500 }, mb: 3, color: 'text.secondary' }}>
                                Travel stories shared by people around the world.
                                Connect with travelers, exchange impressions, and explore together.
                                Your next destination starts here.
                            </Typography>

                            <Button
                                variant="contained"
                                color='primary'
                                onClick={handleCreatePost}
                            >
                                {currentUser ? 'Share a story' : 'Start your journey'}
                            </Button>
                        </div>
                    </div>

                    <div className={style.imageBlock}>
                        <div className={style.imageWrapper}>
                            <img src={heroImage} alt="Traveling" />
                        </div>
                    </div>
                </div>
            </AppContainer>
        </Box>
    );
}

export default HeroSection;