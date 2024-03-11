"use client"
import React, {useEffect, useState} from "react";
import "./GamePage.css";
import getGameByID from "@/app/data/DataLoader";
import PreLoader from "@/app/components/preloader/PreLoader";

interface GamePageProps {
    id: string;
}

const GamePage: React.FC<GamePageProps> = ({id}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameData = await getGameByID(id);
                setGame(gameData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching game:", error);
                setLoading(false);
                setError(true);
            }
        };

        fetchData().then(r => console.log(r));
    }, [id]);

    if (loading) {
        return <PreLoader />
    }

    if (error) {
        return (
            <section className='game'>
                <p>Такой игры не существует 😢</p>
            </section>
        )
    }

    return (
        <main className="main">
            <section className="game">
                <iframe className="game__iframe" src={game.gameUrl}></iframe>
            </section>
            <section className="about">
                <h2 className="about__title">{game.title}</h2>
                <div className="about__content">
                    <p className="about__description">{game.description}</p>
                    <div className="about__author">
                        <p>
                            Автор: <span className="about__accent">{game.author}</span>
                        </p>
                    </div>
                </div>
                <div className="about__vote">
                    <p className="about__vote-amount">
                        За игру уже проголосовали:{" "}
                        <span className="about__accent">{game.votes}</span>
                    </p>
                    <button className="button about__vote-button">Голосовать</button>
                </div>
            </section>
        </main>
    );
};

export default GamePage;