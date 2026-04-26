import { useMemo, useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetAllPostsQuery } from '@/entities/post/api/postApi';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';
import HoverImageFollower from '@/shared/ui/HoverImageFollower/HoverImageFollower';
import PostCard from '@/entities/post/ui/PostCard';
import SearchBar from '@/features/search/ui/SearchBar';

function PostList() {
    const { data: posts, isLoading, error } = useGetAllPostsQuery();
    const [hoveredPost, setHoveredPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        if (!posts) return [];
        return posts.filter(post => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            return (
                post.city.toLowerCase().includes(searchLower) ||
                post.country.toLowerCase().includes(searchLower)
            );
        });
    }, [posts, searchTerm]);

    useEffect(() => {
        if (!hoveredPost) return;

        const isStillVisible = filteredPosts.some(post => post.id === hoveredPost.id);
        if (!isStillVisible) {
            setHoveredPost(null);
        }
    }, [filteredPosts, hoveredPost]);

    const handleHover = useCallback((post) => {
        setHoveredPost(post);
    }, []);

    const imageUrl = useMemo(() => {
        return hoveredPost?.images?.[0]?.url || null;
    }, [hoveredPost]);

    if (isLoading) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="text.secondary">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography color="error">Something went wrong</Typography>
            </Box>
        );
    }

    return (
        <>
            <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

            <AppContainer>
                <HoverImageFollower imageUrl={imageUrl} />

                {filteredPosts?.length === 0 ? (
                    <Box sx={{
                        textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 2, mt: 2,
                        border: '1px dashed', borderColor: 'divider'
                    }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Nothing was found for "{searchTerm}"
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Try checking the spelling or use another location.
                        </Typography>
                    </Box>
                ) : (
                    filteredPosts?.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onHover={handleHover}
                        />
                    ))
                )}
            </AppContainer>
        </>
    );
}

export default PostList;