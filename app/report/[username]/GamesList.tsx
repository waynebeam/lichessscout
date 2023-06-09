'use client';

import Link from "next/link";
import GameView from "./GameView"
import styles from './gameView.module.css'

interface GamesListParams {
    gameStrings: string[]
    username: string
}

interface OpeningTotals {
    [index: string]: number;
}
interface OpeningCount {
    name: string;
    count: number;
}


export interface Game {
    winner: 'white' | 'black' | undefined;
    moves: string;
    pgn: string;
    players: {
        white: {
            user: {
                name: string;
                title?: string;
            }
            rating: number;
        }
        black: {
            user: {
                name: string;
                title?: string;
            }
            rating: number;
        }
    }
    id: string;
    opening: {
        eco: string;
        name: string;
    }
    perf: string;
}

function buildGamesArray(gameStrings: string[]) {
    const numGamesToScout = 50;
    let games: Game[] = gameStrings.map(gameString => JSON.parse(gameString));
    games = games.filter(game => game.moves && game.opening);
    games = games.slice(0, Math.min(numGamesToScout, games.length));
    return games;
}

function countOpenings(games: Game[]) {
    let numOpeningsToReturn = 5;
    let openingTotals: OpeningTotals = {};
    games.forEach(game => {
        if (game.opening) {
            const opening = game.opening.name.split(':')[0];
            openingTotals[opening] ? openingTotals[opening] = openingTotals[opening] + 1 : openingTotals[opening] = 1;
        }

    })

    let openingArray: OpeningCount[] = [];
    for (const opening in openingTotals) {
        openingArray.push({ name: opening, count: openingTotals[opening] });
    }
    openingArray.sort((a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;
    })
    openingArray = openingArray.slice(0, Math.min(openingArray.length, numOpeningsToReturn));
    return openingArray;

}

export default function GamesList({ gameStrings, username }: GamesListParams) {
    const games = buildGamesArray(gameStrings);
    let whiteWins = 0;
    let blackWins = 0;
    let draws = 0;
    const totalGames = games.length;
    games.forEach(game => {
        if (!game.winner) {
            draws++;
            return;
        }
        if (game.players.white.user.name.toLowerCase() === username.toLowerCase() && game.winner === "white") {
            whiteWins++;
            return;
        }
        if (game.players.black.user.name.toLowerCase() === username.toLowerCase() && game.winner === "black") {
            blackWins++;
            return;
        }
    })

    const whiteOpenings = countOpenings(games.filter(game => game.players.white.user.name.toLowerCase() === username.toLowerCase()));
    const blackOpenings = countOpenings(games.filter(game => game.players.black.user.name.toLowerCase() === username.toLowerCase()));
    const title = games[0].players.white.user.name.toLowerCase() === username.toLowerCase() ? games[0].players.white.user.title :
        games[0].players.black.user.name.toLowerCase() === username.toLowerCase() ? games[0].players.black.user.title : '';


    return (
        <div>
            <div className={styles.scoutingReportContainer}>
                <h1 className={styles.scoutingTitle}><a target="_blank" href={`https://lichess.org/@/${username}`}>{title ? title + " " : ''}{username}</a> Scouting Report ({games.length} rated games)</h1>
                <div className={styles.commonOpeningContainer + ' ' + styles.commonOpeningContainerWhite}>
                    <h1>Most Common White Openings:</h1>
                    <div className={styles.commonOpeningList}>
                        {
                            whiteOpenings.map(opening => {
                                return <p key={opening.name}>{opening.name}: {opening.count}</p>
                            })
                        }
                    </div>
                </div>
                <div className={styles.commonOpeningContainer}>
                    <h1>Most Common Black Openings:</h1>
                    <div className={styles.commonOpeningList}>

                        {
                            blackOpenings.map(opening => {
                                return <p key={opening.name}>{opening.name}: {opening.count}</p>
                            })
                        }
                    </div>
                </div>
                <h1>{whiteWins + blackWins} wins</h1>
                <h1>{totalGames - (whiteWins + blackWins + draws)} Losses</h1>
                <h1>{draws} Draws</h1>
            </div>
            <br />
            <div className={styles.gamesContainer}>
                {
                    games.map(game => <GameView username={username} game={game} key={game.id} />)
                }
            </div>
        </div>
    )

}