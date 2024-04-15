import { IGameLogic } from "../../game/IGameLogic";

export function GameUISummoningMenu(
    props: {
        gameLogic: IGameLogic,
        opened: boolean
    }
) {
    const onSummonHound = () => {
        props.gameLogic.trigger(
            'player.summon',
            { unitType: 'units.hound' }
        );
    };

    return <div className={"game-ui-summoning-menu " + (props.opened ? 'opened' : 'closed')}>
        <button className="game-ui-button" onClick={onSummonHound}>Hound | C: 10</button>
    </div>
}