import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export class UnitKillingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);
        allUnits.forEach(unit => {
            if (unit.hp <= 0) {
                unit.dead = true;
                gameLogic.trigger(
                    'unit.killed',
                    { unit }
                );
            }
        });
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}