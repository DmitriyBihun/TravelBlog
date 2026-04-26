import CreatePostForm from '@/features/create-post/ui/CreatePostForm';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';
import { Box } from '@mui/material';

function CreatePostPage() {
    return (
        <AppContainer>

            <Box sx={(theme) => ({
                minHeight: `calc(100vh - ${theme.layout.header.height}px)` })}>
                <CreatePostForm />
            </Box>

        </AppContainer>
    );
}

export default CreatePostPage;