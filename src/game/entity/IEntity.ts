export interface IEntity {
    id: number;
    position: { x: number, y: number };
    dead: boolean;
}

var ENTITY_ID_SEQ = 0;

export function newEntityId(): number {
    return ENTITY_ID_SEQ++;
}
