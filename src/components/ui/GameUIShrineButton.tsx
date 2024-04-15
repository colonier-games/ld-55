import { IGameLogic } from "../../game/IGameLogic";
import { GameUICard } from "./GameUICard";

export function GameUIShrineButton(
    props: {
        gameLogic: IGameLogic
        holdDuration?: number
    }
) {

    const onEarnFromShrine = () => {
        props.gameLogic.trigger(
            'player.money.earned',
            1
        );
        console.log('[GameUIShrineButton]', 'onEarnFromShrine');
    }

    return <GameUICard imageUrl="assets/buildings/shrine.png"
        title="Shrine"
        description={
            <div>
                <p>Click to earn money</p>
            </div>
        }
        action="Pray"
        onAction={onEarnFromShrine}
        holdable
        holdDuration={props.holdDuration || 1}
    />
}