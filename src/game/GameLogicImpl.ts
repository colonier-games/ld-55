import { IGameAssets } from "./IGameAssets";
import { IGameLogic } from "./IGameLogic";
import { IEntity } from "./entity/IEntity";
import { GAME_SYSTEM_CTORS } from "./game-init";
import { IGameLevel } from "./level/IGameLevel";
import { FIRST_GAME_LEVEL } from "./level/game-levels";
import { HoundUnitSystem } from "./system/MeleeUnitSystem";
import { IGameSystem } from "./system/IGameSystem";
import { LevelBackgroundSystem } from "./system/LevelBackgroundSystem";
import { PlayerBuildingBuySystem } from "./system/PlayerBuildingBuySystem";
import { PlayerBuildingsNotificationSystem } from "./system/PlayerBuildingsNotificationSystem";
import { PlayerBuildingsSystem } from "./system/PlayerBuildingsSystem";
import { PlayerInitSystem } from "./system/PlayerInitSystem";
import { PlayerMoneyEarningSystem } from "./system/PlayerMoneyEarningSystem";
import { PlayerMoneyNotificationSystem } from "./system/PlayerMoneyNotificationSystem";
import { UnitArenaBoundsSystem } from "./system/UnitArenaBoundsSystem";
import { UnitHealthBarSystem } from "./system/UnitHealthBarSystem";
import { UnitKillingSystem } from "./system/UnitKillingSystem";
import { UnitMovementSystem } from "./system/UnitMovementSystem";
import { UnitTestingSystem } from "./system/UnitTestingSystem";

export class GameLogicImpl implements IGameLogic {

    private _canvas: HTMLCanvasElement | null = null;
    private _context: CanvasRenderingContext2D | null = null;
    private _systems: Array<IGameSystem> = [];
    private _entities: Record<string, Array<IEntity>> = {};
    private _canvasSize: { width: number, height: number } = { width: 0, height: 0 };
    private _eventListeners: Record<string, Array<(eventData: any) => void>> = {};
    private _gameLevel: IGameLevel = FIRST_GAME_LEVEL;
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
            const parentEl = this.canvas.parentElement;
            this.canvas.width = Math.floor(parentEl.clientWidth);
            this.canvas.height = Math.floor(parentEl.clientHeight);
        }
    }

    private initSystems() {

        this._systems.push(
            ...GAME_SYSTEM_CTORS.map(ctor => new ctor())
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
        const delta = Math.min(
            deltaMs / 1000.0,
            1 / 30.0
        );
        this.lastFrameTime = nowTime;

        this._canvasSize.width = this.canvas.width;
        this._canvasSize.height = this.canvas.height;

        this.tick(delta);
        this.render(delta);

        window.requestAnimationFrame(this.onAnimationFrame.bind(this));
    }

    private tick(dt: number) {
        this._systems.forEach(system => {
            system.tick(dt, this);
        });

        this.cleanUpDeadEntities();
    }

    private render(dt: number) {
        const g = this.context;
        const W = this.canvas.width;
        const H = this.canvas.height;


        g.fillStyle = 'black';
        g.fillRect(0, 0, W, H);

        this._systems.forEach(system => {
            system.render(dt, this);
        });
    }

    private cleanUpDeadEntities() {

        for (let entityType in this._entities) {
            this._entities[entityType] = this._entities[entityType].filter(entity => !entity.dead);
        }

    }

    spawnEntity<T extends IEntity>(entityType: string, entityData: T): void {
        if (!this._entities[entityType]) {
            this._entities[entityType] = [];
        }
        this._entities[entityType].push(entityData);
    }

    changeLevel(newLevel: IGameLevel): void {
        this._gameLevel = newLevel;
    }

    getAllEntities(): Array<IEntity> {
        return Object.keys(this._entities).reduce((acc, entityType) => {
            return acc.concat(this._entities[entityType]);
        }, []);
    }

    getEntities<T extends IEntity>(entityType: string | Array<string>): Array<T> {
        if (Array.isArray(entityType)) {
            return entityType.reduce((acc, type) => {
                return acc.concat((this._entities[type] || []) as Array<T>);
            }, []);
        }
        return this._entities[entityType] as Array<T> || [];
    }

    getEntity<T extends IEntity>(entityType: string, entityId: number) {
        return this.getEntities<T>(entityType).find(entity => entity.id === entityId);
    }

    getLevel(): IGameLevel {
        return this._gameLevel;
    }

    addEventListener<T>(eventType: string, listener: (eventData: T) => void): void {
        if (!this._eventListeners[eventType]) {
            this._eventListeners[eventType] = [];
        }
        this._eventListeners[eventType].push(listener);
    }

    trigger<T>(eventType: string, eventData: T): void {
        if (this._eventListeners[eventType]) {
            this._eventListeners[eventType].forEach(listener => {
                listener(eventData);
            });
        }
    }

}
