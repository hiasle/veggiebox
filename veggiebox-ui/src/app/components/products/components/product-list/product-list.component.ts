import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ProductsService} from "../../../../services/products.service";
import {ProductDto} from "@openapi/generated";
import {Router} from "@angular/router";
import {BehaviorSubject, lastValueFrom} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {

  faTrash = faTrashCan;
  faPencil = faPencil;

  products$ = new BehaviorSubject<ProductDto[]>([]);

  constructor(private productService: ProductsService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.reloadProducts();
  }

  async reloadProducts(): Promise<void> {
    let products = await lastValueFrom(this.productService.getProducts());
    this.products$.next(products);
  }

  async delete(product: ProductDto): Promise<void> {
    await lastValueFrom(this.productService.deleteProduct(product));
    await this.reloadProducts();
  }

  edit(product: ProductDto): void {
    this.router.navigate(['produkte/detail', product.id]);
  }

  ngOnDestroy(): void {
    this.products$.complete();
  }

}
