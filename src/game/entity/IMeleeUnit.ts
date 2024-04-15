import { IUnit } from "./IUnit";

export interface IMeleeUnit extends IUnit {
    target?: IUnit | null;
    attackTimer: number;
    attackCooldown: number;
    attackFromPosition?: { x: number, y: number } | null;
    attackAnimationStartTime: number;
    attackRange: number;
    arriveRange: number;
    arriveFactor: number;
}