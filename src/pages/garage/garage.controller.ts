export interface Cars {
  name: string,
  colot: string,
  id: number
}

export class GarageController {
  public async getCars(url: string): Promise<Cars[]> {
    const response = await fetch(url);
    return response.json();
  }
}
