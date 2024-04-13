import { IGameAssets } from "../game/IGameAssets";
import { IGameLogic } from "../game/IGameLogic";
import { GameUIBottomBar } from "./ui/GameUIBottomBar";
import { GameUITopBar } from "./ui/GameUITopBar";

export function GameUI(
    props: {
        gameLogic: IGameLogic
        gameAssets: IGameAssets
    }
) {
    return <div className="game-ui">
        <GameUITopBar gameLogic={props.gameLogic} />
        <GameUIBottomBar gameLogic={props.gameLogic} />
    </div>
}