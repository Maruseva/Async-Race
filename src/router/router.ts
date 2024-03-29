import { GarageController } from "../pages/garage/garage.controller";
import { Garage } from "../pages/garage/garage.view";
import { WinnersController } from "../pages/winners/winners.controller";
import { Winners } from "../pages/winners/winners.view";
import { GarageService } from "../services/garage.service";
import { WinnersService } from "../services/winners.service";
import { Pages } from "../types";

export class Router {
    private garageController: GarageController;
    private winnersController: WinnersController;
    private page: Pages;
    constructor(selector: string) {
        this.garageController = new GarageController(new Garage(selector), new GarageService(), new WinnersService());
        this.winnersController = new WinnersController(new Winners(selector), new WinnersService(), new GarageService());
        this.page = Pages.Garage;
    }
    
    public async render(): Promise<void> {
        if (this.page === Pages.Garage) {
            await this.garageController.render();
            this.garageController.init();
        } else if (this.page === Pages.Winners) {
            await this.winnersController.render();
            this.winnersController.init();
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