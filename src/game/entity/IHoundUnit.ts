import { newEntityId } from "./IEntity";
import { IUnit, UnitOwner } from "./IUnit";

export interface IHoundUnit extends IUnit {
    target?: IUnit | null;
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
        hp: 10 + 2 * props.level,
        ap: 2 + props.level,
        sp: 1 + 0.05 * props.level,
        dp: props.level,
        velocity: { x: 0, y: 0 },
        baseSpeed: 300,
        baseAcceleration: 3000
    };
}
