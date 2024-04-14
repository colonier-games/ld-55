import { IGameLevel } from "./IGameLevel";

export class RuinsLevel implements IGameLevel {

    public readonly name: string = "Ruins";
    public readonly backgroundAssetName: string = "levels.ruins";

    public init(): void {
        console.log("[RuinsLevel]", "init");
    }
}