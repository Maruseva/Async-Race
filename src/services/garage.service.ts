import { baseUrl, countCars } from '../constants';
import { EngineError } from '../error/engineError';
import { Car, CarWithoudId, CarsPage, CarMove } from '../types';

export class GarageService {
    public async getCars(page: number = 1): Promise<CarsPage> {
        const response = await fetch(`${baseUrl}/garage/?_page=${page}&_limit=${countCars}`, {
            method: 'GET',
        });
        const cars = await response.json();
        const count = Number(response.headers.get('X-Total-Count'));
        const value = { cars, count };
        return value;
    }

    public async addCar(car: CarWithoudId): Promise<Car> {
        const response = await fetch(`${baseUrl}/garage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        return response.json();
    }

    public async deleteCar(id: number): Promise<{}> {
        const response = await fetch(`${baseUrl}/garage/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }

    public async getCar(id: number): Promise<Car> {
        const response = await fetch(`${baseUrl}/garage/${id}`, {
            method: 'GET',
        });
        return response.json();
    }

    public async updateCar(id: number, car: CarWithoudId): Promise<Car> {
        const response = await fetch(`${baseUrl}/garage/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        return response.json();
    }

    public async startCar(id: number): Promise<CarMove> {
        const response = await fetch(`${baseUrl}/engine/?id=${id}&status=started`, {
            method: 'PATCH',
        });
        return response.json();
    }

    public async stopCar(id: number): Promise<CarMove> {
        const response = await fetch(`${baseUrl}/engine/?id=${id}&status=stopped`, {
            method: 'PATCH',
        });
        return response.json();
    }

    public async driveCar(
        id: number
    ): Promise<{
        success: true;
    }> {
        const response = await fetch(`${baseUrl}/engine/?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        if (response.status === 400 || response.status === 404 || response.status === 429 || response.status === 500) {
            throw new EngineError(`${response.statusText} ${response.url}`);
        }
        return response.json();
    }
}
