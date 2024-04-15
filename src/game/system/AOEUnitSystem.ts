import { IGameAssets } from "../IGameAssets";
import { IGameLogic } from "../IGameLogic";
import { IAOEUnit } from "../entity/IAOEUnit";
import { IUnit, UNIT_ENTITY_TYPES } from "../entity/IUnit";
import { IWave } from "../entity/IWave";
import { WORLD_SIZE, WORLD_UNIT_BOX_SIZE } from "../utils/game-coordinates";
import { IGameSystem } from "./IGameSystem";

export const AOE_UNIT_TYPES = [
    "units.holy-knight"
];

export class AOEUnitSystem implements IGameSystem {

    init(gameLogic: IGameLogic, gameAssets: IGameAssets): void {

    }

    private moveAoeUnitWithWandering(unit: IAOEUnit, dt: number, wave: IWave): void {

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

    private attackWithAoeUnit(unit: IAOEUnit, dt: number, allUnits: Array<IUnit>, gameLogic: IGameLogic): void {

        unit.attackTimer += dt;

        if (unit.attackTimer >= unit.attackCooldown) {
            unit.attackTimer = 0;
            const enemyUnitsInRange = allUnits.filter(
                otherUnit => {
                    if (otherUnit.owner === unit.owner) {
                        return false;
                    }
                    const diff = {
                        x: otherUnit.position.x - unit.position.x,
                        y: otherUnit.position.y - unit.position.y
                    };
                    const diffLength = Math.sqrt(
                        diff.x * diff.x +
                        diff.y * diff.y
                    );
                    return diffLength <= unit.attackRange;
                }
            );
            enemyUnitsInRange.forEach(
                enemyUnit => {
                    const damage = Math.max(1, unit.ap - enemyUnit.dp);
                    enemyUnit.hp -= damage;
                    gameLogic.trigger(
                        'unit.attacked',
                        {
                            unit,
                            target: enemyUnit,
                        }
                    );
                }
            );
            gameLogic.trigger(
                'world.aoe-splash',
                { position: { x: unit.position.x, y: unit.position.y }, radius: unit.attackRange }
            );
        }

    }

    private clampAoeUnitVelocity(unit: IAOEUnit): void {
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

        const aoeUnits = gameLogic.getEntities<IAOEUnit>(AOE_UNIT_TYPES);
        const wave = gameLogic.getEntities<IWave>('wave')[0];
        const allUnits = gameLogic.getEntities<IUnit>(UNIT_ENTITY_TYPES);

        aoeUnits.forEach(unit => {

            if (unit.dead) {
                return;
            }

            this.moveAoeUnitWithWandering(unit, dt, wave);
            this.attackWithAoeUnit(unit, dt, allUnits, gameLogic);
            this.clampAoeUnitVelocity(unit);

        });

    }
    render(dt: number, gameLogic: IGameLogic): void {

    }

}