import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { createHoundUnit } from "../entity/IHoundUnit";
import { IUnit, UNIT_OWNER_AI } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { WORLD_SIZE } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export class WaveSpawningSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }

    private spawnLocationOf(
        index: number,
        total: number
    ): { x: number, y: number } {

        // Always spawn on the edge, e.g.:
        // A: (0, 0) - (WORLD_SIZE, 0)
        // B: (WORLD_SIZE, 0) - (WORLD_SIZE, WORLD_SIZE)
        // C: (WORLD_SIZE, WORLD_SIZE) - (0, WORLD_SIZE)
        // D: (0, WORLD_SIZE) - (0, 0)
        // Distribute evenly accross edges
        const perEdge = Math.floor(total / 4);
        const edge = Math.min(Math.floor(index / perEdge), 3);

        switch (edge) {
            case 0: // A
                return {
                    x: Math.floor(Math.random() * WORLD_SIZE),
                    y: 0
                };
            case 1: // B
                return {
                    x: WORLD_SIZE,
                    y: Math.floor(Math.random() * WORLD_SIZE)
                };
            case 2: // C
                return {
                    x: Math.floor(Math.random() * WORLD_SIZE),
                    y: WORLD_SIZE
                };
            case 3: // D
                return {
                    x: 0,
                    y: Math.floor(Math.random() * WORLD_SIZE)
                };
        }

        return {
            x: 0,
            y: 0
        };

    }

    private spawnForWave(
        wave: IWave,
        gameLogic: IGameLogic
    ): Array<IUnit> {
        const result: Array<IUnit> = [];

        const unitCount = 5 + wave.waveNumber * 2;

        for (let i = 0; i < unitCount; i++) {
            const position = this.spawnLocationOf(i, unitCount);
            const unit = createHoundUnit({
                position,
                level: 0,
                owner: UNIT_OWNER_AI
            });
            gameLogic.spawnEntity('units.hound', unit);
            result.push(unit);
        }

        return result;
    }

    tick(dt: number, gameLogic: IGameLogic): void {
        const waveEntity = gameLogic.getEntities('wave')[0] as IWave;
        if (waveEntity) {
            if (waveEntity.active && !waveEntity.spawned) {
                const spawnedUnits = this.spawnForWave(waveEntity, gameLogic);
                waveEntity.spawned = true;
                gameLogic.trigger('wave.spawned', { units: spawnedUnits });
            }
        }
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}