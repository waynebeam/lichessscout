import Link from "next/link";
import GamesList from "./GamesList";


async function LoadGames(username: string) {
    const baseUrl = `https://lichess.org/api/games/user/${username}?`;
    const params: any = {
        max: 60,
        rated: true,
        pgnInJson: true,
        perfType: 'blitz,rapid,classical',
        opening: true,
    }
    const url = baseUrl + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/x-ndjson' }
    });
    if (!response.ok) {
        return [];
    }

    const data = await response.text();
    let gameStrings = data.split('\n').filter(line => line);
    return gameStrings;


}

export default async function Page({ params }: { params: { username: string } }) {
    let gameStrings = await LoadGames(params.username);

    return (
        <div>
            {
                gameStrings.length ?
                    <GamesList gameStrings={gameStrings} username={params.username} />
                    :
                    <Link href={'/'}>No games found! Go back?</Link>
            }
        </div>
    )

}