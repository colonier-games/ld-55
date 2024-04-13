import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit, createHoundUnit } from "../entity/IHoundUnit";
import { UNIT_OWNER_AI, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export class UnitTestingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        for (let i = 0; i < 250; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.hound', createHoundUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_PLAYER,
                level: 0
            }));
        }

        for (let i = 0; i < 250; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.hound', createHoundUnit({
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                owner: UNIT_OWNER_AI,
                level: 0
            }));
        }

    }

    tick(dt: number, gameLogic: IGameLogic): void {

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}