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

export type WinnerWithoudId = Pick<CarWinner, 'wins' | 'time'>;

export enum Pages {
    Garage = 'garage',
    Winners = 'winners'
}

export enum WinnersSort {
    Id = 'id',
    Wins = 'wins',
    Time = 'time'
}

export enum WinnersOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}
