import { Garage } from "../../pages/garage/garage.view";
import { Header } from "../header/header.view";

export class App {
    private readonly selector: string;
    private header: Header;
    private garage: Garage;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.garage = new Garage(this.selector);
    }

    public run(): void {
        this.header.render();
        this.garage.render([{
            "name": "Tesla",
            "color": "#e6e6fa",
            "id": 1
          }]);
    }
}
