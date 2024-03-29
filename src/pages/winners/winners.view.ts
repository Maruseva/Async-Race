import { WinnerCar } from '../../components/winnerCar/winnerCar.view';
import { countWinners } from '../../constants';
import { WinnerWithNameAndColor } from '../../types';
import './winners.style.css';

export class Winners {
    private readonly selector: string;
    private winnerCar: WinnerCar;
    constructor(selector: string) {
        this.selector = selector;
        this.winnerCar = new WinnerCar();
    }

    public render(count: number, page: number, cars: WinnerWithNameAndColor[]): void {
        const root = <HTMLDivElement>document.querySelector(this.selector);
        const div = <HTMLDivElement>document.createElement('div');
        const winnersTable = <HTMLDivElement>document.createElement('div');
        winnersTable.className = 'winners__table';
        div.className = 'winners__page';

        const title = this.getTitle(count, page);
        div.appendChild(title);

        div.appendChild(winnersTable);

        const pagination = this.getPagination();
        div.appendChild(pagination);

        root.appendChild(div);
        this.getTable(cars, page);
    }

    private getTitle(count: number, page: number): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <h3>Winners <span class="winners__count">${count}</span></h3>
      <span>Page #<span class="winners__page">${page}</span></span>
      <div class="winners__nameTable">
      <div>Number</div>
      <div>Car</div>
      <div>Name</div>
      <div class="winners__wins">Wins</div>
      <div class="winners__time">Best time (seconds)</div>
      </div>`;
        return div;
    }

    public getTable(cars: WinnerWithNameAndColor[], page: number): void {
        const div = <HTMLDivElement>document.querySelector('.winners__table');
        cars.forEach((element, index) => {
            const winner = this.winnerCar.render(element, (page - 1) * countWinners + index + 1);
            div.appendChild(winner);
        });
    }

    private getPagination(): Element {
        const div = <HTMLDivElement>document.createElement('div');
        div.innerHTML = `
      <button class="winners__prev">PREV</button>
      <button class="winners__next">NEXT</button>`;
        return div;
    }

    public bindSortWins(handler: Function): void {
        const wins = <HTMLDivElement>document.querySelector('.winners__nameTable');
        wins.addEventListener('click', async (event) => {
            const div = event.target as HTMLDivElement;
            if (div.className === 'winners__wins') {
                handler('wins');
            } else if (div.className === 'winners__time') {
                handler('time');
            }
        });
    }

    public bindSetPrevPage(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.winners__prev');
        button.addEventListener('click', () => {
            handler();
        });
    }

    public bindSetNextPage(handler: Function): void {
        const button = <HTMLButtonElement>document.querySelector('.winners__next');
        button.addEventListener('click', () => {
            handler();
        });
    }

    public clearWinnersTable(): void {
        const table = <HTMLDivElement>document.querySelector('.winners__table');
        table.innerHTML = '';
    }

    public clearPage(): void {
        const page = <HTMLDivElement>document.querySelector('.winners__page');
        page.remove();
    }
}
