import { IGameLogic } from "./IGameLogic";

export class GameLogicImpl implements IGameLogic {

    private canvas: HTMLCanvasElement | null = null;
    private context: CanvasRenderingContext2D | null = null;
    private lastFrameTime: number = 0;

    constructor() {

    }

    private onWindowResized() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    initCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        console.log('[GameLogicImpl]', 'initCanvas', canvas, context);
        this.canvas = canvas;
        this.context = context;

        this.onWindowResized();
        window.addEventListener('resize', this.onWindowResized.bind(this));

        this.lastFrameTime = Date.now();
        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    private onAnimationFrame() {
        const nowTime = Date.now();
        const deltaMs = nowTime - this.lastFrameTime;
        const delta = deltaMs / 1000.0;
        this.lastFrameTime = nowTime;

        this.tick(delta);
        this.render(delta);

        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    private tick(dt) {

    }

    private render(dt) {
        const g = this.context;
        const W = this.canvas.width;
        const H = this.canvas.height;

        g.fillStyle = 'black';
        g.fillRect(0, 0, W, H);
    }

}
