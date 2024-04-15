import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHolyKnightUnit, upgradeHolyKnightUnit } from "../entity/IHolyKnightUnit";
import { IKnightUnit, upgradeKnightUnit } from "../entity/IKnightUnit";
import { IPeasantUnit, upgradePeasantUnit } from "../entity/IPeasantUnit";
import { IPlayer } from "../entity/IPlayer";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_PLAYER, UNIT_TYPE_CHARACTERISTICS, UnitType } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export interface IPlayerUnitUpgradeProps {
    unitType: UnitType;
}

const UPGRADE_UNIT_TYPES = [
    {
        unitType: "units.peasant",
        upgrade: (unit: IPeasantUnit, upgradeLevel: number) => {
            upgradePeasantUnit(unit, upgradeLevel);
        }
    },
    {
        unitType: "units.knight",
        upgrade: (unit: IKnightUnit, upgradeLevel: number) => {
            upgradeKnightUnit(unit, upgradeLevel);
        }
    },
    {
        unitType: "units.holy-knight",
        upgrade: (unit: IHolyKnightUnit, upgradeLevel: number) => {
            upgradeHolyKnightUnit(unit, upgradeLevel);
        }
    }
]

export class PlayerUnitUpgradeSystem implements IGameSystem {

    private upgradePlayerUnits(
        player: IPlayer,
        unitType: UnitType,
        gameLogic: IGameLogic
    ): void {
        const units = gameLogic.getEntities<IUnit>(unitType)
            .filter(u => u.owner === UNIT_OWNER_PLAYER);
        units.forEach(
            unit => {
                const upgradeLevel = player.unitUpgradeLevels[unitType];
                const upgradeType = UPGRADE_UNIT_TYPES.find(
                    upgradeType => upgradeType.unitType === unitType
                );
                if (upgradeType) {
                    upgradeType.upgrade(unit as any, upgradeLevel);
                }
            }
        )
    }

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        gameLogic.addEventListener(
            "player.units.upgrade",
            (props: IPlayerUnitUpgradeProps) => {
                const unitTypeCharacteristics = UNIT_TYPE_CHARACTERISTICS[props.unitType];
                const playerEntity = gameLogic.getEntities("player")[0] as IPlayer;
                const unitTypeUpgradeLevel = playerEntity.unitUpgradeLevels[props.unitType] || 0;

                if (unitTypeCharacteristics && unitTypeUpgradeLevel < unitTypeCharacteristics.upgradeCosts.length) {

                    const upgradeCost = unitTypeCharacteristics.upgradeCosts[unitTypeUpgradeLevel];
                    if (playerEntity.money >= upgradeCost) {
                        playerEntity.money -= upgradeCost;
                        playerEntity.unitUpgradeLevels[props.unitType] = unitTypeUpgradeLevel + 1;
                        this.upgradePlayerUnits(playerEntity, props.unitType, gameLogic);
                    }

                }
            }
        );

    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}