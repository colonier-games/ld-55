import { IGameAssets } from "./IGameAssets";
import { IGameLogic } from "./IGameLogic";
import { IEntity } from "./entity/IEntity";
import { HoundUnitSystem } from "./system/HoundUnitSystem";
import { IGameSystem } from "./system/IGameSystem";
import { LevelBackgroundSystem } from "./system/LevelBackgroundSystem";
import { UnitTestingSystem } from "./system/UnitTestingSystem";

export class GameLogicImpl implements IGameLogic {

    private _canvas: HTMLCanvasElement | null = null;
    private _context: CanvasRenderingContext2D | null = null;
    private _systems: Array<IGameSystem> = [];
    private _entities: Record<string, Array<IEntity>> = {};
    private _canvasSize: { width: number, height: number } = { width: 0, height: 0 };
    private lastFrameTime: number = 0;

    constructor(
        private gameAssets: IGameAssets
    ) {

    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    get canvasSize(): { width: number, height: number } {
        return this._canvasSize;
    }

    private onWindowResized() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    private initSystems() {

        this._systems.push(
            new LevelBackgroundSystem(),
            new HoundUnitSystem(),
            new UnitTestingSystem()
        );

        this._systems.forEach(system => {
            console.log('[GameLogicImpl]', 'initSystems', system);
            system.init(this, this.gameAssets);
        });
    }

    initCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        console.log('[GameLogicImpl]', 'initCanvas', canvas, context);
        this._canvas = canvas;
        this._context = context;

        this.onWindowResized();
        window.addEventListener('resize', this.onWindowResized.bind(this));

        this.initSystems();

        this.lastFrameTime = Date.now();
        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    private onAnimationFrame() {
        const nowTime = Date.now();
        const deltaMs = nowTime - this.lastFrameTime;
        const delta = deltaMs / 1000.0;
        this.lastFrameTime = nowTime;

        this._canvasSize.width = this.canvas.width;
        this._canvasSize.height = this.canvas.height;

        this.tick(delta);
        this.render(delta);

        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    private tick(dt) {
        this._systems.forEach(system => {
            system.tick(dt, this);
        });
    }

    private render(dt) {
        const g = this.context;
        const W = this.canvas.width;
        const H = this.canvas.height;


        g.fillStyle = 'black';
        g.fillRect(0, 0, W, H);

        this._systems.forEach(system => {
            system.render(dt, this);
        });
    }

    spawnEntity<T extends IEntity>(entityType: string, entityData: T): void {
        if (!this._entities[entityType]) {
            this._entities[entityType] = [];
        }
        this._entities[entityType].push(entityData);
    }

    getAllEntities(): Array<IEntity> {
        return Object.keys(this._entities).reduce((acc, entityType) => {
            return acc.concat(this._entities[entityType]);
        }, []);
    }

    getEntities<T extends IEntity>(entityType: string): Array<T> {
        return this._entities[entityType] as Array<T> || [];
    }

}
