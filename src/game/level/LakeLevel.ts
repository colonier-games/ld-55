import { IGameLevel } from "./IGameLevel";

export class LakeLevel implements IGameLevel {

    public readonly name: string = "Lake";
    public readonly backgroundAssetName: string = "levels.lake";

    public init(): void {
        console.log("[LakeLevel]", "init");
    }
}