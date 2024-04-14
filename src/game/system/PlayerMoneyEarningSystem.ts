import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IPlayer } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

/** Responsible for updating the player's money when they earn some (signalled by the player.money.earned event). */
export class PlayerMoneyEarningSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

        gameLogic.addEventListener(
            'player.money.earned',
            (earnedMoney: number) => {
                const playerEntity = gameLogic.getEntities('player')[0] as IPlayer;
                playerEntity.money += earnedMoney;
            }
        );

    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}
