import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { WORLD_SIZE } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

/** Responsible for keeping all units within the bounds of the world. */
export class UnitArenaBoundsSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }

    tick(dt: number, gameLogic: IGameLogic): void {

        const allUnits = UNIT_ENTITY_TYPES.map(type => gameLogic.getEntities<IUnit>(type)).reduce(
            (acc, val) => acc.concat(val),
            []
        );

        allUnits.forEach(unit => {
            if (unit.position.x < 0) {
                unit.position.x = 0;
                unit.velocity.x = -unit.velocity.x;
            }
            if (unit.position.x > WORLD_SIZE) {
                unit.position.x = WORLD_SIZE;
                unit.velocity.x = -unit.velocity.x;
            }

            if (unit.position.y < 0) {
                unit.position.y = 0;
                unit.velocity.y = -unit.velocity.y;
            }
            if (unit.position.y > WORLD_SIZE) {
                unit.position.y = WORLD_SIZE;
                unit.velocity.y = -unit.velocity.y;
            }
        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}