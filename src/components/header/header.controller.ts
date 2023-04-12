import { Router } from "../../router/router";
import { Header } from "./header.view";

export class HeaderController { 
    private readonly selector: string;
    private header: Header;
    private router: Router;
    constructor(selector: string) {
        this.selector = selector;
        this.header = new Header(this.selector);
        this.router = new Router(this.selector);
    }

    public render(): void {
        this.header.render();
    }

    public headerInit(): void {
        this.header.bindToGarage(this.router.toGarage.bind(this.router));
        this.header.bindToWinners(this.router.toWinners.bind(this.router));
    }
}