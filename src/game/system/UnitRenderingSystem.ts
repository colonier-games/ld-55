import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES, UnitType } from "../entity/IUnit";
import { worldToCanvas } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

const MELEE_UNIT_SIZE = 40;

export class UnitRenderingSystem implements IGameSystem {

    private _unitTypeImages: Record<UnitType, HTMLImageElement> = {};

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        UNIT_ENTITY_TYPES.forEach(
            unitType => {
                this._unitTypeImages[unitType] = gameAssets.getGraphics(unitType);
            }
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

        const g = gameLogic.context;

        UNIT_ENTITY_TYPES.forEach(
            unitType => {
                const units = gameLogic.getEntities<IUnit>(unitType);

                units.forEach(unit => {

                    if (unit.dead) {
                        return;
                    }

                    const canvasPos = worldToCanvas(
                        unit.position,
                        gameLogic.canvasSize
                    );

                    g.drawImage(
                        this._unitTypeImages[unitType],
                        canvasPos.x - MELEE_UNIT_SIZE / 2,
                        canvasPos.y - MELEE_UNIT_SIZE / 2,
                        MELEE_UNIT_SIZE,
                        MELEE_UNIT_SIZE
                    );
                });
            }
        );

    }
}