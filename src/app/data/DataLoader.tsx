import {API_URL, Game} from "@/app/data/Data";

const getGameByID = async (id: string): Promise<Game> => {
    try {
        const response = await fetch(`${API_URL}/search?id=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch game');
        }
        const data = await response.json();
        return data as Game;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error;
    }
};



export default getGameByID;