import GamesList from "./GamesList";
import { Game } from "./GamesList";
import styles from './gameView.module.css';
import { useState } from "react";


interface GameViewParams {
    game: Game
}

export default function GameView({ game }: GameViewParams) {
    const [pgnVisible, setPgnVisible] = useState(false);
    const whiteTitle = game.players.white.user.title ? game.players.white.user.title + ' ' : '';
    const blackTitle = game.players.black.user.title ? game.players.black.user.title + ' ' : '';
    return (
        <div className={styles.game} onClick={() => setPgnVisible(!pgnVisible)}>
            <p className={styles.gameInfo}>{whiteTitle}{game.players.white.user.name} ({game.players.white.rating})
                vs. {blackTitle}{game.players.black.user.name} ({game.players.black.rating})
                {!game.winner ? " 1/2-1/2" : game.winner === "white" ? " 1-0" : " 0-1"}</p>
            <p className={styles.openingInfo}>{game.opening ? game.opening.name : game.id}</p>
            <div className={styles.pgnToggle}>
                {pgnVisible ? <p>PGN <br />  {game.pgn}</p> : <p>View PGN</p>}
            </div>
        </div>
    )
}