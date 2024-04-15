import { newEntityId } from "./IEntity";
import { IMeleeUnit } from "./IMeleeUnit";
import { UnitOwner } from "./IUnit";

export const UNIT_PEASANT_BASE_HP = 2;
export const UNIT_PEASANT_BASE_AP = 2;
export const UNIT_PEASANT_BASE_SP = 1;
export const UNIT_PEASANT_BASE_DP = 0;
export const UNIT_PEASANT_HP_PER_LEVEL = 2;
export const UNIT_PEASANT_AP_PER_LEVEL = 1;
export const UNIT_PEASANT_SP_PER_LEVEL = 0.05;
export const UNIT_PEASANT_DP_PER_LEVEL = 1;
export const UNIT_PEASANT_BASE_SPEED = 300;
export const UNIT_PEASANT_BASE_ACCELERATION = 3000;
export const UNIT_PEASANT_ATTACK_COOLDOWN = 1.0;
export const UNIT_PEASANT_ATTACK_COOLDOWN_PER_LEVEL = 0.05;
export const UNIT_PEASANT_ATTACK_RANGE = 100;
export const UNIT_PEASANT_ATTACK_ANIMATION_START = 0.75;
export const UNIT_PEASANT_ARRIVE_RANGE = 40;
export const UNIT_PEASANT_ARRIVE_FACTOR = 0.98;

export interface IPeasantUnit extends IMeleeUnit { }

export function createPeasantUnit(
    props: {
        position: { x: number, y: number }
        owner: UnitOwner
        level: number
    }
): IPeasantUnit {
    const maxHp = UNIT_PEASANT_BASE_HP + UNIT_PEASANT_HP_PER_LEVEL * props.level;
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        owner: props.owner,
        hp: maxHp,
        maxHp,
        ap: UNIT_PEASANT_BASE_AP + UNIT_PEASANT_AP_PER_LEVEL * props.level,
        sp: UNIT_PEASANT_BASE_SP + UNIT_PEASANT_SP_PER_LEVEL * props.level,
        dp: props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: UNIT_PEASANT_BASE_SPEED,
        baseAcceleration: UNIT_PEASANT_BASE_ACCELERATION,
        attackTimer: 0,
        attackCooldown: UNIT_PEASANT_ATTACK_COOLDOWN + UNIT_PEASANT_ATTACK_COOLDOWN_PER_LEVEL * props.level,
        attackFromPosition: { x: props.position.x, y: props.position.y },
        arriveRange: UNIT_PEASANT_ARRIVE_RANGE,
        arriveFactor: UNIT_PEASANT_ARRIVE_FACTOR,
        attackAnimationStartTime: UNIT_PEASANT_ATTACK_ANIMATION_START,
        attackRange: UNIT_PEASANT_ATTACK_RANGE,
    };
}
