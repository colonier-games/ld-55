import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

export class PlayerMoneyNotificationSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }
    tick(dt: number, gameLogic: IGameLogic): void {
        const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;

        gameLogic.trigger(
            'player.money.changed',
            playerEntity.money
        );
    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}