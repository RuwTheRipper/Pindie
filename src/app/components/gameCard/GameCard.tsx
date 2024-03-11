import React from 'react';
import './GameCard.css';
import Container from "@/app/components/ui/div/Container";
import Title from "@/app/components/ui/title/Title";
import {Paragraph} from "@/app/components/ui/p/Paragraph";
import Span from "@/app/components/ui/span/Span";
import Image from "@/app/components/ui/img/Image";
import {Anchor} from "@/app/components/ui/a/Anchor";

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    author: string;
    votes: number;
    imageUrl: string;
}

const GameCardImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    return <Image src={imageUrl} alt={""} className={"card__image"} />;
};

const GameCardInfo: React.FC<{ title: string; description: string; author: string; votes: number }> = ({title, description, author, votes}) => {
    return (
        <Container className={"card__content-block"}>
            <Title level={3} className={"card__title"}>{title}</Title>
            <Paragraph className={"card__description"}>{description}</Paragraph>
            <Container className={"card__info-container"}>
                <Paragraph className={"card__author"}>
                    Автор: <span className="card__accent">{author}</span>
                </Paragraph>
                <Paragraph className={"card__votes"}>
                    Голосов на сайте: <Span className={"card__accent"}>{votes}</Span>
                </Paragraph>
            </Container>
        </Container>
    );
};

const GameCardLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    return (
        <Anchor href={href} className={"card-list__link"}>
            {children}
        </Anchor>
    );
};


const GameCard: React.FC<GameCardProps> = ({ id, title, description, author, votes, imageUrl }) => {

    return (
        <li className="cards-list__item">
            <GameCardLink href={`/game/${id}`}>
                <article className="card">
                    <GameCardImage imageUrl={imageUrl} />
                    <GameCardInfo title={title} description={description} author={author} votes={votes} />
                </article>
            </GameCardLink>
        </li>
    );
};

export default GameCard;
