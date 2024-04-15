import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { ALL_GAME_LEVELS } from "../level/game-levels";
import { IGameSystem } from "./IGameSystem";

export class LevelFinishingSystem implements IGameSystem {

    private resetLevel(
        gameLogic: IGameLogic
    ): void {
        gameLogic.getEntities(UNIT_ENTITY_TYPES).forEach(
            (unit: IUnit) => {
                // unit.dead = true;
            }
        );
        gameLogic.getEntities('wave').forEach(
            (wave: IWave) => {
                wave.active = false;
                wave.spawned = false;
                wave.waveNumber = 1;
                wave.waveTimer = 0;
                wave.levelNumber += 1;

                gameLogic.changeLevel(
                    ALL_GAME_LEVELS[Math.min(ALL_GAME_LEVELS.length - 1, wave.levelNumber - 1)]
                );
            }
        );
    }

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.addEventListener(
            'wave.won',
            (waveNumber: number) => {
                const waveEntity = gameLogic.getEntities('wave')[0] as IWave;
                if (waveNumber - 1 >= waveEntity.totalWaves) {
                    gameLogic.trigger('level.won', {});
                    this.resetLevel(gameLogic);
                }
            }
        );

        gameLogic.addEventListener(
            'wave.lost',
            (waveNumber: number) => {
                gameLogic.trigger('level.lost', {});
                this.resetLevel(gameLogic);
            }
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}