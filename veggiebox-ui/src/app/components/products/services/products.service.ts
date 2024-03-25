import { Injectable } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { ProductControllerService, ProductDto } from '@openapi/generated';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private controller: ProductControllerService) {}

  public getProduct(id: number) {
    return this.controller.getProduct(id);
  }

  public getProducts() {
    return this.controller.getProducts();
  }

  public addProduct(product: ProductDto): Observable<ProductDto> {
    return this.controller.createProduct(product);
  }

  public editProduct(product: ProductDto): Observable<ProductDto> {
    return this.controller.editProduct(product.id ?? 0, product);
  }

  public deleteProduct(product: ProductDto): Observable<void> {
    return this.controller.deleteProduct(product.id ?? 0);
  }
}
