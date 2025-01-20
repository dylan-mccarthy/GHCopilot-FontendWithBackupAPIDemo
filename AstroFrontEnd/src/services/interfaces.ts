export interface Planet {
    id: number;
    name: string;
    description: string;
    distanceFromSun: number;
}

export interface Moon {
    id: number;
    name: string;
    planetId: number;
    diameter: number;
    distanceFromPlanet: number;
}

export interface Asteroid {
    id: number;
    name: string;
    diameterInKm: number;
    isPotentiallyHazardous: boolean;
    composition: string;
}
