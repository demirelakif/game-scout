"use server"

import { db, sql } from "@vercel/postgres";

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
        const screenshots = await fetchScreenshots(id);
        const results = await response.json();

        if (results && results.name) {
            const cleanName = results.name.replace(":", "").replace("'", "’");

            const { rows } = await sql`
                SELECT * FROM games 
                WHERE name ILIKE '%' || ${cleanName} || '%' 
                LIMIT 1`;

            results.dbRows = rows[0];
        } else {
            results.dbRows = [];
        }

        results.screenshots = screenshots || [];
        return results || {};
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        return {};
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

export const orderByGamepass = async ({
    page,
    orderBy,
    isOrderPlus,
}: {
    page: number;
    orderBy?: string;
    isOrderPlus: boolean;
}) => {
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games?key=${api_key}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}&page=${page}`
        );

        const results = await response.json();
        if (results) {
            // results["results"] dizisinde her bir oyun için veritabanı kontrolü yapıyoruz
            const gamesWithDbRows = await Promise.all(
                results["results"].map(async (element: { name: string }) => {
                    const cleanName = element.name.replace(":", "").replace("'", "’");
                    const { rows } = await sql`
                        SELECT * FROM games 
                        WHERE name ILIKE '%' || ${cleanName} || '%' 
                        LIMIT 1`;
                    
                    // Veritabanı sonuçlarını her bir oyun objesine ekliyoruz
                    return { ...element, dbRows: rows[0] || null };
                })
            );

            return gamesWithDbRows;
        } else {
            return []; // Eğer sonuç bulunamazsa boş dizi döndür
        }
    } catch (error) {
        console.error("Error fetching games:", error);
        return []; // Hata durumunda boş dizi döndür
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
