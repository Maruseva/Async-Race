export interface Car {
    name: string;
    color: string;
    id: number;
}

export type CarWithoudId = Omit<Car, 'id'>;

export interface CarWinner extends Car {
    wins: number;
    time: number;
}

export interface CarsPage {
    cars: Car[];
    count: number;
}

export interface CarMove {
    velocity: number;
    distance: number;
}

export interface CarsEngine {
    id: number;
    state: 'start' | 'stop' | 'break';
    name: string;
    time?: string;
}

export interface CarWinner {
    id: number;
    wins: number;
    time: number;
}
