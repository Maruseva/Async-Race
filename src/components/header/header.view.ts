export class Header {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }
    public render(): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div>
            <button>TO GARAGE</button>
            <button>TO WINNERS</button>
        </div>`;
        root.appendChild(div);
    }
}
