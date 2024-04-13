import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IHoundUnit, UNIT_HOUND_ATTACK_ANIMATION_START, UNIT_HOUND_ATTACK_RANGE } from "../entity/IHoundUnit";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_AI } from "../entity/IUnit";
import { expImpulse } from "../utils/game-animation";
import { worldToCanvas } from "../utils/game-coordinates";
import { lerpIn } from "../utils/lerp";
import { IGameSystem } from "./IGameSystem";

const HOUND_UNIT_SIZE = 40;

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

    private moveHoundTowardsTarget(
        unit: IHoundUnit,
        dt: number
    ): void {
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

        if (unit.attackTimer - UNIT_HOUND_ATTACK_ANIMATION_START > 0) {
            const attackAnimationAlpha = Math.sin(
                Math.PI * ((unit.attackTimer - UNIT_HOUND_ATTACK_ANIMATION_START) / (unit.attackCooldown - UNIT_HOUND_ATTACK_ANIMATION_START))
            );
            unit.kinematic = true;
            lerpIn(
                unit.position,
                unit.attackFromPosition,
                unit.target.position,
                attackAnimationAlpha
            );
        } else {
            unit.kinematic = false;
            unit.attackFromPosition.x = unit.position.x;
            unit.attackFromPosition.y = unit.position.y;
        }

    }

    private attackHoundTarget(
        unit: IHoundUnit,
        dt: number,
        gameLogic: IGameLogic
    ) {

        const unitToTarget = {
            x: unit.target.position.x - unit.position.x,
            y: unit.target.position.y - unit.position.y
        };
        const unitToTargetLength = Math.sqrt(
            unitToTarget.x * unitToTarget.x +
            unitToTarget.y * unitToTarget.y
        );

        if (unitToTargetLength < UNIT_HOUND_ATTACK_RANGE) {
            unit.attackTimer += dt;
            if (unit.attackTimer >= unit.attackCooldown) {
                unit.attackTimer = 0;
                const damage = Math.max(0, unit.ap - unit.target.dp);
                unit.target.hp -= damage;
                gameLogic.trigger(
                    'unit.attacked',
                    {
                        unit,
                        target: unit.target,
                    }
                );
            }
        } else {
            unit.attackTimer = 0;
        }

    }

    private moveHoundWithWandering(
        unit: IHoundUnit,
        dt: number
    ): void {

        unit.kinematic = false;

        const randomAcceleration = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
        };
        const randomAccelerationLength = Math.sqrt(
            randomAcceleration.x * randomAcceleration.x +
            randomAcceleration.y * randomAcceleration.y
        );
        randomAcceleration.x /= randomAccelerationLength;
        randomAcceleration.y /= randomAccelerationLength;

        unit.velocity.x += randomAcceleration.x * unit.baseAcceleration * 0.25 * unit.sp * dt;
        unit.velocity.y += randomAcceleration.y * unit.baseAcceleration * 0.25 * unit.sp * dt;

    }

    private clampHoundVelocity(unit: IHoundUnit): void {
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
    }

    tick(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);

        houndUnits.forEach(unit => {

            if (unit.dead) {
                return;
            }

            if (unit.target && unit.target.dead) {
                unit.target = null;
            }

            if (!unit.target || unit.target === null) {
                this.findHoundTarget(unit, allUnits);
            }

            if (unit.target) {
                this.moveHoundTowardsTarget(unit, dt);
                this.attackHoundTarget(unit, dt, gameLogic);
            } else {
                this.moveHoundWithWandering(unit, dt);
            }

            this.clampHoundVelocity(unit);

        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

        const houndUnits = gameLogic.getEntities<IHoundUnit>('units.hound');
        const g = gameLogic.context;

        houndUnits.forEach(unit => {

            if (unit.dead) {
                return;
            }

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