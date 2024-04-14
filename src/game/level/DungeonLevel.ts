import { IGameLevel } from "./IGameLevel";

export class DungeonLevel implements IGameLevel {

    public readonly name: string = "Dungeon";
    public readonly backgroundAssetName: string = "levels.dungeon";

    public init(): void {
        console.log("[DungeonLevel]", "init");
    }

}