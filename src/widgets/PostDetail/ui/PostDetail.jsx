import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditIcon, DeleteIcon, CommentIcon } from '@/shared/icons/icons'
import { usePostEdit } from '@/entities/post/model/hooks/usePostEdit'
import { usePostDelete } from '@/entities/post/model/hooks/usePostDelete'
import { useIntersectionObserver } from '@/entities/post/model/hooks/useIntersectionObserver'
import { Box, Button, TextField, Typography } from '@mui/material';
import formatDate from '@/shared/lib/formatDate';
import style from './PostDetail.module.css';
import { useDeletePostMutation, useUpdatePostMutation } from '@/entities/post/api/postApi';
import CommentSection from '@/widgets/CommentSection/ui/CommentSection';
import Modal from '@/shared/ui/Modal/Modal';

function PostDetail({ post }) {

    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [localPost, setLocalPost] = useState(post);

    const isAuthor = currentUser?.uid === localPost.userId;
    const { isVisible: loadComments, ref: commentsRef } = useIntersectionObserver();

    const handleUpdatePost = async (data) => {
        await updatePost(data).unwrap();
        setLocalPost((prev) => ({ ...prev, description: data.description, updatedAt: data.updatedAt }));
    };

    const { isEditing, setIsEditing, editedDescription, setEditedDescription, isUpdating, handleSaveEdit, handleCancelEdit } = usePostEdit(localPost, handleUpdatePost);

    const handleDeletePost = async (id) => {
        await deletePost(id).unwrap();
        navigate('/');
    };

    const { isOpen: isDeleteModalOpen, setIsOpen: setIsDeleteModalOpen, confirmDelete } = usePostDelete(handleDeletePost);

    return (
        <>
            <article className={style.article}>
                <Box
                    component="header"
                    sx={{
                        display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5, pb: 2, borderBottom: 1,
                        borderColor: 'primary.main'
                    }}
                >
                    <Box>
                        <Typography component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' }, fontWeight: 600, mb: 1 }}>
                            {localPost.city}, {localPost.country}
                        </Typography>

                        <Box className={style.meta}>
                            <Typography sx={{ color: 'primary.main', border: 'none', p: 0, fontWeight: 500 }}>
                                Author: {localPost.userName}
                            </Typography>

                            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                {formatDate(localPost.createdAt)}
                            </Typography>

                            {localPost.updatedAt && localPost.updatedAt !== localPost.createdAt && (
                                <Typography
                                    sx={{ color: 'text.secondary', fontSize: '0.875rem', fontStyle: 'italic' }}>
                                    (edited)
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box>
                        {isEditing ? (
                            <Box>
                                <TextField
                                    multiline
                                    rows={6}
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    fullWidth
                                    disabled={isUpdating}
                                    sx={{ mb: 1 }}
                                />
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button onClick={handleCancelEdit} disabled={isUpdating} variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleSaveEdit(localPost.id)}
                                        disabled={!editedDescription.trim() || isUpdating}
                                    >
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Typography variant="body1" sx={{ color: 'text.primary', fontSize: { xs: '1rem', md: '1.125rem' } }}>
                                {localPost.description}
                            </Typography>
                        )}
                    </Box>

                    {isAuthor && !isEditing && (
                        <Box className={style.actions}>
                            <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => setIsDeleteModalOpen(true)}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </Box>

                <div className={style.gallery}>
                    <div className={style.galleryGrid}>
                        {localPost.images?.map((image, index) => (
                            <div key={image.id || index} className={style.galleryItem}>
                                <img src={image.url} alt={`${localPost.city} ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <Box ref={commentsRef} sx={{ mt: { xs: 4, md: 6 } }}>
                    {!loadComments && (
                        <Box
                            onClick={() => { }}
                            sx={{
                                borderRadius: 4,
                                padding: '48px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '1px dashed',
                                borderColor: 'divider',

                                background: (theme) => theme.palette.mode === 'light'
                                    ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                                    : 'linear-gradient(135deg, #1e1e1e 0%, #252525 100%)',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-2px)',
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            <Box className={style.placeholderContent}>
                                <CommentIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Scroll down to load comments.
                                </Typography>
                                <span className={style.loadingHint}>↓</span>
                            </Box>
                        </Box>
                    )}
                </Box>

                {loadComments && <CommentSection postId={localPost.id} postAuthorId={localPost.userId} />}
            </article>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => confirmDelete(localPost.id)}
                title="Delete post?"
                message={`Are you sure you want to delete the post about ${localPost.city}, ${localPost.country}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
}

export default PostDetail;