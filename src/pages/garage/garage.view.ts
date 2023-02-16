import { Car } from "../../components/car/car.view";
import { Cars, GarageController } from "./garage.controller";

export class Garage {
  private readonly selector: string;
  private car: Car;
  private garageController: GarageController;
  constructor(selector: string) {
    this.selector = selector;
    this.car = new Car("#garage__cars");
    this.garageController = new GarageController();
  }

  public async render(): Promise<void> {
    const root = <HTMLDivElement>document.querySelector(this.selector);
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `<div>
        <div>
            <div>
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
            </div>
        </div>
        <div>
            <h3>Garage</h3>
            <span>Page #</span>
        </div>
        <div id="garage__cars"></div>
        <div>
            <button>PREV</button>
            <button>NEXT</button>
        </div>
    </div>`;
    root.appendChild(div);
  }
}
