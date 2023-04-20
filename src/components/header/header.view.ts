export class Header {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }
    public render(): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = '<button class="to__garage">TO GARAGE</button> <button class="to__winners">TO WINNERS</button>';
        root.appendChild(div);
    }

    public bindToGarage(handler: Function): void {
        const garage = <HTMLDivElement>document.querySelector('.to__garage');
        garage.addEventListener('click', () => {
            handler();
        });
    }

    public bindToWinners(handler: Function): void {
        const winners = <HTMLDivElement>document.querySelector('.to__winners');
        winners.addEventListener('click', () => {
            handler();
        });
    }
}
