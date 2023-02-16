import "./car.style.css";
import carImg from "../../assests/img/car.svg";
import flagImg from "../../assests/img/flag.png";
import { Car } from "../../pages/garage/garage.view";

export class CarInRow {
    public static render(car: Car): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div>
            <div>
                <button>SELECT</button>
                <button>REMOVE</button>
                <span>${car.name}</span>
            </div>
            <div class="car__item">
                <button>A</button>
                <button>B</button>
                <img src="${carImg}" alt="car" class="car__carImg">
                <img src="${flagImg}" alt="flag" class="car__flagImg">
            </div>
        </div>`;
        return div;
    }
}