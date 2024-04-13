import { ILoadingErrorListener } from "./ILoadingErrorListener";
import { ILoadingProgressListener } from "./ILoadingProgressListener";

export interface IGameAssets {
    populateLoadingQueue(): void;
    addLoadingProgressListener(
        listener: ILoadingProgressListener
    ): void;
    addLoadingErrorListener(
        listener: ILoadingErrorListener
    ): void;
    getGraphics(
        id: string
    ): HTMLImageElement;
}