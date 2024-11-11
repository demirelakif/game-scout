"use server"

const api_key = process.env.RAWG_API_KEY;

export const fetchGames = async ({
    page,
    orderBy,
    isOrderPlus,
}: {
    page: number;
    orderBy?: string;
    isOrderPlus: boolean;
}) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}&page=${page}`);
        
        // If no results are found, return an empty array
        const results = await response.json();
        return results["results"] || []; 
    } catch (error) {
        console.error("Error fetching games:", error);
        return []; // Return empty array if error occurs
    }
}

export const fetchGameById = async (id: string) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${api_key}`);
        
        // Fetch screenshots, even if the game data isn't found
        const screenshots = await fetchScreenshots(id);
        const results = await response.json();

        // If no data found for the game, return empty object with empty screenshots
        results.screenshots = screenshots || [];
        return results || {};
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        return {}; // Return empty object if error occurs
    }
}

export const fetchScreenshots = async (id: string) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${api_key}`);
        const results = await response.json();
        
        // If no screenshots found, return an empty array
        return results["results"] || [];
    } catch (error) {
        console.error("Error fetching screenshots:", error);
        return []; // Return empty array if error occurs
    }
}

export const fetchVideos = async (id: string) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${api_key}`);
        const results = await response.json();
        
        // Return empty object if no videos found
        return results || {};
    } catch (error) {
        console.error("Error fetching videos:", error);
        return {}; // Return empty object if error occurs
    }
}

export const searchGame = async ({
    name,
    orderBy,
    isOrderPlus,
}: {
    name: string;
    orderBy?: string;
    isOrderPlus: boolean;
}) => {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&search=${name}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}`);
        const results = await response.json();
        
        // If no search results found, return an empty array
        return results["results"] || [];
    } catch (error) {
        console.error("Error searching for game:", error);
        return []; // Return empty array if error occurs
    }
}
