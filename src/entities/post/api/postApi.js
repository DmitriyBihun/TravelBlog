import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
    writeBatch,
    where
} from 'firebase/firestore';

import { db } from '@/shared/lib/firebase';
import { convertTimestamps } from '@/shared/lib/convertTimestamps';
import { baseApi } from '@/shared/api/baseApi';

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            async queryFn() {
                try {
                    const postsRef = collection(db, 'posts');
                    const q = query(postsRef, orderBy('createdAt', 'desc'));
                    const querySnapshot = await getDocs(q);

                    const posts = [];
                    querySnapshot.forEach((doc) => {
                        posts.push({ id: doc.id, ...convertTimestamps(doc.data()) });
                    });

                    return { data: posts };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: 'Posts', id })), { type: 'Posts', id: 'LIST' }]
                : [{ type: 'Posts', id: 'LIST' }],
        }),

        getPostById: builder.query({
            async queryFn(id) {
                try {
                    const postRef = doc(db, 'posts', id);
                    const postDoc = await getDoc(postRef);
                    if (!postDoc.exists()) return { error: 'Post not found' };

                    return { data: { id: postDoc.id, ...convertTimestamps(postDoc.data()) } };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),

        createPost: builder.mutation({
            async queryFn(postData) {
                try {
                    const newPost = { ...postData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
                    const docRef = await addDoc(collection(db, 'posts'), newPost);

                    return { data: { id: docRef.id, ...postData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } };
                } catch (error) {
                    return { error: error.message };
                }
            },
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }, 'Stats'],
        }),

        updatePost: builder.mutation({
            async queryFn({ id, ...updateData }) {
                try {
                    await updateDoc(doc(db, 'posts', id), { ...updateData, updatedAt: serverTimestamp() });
                    return { data: { id, ...updateData } };
                } catch (error) {
                    return { error: error.message };
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }, { type: 'Posts', id: 'LIST' }, 'Stats'],
        }),

        deletePost: builder.mutation({
            async queryFn(id) {
                try {
                    const batch = writeBatch(db);

                    // Удаляю пост
                    batch.delete(doc(db, 'posts', id));

                    // Находжу і удаляю коменти
                    const commentsQuery = query(collection(db, 'comments'), where('postId', '==', id));
                    const commentsSnapshot = await getDocs(commentsQuery);
                    commentsSnapshot.forEach((commentDoc) => batch.delete(commentDoc.ref));

                    await batch.commit();
                    return { data: id };
                } catch (error) {
                    return { error: error.message };
                }
            },
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }, { type: 'Comments', id: 'LIST' }, 'Stats'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = postApi;