import { IGameLevel } from "./IGameLevel";

export class NetherWoodsLevel implements IGameLevel {

    public readonly name: string = "Nether Woods";
    public readonly backgroundAssetName: string = "levels.nether-woods";

    public init(): void {
        console.log("[NetherWoodsLevel]", "init");
    }

}