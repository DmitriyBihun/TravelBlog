import { baseApi } from '@/shared/api/baseApi';
import { db } from '@/shared/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            async queryFn() {
                try {
                    const querySnapshot = await getDocs(collection(db, 'posts'));
                    const posts = [];
                    querySnapshot.forEach((doc) => posts.push(doc.data()));

                    const uniqueCities = new Set(posts.map(post => `${post.city},${post.country}`));
                    const uniqueAuthors = new Set(posts.map(post => post.userId));
                    const uniqueCountries = new Set(posts.map(post => post.country));

                    return {
                        data: {
                            cities: uniqueCities.size,
                            authors: uniqueAuthors.size,
                            countries: uniqueCountries.size,
                            totalPosts: posts.length
                        }
                    };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: ['Stats'],
        }),
    }),
});

export const { useGetStatsQuery } = statsApi;