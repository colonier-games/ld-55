import {
    useState,
    useEffect
} from "react";
import { IGameLogic } from "../../game/IGameLogic";

export function GameUITopBar(
    props: {
        gameLogic: IGameLogic
        onBuildingMenu: () => void
        onSummonMenu: () => void
    }
) {
    const [playerMoney, setPlayerMoney] = useState(0);

    useEffect(
        () => {
            props.gameLogic.addEventListener(
                'player.money.changed',
                (money: number) => {
                    setPlayerMoney(money);
                }
            );
        },
        []
    );

    return <div className="game-ui-top-bar">
        <div className="game-ui-player-money">
            <i>Money: </i><b>{playerMoney}</b>
        </div>
        <div className="game-ui-top-bar-buttons">
            <button className="game-ui-button" onClick={props.onBuildingMenu}>
                Build ...
            </button>
            <button className="game-ui-button" onClick={props.onSummonMenu}>
                Summon ...
            </button>
        </div>
    </div>
}