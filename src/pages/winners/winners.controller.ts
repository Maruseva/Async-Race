import { GarageService } from '../../services/garage.service';
import { WinnersService } from '../../services/winners.service';
import { Car, CarWinner, WinnersOrder, WinnersSort, WinnerWithNameAndColor } from '../../types';
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
        this.order = WinnersOrder.DESC;
    }

    public async render(): Promise<void> {
        const response = await this.getWinnersWithNameAndColor();
        this.winners.render(response.count, this.page, response.winners);
    }

    private async getWinnersWithNameAndColor(): Promise<{ count: number; winners: WinnerWithNameAndColor[] }> {
        const winnerWithNameAndColor = [];
        const response = await this.getWinners();
        const winners = response.winners;
        for (let i = 0; winners.length > i; i++) {
            const car = await this.getCar(winners[i].id);
            const winner = {
                id: winners[i].id,
                time: winners[i].time,
                wins: winners[i].wins,
                name: car.name,
                color: car.color,
            };
            winnerWithNameAndColor.push(winner);
        }
        return { count: response.count, winners: winnerWithNameAndColor };
    }

    public async getWinners(): Promise<{ count: number; winners: CarWinner[] }> {
        const response = await this.service.getWinners(this.page, this.sort, this.order);
        return response;
    }

    private async getCar(id: number): Promise<Car> {
        const response = await this.garageService.getCar(id);
        return response;
    }

    private async sortWinners(sortWinners: string): Promise<void> {
        this.sort = sortWinners;
        this.order = this.order === WinnersOrder.ASC ? WinnersOrder.DESC : WinnersOrder.ASC;
        this.winners.clearWinnersTable();
        const response = await this.getWinnersWithNameAndColor();
        this.winners.getTable(response.winners);
        this.init();
    }

    public clearPage(): void {
        this.winners.clearPage();
    }

    public init(): void {
        this.winners.bindSortWins(this.sortWinners.bind(this));
    }
}
