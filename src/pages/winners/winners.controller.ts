import { Winners } from "./winners.view";

export class WinnersController {
    private winners: Winners;
    constructor(winners: Winners) {
        this.winners = winners;
    }

    public render(): void {
        this.winners.render()
    }

    public clearPage(): void {
        this.winners.clearPage();
    }
}