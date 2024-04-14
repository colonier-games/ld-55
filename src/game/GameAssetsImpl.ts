import { IGameAssets } from "./IGameAssets";
import { ILoadingErrorListener } from "./ILoadingErrorListener";
import { ILoadingProgressListener } from "./ILoadingProgressListener";
import { GAME_GRAPHICS } from "./game-init";

export class GameAssetsImpl implements IGameAssets {

    private loadedCount: number = 0;
    private remainingCount: number = 0;
    private hadError: boolean = false;
    private graphics: Record<string, HTMLImageElement> = {};
    private progressListeners: Array<ILoadingProgressListener> = [];
    private errorListeners: Array<ILoadingErrorListener> = [];

    constructor() {

    }

    private loadGraphics(
        id: string,
        src: string
    ): void {
        this.remainingCount++;
        const img = new Image();
        img.onload = () => {
            console.log('[GameAssetsImpl]', 'loadGraphics', id, src, img);
            this.graphics[id] = img;
            this.remainingCount--;
            this.loadedCount++;
            this.notifyLoadingProgress();
        };
        img.onerror = () => {
            console.error('[GameAssetsImpl]', 'loadGraphics', 'error', id, src);
            this.notifyError(`Failed to load image: ${src}`);
        };
        img.src = src;
    }

    private notifyLoadingProgress() {
        if (!this.hadError) {
            this.progressListeners.forEach(listener => {
                listener({
                    loaded: this.loadedCount,
                    remaining: this.remainingCount
                });
            });
        }
    }

    private notifyError(message: string) {
        this.hadError = true;
        this.errorListeners.forEach(listener => {
            listener(message);
        });
    }

    populateLoadingQueue(): void {

        Object.keys(GAME_GRAPHICS).forEach(key => {
            this.loadGraphics(key, GAME_GRAPHICS[key]);
        });

    }

    addLoadingProgressListener(
        listener: ILoadingProgressListener
    ): void {
        this.progressListeners.push(listener);
    }

    addLoadingErrorListener(
        listener: ILoadingErrorListener
    ): void {
        this.errorListeners.push(listener);
    }

    getGraphics(
        id: string
    ): HTMLImageElement {
        if (!this.graphics[id]) {
            throw new Error(`[GameAssetsImpl] graphics not found: ${id}`);
        }
        return this.graphics[id];
    }

}