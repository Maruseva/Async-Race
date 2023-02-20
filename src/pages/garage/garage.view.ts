import { CarInRow } from "../../components/car/car.view";

export interface Car {
  name: string,
  color: string,
  id: number
}

export class Garage {
  private readonly selector: string;
  constructor(selector: string) {
    this.selector = selector;
  }

  public render(cars: Car[]): void {
    const root = <HTMLDivElement>document.querySelector(this.selector);
    const div = <HTMLDivElement>document.createElement("div");

    const control = this.getControl();
    div.appendChild(control);

    const title = this.getTitle();
    div.appendChild(title);

    cars.forEach((element) => {
      const carInRow = CarInRow.render(element);
      div.appendChild(carInRow);
    })

    const pagination = this.getPagination();
    div.appendChild(pagination);
   
    root.appendChild(div);
  }
  private getControl(): Element {
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `<div>
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
}
