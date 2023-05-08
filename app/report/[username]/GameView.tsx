import GamesList from "./GamesList";
import { Game } from "./GamesList";
import styles from './gameView.module.css';
import { useState } from "react";
import Link from "next/link";


interface GameViewParams {
    game: Game
}

export default function GameView({ game }: GameViewParams) {
    const [pgnVisible, setPgnVisible] = useState(false);
    const [openingMovesVisible, setOpeningMovesVisible] = useState(false);
    const whiteTitle = game.players.white.user.title ? game.players.white.user.title + ' ' : '';
    const blackTitle = game.players.black.user.title ? game.players.black.user.title + ' ' : '';
    const whitePlayer = game.players.white.user.name;
    const blackPlayer = game.players.black.user.name;
    return (
        <div className={styles.game}>
            <p className={styles.gameInfo}>
                <Link className={styles.link} href={`/report/${whitePlayer}`}>{whiteTitle}{whitePlayer} ({game.players.white.rating}) </Link>
                vs. <Link className={styles.link} href={`/report/${blackPlayer}`}>{blackTitle}{blackPlayer} ({game.players.black.rating})</Link>
                {!game.winner ? " 1/2-1/2" : game.winner === "white" ? " 1-0" : " 0-1"}</p>
            <div onClick={() => setOpeningMovesVisible(!openingMovesVisible)}>
                <p className={styles.openingInfo}>{game.opening ? game.opening.name : game.id}</p>
                {
                    openingMovesVisible ? game.moves.split(' ', 10).join(' ') : null
                }
            </div>
            <div className={styles.pgnToggle} onClick={() => setPgnVisible(!pgnVisible)}>
                {pgnVisible ? <p>PGN <br />  {game.pgn}</p> : <p>View PGN</p>}
            </div>
        </div>
    )
}