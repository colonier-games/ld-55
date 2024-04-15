import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit, createHoundUnit } from "../entity/IHoundUnit";
import { UNIT_OWNER_AI, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

/** Spawns a bunch of units for testing purposes. */
export class UnitTestingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        for (let i = 0; i < 10; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.hound', createHoundUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_PLAYER,
                level: 0
            }));
        }

    }

    tick(dt: number, gameLogic: IGameLogic): void {

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}