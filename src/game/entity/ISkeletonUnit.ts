import { newEntityId } from "./IEntity";
import { IMeleeUnit } from "./IMeleeUnit";
import { IUnit, UnitOwner } from "./IUnit";

export const UNIT_SKELETON_BASE_HP = 10;
export const UNIT_SKELETON_BASE_AP = 2;
export const UNIT_SKELETON_BASE_SP = 1;
export const UNIT_SKELETON_BASE_DP = 0;
export const UNIT_SKELETON_HP_PER_LEVEL = 2;
export const UNIT_SKELETON_AP_PER_LEVEL = 1;
export const UNIT_SKELETON_SP_PER_LEVEL = 0.05;
export const UNIT_SKELETON_DP_PER_LEVEL = 1;
export const UNIT_SKELETON_BASE_SPEED = 150;
export const UNIT_SKELETON_BASE_ACCELERATION = 1000;
export const UNIT_SKELETON_ATTACK_COOLDOWN = 1.5;
export const UNIT_SKELETON_ATTACK_COOLDOWN_PER_LEVEL = 0.05;
export const UNIT_SKELETON_ATTACK_RANGE = 100;
export const UNIT_SKELETON_ATTACK_ANIMATION_START = 0.75;
export const UNIT_SKELETON_ARRIVE_RANGE = 10;
export const UNIT_SKELETON_ARRIVE_FACTOR = 0.1;

export interface ISkeletonUnit extends IMeleeUnit { }

export function createSkeletonUnit(
    props: {
        position: { x: number, y: number }
        owner: UnitOwner
        level: number
    }
): ISkeletonUnit {
    const maxHp = UNIT_SKELETON_BASE_HP + UNIT_SKELETON_HP_PER_LEVEL * props.level;
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        owner: props.owner,
        hp: maxHp,
        maxHp,
        ap: UNIT_SKELETON_BASE_AP + UNIT_SKELETON_AP_PER_LEVEL * props.level,
        sp: UNIT_SKELETON_BASE_SP + UNIT_SKELETON_SP_PER_LEVEL * props.level,
        dp: props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: UNIT_SKELETON_BASE_SPEED,
        baseAcceleration: UNIT_SKELETON_BASE_ACCELERATION,
        attackTimer: 0,
        attackCooldown: UNIT_SKELETON_ATTACK_COOLDOWN + UNIT_SKELETON_ATTACK_COOLDOWN_PER_LEVEL * props.level,
        attackFromPosition: { x: props.position.x, y: props.position.y },
        arriveRange: UNIT_SKELETON_ARRIVE_RANGE,
        arriveFactor: UNIT_SKELETON_ARRIVE_FACTOR,
        attackAnimationStartTime: UNIT_SKELETON_ATTACK_ANIMATION_START,
        attackRange: UNIT_SKELETON_ATTACK_RANGE,
    };
}
