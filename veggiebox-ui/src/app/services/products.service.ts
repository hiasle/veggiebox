import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products_: ProductModel[] = [];

  constructor() {
    this.products_ = initialize();
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
