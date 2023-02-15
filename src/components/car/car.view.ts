export class Car {
    private readonly id: string;
    constructor(id: string) {
        this.id = id
    }

    public render(name: string, color: string): void {
        const wrap = <HTMLDivElement>document.getElementById(this.id);
    }
}