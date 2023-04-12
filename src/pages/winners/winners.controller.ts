import { Winners } from "./winners.view";

export class WinnersController {
    private winners: Winners;
    constructor(selector: string) {
        this.winners = new Winners(selector)
    }

    public render(): void {
        this.winners.render()
    }

    public clearPage(): void {
        this.winners.clearPage();
    }
}