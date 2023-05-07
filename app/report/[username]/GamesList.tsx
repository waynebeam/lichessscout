'use client';

import GameView from "../GameView"

interface GamesListParams {
    gameStrings: string[]
    username: string
}

interface OpeningCount {
    [index: string]: number;
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

    let openingCount: OpeningCount = {};
    games.forEach(game => {
        const opening = game.opening.name.split(':')[0];
        openingCount[opening] ? openingCount[opening] = openingCount[opening] + 1 : openingCount[opening] = 1;
    })

    console.log(openingCount);

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
                <h1>{gameStrings.length} rated games</h1>
                <h1>{whiteWins + blackWins} wins</h1>
                <h1>{totalGames - (whiteWins + blackWins + draws)} Losses</h1>
                <h1>{draws} Draws</h1>
            </div>
            {
                games.map(game => <GameView game={game} key={game.id} />)
            }
        </div>
    )

}