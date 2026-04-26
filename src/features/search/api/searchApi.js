import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { baseApi } from '@/shared/api/baseApi';
import { db } from '@/shared/lib/firebase';
import { convertTimestamps } from '@/shared/lib/convertTimestamps';

export const searchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchPosts: builder.query({
            async queryFn({ searchTerm, maxResults = 5 }) {
                try {
                    if (!searchTerm || searchTerm.length < 2) return { data: [] };

                    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
                    const querySnapshot = await getDocs(q);

                    const searchLower = searchTerm.toLowerCase();
                    const posts = [];

                    querySnapshot.forEach((doc) => {
                        const rawData = doc.data();
                        const city = rawData.city?.toLowerCase() || '';
                        const country = rawData.country?.toLowerCase() || '';

                        if (city.includes(searchLower) || country.includes(searchLower)) {
                            posts.push({ id: doc.id, ...convertTimestamps(rawData) });
                        }
                    });

                    return { data: posts.slice(0, maxResults) };
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
    }),
});

export const { useSearchPostsQuery } = searchApi;