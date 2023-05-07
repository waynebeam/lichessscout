import GamesList from "./[username]/GamesList";
import { Game } from "./[username]/GamesList";


interface GameViewParams {
    game: Game
}

export default function GameView({ game }: GameViewParams) {

    return (
        <div>
            <p>{game.players.white.user.name} ({game.players.white.rating})
                vs. {game.players.black.user.name} ({game.players.black.rating})
                {!game.winner ? " 1/2-1/2" : game.winner === "white" ? " 1-0" : " 0-1"}</p>
            <p>{game.opening.name}</p>
        </div>
    )
}