export interface Car {
    name: string;
    color: string;
    id: number;
  }

  export type CarWithoudId = Omit<Car, "id">;

  export interface CarsPage {
    cars: Car[];
    count: number
  }
