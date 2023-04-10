import './winners.style.css';

export class Winners {
    private readonly selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public render(): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        div.className = 'winners__page';

        const title = this.getTitle(1, 1);
        div.appendChild(title);

        const table = this.getTable();
        div.appendChild(table);

        const pagination = this.getPagination();
        div.appendChild(pagination);

        root.appendChild(div);
    }

    private getTitle(count: number, page: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <h3>Winners <span class="winners__count">${count}</span></h3>
      <span>Page #<span class="winners__page">${page}</span></span>`;
        return div;
    }

    private getTable(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        const nameTable = <HTMLDivElement>document.createElement('div');
        nameTable.innerHTML = `<div class="winners__nameTable">
      <div>Number</div>
      <div>Car</div>
      <div>Name</div>
      <div>Wins</div>
      <div>Best time (seconds)</div>
      </div>`;
        div.appendChild(nameTable);
        return div;
    }

    private getPagination(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <button class="winners__prev">PREV</button>
      <button class="winners__next">NEXT</button>`;
        return div;
    }

    public clearPage(): void {
      const page = <HTMLDivElement>document.querySelector('.winners__page');
      page.remove();
  }
}