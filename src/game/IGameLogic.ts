import { IEntity } from "./entity/IEntity";

export interface IGameLogic {

    initCanvas(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
    ): void;

    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    readonly canvasSize: { width: number, height: number };

    spawnEntity<T extends IEntity>(
        entityType: string,
        entityData: T
    ): void;

    getAllEntities(): Array<IEntity>;
    getEntities<T extends IEntity>(entityType: string): Array<T>;

}
