import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class WaveActivationSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {
        const waveEntity = gameLogic.getEntities('wave')[0] as IWave;
        if (waveEntity) {
            if (waveEntity.waveTimer >= waveEntity.waveCooldown && !waveEntity.active) {
                waveEntity.active = true;
                gameLogic.trigger(
                    'wave.activated',
                    waveEntity.waveNumber,
                );
            }
        }
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}