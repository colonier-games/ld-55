import { IEntity } from "./IEntity";
import { UNIT_HOLY_KNIGHT_BASE_AP, UNIT_HOLY_KNIGHT_BASE_HP } from "./IHolyKnightUnit";
import { UNIT_KNIGHT_BASE_AP, UNIT_KNIGHT_BASE_HP } from "./IKnightUnit";
import { UNIT_PEASANT_BASE_AP, UNIT_PEASANT_BASE_HP } from "./IPeasantUnit";

export const UNIT_OWNER_AI = 0;
export const UNIT_OWNER_PLAYER = 1;

export type UnitOwner = typeof UNIT_OWNER_AI | typeof UNIT_OWNER_PLAYER;

export interface IUnit extends IEntity {
    owner: UnitOwner;
    hp: number;
    maxHp: number;
    ap: number;
    sp: number;
    dp: number;
    baseSpeed: number;
    baseAcceleration: number;
    velocity: { x: number, y: number };
    kinematic?: boolean;
}

export const UNIT_ENTITY_TYPES = [
    "units.peasant",
    "units.holy-knight",
    "units.hound",
    "units.skeleton",
    "units.knight"
];

export type UnitType = typeof UNIT_ENTITY_TYPES[number];

export interface UnitTypeCharacteristics {
    cost: number;
    imageUrl: string;
    displayName: string;
    hp: number;
    ap: number;
    upgradeCosts: Array<number>;
    upgradeUnitCountLevels: Array<number>;
}

export const UNIT_TYPE_CHARACTERISTICS: Record<UnitType, UnitTypeCharacteristics> = {
    "units.peasant": {
        cost: 10,
        imageUrl: 'assets/units/peasant.png',
        displayName: 'Peasant',
        hp: UNIT_PEASANT_BASE_HP,
        ap: UNIT_PEASANT_BASE_AP,
        upgradeCosts: [100, 500, 2000, 10000, 50000],
        upgradeUnitCountLevels: [30, 100, 150, 250, 500]
    },
    "units.knight": {
        cost: 20,
        imageUrl: 'assets/units/knight.png',
        displayName: 'Knight',
        hp: UNIT_KNIGHT_BASE_HP,
        ap: UNIT_KNIGHT_BASE_AP,
        upgradeCosts: [2500, 10000, 50000, 100000, 500000],
        upgradeUnitCountLevels: [10, 30, 50, 100, 200]
    },
    "units.holy-knight": {
        cost: 100,
        imageUrl: 'assets/units/holy-knight.png',
        displayName: 'Holy Knight',
        hp: UNIT_HOLY_KNIGHT_BASE_HP,
        ap: UNIT_HOLY_KNIGHT_BASE_AP,
        upgradeCosts: [5000, 25000, 100000, 500000, 1000000],
        upgradeUnitCountLevels: [5, 10, 20, 50, 100]
    },
};
