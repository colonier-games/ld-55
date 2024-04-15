import { newEntityId } from "./IEntity";
import { IMeleeUnit } from "./IMeleeUnit";
import { UnitOwner } from "./IUnit";

export const UNIT_KNIGHT_BASE_HP = 8;
export const UNIT_KNIGHT_BASE_AP = 4;
export const UNIT_KNIGHT_BASE_SP = 1;
export const UNIT_KNIGHT_BASE_DP = 1;
export const UNIT_KNIGHT_HP_PER_LEVEL = 2;
export const UNIT_KNIGHT_AP_PER_LEVEL = 1;
export const UNIT_KNIGHT_SP_PER_LEVEL = 0.05;
export const UNIT_KNIGHT_DP_PER_LEVEL = 1;
export const UNIT_KNIGHT_BASE_SPEED = 200;
export const UNIT_KNIGHT_BASE_ACCELERATION = 2000;
export const UNIT_KNIGHT_ATTACK_COOLDOWN = 1.0;
export const UNIT_KNIGHT_ATTACK_COOLDOWN_PER_LEVEL = 0.05;
export const UNIT_KNIGHT_ATTACK_RANGE = 100;
export const UNIT_KNIGHT_ATTACK_ANIMATION_START = 0.75;
export const UNIT_KNIGHT_ARRIVE_RANGE = 40;
export const UNIT_KNIGHT_ARRIVE_FACTOR = 0.98;

export interface IKnightUnit extends IMeleeUnit { }

export function createKnightUnit(
    props: {
        position: { x: number, y: number }
        owner: UnitOwner
        level: number
    }
): IKnightUnit {
    const maxHp = UNIT_KNIGHT_BASE_HP + UNIT_KNIGHT_HP_PER_LEVEL * props.level;
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        owner: props.owner,
        hp: maxHp,
        maxHp,
        ap: UNIT_KNIGHT_BASE_AP + UNIT_KNIGHT_AP_PER_LEVEL * props.level,
        sp: UNIT_KNIGHT_BASE_SP + UNIT_KNIGHT_SP_PER_LEVEL * props.level,
        dp: UNIT_KNIGHT_BASE_DP + UNIT_KNIGHT_DP_PER_LEVEL * props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: UNIT_KNIGHT_BASE_SPEED,
        baseAcceleration: UNIT_KNIGHT_BASE_ACCELERATION,
        attackTimer: 0,
        attackCooldown: UNIT_KNIGHT_ATTACK_COOLDOWN + UNIT_KNIGHT_ATTACK_COOLDOWN_PER_LEVEL * props.level,
        attackFromPosition: { x: props.position.x, y: props.position.y },
        arriveRange: UNIT_KNIGHT_ARRIVE_RANGE,
        arriveFactor: UNIT_KNIGHT_ARRIVE_FACTOR,
        attackAnimationStartTime: UNIT_KNIGHT_ATTACK_ANIMATION_START,
        attackRange: UNIT_KNIGHT_ATTACK_RANGE,
    };
}

export function upgradeKnightUnit(
    unit: IKnightUnit,
    level: number
): void {
    const maxHp = UNIT_KNIGHT_BASE_HP + UNIT_KNIGHT_HP_PER_LEVEL * level;
    unit.maxHp = maxHp;
    unit.ap = UNIT_KNIGHT_BASE_AP + UNIT_KNIGHT_AP_PER_LEVEL * level;
    unit.sp = UNIT_KNIGHT_BASE_SP + UNIT_KNIGHT_SP_PER_LEVEL * level;
    unit.dp = UNIT_KNIGHT_BASE_DP + UNIT_KNIGHT_DP_PER_LEVEL * level;
    unit.attackCooldown = UNIT_KNIGHT_ATTACK_COOLDOWN + UNIT_KNIGHT_ATTACK_COOLDOWN_PER_LEVEL * level;
}
