import './winnerCar.style.css';
import { WinnerWithNameAndColor } from '../../types';
import { getCarIcon } from '../../utils/car';

export class WinnerCar {
    public render(car: WinnerWithNameAndColor, number: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.className = 'winners__cars';
        div.innerHTML = `
            <div>${number}</div>
            <div class="winners__svg">${getCarIcon(car.color)}</div>
            <div>${car.name}</div>
            <div>${car.wins}</div>
            <div>${car.time}</div>`;
        return div;
    }
}