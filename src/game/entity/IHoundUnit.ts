import { newEntityId } from "./IEntity";
import { IUnit, UnitOwner } from "./IUnit";

export const UNIT_HOUND_BASE_HP = 10;
export const UNIT_HOUND_BASE_AP = 2;
export const UNIT_HOUND_BASE_SP = 1;
export const UNIT_HOUND_BASE_DP = 0;
export const UNIT_HOUND_HP_PER_LEVEL = 2;
export const UNIT_HOUND_AP_PER_LEVEL = 1;
export const UNIT_HOUND_SP_PER_LEVEL = 0.05;
export const UNIT_HOUND_DP_PER_LEVEL = 1;
export const UNIT_HOUND_BASE_SPEED = 300;
export const UNIT_HOUND_BASE_ACCELERATION = 3000;
export const UNIT_HOUND_ATTACK_COOLDOWN = 0.25;
export const UNIT_HOUND_ATTACK_COOLDOWN_PER_LEVEL = 0.05;
export const UNIT_HOUND_ATTACK_RANGE = 100;

export interface IHoundUnit extends IUnit {
    target?: IUnit | null;
    attackTimer: number;
    attackCooldown: number;
}

export function createHoundUnit(
    props: {
        position: { x: number, y: number }
        owner: UnitOwner
        level: number
    }
): IHoundUnit {
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        owner: props.owner,
        hp: UNIT_HOUND_BASE_HP + UNIT_HOUND_HP_PER_LEVEL * props.level,
        ap: UNIT_HOUND_BASE_AP + UNIT_HOUND_AP_PER_LEVEL * props.level,
        sp: UNIT_HOUND_BASE_SP + UNIT_HOUND_SP_PER_LEVEL * props.level,
        dp: props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: UNIT_HOUND_BASE_SPEED,
        baseAcceleration: UNIT_HOUND_BASE_ACCELERATION,
        attackTimer: 0,
        attackCooldown: UNIT_HOUND_ATTACK_COOLDOWN + UNIT_HOUND_ATTACK_COOLDOWN_PER_LEVEL * props.level
    };
}
