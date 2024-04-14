import { DungeonLevel } from "./DungeonLevel";
import { IGameLevel } from "./IGameLevel";
import { LakeLevel } from "./LakeLevel";
import { LavaLevel } from "./LavaLevel";
import { NetherWoodsLevel } from "./NetherWoodsLevel";
import { RuinsLevel } from "./RuinsLevel";
import { ThroneroomLevel } from "./ThroneroomLevel";

const LEVEL_NETHER_WOODS: IGameLevel = new NetherWoodsLevel();
const LEVEL_DUNGEON: IGameLevel = new DungeonLevel();
const LEVEL_LAKE: IGameLevel = new LakeLevel();
const LEVEL_LAVA: IGameLevel = new LavaLevel();
const LEVEL_RUINS: IGameLevel = new RuinsLevel();
const LEVEL_THRONEROOM: IGameLevel = new ThroneroomLevel();

export const ALL_GAME_LEVELS: Array<IGameLevel> = [
    LEVEL_NETHER_WOODS,
    LEVEL_DUNGEON,
    LEVEL_LAKE,
    LEVEL_LAVA,
    LEVEL_RUINS,
    LEVEL_THRONEROOM
];

export const FIRST_GAME_LEVEL: IGameLevel = LEVEL_NETHER_WOODS;
