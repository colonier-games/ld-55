import { IEntity } from "./entity/IEntity";

export interface IGameLogic {

    initCanvas(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
    ): void;

    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;

    spawnEntity<T extends IEntity>(
        entityType: string,
        entityData: T
    ): void;

}
