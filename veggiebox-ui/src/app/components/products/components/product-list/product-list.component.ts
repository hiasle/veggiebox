import {ChangeDetectionStrategy, Component} from '@angular/core';
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ProductsService} from "../../../../services/products.service";
import {ProductDto} from "@openapi/generated";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  faTrash = faTrashCan;
  faPencil = faPencil;

  products$;

  constructor(private productService: ProductsService, private router: Router) {
    this.products$ = productService.getProducts();
  }

  edit(product: ProductDto): void {
    this.router.navigate(['produkte/detail', product.id]);
  }

}
