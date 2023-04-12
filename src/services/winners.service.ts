import { countWinners } from "../constants";
import { CarWinner } from "../types";

export class WinnersService {
    public async getWinners(page: number, sort: string, order: string) {
        const response = await fetch(`http://127.0.0.1:3000/winners/?_page=${page}&_limit=${countWinners}&_sort=${sort}&_limit=${order}`, {
            method: 'GET',
        });
        const winners = await response.json();
        const count = Number(response.headers.get('X-Total-Count'));
        const value = { winners, count };
        return value;
    }

    public async addCar(car: CarWinner): Promise<CarWinner> {
        const response = await fetch('http://127.0.0.1:3000/winners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        return response.json();
    }
}