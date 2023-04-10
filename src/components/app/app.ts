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
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.garageController = new GarageController(new Garage(this.selector), new GarageService());
        this.winnersController = new WinnersController(this.selector);
    }

    public async run(): Promise<void> {
        this.header.render();
        this.winnersController.render();
        // await this.garageController.render();
        // this.garageController.init();
    }
}
