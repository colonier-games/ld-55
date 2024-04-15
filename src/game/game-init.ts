import { MeleeUnitSystem } from "./system/MeleeUnitSystem";
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
import { PlayerUnitsNotificationSystem } from "./system/PlayerUnitsNotificationSystem";
import { PlayerUnitUpgradeSystem } from "./system/PlayerUnitUpgradeSystem";
import { PlayerUnitUpgradeNotificationSystem } from "./system/PlayerUnitUpgradeNotificationSystem";
import { PlayerHealingSystem } from "./system/PlayerHealingSystem";
import { UnitRenderingSystem } from "./system/UnitRenderingSystem";
import { AOEUnitSystem } from "./system/AOEUnitSystem";
import { AOESplashSystem } from "./system/AOESplashSystem";
import { UnitKillRewardSystem } from "./system/UnitKillRewardSystem";

export const GAME_SYSTEM_CTORS = [
    PlayerInitSystem,
    WaveInitSystem,
    LevelBackgroundSystem,
    MeleeUnitSystem,
    AOEUnitSystem,
    UnitMovementSystem,
    UnitArenaBoundsSystem,
    UnitKillingSystem,
    UnitTestingSystem,
    UnitRenderingSystem,
    PlayerBuildingsSystem,
    PlayerMoneyEarningSystem,
    PlayerMoneyNotificationSystem,
    PlayerBuildingBuySystem,
    PlayerUnitSummoningSystem,
    PlayerBuildingsNotificationSystem,
    UnitHealthBarSystem,
    AOESplashSystem,
    WaveTimerSystem,
    WaveActivationSystem,
    WaveSpawningSystem,
    WaveFinishingSystem,
    LevelFinishingSystem,
    PlayerUnitsNotificationSystem,
    PlayerUnitUpgradeSystem,
    PlayerUnitUpgradeNotificationSystem,
    PlayerHealingSystem,
    UnitKillRewardSystem
];

export const GAME_GRAPHICS = {
    "levels.nether-woods": "assets/levels/nether-woods.x4.png",
    "levels.ruins": "assets/levels/ruins.png",
    "levels.dungeon": "assets/levels/dungeon.png",
    "levels.lava": "assets/levels/lava.png",
    "levels.lake": "assets/levels/lake.png",
    "levels.throneroom": "assets/levels/throneroom.png",
    "units.hound": "assets/units/hound.png",
    "units.holy-knight": "assets/units/holy-knight.png",
    "units.devil": "assets/units/devil.png",
    "units.cerberus": "assets/units/cerberus.png",
    "units.peasant": "assets/units/peasant.png",
    "units.knight": "assets/units/knight.png",
    "units.skeleton": "assets/units/skull.png",
    "units.vampire": "assets/units/vampire.png"
};
