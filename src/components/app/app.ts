import { GarageController } from '../../pages/garage/garage.controller';
import { Garage } from '../../pages/garage/garage.view';
import { WinnersController } from '../../pages/winners/winners.controller';
import { GarageService } from '../../services/garage.service';
import { Header } from '../header/header.view';

export class App {
    private readonly selector: string;
    private header: Header;
    private garageController: GarageController;
    private winnersController: WinnersController;
    private page: string;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.garageController = new GarageController(new Garage(this.selector), new GarageService());
        this.winnersController = new WinnersController(this.selector);
        this.page = 'garage';
    }

    public run(): void {
        this.header.render();
        this.headerInit();
        this.render();
    }

    private async render(): Promise<void> {
        if (this.page === 'garage') {
            await this.garageController.render();
            this.garageController.init();
        } else if (this.page === 'winners') {
            this.winnersController.render();
        }
    }

    private toGarage(): void {
        this.page = 'garage';
        this.winnersController.clearPage();
        this.render();
    }

    private toWinners(): void {
        this.page = 'winners';
        this.garageController.clearPage();
        this.render();
    }

    private headerInit(): void {
        this.header.bindToGarage(this.toGarage.bind(this));
        this.header.bindToWinners(this.toWinners.bind(this));
    }
}
