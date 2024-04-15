import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { AOE_SPLASH_RADIUS_PER_SEC, IAOESplash, createAOESplash } from "../level/IAOESplash";
import { worldSizeToCanvas, worldToCanvas } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export class AOESplashSystem implements IGameSystem {
    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        gameLogic.addEventListener(
            "world.aoe-splash",
            (props: {
                position: { x: number, y: number }
                radius: number
            }) => {
                gameLogic.spawnEntity<IAOESplash>('aoe-splash', createAOESplash({
                    position: props.position,
                    maxRadius: props.radius
                }));
            }
        );
    }
    tick(dt: number, gameLogic: IGameLogic): void {
        const splashEntities = gameLogic.getEntities<IAOESplash>('aoe-splash');

        splashEntities.forEach(splash => {
            splash.radius += dt * AOE_SPLASH_RADIUS_PER_SEC;
            if (splash.radius >= splash.maxRadius) {
                splash.dead = true;
            }
        });
    }
    render(dt: number, gameLogic: IGameLogic): void {
        const g = gameLogic.context;

        const splashEntities = gameLogic.getEntities<IAOESplash>('aoe-splash');

        splashEntities.forEach(splash => {
            const pos = worldToCanvas(
                splash.position,
                gameLogic.canvasSize
            );
            console.log(splash);
            g.strokeStyle = "#ff0000";
            g.lineWidth = 2;
            g.beginPath();
            g.arc(
                pos.x,
                pos.y,
                worldSizeToCanvas(splash.radius, gameLogic.canvasSize),
                0,
                Math.PI * 2
            );
            g.stroke();
        });
    }
}