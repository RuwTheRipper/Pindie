"use client"
import React, { useState, useEffect } from "react";
import Banner from "@/app/components/banner/Banner";
import GamesList from "@/app/components/gamesList/GamesList";
import Popup from "@/app/components/popup/Popup";
import ErrorPage from "@/app/components/error/ErrorPage";
import Promo from "@/app/components/promo/Promo";
import Container from "@/app/components/ui/div/Container";
import {API_URL, Game} from "@/app/data/Data";
import PreLoader from "@/app/components/preloader/PreLoader";

interface HomeProps {
    popularGames: Game[];
    newGames: Game[];
    error: boolean;
    errorMessage: string;
    loading: boolean; // Добавляем loading
}

const Home: React.FC<HomeProps> = ({ popularGames, newGames, error, errorMessage, loading }) => {
    return (
        <main className="main">
            <Banner />
            <Container id={"popup-root"}></Container>
            {loading ? (
                <PreLoader /> // Показываем PreLoader, пока загружаются данные
            ) : error ? (
                <Popup isOpen={true}>
                    <ErrorPage errorMessage={errorMessage} />
                </Popup>
            ) : (
                <>
                    <GamesList title="Популярное" games={popularGames} />
                    <GamesList title="Новинки" games={newGames} />
                    <Promo />
                </>
            )}
        </main>
    );
};

const useGameData = () => {
    const [popularGames, setPopularGames] = useState<Game[]>([]);
    const [newGames, setNewGames] = useState<Game[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true); // Добавляем loading

    useEffect(() => {
        const fetchGamesByCategory = async (category: string): Promise<void> => {
            try {
                const response = await fetch(`${API_URL}/getGamesByCategory?category=${category}`);
                if (!response.ok) {
                    setError(true);
                    setErrorMessage(`Failed to fetch ${category} games!`);
                    return;
                }
                const data: Game[] = await response.json();
                if (category === 'popularGames') {
                    setPopularGames(data);
                } else if (category === 'newGames') {
                    setNewGames(data);
                }
            } catch (error) {
                console.error(error);
                setError(true);
                setErrorMessage(`An error occurred while fetching ${category} games!`);
            }
        };

        // Загрузка популярных игр
        const fetchPopularGames = async (): Promise<void> => {
            await fetchGamesByCategory('popularGames');
        };

        // Загрузка новых игр
        const fetchNewGames = async (): Promise<void> => {
            await fetchGamesByCategory('newGames');
        };

        fetchPopularGames().then(() => setLoading(false)); // Устанавливаем loading в false после завершения загрузки
        fetchNewGames().then(() => setLoading(false)); // Устанавливаем loading в false после завершения загрузки
    }, []);

    return { popularGames, newGames, error, errorMessage, loading }; // Возвращаем loading
};

const HomePage: React.FC = () => {
    const { popularGames, newGames, error, errorMessage, loading } = useGameData();
    return <Home popularGames={popularGames} newGames={newGames} error={error} errorMessage={errorMessage} loading={loading} />;
};

export default HomePage;
