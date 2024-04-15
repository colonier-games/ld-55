import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { createHoundUnit } from "../entity/IHoundUnit";
import { IPlayer } from "../entity/IPlayer";
import { IUnit, UNIT_OWNER_PLAYER, UNIT_TYPE_CHARACTERISTICS, UnitType } from "../entity/IUnit";
import { WORLD_SIZE } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export interface IPlayerUnitSummonProps {
    unitType: UnitType;
}

export class PlayerUnitSummoningSystem implements IGameSystem {

    private createUnit(props: IPlayerUnitSummonProps): IUnit {
        if (props.unitType === 'units.hound') {
            return createHoundUnit({
                position: {
                    x: WORLD_SIZE / 2,
                    y: WORLD_SIZE / 2
                },
                level: 0,
                owner: UNIT_OWNER_PLAYER
            })
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