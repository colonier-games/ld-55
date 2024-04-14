import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer, PLAYER_BUILDING_TYPES, PLAYER_BUILDING_TYPE_CHARACTERISTICS } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

/** Responsible for simulating the production of the player's buildings, earning money over time. */
export class PlayerBuildingsSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {

        const player = gameLogic.getEntities('player')[0] as IPlayer;

        let totalReward = 0;

        for (let buildingType of PLAYER_BUILDING_TYPES) {
            const buildingCount = player.buildings[buildingType];
            const buildingCharacteristics = PLAYER_BUILDING_TYPE_CHARACTERISTICS[buildingType];
            if (buildingCount > 0) {
                player.productionTimers[buildingType] += dt;
                if (player.productionTimers[buildingType] >= buildingCharacteristics.productionTime) {
                    player.productionTimers[buildingType] = 0;
                    totalReward += buildingCharacteristics.reward * buildingCount;
                }
            }
        }

        if (totalReward > 0) {
            gameLogic.trigger('player.money.earned', totalReward);
        }

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}