import { Garage } from "../../pages/garage/garage.view";
import { Header } from "../header/header.view";

export class App {
    private readonly id: string;
    private header: Header;
    private garage: Garage;
    constructor(id: string) {
        this.id = id;
        this.header = new Header(this.id);
        this.garage = new Garage(this.id);
    }

    public render(): void {
        this.header.render();
        this.garage.render();
    }
}
