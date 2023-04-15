import { countWinners } from "../constants";
import { DuplicateError } from "../error/duplicateError";
import { CarWinner, WinnerWithoudId } from "../types";

export class WinnersService {
    public async getWinners(page: number, sort: string, order: string): Promise<{count: number, winners: CarWinner[]}> {
        const response = await fetch(`http://127.0.0.1:3000/winners/?_page=${page}&_limit=${countWinners}&_sort=${sort}&_limit=${order}`, {
            method: 'GET',
        });
        const winners = await response.json();
        const count = Number(response.headers.get('X-Total-Count'));
        const value = { winners, count };
        return value;
    }

    public async addWinner(car: CarWinner): Promise<CarWinner> {
        const response = await fetch('http://127.0.0.1:3000/winners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        if (response.status === 500) {
            throw new DuplicateError(`${response.statusText} ${response.url}`);
        }
        return response.json();
    }

    public async updateWinner(id: number, car: WinnerWithoudId): Promise<CarWinner> {
        const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        return response.json();
    }

    public async getWinner(id: number): Promise<CarWinner> {
        const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'GET'
        });
        return response.json();
    }

    public async deleteWinner(id: number): Promise<{}> {
        const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
            method: 'DELETE'
        });
        return response;
    }
}
