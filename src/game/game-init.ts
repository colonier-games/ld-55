import { HoundUnitSystem } from "./system/HoundUnitSystem";
import { LevelBackgroundSystem } from "./system/LevelBackgroundSystem";
import { LevelFinishingSystem } from "./system/LevelFinishingSystem";
import { PlayerBuildingBuySystem } from "./system/PlayerBuildingBuySystem";
import { PlayerBuildingsNotificationSystem } from "./system/PlayerBuildingsNotificationSystem";
import { PlayerBuildingsSystem } from "./system/PlayerBuildingsSystem";
import { PlayerInitSystem } from "./system/PlayerInitSystem";
import { PlayerMoneyEarningSystem } from "./system/PlayerMoneyEarningSystem";
import { PlayerMoneyNotificationSystem } from "./system/PlayerMoneyNotificationSystem";
import { PlayerUnitSummoningSystem } from "./system/PlayerUnitSummoningSystem";
import { UnitArenaBoundsSystem } from "./system/UnitArenaBoundsSystem";
import { UnitHealthBarSystem } from "./system/UnitHealthBarSystem";
import { UnitKillingSystem } from "./system/UnitKillingSystem";
import { UnitMovementSystem } from "./system/UnitMovementSystem";
import { UnitTestingSystem } from "./system/UnitTestingSystem";
import { WaveActivationSystem } from "./system/WaveActivationSystem";
import { WaveFinishingSystem } from "./system/WaveFinishingSystem";
import { WaveInitSystem } from "./system/WaveInitSystem";
import { WaveSpawningSystem } from "./system/WaveSpawningSystem";
import { WaveTimerSystem } from "./system/WaveTimerSystem";

export const GAME_SYSTEM_CTORS = [
    PlayerInitSystem,
    WaveInitSystem,
    LevelBackgroundSystem,
    HoundUnitSystem,
    UnitMovementSystem,
    UnitArenaBoundsSystem,
    UnitKillingSystem,
    UnitTestingSystem,
    PlayerBuildingsSystem,
    PlayerMoneyEarningSystem,
    PlayerMoneyNotificationSystem,
    PlayerBuildingBuySystem,
    PlayerUnitSummoningSystem,
    PlayerBuildingsNotificationSystem,
    UnitHealthBarSystem,
    WaveTimerSystem,
    WaveActivationSystem,
    WaveSpawningSystem,
    WaveFinishingSystem,
    LevelFinishingSystem
];

export const GAME_GRAPHICS = {
    "levels.nether-woods": "assets/levels/nether-woods.x4.png",
    "levels.ruins": "assets/levels/ruins.png",
    "levels.dungeon": "assets/levels/dungeon.png",
    "levels.lava": "assets/levels/lava.png",
    "levels.lake": "assets/levels/lake.png",
    "levels.throneroom": "assets/levels/throneroom.png",
    "units.hound.green": "assets/units/peasant.png",
    "units.hound.red": "assets/units/skull.png",
    "units.holy-knight": "assets/units/holy-knight.png",
    "units.devil": "assets/units/devil.png",
    "units.cerberus": "assets/units/cerberus.png",
    "units.peasant": "assets/units/peasant.png",
    "units.knight": "assets/units/knight.png",
    "units.skull": "assets/units/skull.png",
    "units.vampire": "assets/units/vampire.png"
};
