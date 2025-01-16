export interface Planet {
    id: number;
    name: string;
    type: string;
    distanceFromSun: number;
    hasRings: boolean;
}

export interface Moon {
    id: number;
    name: string;
    planetId: number;
    diameter: number;
    distanceFromPlanet: number;
}
