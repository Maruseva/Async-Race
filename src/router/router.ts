import { GarageController } from "../pages/garage/garage.controller";
import { Garage } from "../pages/garage/garage.view";
import { WinnersController } from "../pages/winners/winners.controller";
import { GarageService } from "../services/garage.service";
import { Pages } from "../types";

export class Router {
    private readonly selector: string;
    private garageController: GarageController;
    private winnersController: WinnersController;
    private page: Pages;
    constructor(selector: string) {
        this.selector = selector;
        this.garageController = new GarageController(new Garage(this.selector), new GarageService());
        this.winnersController = new WinnersController(this.selector);
        this.page = Pages.Garage;
    }
    
    public async render(): Promise<void> {
        if (this.page === Pages.Garage) {
            await this.garageController.render();
            this.garageController.init();
        } else if (this.page === Pages.Winners) {
            this.winnersController.render();
        }
    }

    public toGarage(): void {
        this.page = Pages.Garage;
        this.winnersController.clearPage();
        this.render();
    }

    public toWinners(): void {
        this.page = Pages.Winners;
        this.garageController.clearPage();
        this.render();
    }
}