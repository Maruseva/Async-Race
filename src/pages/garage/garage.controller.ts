import { countCars } from '../../constants';
import { GarageService } from '../../services/garage.service';
import { Car, CarMove, CarWithoudId, CarsEngine } from '../../types';
import { Garage } from './garage.view';

export class GarageController {
    private garage: Garage;
    private service: GarageService;
    private page: number;
    private сarsEngine: CarsEngine[];
    constructor(garage: Garage, sevice: GarageService) {
        this.garage = garage;
        this.service = sevice;
        this.page = 1;
        this.сarsEngine = [];
    }

    public async render(): Promise<void> {
        const response = await this.service.getCars(this.page);
        this.garage.render(response.cars, response.count, this.page);
        this.setCarsEngine();
    }

    private async updateGarage(): Promise<void> {
        const response = await this.service.getCars(this.page);
        this.garage.clear();
        this.garage.renderCars(response.cars);
        this.garage.updateTitle(response.count, this.page);
        this.setCarsEngine();
    }

    private async setCarsEngine(): Promise<void> {
        const response = await this.service.getCars(this.page);
        this.сarsEngine = response.cars.map((element) => {
            return { id: element.id, state: 'stop' };
        });
    }

    private async addCar(car: CarWithoudId): Promise<void> {
        await this.service.addCar(car);
        this.updateGarage();
    }

    private async deleteCar(id: number): Promise<void> {
        await this.service.deleteCar(id);
        this.updateGarage();
    }

    private async getCar(id: number): Promise<Car> {
        const response = await this.service.getCar(id);
        return response;
    }

    private async updateCar(id: number, car: CarWithoudId): Promise<void> {
        await this.service.updateCar(id, car);
        this.updateGarage();
    }

    private async generateCars(cars: CarWithoudId[]): Promise<void> {
        cars.forEach((item) => this.service.addCar(item));
        this.updateGarage();
    }

    private async setPrevPage(): Promise<void> {
        if (this.page > 1) {
            this.page--;
            this.updateGarage();
        }
    }

    private async setNextPage(): Promise<void> {
        const response = await this.service.getCars(this.page);
        if (this.page < response.count / countCars) {
            this.page++;
            this.updateGarage();
        }
    }

    private async startCar(id: number): Promise<CarMove> {
        const dataCar = this.сarsEngine.find((element) => element.id === id);
        if (dataCar) {
            dataCar.state = 'start';
        }
        const response = await this.service.startCar(id);
        return response;
    }

    private stopCar(id: number): void {
        const dataCar = this.сarsEngine.find((element) => element.id === id);
        if (dataCar) {
            dataCar.state = 'stop';
        }
    }

    private getEngineState(id: number): string | undefined {
        const dataCar = this.сarsEngine.find((element) => element.id === id);
        return dataCar?.state;
    }

    public init(): void {
        this.garage.bindAddCar(this.addCar.bind(this));
        this.garage.bindDeleteCar(this.deleteCar.bind(this));
        this.garage.bindGetCar(this.getCar.bind(this));
        this.garage.bindUpdateCar(this.updateCar.bind(this));
        this.garage.bindGenerateCars(this.generateCars.bind(this));
        this.garage.bindSetPrevPage(this.setPrevPage.bind(this));
        this.garage.bindSetNextPage(this.setNextPage.bind(this));
        this.garage.bindStartCar(this.startCar.bind(this), this.getEngineState.bind(this));
        this.garage.bindStopCar(this.stopCar.bind(this));
    }
}
