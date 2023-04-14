import './winnerCar.style.css';
import { CarWinner } from '../../types';
import { getCarIcon } from '../../utils/car';

export class WinnerCar {
    public render(car: CarWinner, number: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div class="winners__cars">
            <div>${number}</div>
            <div class="winners__svg">${getCarIcon(car.color)}</div>
            <div>${car.name}</div>
            <div>${car.wins}</div>
            <div>${car.time}</div>
        </div>`;
        return div;
    }
}