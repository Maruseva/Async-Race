import "./car.style.css";
import carImg from "../../assests/img/car.svg";
import flagImg from "../../assests/img/flag.png";

export class Car {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public render(name?: string, color?: string): void {
        const wrap = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div>
            <div>
                <button>SELECT</button>
                <button>REMOVE</button>
                <span></span>
            </div>
            <div class="car__item">
                <button>A</button>
                <button>B</button>
                <span></span>
                <img src="${carImg}" alt="car" class="car__carImg">
                <img src="${flagImg}" alt="flag" class="car__flagImg">
            </div>
        </div>`;
        wrap.appendChild(div);
    }
}