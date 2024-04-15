import { IUnit } from "./IUnit";

export interface IAOEUnit extends IUnit {
    attackTimer: number;
    attackCooldown: number;
    attackFromPosition?: { x: number, y: number } | null;
    attackAnimationStartTime: number;
    attackRange: number;

}