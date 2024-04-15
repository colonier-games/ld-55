import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { createWave } from "../entity/IWave";
import { IGameSystem } from "./IGameSystem";

export class WaveInitSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.spawnEntity('wave', createWave());
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}