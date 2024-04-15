import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { createHolyKnightUnit } from "../entity/IHolyKnightUnit";
import { IHoundUnit, createHoundUnit } from "../entity/IHoundUnit";
import { IKnightUnit, createKnightUnit } from "../entity/IKnightUnit";
import { createPeasantUnit } from "../entity/IPeasantUnit";
import { IPlayer } from "../entity/IPlayer";
import { UNIT_OWNER_AI, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

/** Spawns a bunch of units for testing purposes. */
export class UnitTestingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        for (let i = 0; i < 5; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.peasant', createPeasantUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_PLAYER,
                level: 0
            }));
        }

        for (let i = 0; i < 4; i++) {
            gameLogic.spawnEntity<IKnightUnit>('units.knight', createKnightUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_PLAYER,
                level: 0
            }));
        }

        for (let i = 0; i < 3; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.holy-knight', createHolyKnightUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_PLAYER,
                level: 0
            }));
        }

        const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
        playerEntity.money += 100;

    }

    tick(dt: number, gameLogic: IGameLogic): void {

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}