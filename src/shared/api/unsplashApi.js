const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export const unsplashApi = {
    getCityImages: async (cityName, count = 8) => {
        try {
            const response = await fetch(`${BASE_URL}/search/photos?query=${encodeURIComponent(cityName)}&per_page=${count}&orientation=landscape`,
                {
                    headers: {
                        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
                    }
                }
            )

            if(!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();

            return data.results.map(photo => ({
                url: photo.urls.regular,
                thumb: photo.urls.thumb,
                author: photo.user.name,
                authorLink: photo.user.links.html,
                id: photo.id
            }));
        } catch (error) {
            console.error('Unsplash API error:', error);
            return getFallbackImages(cityName, count);
        }
    }
}

function getFallbackImages(cityName, count) {
    const fallbacks = [];
    for (let i = 1; i <= count; i++) {
        fallbacks.push({
            url: `https://picsum.photos/800/600?random=${i}&city=${cityName}`,
            thumb: `https://picsum.photos/400/300?random=${i}&city=${cityName}`,
            author: 'Placeholder',
            authorLink: '#',
            id: `fallback-${i}`
        });
    }
    return fallbacks;
}