import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { ALL_GAME_LEVELS } from "../level/game-levels";
import { IGameSystem } from "./IGameSystem";

/** Responsible for drawing the level background image on the game canvas. */
export class LevelBackgroundSystem implements IGameSystem {

    private _levelBackgroundImages: Record<string, HTMLImageElement> = {};
    private _backgroundImage: HTMLImageElement | null = null;
    private _levelName: string = "";

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        ALL_GAME_LEVELS.forEach((level) => {
            this._levelBackgroundImages[level.name] = gameAssets.getGraphics(level.backgroundAssetName);
        });
        this._backgroundImage = this._levelBackgroundImages[gameLogic.getLevel().name];
        this._levelName = gameLogic.getLevel().name;
    }

    tick(dt: number, gameLogic: IGameLogic): void {
        const currentLevelName = gameLogic.getLevel().name;
        if (this._levelName !== currentLevelName) {
            this._levelName = currentLevelName;
            this._backgroundImage = this._levelBackgroundImages[currentLevelName];
        }
    }

    render(dt: number, gameLogic: IGameLogic): void {
        const g = gameLogic.context;
        const W = gameLogic.canvas.width;
        const H = gameLogic.canvas.height;
        const Cx = W / 2;
        const Cy = H / 2;
        const Rw = Math.min(W, H);
        const Rh = Rw;

        g.drawImage(
            this._backgroundImage as HTMLImageElement,
            Cx - Rw / 2,
            Cy - Rh / 2,
            Rw,
            Rh
        );
    }
}