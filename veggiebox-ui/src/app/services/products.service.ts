import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {ProductControllerService} from "@openapi/generated";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products_: ProductModel[] = [];

  constructor(private controller: ProductControllerService) {
    this.products_ = initialize();
  }

  public getProduct(id: number) {
    return this.controller.getProduct(id);
  }

  public getProducts() {
    return this.controller.getProducts();
  }

  public allProducts(): ProductModel[] {
    return this.products_;
  }
}

export function initialize(): ProductModel[] {
  return [
    {
      name: 'Saft (Liter)',
      description: 'Saft in Liter',
      unit: 'liter',
      price: 1,
    },
    {
      name: 'Äpfel (Kilogramm)',
      description: 'Äpfel in Kilogramm',
      unit: 'kilogramm',
      price: 1,
    },
  ];
}
