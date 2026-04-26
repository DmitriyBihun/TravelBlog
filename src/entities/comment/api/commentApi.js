import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { baseApi } from '@/shared/api/baseApi';
import { db } from '@/shared/lib/firebase';
import { convertTimestamps } from '@/shared/lib/convertTimestamps';

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            async queryFn(postId) {
                try {
                    const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'desc'));
                    const querySnapshot = await getDocs(q);
                    const comments = [];
                    querySnapshot.forEach((doc) => comments.push({ id: doc.id, ...convertTimestamps(doc.data()) }));
                    return { data: comments };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: (result, error, postId) => [{ type: 'Comments', id: postId }, { type: 'Comments', id: 'LIST' }],
        }),

        addComment: builder.mutation({
            async queryFn({ postId, userId, userName, text }) {
                try {
                    const newComment = { postId, userId, userName, text, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
                    const docRef = await addDoc(collection(db, 'comments'), newComment);
                    return { data: { id: docRef.id, ...newComment, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } };
                } catch (error) {
                    return { error: error.message };
                }
            },
            invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
        }),

        deleteComment: builder.mutation({
            async queryFn({ commentId, postId }) {
                try {
                    await deleteDoc(doc(db, 'comments', commentId));
                    return { data: { commentId, postId } };
                } catch (error) {
                    return { error: error.message };
                }
            },
            invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
        }),

        getCommentsCount: builder.query({
            async queryFn(postId) {
                try {
                    const q = query(collection(db, 'comments'), where('postId', '==', postId));
                    const querySnapshot = await getDocs(q);
                    return { data: querySnapshot.size };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: (result, error, postId) => [{ type: 'Comments', id: postId }],
        }),
    }),
});

export const {
    useGetCommentsByPostIdQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetCommentsCountQuery
} = commentApi;