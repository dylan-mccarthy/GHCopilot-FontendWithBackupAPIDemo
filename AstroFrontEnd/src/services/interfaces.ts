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
