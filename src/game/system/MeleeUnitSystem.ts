import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IMeleeUnit } from "../entity/IMeleeUnit";
import { IUnit, UNIT_ENTITY_TYPES, UNIT_OWNER_AI, UnitType } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { expImpulse } from "../utils/game-animation";
import { WORLD_SIZE, WORLD_UNIT_BOX_SIZE, worldToCanvas } from "../utils/game-coordinates";
import { lerpIn } from "../utils/lerp";
import { IGameSystem } from "./IGameSystem";

const MELEE_UNIT_SIZE = 40;

export const MELEE_UNIT_TYPES: Array<UnitType> = [
    "units.hound",
    "units.peasant",
    "units.skeleton",
    "units.knight"
]

/** Responsible for the targeting, movement and attacking of meleeUnit-type meelee units. */
export class MeleeUnitSystem implements IGameSystem {

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {
    }

    private findMeleeUnitTarget(
        unit: IMeleeUnit,
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

    private moveMeleeUnitTowardsTarget(
        unit: IMeleeUnit,
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

        if (targetAccelerationLength < unit.arriveRange) {
            lerpIn(
                unit.velocity,
                unit.velocity,
                { x: 0, y: 0 },
                unit.arriveFactor
            );
        } else {

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

        }

        if (unit.attackTimer - unit.attackAnimationStartTime > 0) {
            const attackAnimationAlpha = Math.sin(
                Math.PI * ((unit.attackTimer - unit.attackAnimationStartTime) / (unit.attackCooldown - unit.attackAnimationStartTime))
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

    private attackMeleeUnitTarget(
        unit: IMeleeUnit,
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

        if (unitToTargetLength < unit.attackRange) {
            unit.attackTimer += dt;
            if (unit.attackTimer >= unit.attackCooldown) {
                unit.attackTimer = 0;
                const damage = Math.max(1, unit.ap - unit.target.dp);
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

    private moveMeleeUnitWithWandering(
        unit: IMeleeUnit,
        dt: number,
        wave: IWave
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

        if (!wave.active) {
            const centerDiff = {
                x: unit.position.x - WORLD_SIZE / 2,
                y: unit.position.y - WORLD_SIZE / 2
            };
            const centerDiffLength = Math.sqrt(
                centerDiff.x * centerDiff.x +
                centerDiff.y * centerDiff.y
            );
            if (centerDiffLength > WORLD_UNIT_BOX_SIZE) {
                const unitToCenter = {
                    x: centerDiff.x * -1,
                    y: centerDiff.y * -1
                };
                const unitToCenterLength = Math.sqrt(
                    unitToCenter.x * unitToCenter.x +
                    unitToCenter.y * unitToCenter.y
                );
                unitToCenter.x /= unitToCenterLength;
                unitToCenter.y /= unitToCenterLength;
                unit.velocity.x += unitToCenter.x * unit.baseAcceleration * unit.sp * dt;
                unit.velocity.y += unitToCenter.y * unit.baseAcceleration * unit.sp * dt;
            }
        }

    }

    private clampMeleeUnitVelocity(unit: IMeleeUnit): void {
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

        const meleeUnits = gameLogic.getEntities<IMeleeUnit>(MELEE_UNIT_TYPES);
        const wave = gameLogic.getEntities<IWave>('wave')[0];
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);

        meleeUnits.forEach(unit => {

            if (unit.dead) {
                return;
            }

            if (unit.target && unit.target.dead) {
                unit.target = null;
            }

            if (!unit.target || unit.target === null) {
                unit.attackTimer = 0;
                this.findMeleeUnitTarget(unit, allUnits);
            }

            if (unit.target) {
                this.moveMeleeUnitTowardsTarget(unit, dt);
                this.attackMeleeUnitTarget(unit, dt, gameLogic);
            } else {
                this.moveMeleeUnitWithWandering(unit, dt, wave);
            }

            this.clampMeleeUnitVelocity(unit);

        });

    }

    render(dt: number, gameLogic: IGameLogic): void {

    }
}