import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit } from "../entity/IHoundUnit";
import { UNIT_OWNER_AI, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export class UnitTestingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        // Spawn 10 random hound units for player, and AI
        for (let i = 0; i < 10; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.hound', {
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                dead: false,
                owner: UNIT_OWNER_PLAYER
            });
        }

        for (let i = 0; i < 10; i++) {
            gameLogic.spawnEntity<IHoundUnit>('units.hound', {
                position: {
                    x: 1000 * Math.random(),
                    y: 1000 * Math.random()
                },
                dead: false,
                owner: UNIT_OWNER_AI
            });
        }

    }

    tick(dt: number, gameLogic: IGameLogic): void {

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}