import { IGameLevel } from "./IGameLevel";

export class ThroneroomLevel implements IGameLevel {

    public readonly name: string = "Throneroom";
    public readonly backgroundAssetName: string = "levels.throneroom";

    public init(): void {
        console.log("[ThroneroomLevel]", "init");
    }
}