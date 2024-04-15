import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class UnitKillRewardSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.addEventListener(
            "unit.killed",
            (opts: { unit: IUnit }) => {
                const waveEntity = gameLogic.getEntities("wave")[0] as IWave;
                gameLogic.trigger("player.money.earned", opts.unit.maxHp * (waveEntity.levelNumber * waveEntity.totalWaves + waveEntity.waveNumber));
            }
        )
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}