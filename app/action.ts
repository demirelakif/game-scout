"use server"

export const fetchGames = async ({
    page,
    orderBy,
    isOrderPlus,
}:{
        page:number;
        orderBy?:string;
        isOrderPlus:boolean;
    }) => {
    const api_key = process.env.RAWG_API_KEY
    const response = await fetch(`https://api.rawg.io/api/games?key=${api_key}&ordering=${isOrderPlus ? '' : '-'}${orderBy ? orderBy.toLocaleLowerCase() : ''}&page=${page}`);
    
    const results = await response.json();
    return results["results"];
}