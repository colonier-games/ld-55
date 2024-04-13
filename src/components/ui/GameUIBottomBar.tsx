import { useEffect, useState } from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { PlayerBuildingInfo } from "../../game/entity/IPlayer";

export function GameUIBottomBar(
    props: {
        gameLogic: IGameLogic
    }
) {
    const [playerBuildingInfos, setPlayerBuildingInfos] = useState<PlayerBuildingInfo[]>([]);

    useEffect(
        () => {
            props.gameLogic.addEventListener(
                'player.building.changed',
                (buildingInfos: Array<PlayerBuildingInfo>) => {
                    setPlayerBuildingInfos(buildingInfos);
                }
            )
        },
        []
    );

    const onBuyBuildingOfType = (buildingType: string) => {
        props.gameLogic.trigger(
            'player.building.buy',
            buildingType
        );
        console.log('[GameUIBottomBar]', 'onBuyBuildingOfType', buildingType);
    };
    const onEarnFromShrine = () => {
        props.gameLogic.trigger(
            'player.money.earned',
            1
        );
        console.log('[GameUIBottomBar]', 'onEarnFromShrine');
    }

    const buildingButtons = playerBuildingInfos.map(
        (buildingInfo, index) => {
            return <button className="game-ui-button" key={index} onClick={() => onBuyBuildingOfType(buildingInfo.buildingType.name)}>
                {buildingInfo.buildingType.name} ({buildingInfo.buildingCount}) | C: {buildingInfo.buildingType.characteristics.cost}
            </button>
        }
    );

    return <div className="game-ui-bottom-bar">
        <button className="game-ui-button" onClick={onEarnFromShrine}>Shrine</button>
        {buildingButtons}
    </div>
}