import { IEntity, newEntityId } from "./IEntity";
import { UNIT_TYPE_CHARACTERISTICS } from "./IUnit";

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
    imageUrl: string;
    displayName: string;
}
export const PLAYER_BUILDING_TYPE_CHARACTERISTICS: Record<PlayerBuildingType, BuildingTypeCharacteristics> = {
    "building.servants": {
        cost: 10,
        reward: 1,
        productionTime: 1,
        imageUrl: 'assets/buildings/servants.png',
        displayName: 'Servants'
    },
    "building.sacrificial-altar": {
        cost: 100,
        reward: 10,
        productionTime: 5,
        imageUrl: 'assets/buildings/sacrificial-altar.png',
        displayName: 'Sacrificial Altar'
    },
    "building.small-temple": {
        cost: 1000,
        reward: 100,
        productionTime: 10,
        imageUrl: 'assets/buildings/small-temple.png',
        displayName: 'Small Temple'
    },
    "building.medium-temple": {
        cost: 10000,
        reward: 1000,
        productionTime: 20,
        imageUrl: 'assets/buildings/medium-temple.png',
        displayName: 'Medium Temple'
    },
    "building.church": {
        cost: 100000,
        reward: 10000,
        productionTime: 30,
        imageUrl: 'assets/buildings/church.png',
        displayName: 'Church'
    },
    "building.cathedral-of-hell": {
        cost: 1000000,
        reward: 100000,
        productionTime: 40,
        imageUrl: 'assets/buildings/cathedral-of-hell.png',
        displayName: 'Cathedral of Hell'
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
    holdLevel: number;
    buildingUpgradeLevels: Record<PlayerBuildingType, number>;
    unitUpgradeLevels: Record<string, number>;
    healCount: number;
    buildingBuyCount: number;
    unitSummonCount: number;
    summonCountsPerUnitType: Record<string, number>;
    unitTypeCosts: Record<string, number>;
}

export const PLAYER_HOLD_BASE_TIME = 0.5;
export const PLAYER_HOLD_TIME_REDUCTION_PER_LEVEL = 0.05;

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
        }, {} as Record<PlayerBuildingType, number>),
        holdLevel: 0,
        buildingUpgradeLevels: PLAYER_BUILDING_TYPES.reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<PlayerBuildingType, number>),
        unitUpgradeLevels: Object.keys(UNIT_TYPE_CHARACTERISTICS).reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<string, number>),
        healCount: 0,
        buildingBuyCount: 0,
        unitSummonCount: 0,
        summonCountsPerUnitType: Object.keys(UNIT_TYPE_CHARACTERISTICS).reduce((acc, type) => {
            acc[type] = 0;
            return acc;
        }, {} as Record<string, number>),
        unitTypeCosts: Object.keys(UNIT_TYPE_CHARACTERISTICS).reduce((acc, type) => {
            acc[type] = UNIT_TYPE_CHARACTERISTICS[type].cost;
            return acc;
        }, {} as Record<string, number>)
    };
}
