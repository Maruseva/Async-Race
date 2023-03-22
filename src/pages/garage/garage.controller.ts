import { AddCar, GarageService } from "../../services/garage.service";
import { Garage } from "./garage.view";

export class GarageController {
  private garage: Garage;
  private service: GarageService;
  constructor(garage: Garage, sevice: GarageService) {
    this.garage = garage;
    this.service = sevice;
  }

  public async render(): Promise<void> {
    const response = await this.service.getCars();
    this.garage.render(response);
  }

  private async addCar(car: AddCar): Promise<void> {
    await this.service.addCar(car);
    this.garage.clear();
    this.render();
  }

  public init(): void {
    this.garage.bindAddCar(this.addCar.bind(this));
  }
}
