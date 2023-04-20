import './car.style.css';
import flagImg from '../../assests/img/flag.png';
import { Car } from '../../types';
import { getCarIcon } from '../../utils/car';

export class CarInRow {
    public static render(car: Car): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.className = 'car__in__garage';
        div.setAttribute('data-id', car.id.toString())
        div.innerHTML = `
            <div>
                <button class="select__car">SELECT</button>
                <button class="remove__car">REMOVE</button>
                <span>${car.name}</span>
            </div>
            <div class="car__item">
                <button class="start__car">A</button>
                <button class="stop__car">B</button>
                    ${getCarIcon(car.color)}
                <img src="${flagImg}" alt="flag" class="car__flagImg">
            </div>`;
        return div;
    }
}
