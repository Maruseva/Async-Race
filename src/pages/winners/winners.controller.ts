import { WinnersService } from "../../services/winners.service";
import { CarWinner } from "../../types";
import { Winners } from "./winners.view";

export class WinnersController {
    private readonly selector: string;
    private winners: Winners;
    private service: WinnersService;
    // private page: number;
    // private sort: string;
    // private order: string;
    constructor(selector: string) {
        this.selector = selector;
        this.winners = new Winners(this.selector);
        this.service = new WinnersService;
        // this.page = 1;
        // this.sort = 'id';
        // this.order = 'ASC';
    }

    public render(): void {
        this.winners.render();
        // const response = await this.addCar({id: 1, wins: 1, time: 1});
        // console.log(response)
    }

    // public async getWinners () {
    //     const response = await this.service.getWinners(this.page, this.sort, this.order);
    //     return response;
    // }

    public async addCar(car: CarWinner): Promise<void> {
        const response = await this.service.addCar(car);
        return response;
    }

    public clearPage(): void {
        this.winners.clearPage();
    }
}