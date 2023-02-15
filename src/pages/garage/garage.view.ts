export class Garage {
  private readonly id: string;
  constructor(id: string) {
    this.id = id;
  }

  public render(): void {
    const root = <HTMLDivElement>document.getElementById(this.id);
    const div = <HTMLDivElement>document.createElement("div");
    div.innerHTML = `<div>
        <div>
            <div>
                <input type="text">
                <input type="color">
                <button>CREATE</button>
            </div>
            <div>
                <input type="text">
                <input type="color">
                <button>UPDATE</button>
            </div>
            <div>
                <button>RACE</button>
                <button>RESET</button>
                <button>GENERATE CARS</button>
            </div>
        </div>
        <div>
            <h3>Garage</h3>
            <span>Page #</span>
        </div>
        <div id="garage__cars"></div>
    </div>`;
    root.appendChild(div);
  }
}
