'use client';

import GameView from "../GameView"

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
    players: {
        white: {
            user: {
                name: string;
            }
            rating: number;
        }
        black: {
            user: {
                name: string;
            }
            rating: number;
        }
    }
    id: string;
    opening: {
        eco: string;
        name: string;
    }
}

function countOpenings(games: Game[]) {
    let numOpeningsToReturn = 5;
    let openingTotals: OpeningTotals = {};
    games.forEach(game => {
        const opening = game.opening.name.split(':')[0];
        openingTotals[opening] ? openingTotals[opening] = openingTotals[opening] + 1 : openingTotals[opening] = 1;
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
    const games: Game[] = gameStrings.map(gameString => JSON.parse(gameString));
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



    return (
        <div>
            <div>
                <h1>{username} Scouting Report</h1>
                <h1>{gameStrings.length} rated games scouted</h1>
                <h1>{whiteWins + blackWins} wins</h1>
                <h1>{totalGames - (whiteWins + blackWins + draws)} Losses</h1>
                <h1>{draws} Draws</h1>
                <h1>Top White Openings:</h1>
                {
                    whiteOpenings.map(opening => {
                        return <p key={opening.name}>{opening.name}: {opening.count}</p>
                    })
                }
                <h1>Top Black Openings:</h1>
                {
                    blackOpenings.map(opening => {
                        return <p key={opening.name}>{opening.name}: {opening.count}</p>
                    })
                }

            </div>
            <br />
            {
                games.map(game => <GameView game={game} key={game.id} />)
            }
        </div>
    )

}