import './garage.style.css';
import { carsNames } from '../../assests/data/data';
import { CarInRow } from '../../components/car/car.view';
import { Car, CarsEngine } from '../../types';
import { getRandom } from '../../utils/math';

export class Garage {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public render(cars: Car[], count: number, page: number): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        const garage = <HTMLDivElement>document.createElement('div');
        div.className = 'garage__page';
        garage.className = 'garage';

        const control = this.getControl();
        div.appendChild(control);

        const title = this.getTitle(count, page);
        div.appendChild(title);

        div.appendChild(garage);

        const pagination = this.getPagination();
        div.appendChild(pagination);

        const winner = this.getWinner();
        div.appendChild(winner);

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
        const countSpan = <HTMLSpanElement>document.querySelector('.garage__title__count');
        const pageSpan = <HTMLSpanElement>document.querySelector('.garage__title__page');
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
        <button class="race">RACE</button>
        <button class="reset">RESET</button>
        <button class="generate__cars">GENERATE CARS</button>
    </div>`;

        return div;
    }

    private getTitle(count: number, page: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <h3>Garage <span class="garage__title__count">${count}</span></h3>
      <span>Page #<span class="garage__title__page">${page}</span></span>`;
        return div;
    }

    private getPagination(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <button class="garage__prev">PREV</button>
      <button class="garage__next">NEXT</button>`;
        return div;
    }

    private getWinner(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.className = 'garage__winner';
        return div;
    }

    private setWinner(car: CarsEngine): void {
        const winner = <HTMLButtonElement>document.querySelector('.garage__winner');
        winner.innerHTML = `${car.name} wont first [${car.time}s]!`;
    }

    private getCarId(button: HTMLButtonElement): number {
        const car = <HTMLDivElement>button.closest('.car__in__garage');
        const id = Number(car.getAttribute('data-id'));
        return id;
    }

    private async moveCar(id: number, handlerStart: Function, getter: Function): Promise<void> {
        const move = await handlerStart(id);
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
                await this.moveCar(id, handlerStart, getter);
                handlerDrive(id);
                button.disabled = true;
            }
        });
    }

    public bindStopCar(handler: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.addEventListener('click', async (event) => {
            const buttonStop = event.target as HTMLButtonElement;
            if (buttonStop.className === 'stop__car') {
                const id = this.getCarId(buttonStop);
                await handler(id);
                this.stopCar(id);
                const buttonStart = <HTMLButtonElement>buttonStop.previousElementSibling;
                buttonStart.disabled = false;
            }
        });
    }

    public bindStartAllCars(
        getterCars: Function,
        handlerStart: Function,
        handlerDrive: Function,
        getterState: Function,
        handlerWinner: Function,
    ): void {
        const race = <HTMLButtonElement>document.querySelector('.race');
        race.addEventListener('click', async () => {
            const cars: Car[] = await getterCars();
            const promiseStart = cars.map((element) => this.moveCar(element.id, handlerStart, getterState));
            await Promise.allSettled(promiseStart);
            const promiseDrive = cars.map((element) => handlerDrive(element.id));
            race.disabled = true;
            const reset = <HTMLButtonElement>document.querySelector('.reset');
            reset.disabled = true;
            const buttons = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.start__car');
            buttons.forEach((button) => (button.disabled = true));
            Promise.any(promiseDrive).then((winner) => {
                this.setWinner(winner);
                handlerWinner({id: winner.id, wins: 1, time: winner.time})})
                .catch(() => console.log('Все машины сломались'));
            await Promise.allSettled(promiseDrive);
            reset.disabled = false;
        });
    }

    public bindReset(getter: Function): void {
        const reset = <HTMLButtonElement>document.querySelector('.reset');
        reset.addEventListener('click', async () => {
            const cars: Car[] = await getter();
            cars.forEach((element) => this.stopCar(element.id));
            const winner = <HTMLButtonElement>document.querySelector('.garage__winner');
            winner.innerHTML = '';
            const race = <HTMLButtonElement>document.querySelector('.race');
            race.disabled = false;
            const buttons = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.start__car');
            buttons.forEach((button) => (button.disabled = false));
        });
    }

    public clear(): void {
        const garage = <HTMLDivElement>document.querySelector('.garage');
        garage.innerHTML = '';
    }

    public clearPage(): void {
        const page = <HTMLDivElement>document.querySelector('.garage__page');
        page.remove();
    }
}
