import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { worldToCanvas } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export const HEALTH_BAR_SIZE = 4;
export const HEALTH_BAR_SPACING = 2;
export const HEALTH_BAR_OFFSET = 42;

/** Renders health bars above units. */
export class UnitHealthBarSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);

        const g = gameLogic.context;

        allUnits.forEach(unit => {
            const {
                position,
                hp,
                maxHp
            } = unit;

            const canvasPosition = worldToCanvas(position, gameLogic.canvasSize);

            g.fillStyle = 'black';
            g.fillRect(
                canvasPosition.x - HEALTH_BAR_SIZE * maxHp / 2 - HEALTH_BAR_SPACING,
                canvasPosition.y - HEALTH_BAR_OFFSET - HEALTH_BAR_SPACING,
                HEALTH_BAR_SIZE * maxHp + HEALTH_BAR_SPACING * maxHp,
                HEALTH_BAR_SIZE + HEALTH_BAR_SPACING * 2
            );

            for (let i = 1; i <= maxHp; i++) {
                if (i <= hp) {
                    g.fillStyle = '#33ee66';
                } else {
                    g.fillStyle = '#333333';
                }
                g.fillRect(
                    canvasPosition.x - HEALTH_BAR_SIZE * maxHp / 2 + (i - 1) * (HEALTH_BAR_SIZE + HEALTH_BAR_SPACING),
                    canvasPosition.y - HEALTH_BAR_OFFSET,
                    HEALTH_BAR_SIZE,
                    HEALTH_BAR_SIZE
                );
            }

        });

    }
}