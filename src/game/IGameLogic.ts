import { IEntity } from "./entity/IEntity";
import { IGameLevel } from "./level/IGameLevel";

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
    changeLevel(newLevel: IGameLevel): void;

    getAllEntities(): Array<IEntity>;
    getEntities<T extends IEntity>(entityType: string | Array<string>): Array<T>;
    getEntity<T extends IEntity>(entityType: string, entityId: number): T | undefined;
    getLevel(): IGameLevel;

    trigger<T>(
        eventType: string,
        eventData: T
    ): void;
    addEventListener<T>(
        eventType: string,
        listener: (eventData: T) => void
    ): void;

}
