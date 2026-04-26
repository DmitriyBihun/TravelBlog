import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert } from '@mui/material';
import AppContainer from "@/shared/ui/AppContainer/AppContainer";
import { useGetPostByIdQuery } from "@/entities/post/api/postApi";
import PostDetail from "@/widgets/PostDetail/ui/PostDetail";

function PostPage() {

    const { id } = useParams()
    const { data: post, isLoading, error } = useGetPostByIdQuery(id)

    if (isLoading) {
        return (
            <AppContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            </AppContainer>
        );
    }

    if (error) {
        return (
            <AppContainer>
                <Alert severity="error" sx={{ mt: 4 }}>
                    Post not found.
                </Alert>
            </AppContainer>
        );
    }

    if (!post) return null;

    return (
        <AppContainer>
            <PostDetail post={post} />
        </AppContainer>
    );
}

export default PostPage;