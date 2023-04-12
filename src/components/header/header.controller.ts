import { Router } from "../../router/router";
import { Header } from "./header.view";

export class HeaderController { 
    private header: Header;
    private router: Router;
    constructor(header: Header, router: Router) {
        this.header = header;
        this.router = router;
    }

    public render(): void {
        this.header.render();
    }

    public headerInit(): void {
        this.header.bindToGarage(this.router.toGarage.bind(this.router));
        this.header.bindToWinners(this.router.toWinners.bind(this.router));
    }
}