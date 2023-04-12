import { Router } from "../../router/router";
import { Header } from "./header.view";

export class HeaderController { 
    private header: Header;
    private router: Router;
    constructor(selector: string) {
        this.header = new Header(selector);
        this.router = new Router(selector);
    }

    public render(): void {
        this.header.render();
    }

    public headerInit(): void {
        this.header.bindToGarage(this.router.toGarage.bind(this.router));
        this.header.bindToWinners(this.router.toWinners.bind(this.router));
    }
}