import { IEntity, newEntityId } from "./IEntity";

export const WAVE_PER_LEVEL = 8;
export const WAVE_COOLDOWN = 10;

export interface IWave extends IEntity {
    waveNumber: number;
    totalWaves: number;
    waveTimer: number;
    waveCooldown: number;
    active: boolean;
    spawned: boolean;
    levelNumber: number;
}

export function createWave(): IWave {
    return {
        id: newEntityId(),
        dead: false,
        position: { x: 0, y: 0 },
        waveNumber: 1,
        totalWaves: WAVE_PER_LEVEL,
        waveCooldown: WAVE_COOLDOWN,
        waveTimer: 0,
        active: false,
        spawned: false,
        levelNumber: 1
    }
}
