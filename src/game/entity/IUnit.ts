import { IEntity } from "./IEntity";

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
    "units.hound",
    "units.peasant",
    "units.skeleton"
];

export type UnitType = typeof UNIT_ENTITY_TYPES[number];

export interface UnitTypeCharacteristics {
    cost: number;
}

export const UNIT_TYPE_CHARACTERISTICS: Record<UnitType, UnitTypeCharacteristics> = {
    "units.peasant": {
        cost: 10
    }
};
