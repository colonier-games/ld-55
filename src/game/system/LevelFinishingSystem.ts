import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class LevelFinishingSystem implements IGameSystem {

    private resetLevel(
        gameLogic: IGameLogic
    ): void {
        gameLogic.getEntities(UNIT_ENTITY_TYPES).forEach(
            (unit: IUnit) => {
                unit.dead = true;
            }
        );
        gameLogic.getEntities('wave').forEach(
            (wave: IWave) => {
                wave.active = false;
                wave.spawned = false;
                wave.waveNumber = 0;
                wave.waveTimer = 0;
            }
        );
    }

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.addEventListener(
            'wave.won',
            (waveNumber: number) => {
                const waveEntity = gameLogic.getEntities('wave')[0] as IWave;
                if (waveNumber >= waveEntity.totalWaves) {
                    gameLogic.trigger('level.won', {});
                }
            }
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}