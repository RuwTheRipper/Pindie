interface Game {
    id: string;
    title: string;
    description: string;
    author: string;
    votes: number;
    imageUrl: string;
    gameUrl: string;
    categories: string[];
}

const API_URL: string = "http://localhost:4000/api";

export {API_URL};
export type { Game };
