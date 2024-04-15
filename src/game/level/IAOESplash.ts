import { IEntity, newEntityId } from "../entity/IEntity";

export const AOE_SPLASH_RADIUS_PER_SEC = 300;

export interface IAOESplash extends IEntity {
    maxRadius: number;
    radius: number;
    color?: string;
}

export function createAOESplash(
    props: {
        position: { x: number, y: number }
        maxRadius: number,
        color?: string
    }
): IAOESplash {
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        maxRadius: props.maxRadius,
        radius: 0,
        color: props.color
    };
}
