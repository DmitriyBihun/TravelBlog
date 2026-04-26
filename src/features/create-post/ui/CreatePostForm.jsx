import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography, Card, CircularProgress, Alert, Divider } from "@mui/material";
import { useCreatePostMutation } from "@/entities/post/api/postApi";
import { unsplashApi } from "@/shared/api/unsplashApi";


function CreatePostForm() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.currentUser);
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [loadingImages, setLoadingImages] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const city = watch('city');

    async function onSubmit(data) {
        if (!currentUser) {
            navigate('/auth')
            return
        }
        setLoadingImages(true)
        setError('');
        try {
            const images = await unsplashApi.getCityImages(data.city, 8);
            const postData = {
                userId: currentUser.uid,
                userName: currentUser.displayName,
                userEmail: currentUser.email,
                title: data.title,
                city: data.city,
                country: data.country,
                description: data.description,
                images,
                createdAt: new Date().toISOString(),
            };
            await createPost(postData).unwrap();
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Error creating post. Try again later.');
        } finally {
            setLoadingImages(false);
        }
    }
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', pt: 3 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }} textAlign="center" mb={2}>
                    Share your journey
                </Typography>
                <Typography variant="body1">
                    Tell the story of your adventure. We'll find beautiful, atmospheric photos for you.
                </Typography>
            </Box>

            <Divider sx={{ mb: { xs: 2, sm: 4 } }} />

            <Card sx={{ p: { xs: 1, sm: 2 } }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            size="small"
                            label="Name of the place"
                            placeholder="For example: Amazing Mallorca"
                            fullWidth
                            disabled={isLoading || loadingImages}
                            {...register('title', {
                                required: 'Name is required.',
                                minLength: {
                                    value: 3,
                                    message: 'The name must be at least 3 characters long.'
                                }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                            <TextField
                                size="small"
                                label="City"
                                fullWidth
                                disabled={isLoading || loadingImages}
                                {...register('city', { required: 'City is required.' })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                            <TextField
                                size="small"
                                label="Country"
                                fullWidth
                                disabled={isLoading || loadingImages}
                                {...register('country', { required: 'Country is required.' })}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            />
                        </Box>
                        <TextField
                            size="small"
                            label="Description"
                            multiline
                            rows={6}
                            fullWidth
                            disabled={isLoading || loadingImages}
                            {...register('description', {
                                required: 'Description is required.',
                                minLength: {
                                    value: 20,
                                    message: 'The description must be at least 20 characters long.'
                                }
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        {loadingImages && (
                            <Box textAlign="center" py={1}>
                                <CircularProgress size={30} thickness={5} />
                                <Typography mt={1} color="text.secondary">
                                    We are looking for beautiful photos of {city || '...'}
                                </Typography>
                            </Box>
                        )}
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading || loadingImages}
                        >
                            {loadingImages ? 'Uploading photos...' : 'Publish'}
                        </Button>
                    </Box>
                </form>
            </Card>
            <Box sx={{ mt: { xs: 2, sm: 4 } }}>
                <Typography variant="body1" textAlign='center'>
                    It all happens almost instantly. Just hit "Publish" and watch the magic happen. ✨
                </Typography>
            </Box>
        </Box>
    );
}
export default CreatePostForm;