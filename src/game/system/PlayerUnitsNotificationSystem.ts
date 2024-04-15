import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export class PlayerUnitsNotificationSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {

        const eventData = {};
        UNIT_ENTITY_TYPES.forEach(
            unitType => {
                const units = gameLogic.getEntities<IUnit>(unitType);
                const playerUnits = units.filter(unit => unit.owner === UNIT_OWNER_PLAYER && !unit.dead);
                if (playerUnits.length > 0) {
                    eventData[unitType] = playerUnits.length;
                }
            }
        );
        gameLogic.trigger(
            "player.units.changed",
            eventData
        );

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}