import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class WaveTimerSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {
        const waveEntity = gameLogic.getEntities('wave')[0] as IWave;
        if (waveEntity) {
            waveEntity.waveTimer += dt;
            gameLogic.trigger('wave.timer.updated', waveEntity.waveTimer);
        }
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}