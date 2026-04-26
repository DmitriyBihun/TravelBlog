import { Typography, IconButton, Box } from '@mui/material';
import { memo, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import { DeleteIcon } from '@/shared/icons/icons';
import style from './CommentItem.module.css';

const CommentItem = memo(({ comment, postAuthorId, currentUser, onDelete, formatDate }) => {

    const canDelete = useMemo(() => {
        if (!currentUser) return false;
        return comment.userId === currentUser.uid || currentUser.uid === postAuthorId;
    }, [comment.userId, currentUser, postAuthorId]);

    const isPostAuthor = comment.userId === postAuthorId;

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider', 
            }}
        >
            <Box className={style.commentHeader}>
                <Box className={style.commentAuthor}>
                    <Typography
                        variant="commentAuthor"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600
                        }}
                    >
                        {comment.userName}
                    </Typography>

                    {isPostAuthor && (
                        <Box
                            component="span"
                            sx={{
                                fontSize: '0.65rem',
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                px: 1,
                                py: 0.1,
                                borderRadius: 1,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            author
                        </Box>
                    )}
                </Box>

                <Box className={style.commentActions}>
                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            color: 'text.secondary',
                            fontStyle: 'italic'
                        }}
                    >
                        {formatDate(comment.createdAt, true)}
                    </Typography>

                    {canDelete && (
                        <IconButton
                            size="small"
                            onClick={() => onDelete(comment.id)}
                            sx={{
                                color: 'text.disabled',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    color: 'error.main',
                                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                                }
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Typography
                variant="body1"
                sx={{
                    mt: 1,
                    lineHeight: 1.6,
                    color: 'text.primary',
                    wordBreak: 'break-word'
                }}
            >
                {comment.text}
            </Typography>
        </Box>
    );
});

CommentItem.displayName = 'CommentItem';

export default CommentItem;