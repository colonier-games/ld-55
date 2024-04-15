import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class WaveFinishingSystem implements IGameSystem {

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }

    private checkWaveOverCondition(
        gameLogic: IGameLogic
    ): 'in-progress' | 'won' | 'lost' {
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);
        let playerHasAnyUnit = false;
        let enemyHasAnyUnit = false;
        for (let i = 0; i < allUnits.length; i++) {
            if (playerHasAnyUnit && enemyHasAnyUnit) {
                break;
            }
            const unit = allUnits[i];
            if (unit.owner === UNIT_OWNER_PLAYER) {
                playerHasAnyUnit = true;
            }
            else {
                enemyHasAnyUnit = true;
            }
        }
        if (playerHasAnyUnit && enemyHasAnyUnit) {
            return 'in-progress';
        }
        if (playerHasAnyUnit) {
            return 'won';
        }
        return 'lost';
    }

    tick(dt: number, gameLogic: IGameLogic): void {
        const waveEntity = gameLogic.getEntities('wave')[0] as IWave;

        if (waveEntity.active && waveEntity.spawned) {
            const waveCondition = this.checkWaveOverCondition(gameLogic);
            if (waveCondition === 'won') {
                waveEntity.active = false;
                waveEntity.spawned = false;
                waveEntity.waveTimer = 0;
                waveEntity.waveNumber++;
                gameLogic.trigger('wave.won', waveEntity.waveNumber);
            } else if (waveCondition === 'lost') {
                waveEntity.active = false;
                waveEntity.spawned = false;
                waveEntity.waveTimer = 0;
                gameLogic.trigger('wave.lost', waveEntity.waveNumber);
            }
        }
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }

}