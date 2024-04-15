import { newEntityId } from "./IEntity";
import { IMeleeUnit } from "./IMeleeUnit";
import { UnitOwner } from "./IUnit";

export const UNIT_CERBERUS_BASE_HP = 7;
export const UNIT_CERBERUS_BASE_AP = 1;
export const UNIT_CERBERUS_BASE_SP = 1;
export const UNIT_CERBERUS_BASE_DP = 0;
export const UNIT_CERBERUS_HP_PER_LEVEL = 2;
export const UNIT_CERBERUS_AP_PER_LEVEL = 1;
export const UNIT_CERBERUS_SP_PER_LEVEL = 0.05;
export const UNIT_CERBERUS_DP_PER_LEVEL = 1;
export const UNIT_CERBERUS_BASE_SPEED = 250;
export const UNIT_CERBERUS_BASE_ACCELERATION = 2000;
export const UNIT_CERBERUS_ATTACK_COOLDOWN = 0.8;
export const UNIT_CERBERUS_ATTACK_COOLDOWN_PER_LEVEL = 0.05;
export const UNIT_CERBERUS_ATTACK_RANGE = 150;
export const UNIT_CERBERUS_ATTACK_ANIMATION_START = 0.75;
export const UNIT_CERBERUS_ARRIVE_RANGE = 40;
export const UNIT_CERBERUS_ARRIVE_FACTOR = 0.98;

export interface ICerberusUnit extends IMeleeUnit { }

export function createCerberusUnit(
    props: {
        position: { x: number, y: number }
        owner: UnitOwner
        level: number
    }
): ICerberusUnit {
    const maxHp = UNIT_CERBERUS_BASE_HP + UNIT_CERBERUS_HP_PER_LEVEL * props.level;
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        owner: props.owner,
        hp: maxHp,
        maxHp,
        ap: UNIT_CERBERUS_BASE_AP + UNIT_CERBERUS_AP_PER_LEVEL * props.level,
        sp: UNIT_CERBERUS_BASE_SP + UNIT_CERBERUS_SP_PER_LEVEL * props.level,
        dp: UNIT_CERBERUS_BASE_DP + UNIT_CERBERUS_DP_PER_LEVEL * props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: UNIT_CERBERUS_BASE_SPEED,
        baseAcceleration: UNIT_CERBERUS_BASE_ACCELERATION,
        attackTimer: 0,
        attackCooldown: UNIT_CERBERUS_ATTACK_COOLDOWN + UNIT_CERBERUS_ATTACK_COOLDOWN_PER_LEVEL * props.level,
        attackFromPosition: { x: props.position.x, y: props.position.y },
        arriveRange: UNIT_CERBERUS_ARRIVE_RANGE,
        arriveFactor: UNIT_CERBERUS_ARRIVE_FACTOR,
        attackAnimationStartTime: UNIT_CERBERUS_ATTACK_ANIMATION_START,
        attackRange: UNIT_CERBERUS_ATTACK_RANGE,
    };
}

export function upgradeCerberusUnit(
    unit: ICerberusUnit,
    level: number
): void {
    const maxHp = UNIT_CERBERUS_BASE_HP + UNIT_CERBERUS_HP_PER_LEVEL * level;
    unit.maxHp = maxHp;
    unit.hp = maxHp;
    unit.ap = UNIT_CERBERUS_BASE_AP + UNIT_CERBERUS_AP_PER_LEVEL * level;
    unit.sp = UNIT_CERBERUS_BASE_SP + UNIT_CERBERUS_SP_PER_LEVEL * level;
    unit.dp = UNIT_CERBERUS_BASE_DP + UNIT_CERBERUS_DP_PER_LEVEL * level;
    unit.attackCooldown = UNIT_CERBERUS_ATTACK_COOLDOWN + UNIT_CERBERUS_ATTACK_COOLDOWN_PER_LEVEL * level;
}
