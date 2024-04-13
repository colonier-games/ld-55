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
    getEntities<T extends IEntity>(entityType: string | Array<string>): Array<T>;
    getEntity<T extends IEntity>(entityType: string, entityId: number): T | undefined;

    trigger<T>(
        eventType: string,
        eventData: T
    ): void;
    addEventListener<T>(
        eventType: string,
        listener: (eventData: T) => void
    ): void;

}
