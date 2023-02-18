import { Car } from "../pages/garage/garage.view";

export class GarageService {
    public async getCars(): Promise<Car[]> {
        const response = await fetch('http://127.0.0.1:3000/garage');
        return response.json();
    }
}