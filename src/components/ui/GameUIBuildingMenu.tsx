import { useEffect, useState } from "react";
import { IGameLogic } from "../../game/IGameLogic";
import { PLAYER_HOLD_BASE_TIME, PlayerBuildingInfo } from "../../game/entity/IPlayer";
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
    const [playerHoldTime, setPlayerHoldTime] = useState<number>(PLAYER_HOLD_BASE_TIME);
    const [playerHealCost, setPlayerHealCost] = useState<number>(0);
    const [playerUnitUpgradeInfos, setPlayerUnitUpgradeInfos] = useState<Record<UnitType, number>>({});

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
            props.gameLogic.addEventListener(
                'player.heal.cost',
                (cost: number) => {
                    setPlayerHealCost(cost);
                }
            );
            props.gameLogic.addEventListener(
                'player.units.upgrades-changed',
                (unitUpgradeInfos: Record<UnitType, number>) => {
                    setPlayerUnitUpgradeInfos(unitUpgradeInfos);
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

    const onUpgradeUnitOfType = (unitType: UnitType) => {
        props.gameLogic.trigger(
            'player.units.upgrade',
            { unitType }
        );
    };

    const onPlayerHeal = () => {
        props.gameLogic.trigger(
            'player.heal',
            {}
        );
    };

    const buildingButtons = playerBuildingInfos.map(
        (buildingInfo, index) => {
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
                    holdable
                    holdDuration={playerHoldTime}
                />
            </div>;
        }
    );

    const unitUpgradeButtons = Object.keys(UNIT_TYPE_CHARACTERISTICS).map(
        (unitType, index) => {
            const unitCharacteristics = UNIT_TYPE_CHARACTERISTICS[unitType];
            const minUpgradeUnitCount = unitCharacteristics.upgradeUnitCountLevels[playerUnitUpgradeInfos[unitType]];
            if (!minUpgradeUnitCount) {
                return null;
            }
            if (playerUnits[unitType] < minUpgradeUnitCount) {
                return null;
            }

            return <div>
                <GameUICard imageUrl={unitCharacteristics.imageUrl}
                    action="Upgrade"
                    description={
                        <div>
                            <p>C: <span className="white">{unitCharacteristics.upgradeCosts[playerUnitUpgradeInfos[unitType]]}</span></p>
                            <p>Upgrade to level <span className="white">{playerUnitUpgradeInfos[unitType] + 1}</span></p>
                        </div>
                    }
                    title={"Upgrade " + unitCharacteristics.displayName}
                    onAction={() => onUpgradeUnitOfType(unitType as UnitType)}
                    key={`${unitType}-${index}`}
                />
            </div>;
        }
    ).filter(b => !!b);

    const healButton = (<div>
        <GameUICard imageUrl="assets/icons/praying-hands.png"
            title="Heal"
            description={
                <div>
                    <p>C: <span className="white">{playerHealCost}</span></p>
                    <p>Heal all units</p>
                </div>
            }
            action="Heal"
            onAction={onPlayerHeal}
        />
    </div>)

    return <div className={"game-ui-building-menu"}>
        <GameUIShrineButton gameLogic={props.gameLogic} holdDuration={playerHoldTime} />
        {buildingButtons}
        {summoningButtons}
        {unitUpgradeButtons}
        {playerHealCost > 0 && healButton}
    </div>
}