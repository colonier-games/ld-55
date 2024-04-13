import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit } from "../entity/IHoundUnit";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_AI } from "../entity/IUnit";
import { worldToCanvas } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

const HOUND_UNIT_SIZE = 32;

export class HoundUnitSystem implements IGameSystem {

    private _playerUnitImage: HTMLImageElement | null = null;
    private _aiUnitImage: HTMLImageElement | null = null;

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
        this._playerUnitImage = gameAssets.getGraphics('units.hound.green');
        this._aiUnitImage = gameAssets.getGraphics('units.hound.red');
    }

    private findHoundTarget(
        unit: IHoundUnit,
        allUnits: Array<IUnit>
    ): void {

        console.log('[HoundUnitSystem]', 'findHoundTarget', unit);

        // Check if allUnits even has any potential candidates
        if (allUnits.length === 0) {
            return;
        }
        if (!allUnits.some(u => u.owner !== unit.owner)) {
            return;
        }

        let foundTarget = false;

        while (!foundTarget) {
            const targetCandidate = allUnits[Math.floor(Math.random() * allUnits.length)];
            if (targetCandidate.id === unit.id) {
                continue;
            }
            if (targetCandidate.owner === unit.owner) {
                continue;
            }
            unit.target = targetCandidate;
            foundTarget = true;
        }

    }

    tick(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);

        houndUnits.forEach(unit => {

            if (!unit.target || unit.target === null) {
                this.findHoundTarget(unit, allUnits);
            }

            // Accelerate towards target
            const targetAcceleration = {
                x: unit.target.position.x - unit.position.x,
                y: unit.target.position.y - unit.position.y
            };
            const targetAccelerationLength = Math.sqrt(
                targetAcceleration.x * targetAcceleration.x +
                targetAcceleration.y * targetAcceleration.y
            );

            // Normalize
            if (targetAccelerationLength > 0) {
                targetAcceleration.x /= targetAccelerationLength;
                targetAcceleration.y /= targetAccelerationLength;
            }

            // Add a very little bit of random to acceleration
            targetAcceleration.x += 0.25 * (Math.random() - 0.5);
            targetAcceleration.y += 0.25 * (Math.random() - 0.5);

            // Accelerate
            unit.velocity.x += targetAcceleration.x * unit.baseAcceleration * unit.sp * dt;
            unit.velocity.y += targetAcceleration.y * unit.baseAcceleration * unit.sp * dt;

            // Clamp velocity
            const velocityLength = Math.sqrt(
                unit.velocity.x * unit.velocity.x +
                unit.velocity.y * unit.velocity.y
            );
            if (velocityLength > unit.baseSpeed * unit.sp) {
                unit.velocity.x /= velocityLength;
                unit.velocity.y /= velocityLength;

                unit.velocity.x *= unit.baseSpeed * unit.sp;
                unit.velocity.y *= unit.baseSpeed * unit.sp;
            }

        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');
        const g = gameLogic.context;

        houndUnits.forEach(unit => {
            const canvasPos = worldToCanvas(
                unit.position,
                gameLogic.canvasSize
            );

            g.drawImage(
                unit.owner === UNIT_OWNER_AI ? this._aiUnitImage as HTMLImageElement : this._playerUnitImage as HTMLImageElement,
                canvasPos.x - HOUND_UNIT_SIZE / 2,
                canvasPos.y - HOUND_UNIT_SIZE / 2,
                HOUND_UNIT_SIZE,
                HOUND_UNIT_SIZE
            );
        });

    }
}