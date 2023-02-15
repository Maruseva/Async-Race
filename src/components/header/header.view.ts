import './header.style.css';

export class Header {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }
    public render(): void {
        const root = <HTMLDivElement>document.getElementById(this.id);
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `<div>
            <button>TO GARAGE</button>
            <button>TO WINNERS</button>
        </div>`;
        root.appendChild(div);
    }
}