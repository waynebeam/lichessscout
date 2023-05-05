import { json } from "stream/consumers"

interface ScoutingReportProps {
    username: string
}

interface Game {
    speed: string,
    players: {
        white: {
            user: {
                name: string
            },
            rating: number
        },
        black: {
            user: {
                name: string
            }
            rating: number
        }
    },
    winner?: string,
    pgn: string,
}

async function fetchGames(username: string) {
    const games: Game[] = [];
    const params: any = {
        max: 20,
        rated: true,
        pgnInJson: true,
        perfType: 'blitz,rapid,classical',

    };

    const url = `https://lichess.org/api/games/user/${username}?` + new URLSearchParams(params);

    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/x-ndjson' },
    });

    if (!response.ok) {
        console.log('busted')
        return games;

    }
    console.log(response);
    const data: any = await response.body;
    console.log(data);
    const decoder = new TextDecoder();
    if (data !== null) {
        console.log("now use the data!");
        for (const chunk of data) {
            decoder.decode(chunk);
        }

    }
    console.log("done");
    return games;


}

export default async function ScoutingReport({ username }: ScoutingReportProps) {

    const games = fetchGames(username);

    return (
        <div>
            <h1>{username}</h1>
        </div>
    )
}