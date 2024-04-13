import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit } from "../entity/IHoundUnit";
import { UNIT_OWNER_AI } from "../entity/IUnit";
import { worldToCanvas } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

const HOUND_UNIT_SIZE = 32;

export class HoundUnitSystem implements IGameSystem {

    private _playerUnitImage: HTMLImageElement | null = null;
    private _aiUnitImage: HTMLImageElement | null = null;

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        this._playerUnitImage = gameAssets.getGraphics('units.hound.green');
        this._aiUnitImage = gameAssets.getGraphics('units.hound.red');
    }

    tick(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');

        houndUnits.forEach(unit => {

            unit.velocity.x += (Math.random() - 0.5) * dt * 1000;
            unit.velocity.y += (Math.random() - 0.5) * dt * 1000;

            unit.position.x += unit.velocity.x * dt;
            unit.position.y += unit.velocity.y * dt;

        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');
        const g = gameLogic.context;

        houndUnits.forEach(unit => {
            const canvasPos = worldToCanvas(
                unit.position,
                gameLogic.canvasSize
            );

            g.drawImage(
                unit.owner === UNIT_OWNER_AI ? this._aiUnitImage as HTMLImageElement : this._playerUnitImage as HTMLImageElement,
                canvasPos.x - HOUND_UNIT_SIZE / 2,
                canvasPos.y - HOUND_UNIT_SIZE / 2,
                HOUND_UNIT_SIZE,
                HOUND_UNIT_SIZE
            );
        });

    }
}