import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { PLAYER_ENTITY_TYPE, createPlayer } from "../entity/IPlayer";
import { IGameSystem } from "./IGameSystem";

export class PlayerInitSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.spawnEntity(
            PLAYER_ENTITY_TYPE,
            createPlayer()
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }
}