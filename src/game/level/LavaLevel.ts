import { IGameLevel } from "./IGameLevel";

export class LavaLevel implements IGameLevel {

    public readonly name: string = "Lava";
    public readonly backgroundAssetName: string = "levels.lava";

    public init(): void {
        console.log("[LavaLevel]", "init");
    }
}