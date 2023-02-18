import { GarageController } from "../../pages/garage/garage.controller";
import { Header } from "../header/header.view";

export class App {
    private readonly selector: string;
    private header: Header;
    private garage: GarageController;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.garage = new GarageController(this.selector);
    }

    public run(): void {
        this.header.render();
        this.garage.render();
    }
}
