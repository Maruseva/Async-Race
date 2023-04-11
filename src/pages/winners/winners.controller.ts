import { GarageService } from "../../services/garage.service";
import { WinnersService } from "../../services/winners.service";
import { Car, CarWinner } from "../../types";
import { GarageController } from "../garage/garage.controller";
import { Winners } from "./winners.view";

export class WinnersController {
    private readonly selector: string;
    private winners: Winners;
    private service: WinnersService;
    private page: number;
    private sort: string;
    private order: string;
    private garageService: GarageService;
    constructor(selector: string) {
        this.selector = selector;
        this.winners = new Winners(this.selector);
        this.service = new WinnersService;
        this.garageService = new GarageService;
        this.page = 1;
        this.sort = 'id';
        this.order = 'ASC';
    }

    public async render(): Promise<void> {
        const response = await this.getWinners();
        for (let i = 0; response.length > i; i++) {
            const car = await this.getCar(response[i].id);
            response[i].name = car.name;
            response[i].color = car.color;
        }
        this.winners.render(response);
    }

    public async getWinners () {
        const response = await this.service.getWinners(this.page, this.sort, this.order);
        return response;
    }

    private async getCar(id: number): Promise<Car> {
        const response = await this.garageService.getCar(id);
        return response;
    }

    public clearPage(): void {
        this.winners.clearPage();
    }
}