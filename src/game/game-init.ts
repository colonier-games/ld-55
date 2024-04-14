import { HoundUnitSystem } from "./system/HoundUnitSystem";
import { LevelBackgroundSystem } from "./system/LevelBackgroundSystem";
import { PlayerBuildingBuySystem } from "./system/PlayerBuildingBuySystem";
import { PlayerBuildingsNotificationSystem } from "./system/PlayerBuildingsNotificationSystem";
import { PlayerBuildingsSystem } from "./system/PlayerBuildingsSystem";
import { PlayerInitSystem } from "./system/PlayerInitSystem";
import { PlayerMoneyEarningSystem } from "./system/PlayerMoneyEarningSystem";
import { PlayerMoneyNotificationSystem } from "./system/PlayerMoneyNotificationSystem";
import { UnitArenaBoundsSystem } from "./system/UnitArenaBoundsSystem";
import { UnitHealthBarSystem } from "./system/UnitHealthBarSystem";
import { UnitKillingSystem } from "./system/UnitKillingSystem";
import { UnitMovementSystem } from "./system/UnitMovementSystem";
import { UnitTestingSystem } from "./system/UnitTestingSystem";

export const GAME_SYSTEM_CTORS = [
    PlayerInitSystem,
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
    PlayerBuildingsNotificationSystem,
    UnitHealthBarSystem
];

export const GAME_GRAPHICS = {
    "levels.nether-woods": "assets/levels/nether-woods.png",
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
