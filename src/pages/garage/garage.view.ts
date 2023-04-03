import { carsNames } from '../../assests/data/data';
import { CarInRow } from '../../components/car/car.view';
import { Car, CarMove } from '../../types';
import { getRandom } from '../../utils/utils';

export class Garage {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public render(cars: Car[], count: number, page: number): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        const garage = <HTMLDivElement>document.createElement('div');
        garage.className = 'garage';

        const control = this.getControl();
        div.appendChild(control);

        const title = this.getTitle(count, page);
        div.appendChild(title);

        div.appendChild(garage);

        const pagination = this.getPagination();
        div.appendChild(pagination);

        root.appendChild(div);
        this.renderCars(cars);
    }

    public renderCars(cars: Car[]): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        cars.forEach((element) => {
            const carInRow = CarInRow.render(element);
            garage.appendChild(carInRow);
        });
    }

    public updateTitle(count: number, page: number): void {
        const countSpan = <HTMLSpanElement>document.querySelector('.garage__count');
        const pageSpan = <HTMLSpanElement>document.querySelector('.garage__page');
        countSpan.innerHTML = count.toString();
        pageSpan.innerHTML = page.toString();
    }

    private getControl(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div class="create">
        <input type="text">
        <input type="color">
        <button>CREATE</button>
    </div>
    <div class ="update">
        <input type="text">
        <input type="color">
        <button>UPDATE</button>
    </div>
    <div>
        <button>RACE</button>
        <button>RESET</button>
        <button class="generate__cars">GENERATE CARS</button>
    </div>`;

        return div;
    }

    private getTitle(count: number, page: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <h3>Garage <span class="garage__count">${count}</span></h3>
      <span>Page #<span class="garage__page">${page}</span></span>`;
        return div;
    }

    private getPagination(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <button class="garage__prev">PREV</button>
      <button class="garage__next">NEXT</button>`;
        return div;
    }

    private getCarId(button: HTMLButtonElement): number {
        const car = <HTMLDivElement>button.closest('.car__in__garage');
        const id = Number(car.getAttribute('data-id'));
        return id;
    }

    private moveCar(id: number, move: CarMove, getter: Function): void {
        const indentRight = 120;
        const k = 1000 / 60; //* 1000ms / car flashes 60 times per second *//
        const divCar = <HTMLDivElement>document.querySelector(`div[data-id="${id}"]`);
        const car = <SVGElement>divCar.querySelector('svg');
        let leftX = car.getBoundingClientRect().left + window.scrollX;
        const distance = window.innerWidth - leftX - indentRight;
        const speed = (distance / (move.distance / move.velocity)) * k;
        function animation(): void {
            const state = getter(id);
            if (state === 'start' && leftX < window.innerWidth - indentRight) {
                window.requestAnimationFrame(() => {
                    leftX = leftX + speed;
                    car.style.left = leftX.toString();
                    animation();
                });
            } else if (state === 'stop') {
                car.style.left = '';
            }
        }
        animation();
    }

    private stopCar(id: number): void {
        const divCar = <HTMLDivElement>document.querySelector(`div[data-id="${id}"]`);
        const car = <SVGElement>divCar.querySelector('svg');
        car.style.left = '';
    }

    private breakingCar(id: number): void {
        console.log(0)
        const divCar = <HTMLDivElement>document.querySelector(`div[data-id="${id}"]`);
        const car = <SVGElement>divCar.querySelector('svg');
        // const leftX = car.getBoundingClientRect().left + window.scrollX;
        // car.style.left = leftX.toString();
        car.style.left = '';
    }

    public bindAddCar(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.create > button');
        button.addEventListener('click', () => {
            const text = <HTMLInputElement>document.querySelector('.create > input[type="text"]');
            if (text.value) {
                const color = <HTMLInputElement>document.querySelector('.create > input[type="color"]');
                const param = { name: text.value, color: color.value };
                handler(param);
                text.value = '';
                color.value = '#000000';
            }
        });
    }

    public bindDeleteCar(handler: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.addEventListener('click', (event) => {
            const button = event.target as HTMLButtonElement;
            if (button.className === 'remove__car') {
                const id = this.getCarId(button);
                handler(id);
            }
        });
    }

    public bindGetCar(handler: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.addEventListener('click', async (event) => {
            const button = event.target as HTMLButtonElement;
            if (button.className === 'select__car') {
                const id = this.getCarId(button);
                const car = await handler(id);
                const div = <HTMLDivElement>document.querySelector('.update');
                const text = <HTMLInputElement>div.querySelector('input[type="text"]');
                const color = <HTMLInputElement>div.querySelector('input[type="color"]');
                div.setAttribute('data-id', id.toString());
                text.value = car.name;
                color.value = car.color;
            }
        });
    }

    public bindUpdateCar(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.update > button');
        button.addEventListener('click', () => {
            const text = <HTMLInputElement>document.querySelector('.update > input[type="text"]');
            if (text.value) {
                const div = <HTMLDivElement>document.querySelector('.update');
                const color = <HTMLInputElement>div.querySelector('input[type="color"]');
                const id = Number(div.getAttribute('data-id'));
                const param = { name: text.value, color: color.value };
                handler(id, param);
                text.value = '';
                color.value = '#000000';
            }
        });
    }

    public bindGenerateCars(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.generate__cars');
        button.addEventListener('click', () => {
            const param = [];
            const numberCars = 100;
            const numberColors = 999999;
            for (let i = 0; i < numberCars; i++) {
                const name = carsNames[getRandom(0, carsNames.length - 1)];
                const color = getRandom(0, numberColors);
                const car = { name: name, color: '#' + color };
                param.push(car);
            }
            handler(param);
        });
    }

    public bindSetPrevPage(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.garage__prev');
        button.addEventListener('click', () => {
            handler();
        });
    }

    public bindSetNextPage(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.garage__next');
        button.addEventListener('click', () => {
            handler();
        });
    }

    public bindStartCar(handlerStart: Function, handlerDrive: Function, getter: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.addEventListener('click', async (event) => {
            const button = event.target as HTMLButtonElement;
            if (button.className === 'start__car') {
                const id = this.getCarId(button);
                const move = await handlerStart(id);
                this.moveCar(id, move, getter);
                button.disabled = true;
                const breaking = await handlerDrive(id);
                if (breaking) {
                    this.breakingCar(id);}
            }
        });
    }

    public bindStopCar(handler: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.addEventListener('click', (event) => {
            const buttonStop = event.target as HTMLButtonElement;
            if (buttonStop.className === 'stop__car') {
                const id = this.getCarId(buttonStop);
                handler(id);
                this.stopCar(id);
                const buttonStart = <HTMLButtonElement>buttonStop.previousElementSibling;
                buttonStart.disabled = false;
            }
        });
    }

    public clear(): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.innerHTML = '';
    }
}
