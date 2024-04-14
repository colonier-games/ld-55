import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";

export interface IGameLevel {
    readonly name: string;
    readonly backgroundAssetName: string;
    init(
        logic: IGameLogic,
        assets: IGameAssets
    ): void;
}
