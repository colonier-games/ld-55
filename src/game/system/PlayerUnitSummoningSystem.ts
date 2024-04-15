import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { createHolyKnightUnit } from "../entity/IHolyKnightUnit";
import { createHoundUnit } from "../entity/IHoundUnit";
import { createKnightUnit } from "../entity/IKnight";
import { createPeasantUnit } from "../entity/IPeasantUnit";
import { IPlayer } from "../entity/IPlayer";
import { IUnit, UNIT_OWNER_PLAYER, UNIT_TYPE_CHARACTERISTICS, UnitType } from "../entity/IUnit";
import { WORLD_SIZE } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export interface IPlayerUnitSummonProps {
    unitType: UnitType;
}

const SUMMON_UNIT_TYPES = [
    {
        unitType: "units.peasant",
        create: (position: { x: number, y: number }) => createPeasantUnit({
            position,
            level: 0,
            owner: UNIT_OWNER_PLAYER
        })
    },
    {
        unitType: "units.holy-knight",
        create: (position: { x: number, y: number }) => createHolyKnightUnit({
            position,
            level: 0,
            owner: UNIT_OWNER_PLAYER
        })
    },
    {
        unitType: "units.knight",
        create: (position: { x: number, y: number }) => createKnightUnit({
            position,
            level: 0,
            owner: UNIT_OWNER_PLAYER
        })

    }
]

export class PlayerUnitSummoningSystem implements IGameSystem {

    private createUnit(props: IPlayerUnitSummonProps): IUnit {
        const unitType = SUMMON_UNIT_TYPES.find(
            summonUnitType => summonUnitType.unitType === props.unitType
        );
        if (unitType) {
            return unitType.create({
                x: WORLD_SIZE / 2,
                y: WORLD_SIZE / 2
            });
        }
        throw new Error(`Unknown unit type: ${props.unitType}`);
    }

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.addEventListener(
            'player.summon',
            (props: IPlayerUnitSummonProps) => {
                const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
                const unitTypeCharacteristics = UNIT_TYPE_CHARACTERISTICS[props.unitType];

                if (playerEntity.money >= unitTypeCharacteristics.cost) {
                    gameLogic.spawnEntity(
                        props.unitType,
                        this.createUnit(props)
                    );
                    playerEntity.money -= unitTypeCharacteristics.cost;
                }
            }
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}