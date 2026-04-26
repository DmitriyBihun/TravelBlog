export const postService = {
    updatePost: async (updatePost, data) => {
        return await updatePost(data).unwrap();
    },

    deletePost: async (deletePost, id) => {
        return await deletePost(id).unwrap();
    }
};