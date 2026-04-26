import { useGetStatsQuery } from '@/features/postStats/api/statsApi';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';
import { Box, Typography, Skeleton } from '@mui/material';

function StatsSection() {
    const { data: stats, isLoading, error } = useGetStatsQuery()

    if (isLoading) {
        return (
            <Box sx={{ py: { xs: 4, md: 8 } }}>
                <Skeleton variant="text" width={200} height={40} />
            </Box>
        )
    }

    if (error || !stats) return null;

    const statsData = [
        { value: stats.cities, label: 'Cities' },
        { value: stats.authors, label: 'Authors' },
        { value: stats.countries, label: 'Countries' },
    ];

    return (
        <AppContainer maxWidth='732px'>
            <Box
                sx={{
                    py: { xs: 4, md: 8 },
                }}
            >
                <Box sx={{mb: 6}}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '3rem', md: '5rem' },
                            lineHeight: 1,
                            fontWeight: 400,
                            textAlign: 'center',
                            color: 'text.primary',
                        }}
                    >
                        Numbers speak
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 1,
                    }}
                >
                    {statsData.map((stat, index) => {
                        const isHighlighted = index === 1;

                        return (
                            <Box
                                key={index}
                                sx={(theme) => ({
                                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                                    p: { xs: 2, sm: 3 },
                                    textAlign: 'center',
                                    backgroundColor: isHighlighted ? theme.palette.primary.main : 'transparent',
                                    color: isHighlighted ? '#fff' : 'text.primary',
                                })}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        fontWeight: 700,
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </AppContainer>
    );
}

export default StatsSection;