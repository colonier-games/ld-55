import { IGameLogic } from "../../game/IGameLogic";

export function GameUIShrineButton(
    props: {
        gameLogic: IGameLogic
    }
) {
    const onEarnFromShrine = () => {
        props.gameLogic.trigger(
            'player.money.earned',
            1
        );
        console.log('[GameUIShrineButton]', 'onEarnFromShrine');
    }

    return <div className="game-ui-shrine-button" onClick={onEarnFromShrine}>
    </div>;
}