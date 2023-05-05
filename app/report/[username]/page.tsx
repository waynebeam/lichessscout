import { Cagliostro } from "next/font/google";
import { json } from "stream/consumers";

interface Game {
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
}

async function LoadGames(username: string) {
    let games: Game[] = [];
    const baseUrl = `https://lichess.org/api/games/user/${username}?`;
    const params: any = {
        max: 20,
        rated: true,
        pgnInJson: true,
        perfType: 'blitz,rapid,classical'
    }
    const url = baseUrl + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/x-ndjson' }
    });
    if (!response.ok) {
        return null;
    }

    const data = await response.text();
    let gameStrings = data.split('\n').filter(line => line);
    gameStrings.forEach(gameString => {
        const game = JSON.parse(gameString);
        games.push(game);
    })

    return games;

}

export default async function Page({ params }: { params: { username: string } }) {
    let games = await LoadGames(params.username);

    return (
        <div>
            {
                games ?
                    games.map(game => {
                        return <p>{game.players.white.user.name} vs. {game.players.black.user.name}</p>
                    })
                    :
                    null
            }
        </div>
    )

}