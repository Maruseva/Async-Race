import { GarageService } from "../../services/garage.service";
import { Car, CarWithoudId } from "../../types";
import { Garage } from "./garage.view";

export class GarageController {
  private garage: Garage;
  private service: GarageService;
  constructor(garage: Garage, sevice: GarageService) {
    this.garage = garage;
    this.service = sevice;
  }

  public async render(page: number = 1): Promise<void> {
    const response = await this.service.getCars(page);
    this.garage.render(response.cars, response.count, page);
  }

  private async addCar(car: CarWithoudId, page: number): Promise<void> {
    await this.service.addCar(car);
    const response = await this.service.getCars(page);
    this.garage.clear();
    this.garage.renderCars(response.cars);
  }

  private async deleteCar(id: number, page: number): Promise<void> {
    await this.service.deleteCar(id);
    const response = await this.service.getCars(page);
    this.garage.clear();
    this.garage.renderCars(response.cars);
  }

  private async getCar(id: number): Promise<Car> {
    const response = await this.service.getCar(id);
    return response;
  }

  private async updateCar(id: number, car: CarWithoudId, page: number): Promise<void> {
    await this.service.updateCar(id, car);
    const response = await this.service.getCars(page);
    this.garage.clear();
    this.garage.renderCars(response.cars);
  }

  private async generateCars(cars: CarWithoudId[], page: number): Promise<void> {
    cars.forEach((item) => this.service.addCar(item));
    const response = await this.service.getCars(page);
    this.garage.clear();
    this.garage.renderCars(response.cars);
  }

  private async setPage(page: number): Promise<void> {
    const response = await this.service.getCars(page);
    this.garage.clear();
    this.garage.renderCars(response.cars);
  }

  public init(): void {
    this.garage.bindAddCar(this.addCar.bind(this));
    this.garage.bindDeleteCar(this.deleteCar.bind(this));
    this.garage.bindGetCar(this.getCar.bind(this));
    this.garage.bindUpdateCar(this.updateCar.bind(this));
    this.garage.bindGenerateCars(this.generateCars.bind(this));
    this.garage.bindSetPage(this.setPage.bind(this));
  }
}
