export class Car {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public render(name: string, color: string): void {
        const wrap = <HTMLDivElement>document.querySelector(this.selector);
    }
}