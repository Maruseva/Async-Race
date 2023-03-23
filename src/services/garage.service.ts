import { Car, CarWithoudId } from "../types";

export class GarageService {
  public async getCars(): Promise<Car[]> {
    const response = await fetch("http://127.0.0.1:3000/garage");
    return response.json();
  }

  public async addCar(car: CarWithoudId): Promise<Car> {
    const response = await fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    return response.json();
  }

  public async deleteCar(id: number): Promise<{}> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  public async getCar(id: number): Promise<Car> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "GET",
    });
    return response.json();
  }

  public async updateCar(id: number, car: CarWithoudId): Promise<Car> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    return response.json();
  }
}
