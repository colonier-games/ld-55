import { IEntity, newEntityId } from "../entity/IEntity";

export const AOE_SPLASH_RADIUS_PER_SEC = 600;

export interface IAOESplash extends IEntity {
    maxRadius: number;
    radius: number;
}

export function createAOESplash(
    props: {
        position: { x: number, y: number }
        maxRadius: number
    }
): IAOESplash {
    return {
        id: newEntityId(),
        position: props.position,
        dead: false,
        maxRadius: props.maxRadius,
        radius: 0
    };
}
