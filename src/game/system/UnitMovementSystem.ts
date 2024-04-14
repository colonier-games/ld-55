import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

/** Moves units based on their velocity. */
export class UnitMovementSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }

    tick(dt: number, gameLogic: IGameLogic): void {

        const allUnits = UNIT_ENTITY_TYPES.map(type => gameLogic.getEntities<IUnit>(type)).reduce(
            (acc, val) => acc.concat(val),
            []
        );

        allUnits.forEach(unit => {

            if (!unit.kinematic) {

                unit.position.x += unit.velocity.x * dt;
                unit.position.y += unit.velocity.y * dt;

            }

        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}