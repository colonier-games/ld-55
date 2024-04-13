import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";

export interface IGameSystem {
    init(
        gameLogic: IGameLogic,
        gameAssets: IGameAssets
    ): void;
    tick(
        dt: number,
        gameLogic: IGameLogic
    ): void;
    render(
        dt: number,
        gameLogic: IGameLogic
    ): void;
}