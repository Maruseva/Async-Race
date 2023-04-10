import { Winners } from "./winners.view";

export class WinnersController {
    private readonly selector: string;
    private winners: Winners;
    constructor(selector: string) {
        this.selector = selector;
        this.winners = new Winners(this.selector)
    }

    public render(): void {
        this.winners.render()
    }

    public clearPage(): void {
        this.winners.clearPage();
    }
}