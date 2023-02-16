import { Header } from "../../components/header/header.view";
import { Garage } from "./garage.view";

export class GarageController {
  private readonly selector: string;
  private header: Header;
  private garage: Garage;
  constructor(selector: string) {
    this.selector = selector;
    this.header = new Header(this.selector);
    this.garage = new Garage(this.selector);
  }
  
  private async getCars(url: string): Promise<Car[]> {
    const response = await fetch(url);
    return response.json();
  }

  public async render(): void {
    const response =  await this.getCars('http://127.0.0.1:3000/garage');
    this.header.render();
    this.garage.render(response);
  }
}

