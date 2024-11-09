"use server"

const api_key = process.env.RAWG_API_KEY

export const fetchGames = async ({
    page,
    orderBy,
    isOrderPlus,
}: {
    page: number;
    orderBy?: string;
    isOrderPlus: boolean;
}) => {
    
    const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}&page=${page}`);

    const results = await response.json();
    return results["results"];
}


export const fetchGameById = async (id:string) => {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${api_key}`);

    const screenshots = await fetchScreenshots(id);
    const results = await response.json();
    results.screenshots = screenshots;
    return results;
}

export const fetchScreenshots = async (id:string) => {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${api_key}`);

    const results = await response.json();
    return results["results"];
}

export const fetchVideos = async (id:string) => {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${api_key}`);

    const results = await response.json();
    return results;
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
    const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&search=${name}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}`);

    const results = await response.json();
    return results["results"];
}