import { useEffect, useState } from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { PlayerBuildingInfo } from "../../game/entity/IPlayer";

export function GameUIBuildingMenu(
    props: {
        gameLogic: IGameLogic,
        opened: boolean
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
        console.log('[GameUIBuildingMenu]', 'onBuyBuildingOfType', buildingType);
    };

    const buildingButtons = playerBuildingInfos.map(
        (buildingInfo, index) => {
            return <button className="game-ui-button" key={index} onClick={() => onBuyBuildingOfType(buildingInfo.buildingType.name)}>
                {buildingInfo.buildingType.name} ({buildingInfo.buildingCount}) | C: {buildingInfo.buildingType.characteristics.cost}
            </button>
        }
    );

    return <div className={"game-ui-building-menu " + (props.opened ? 'opened' : 'closed')}>
        {buildingButtons}
    </div>
}