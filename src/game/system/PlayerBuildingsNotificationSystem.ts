import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer, PLAYER_BUILDING_TYPE_CHARACTERISTICS, PlayerBuildingInfo } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

export class PlayerBuildingsNotificationSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {

        const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;

        const buildingInfos: Array<PlayerBuildingInfo> = [];

        for (const buildingType in playerEntity.buildings) {
            buildingInfos.push({
                buildingType: {
                    name: buildingType,
                    characteristics: PLAYER_BUILDING_TYPE_CHARACTERISTICS[buildingType]
                },
                buildingCount: playerEntity.buildings[buildingType]
            });
        }

        gameLogic.trigger('player.building.changed', buildingInfos);

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}