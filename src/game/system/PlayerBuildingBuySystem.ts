import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer, PLAYER_BUILDING_TYPE_CHARACTERISTICS } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

/** Responsible for executing the building buy requests of the player (signalled by the player.building.buy event). */
export class PlayerBuildingBuySystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        gameLogic.addEventListener(
            'player.building.buy',
            (buildingType: string) => {
                const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
                const cost = PLAYER_BUILDING_TYPE_CHARACTERISTICS[buildingType].cost;

                if (playerEntity.money >= cost) {
                    playerEntity.buildings[buildingType]++;
                    playerEntity.money -= cost;
                }
            }
        );

    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}