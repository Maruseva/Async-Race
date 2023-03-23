import { CarInRow } from "../../components/car/car.view";
import { GarageController } from "./garage.controller";

export interface Car {
  name: string;
  color: string;
  id: number;
}

export class Garage {
  private readonly selector: string;
  constructor(selector: string) {
    this.selector = selector;
  }

  public render(cars: Car[]): void {
    const root = <HTMLDivElement>document.querySelector(this.selector);
    const div = <HTMLDivElement>document.createElement("div");
    const garage = <HTMLDivElement>document.createElement("div");
    garage.className = 'garage';

    const control = this.getControl();
    div.appendChild(control);

    const title = this.getTitle();
    div.appendChild(title);

    div.appendChild(garage);

    const pagination = this.getPagination();
    div.appendChild(pagination);

    root.appendChild(div);
    this.renderCars(cars);
  }

  public renderCars(cars: Car[]): void {
    const garage = <HTMLDivElement>document.querySelector(".garage");
    cars.forEach((element) => {
      const carInRow = CarInRow.render(element);
      garage.appendChild(carInRow);
    });

  }

  private getControl(): Element {
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `<div class="create">
        <input type="text">
        <input type="color">
        <button>CREATE</button>
    </div>
    <div>
        <input type="text">
        <input type="color">
        <button>UPDATE</button>
    </div>
    <div>
        <button>RACE</button>
        <button>RESET</button>
        <button>GENERATE CARS</button>
    </div>`;

    return div;
  }

  private getTitle(): Element {
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `
      <h3>Garage</h3>
      <span>Page #</span>`;
    return div;
  }

  private getPagination(): Element {
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `
      <button>PREV</button>
      <button>NEXT</button>`;
    return div;
  }

  public bindAddCar(handler: Function): void {
    const button = <HTMLButtonElement>(
      document.querySelector(".create > button")
    );
    button.addEventListener("click", () => {
      const text = <HTMLInputElement>(
        document.querySelector('.create > input[type="text"]')
      );
      if (text.value) {
        const color = <HTMLInputElement>(
          document.querySelector('.create > input[type="color"]')
        );
        const param = { name: text.value, color: color.value };
        handler(param);
        text.value = '';
        color.value ='#000000'
      }
    });
  }

  public bindDeleteCar(handler: Function): void {
    const garage = <HTMLDivElement>document.querySelector(".garage");
    garage.addEventListener("click", (event) => {
      const button = event.target as HTMLButtonElement;
      if(button.className === 'remove__car'){
        const car = <HTMLDivElement>button.closest('.car__in__garage');
        const id = car.getAttribute('data-id');
        handler(id);
      }
    });
  }

  public clear(): void {
    const garage = <HTMLDivElement>document.querySelector(".garage");
    garage.innerHTML = '';
  }
}
