import { Garage } from "../../pages/garage/garage.view";

export class App {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }

    public render(): void {
        const garage = new Garage("root");
        garage.render();
    }
}
