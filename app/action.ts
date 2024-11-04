"use server"

export const fetchGames = async () => {
    const api_key = process.env.RAWG_API_KEY
    const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&ordering=-metacritic`);
    const results = await response.json();
    return results["results"];
}