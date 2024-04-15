import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer } from "../entity/IPlayer";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_PLAYER } from "../entity/IUnit";
import { IGameSystem } from "./IGameSystem";

export const HEAL_BASE_COST_PER_HP = 5;
export const HEAL_ADD_COST_PER_HP_PER_HEAL = 1;

export class PlayerHealingSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        gameLogic.addEventListener(
            "player.heal",
            () => {
                const playerUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES)
                    .filter(u => u.owner === UNIT_OWNER_PLAYER);
                const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
                const totalMissingHp = playerUnits.reduce(
                    (sum, unit) => sum + (unit.maxHp - unit.hp),
                    0
                );
                const totalCost = totalMissingHp * (
                    HEAL_BASE_COST_PER_HP + HEAL_ADD_COST_PER_HP_PER_HEAL * playerEntity.healCount
                );
                if (playerEntity.money >= totalCost) {
                    playerEntity.money -= totalCost;
                    playerUnits.forEach(
                        unit => {
                            unit.hp = unit.maxHp;
                        }
                    );
                    playerEntity.healCount += 1;
                }
            }
        );

    }
    tick(dt: number, gameLogic: IGameLogic): void {

        const playerUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES)
            .filter(u => u.owner === UNIT_OWNER_PLAYER);
        const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
        const totalMissingHp = playerUnits.reduce(
            (sum, unit) => sum + (unit.maxHp - unit.hp),
            0
        );
        const totalCost = totalMissingHp * (
            HEAL_BASE_COST_PER_HP + HEAL_ADD_COST_PER_HP_PER_HEAL * playerEntity.healCount
        );

        gameLogic.trigger('player.heal.cost', totalCost);

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}