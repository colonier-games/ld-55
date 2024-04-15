import { useEffect, useState } from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { PlayerBuildingInfo } from "../../game/entity/IPlayer";
import { GameUICard } from "./GameUICard";
import { GameUIShrineButton } from "./GameUIShrineButton";
import { IUnit, UNIT_TYPE_CHARACTERISTICS, UnitType } from "../../game/entity/IUnit";
import { UNIT_HOUND_BASE_DP, UNIT_HOUND_BASE_HP } from "../../game/entity/IHoundUnit";

export function GameUIBuildingMenu(
    props: {
        gameLogic: IGameLogic
    }
) {
    const [playerBuildingInfos, setPlayerBuildingInfos] = useState<PlayerBuildingInfo[]>([]);
    const [playerUnits, setPlayerUnits] = useState<Record<UnitType, number>>({});

    useEffect(
        () => {
            props.gameLogic.addEventListener(
                'player.building.changed',
                (buildingInfos: Array<PlayerBuildingInfo>) => {
                    setPlayerBuildingInfos(buildingInfos);
                }
            );
            props.gameLogic.addEventListener(
                'player.units.changed',
                (units: Record<UnitType, number>) => {
                    setPlayerUnits(units);
                }
            );
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

    const onSummonUnitOfType = (unitType: UnitType) => {
        props.gameLogic.trigger(
            'player.summon',
            { unitType }
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

    /* const summoningButtons = [
        <GameUICard imageUrl="assets/units/peasant.png"
            action="Summon"
            description={
                <div>
                    <p>C: <span className="white">{UNIT_TYPE_CHARACTERISTICS['units.peasant'].cost}</span> | AP: <span className="white">{UNIT_HOUND_BASE_DP}</span> | HP: <span className="white">{UNIT_HOUND_BASE_HP}</span></p>
                    <p>You have: <span className="white">{</span></p>
                </div>
            }
            title="Peasant"
            onAction={onSummonPeasant}
            key="summon-hound"
        />
    ]; */
    const summoningButtons = Object.keys(UNIT_TYPE_CHARACTERISTICS).map(
        (unitType, index) => {
            const unitCharacteristics = UNIT_TYPE_CHARACTERISTICS[unitType];
            return <div>
                <GameUICard imageUrl={unitCharacteristics.imageUrl}
                    action="Summon"
                    description={
                        <div>
                            <p>C: <span className="white">{unitCharacteristics.cost}</span> | AP: <span className="white">{unitCharacteristics.ap}</span> | HP: <span className="white">{unitCharacteristics.hp}</span></p>
                            <p>You have: <span className="white">{playerUnits[unitType] ? playerUnits[unitType] : 0}</span></p>
                        </div>
                    }
                    title={unitCharacteristics.displayName}
                    onAction={() => onSummonUnitOfType(unitType as UnitType)}
                    key={index}
                />
            </div>;
        }
    );

    return <div className={"game-ui-building-menu"}>
        <GameUIShrineButton gameLogic={props.gameLogic} />
        {buildingButtons}
        {summoningButtons}
    </div>
}