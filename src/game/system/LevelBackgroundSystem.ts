import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IGameSystem } from "./IGameSystem";

export class LevelBackgroundSystem implements IGameSystem {

    private _backgroundImage: HTMLImageElement | null = null;

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        this._backgroundImage = gameAssets.getGraphics('levels.nether-woods');
    }

    tick(dt: number, gameLogic: IGameLogic): void {

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