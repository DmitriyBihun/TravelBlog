import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import formatDate from '@/shared/lib/formatDate';
import style from './CommentSection.module.css';
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsByPostIdQuery } from '@/entities/comment/api/commentApi';
import CommentItem from '@/widgets/CommentItem/ui/CommentItem';

function CommentSection({ postId, postAuthorId }) {
    const [newComment, setNewComment] = useState('');
    const { data: comments, isLoading, error } = useGetCommentsByPostIdQuery(postId);
    const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim() || !currentUser) return;

        try {
            await addComment({
                postId,
                userId: currentUser.uid,
                userName: currentUser.displayName,
                text: newComment.trim(),
            }).unwrap();

            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment({ commentId, postId }).unwrap()
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    }

    if (isLoading) {
        return (
            <Box sx={{ mt: { xs: 2, md: 3 }, textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">Loading comments...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Alert severity="error">Error loading comments</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{
            mt: { xs: 2, md: 3 },
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'primary.main',
            opacity: 0.9
        }}>
            <Box className={style.titleWrapper}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Comments
                </Typography>
                {comments?.length > 0 && (
                    <Box
                        component="span"
                        sx={{
                            bgcolor: 'action.hover',
                            color: 'text.secondary',
                            px: 1.5,
                            py: 0.25,
                            borderRadius: '16px',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}
                    >
                        {comments.length}
                    </Box>
                )}
            </Box>

            {currentUser ? (
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        disabled={isAdding}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'background.paper'
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!newComment.trim() || isAdding}
                        sx={{ px: 4 }}
                    >
                        {isAdding ? 'Sending...' : 'Send'}
                    </Button>
                </Box>
            ) : (
                <Paper
                    variant="outlined"
                    sx={{ p: 3, mb: 4, textAlign: 'center', bgcolor: 'action.hover', borderStyle: 'dashed' }}
                >
                    <Typography color="text.secondary">
                        Log in to leave a comment.
                    </Typography>
                </Paper>
            )}

            {comments && comments.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {comments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postAuthorId={postAuthorId}
                            currentUser={currentUser}
                            onDelete={handleDeleteComment}
                            formatDate={formatDate}
                        />
                    ))}
                </Box>
            ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        There are no comments yet. Be the first!
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default CommentSection;