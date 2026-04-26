import { useNavigate } from 'react-router-dom';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { ChatBubbleOutline } from '@mui/icons-material';
import { useGetCommentsCountQuery } from '@/entities/comment/api/commentApi';
import formatDate from '@/shared/lib/formatDate';

const PostCard = memo(({ post, onHover }) => {
    const navigate = useNavigate();
    const { data: commentsCount = 0 } = useGetCommentsCountQuery(post.id);
    const theme = useTheme();

    const isVerySmall = useMediaQuery(theme.breakpoints.down(500));
    const isMobile = useMediaQuery(theme.breakpoints.down(768));

    const handleClick = useCallback(() => {
        navigate(`/posts/${post.id}`);
    }, [navigate, post.id]);

    const handleMouseEnter = useCallback(() => {
        if (!isMobile) {
            onHover?.(post);
        }
    }, [isMobile, onHover, post]);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) {
            onHover?.(null);
        }
    }, [isMobile, onHover]);

    const formattedDate = useMemo(() => formatDate(post.createdAt), [post.createdAt]);

    const firstImage = post.images?.[0];
    const imageUrl = useMemo(() => {
        if (!firstImage) return null;

        return isMobile
            ? (firstImage.url || firstImage.thumb)
            : (firstImage.thumb || firstImage.url);
    }, [firstImage, isMobile]);

    const textFlexDirection = isMobile ? 'column' : 'row';

    const imageMt = isVerySmall ? 2 : 0;

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            sx={{
                py: { xs: 2, sm: 3 },
                cursor: 'pointer',
                position: 'relative',
                backgroundImage: (theme) => `linear-gradient(to right, ${theme.palette.divider}, transparent 50%, ${theme.palette.divider})`,
                backgroundSize: '100% 1px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                transition: 'all 0.3s ease',

                display: isVerySmall ? 'block' : isMobile ? 'grid' : 'block',
                gridTemplateColumns: isVerySmall || !isMobile ? 'none' : '1fr 200px',
                gap: isVerySmall || !isMobile ? 0 : '8px',

                '&:hover': {
                    '& [data-title]': { color: 'primary.main' }, 
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexDirection: textFlexDirection, }}>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h6"
                        data-title
                        sx={{
                            mb: 1,
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontWeight: { xs: 500, sm: 400 },
                            transition: 'color 0.2s ease',
                            wordBreak: 'break-word',
                        }}
                    >
                        {post.city}, {post.country}
                    </Typography>
                    <Typography variant="author">
                        {post.userName}
                    </Typography>

                    {commentsCount > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                            <ChatBubbleOutline sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                    {formattedDate}
                </Typography>
            </Box>

            {isMobile && imageUrl && (
                <Box sx={{ mt: imageMt, width: '100%', overflow: 'hidden', bgcolor: 'action.hover' }}>
                    <Box
                        component="img"
                        src={imageUrl}
                        alt={post.city}
                        loading="lazy"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
});

PostCard.displayName = 'PostCard';
export default PostCard;