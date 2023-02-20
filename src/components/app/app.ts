import { GarageController } from "../../pages/garage/garage.controller";
import { Garage } from "../../pages/garage/garage.view";
import { GarageService } from "../../services/garage.service";
import { Header } from "../header/header.view";

export class App {
    private readonly selector: string;
    private header: Header;
    private garageController: GarageController;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.garageController = new GarageController(new Garage(this.selector), new GarageService());
    }

    public run(): void {
        this.header.render();
        this.garageController.render();
    }
}
