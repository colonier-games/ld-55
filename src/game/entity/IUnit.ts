import { IEntity } from "./IEntity";

export const UNIT_OWNER_AI = 0;
export const UNIT_OWNER_PLAYER = 1;

export type UnitOwner = typeof UNIT_OWNER_AI | typeof UNIT_OWNER_PLAYER;

export interface IUnit extends IEntity {
    owner: UnitOwner;
    hp: number;
    ap: number;
    sp: number;
    dp: number;
    baseSpeed: number;
    baseAcceleration: number;
    velocity: { x: number, y: number };
}

export const UNIT_ENTITY_TYPES = [
    "units.hound"
];
