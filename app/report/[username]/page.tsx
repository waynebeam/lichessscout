import Link from "next/link";
import GamesList from "./GamesList";
import styles from "./gameView.module.css";


async function LoadGames(username: string) {
    const baseUrl = `https://lichess.org/api/games/user/${username}?`;
    const params: any = {
        max: 60,
        rated: true,
        pgnInJson: true,
        perfType: 'rapid,classical,blitz',
        opening: true,
    }
    const url = baseUrl + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/x-ndjson' },
        next:
        {
            revalidate: 60
        }
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
        <div className={styles.mainContainer}>
            {
                gameStrings.length ?
                    <GamesList gameStrings={gameStrings} username={params.username} />
                    :
                    <Link href={'/'}><h2 style={{"height": "50vh", "marginTop": "10vh"}}>No games found for {params.username}! Click here to try a new search</h2></Link>
            }
        </div>
    )

}