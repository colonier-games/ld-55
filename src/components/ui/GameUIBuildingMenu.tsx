import { useEffect, useState } from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { PlayerBuildingInfo } from "../../game/entity/IPlayer";
import { GameUICard } from "./GameUICard";
import { GameUIShrineButton } from "./GameUIShrineButton";
import { UNIT_TYPE_CHARACTERISTICS } from "../../game/entity/IUnit";
import { UNIT_HOUND_BASE_DP, UNIT_HOUND_BASE_HP } from "../../game/entity/IHoundUnit";

export function GameUIBuildingMenu(
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
        console.log('[GameUIBuildingMenu]', 'onBuyBuildingOfType', buildingType);
    };

    const onSummonHound = () => {
        props.gameLogic.trigger(
            'player.summon',
            { unitType: 'units.hound' }
        );
    };

    const buildingButtons = playerBuildingInfos.map(
        (buildingInfo, index) => {
            /* return <button className="game-ui-button" key={index} onClick={() => onBuyBuildingOfType(buildingInfo.buildingType.name)}>
                {buildingInfo.buildingType.name} ({buildingInfo.buildingCount}) | C: {buildingInfo.buildingType.characteristics.cost}
            </button> */
            return <div>
                <GameUICard title={buildingInfo.buildingType.characteristics.displayName}
                    imageUrl={buildingInfo.buildingType.characteristics.imageUrl}
                    action="Build"
                    description={
                        <div>
                            <p>C: <span className="white">{buildingInfo.buildingType.characteristics.cost}</span> | R: <span className="white">{buildingInfo.buildingType.characteristics.reward}</span> | T: <span className="white">{buildingInfo.buildingType.characteristics.productionTime}</span></p>
                            <p>You have: <span className="white">{buildingInfo.buildingCount}</span></p>
                        </div>
                    }
                    onAction={() => onBuyBuildingOfType(buildingInfo.buildingType.name)}
                    key={index}
                />
            </div>;
        }
    );

    const summoningButtons = [
        <GameUICard imageUrl="assets/units/peasant.png"
            action="Summon"
            description={
                <div>
                    <p>C: <span className="white">{UNIT_TYPE_CHARACTERISTICS['units.hound'].cost}</span> | AP: <span className="white">{UNIT_HOUND_BASE_DP}</span> | HP: <span className="white">{UNIT_HOUND_BASE_HP}</span></p>
                </div>
            }
            title="Peasant"
            onAction={onSummonHound}
            key="summon-hound"
        />
    ];

    return <div className={"game-ui-building-menu"}>
        <GameUIShrineButton gameLogic={props.gameLogic} />
        {buildingButtons}
        {summoningButtons}
    </div>
}