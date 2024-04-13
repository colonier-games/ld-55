import { IEntity, newEntityId } from "./IEntity";

export const PLAYER_ENTITY_TYPE = 'player';
export const PLAYER_BUILDING_TYPES = [
    'building.servants',
    'building.sacrificial-altar',
    'building.small-temple',
    'building.medium-temple',
    'building.church',
    'building.cathedral-of-hell'
];
export type PlayerBuildingType = typeof PLAYER_BUILDING_TYPES[number];
export interface BuildingTypeCharacteristics {
    reward: number;
    productionTime: number;
    cost: number;
}
export const PLAYER_BUILDING_TYPE_CHARACTERISTICS: Record<PlayerBuildingType, BuildingTypeCharacteristics> = {
    "building.servants": {
        cost: 10,
        reward: 1,
        productionTime: 1
    },
    "building.sacrificial-altar": {
        cost: 100,
        reward: 10,
        productionTime: 5
    },
    "building.small-temple": {
        cost: 1000,
        reward: 100,
        productionTime: 10
    },
    "building.medium-temple": {
        cost: 10000,
        reward: 1000,
        productionTime: 20
    },
    "building.church": {
        cost: 100000,
        reward: 10000,
        productionTime: 30
    },
    "building.cathedral-of-hell": {
        cost: 1000000,
        reward: 100000,
        productionTime: 40
    }
};

export interface PlayerBuildingInfo {
    buildingType: {
        name: string;
        characteristics: BuildingTypeCharacteristics;
    }
    buildingCount: number;
}

export interface IPlayer extends IEntity {
    money: number;
    buildings: Record<PlayerBuildingType, number>;
    productionTimers: Record<PlayerBuildingType, number>;
}

export function createPlayer(): IPlayer {
    return {
        id: newEntityId(),
        position: { x: 0, y: 0 },
        dead: false,
        money: 0,
        buildings: PLAYER_BUILDING_TYPES.reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<PlayerBuildingType, number>),
        productionTimers: PLAYER_BUILDING_TYPES.reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<PlayerBuildingType, number>)
    };
}
