import { GarageService } from '../../services/garage.service';
import { WinnersService } from '../../services/winners.service';
import { Car, CarWinner, WinnersOrder, WinnersSort } from '../../types';
import { Winners } from './winners.view';

export class WinnersController {
    private winners: Winners;
    private service: WinnersService;
    private page: number;
    private sort: string;
    private order: string;
    private garageService: GarageService;

    constructor(winners: Winners, service: WinnersService, garageService: GarageService) {
        this.winners = winners;
        this.service = service;
        this.garageService = garageService;
        this.page = 1;
        this.sort = WinnersSort.Id;
        this.order = WinnersOrder.ASC;
    }

    public async render(): Promise<void> {
        const response = await this.getWinners();
        const winners = response.winners;
        for (let i = 0; winners.length > i; i++) {
            const car = await this.getCar(winners[i].id);
            winners[i].name = car.name;
            winners[i].color = car.color;
        }
        this.winners.render(response.count, this.page, winners);
    }

    public async getWinners(): Promise<{count: number, winners: CarWinner[]}> {
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
