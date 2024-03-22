import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductDto} from "@openapi/generated";
import {ProductsService} from "../../../../services/products.service";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-form',
  // standalone: true,
  // imports: [CommonModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {

  @Input() set product(product: ProductDto) {
    this.create = product == null;
    this.initializeForm(product);
  }

  create: boolean = true;

  form!: FormGroup<{
    id: FormControl<number | null>;
    uuid: FormControl<string | null>;
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    unit: FormControl<ProductDto.UnitEnum | null>;
    price: FormControl<number | null>;
  }>;

  constructor(private fb: FormBuilder, private productService: ProductsService) {
  }

  save(): void {
    console.log('Form value: ', this.form.value);
  }

  private initializeForm(product: ProductDto): void {
    this.form = this.fb.group({
      id: product?.id ?? null,
      uuid: product?.uuid ?? null,
      name: product?.name ?? null,
      description: product?.description ?? null,
      unit: product?.unit ?? null,
      price: product?.price ?? null,
    });
    console.log('Form initialized with value: ', this.form.value);
    console.log('Form initialized with create: ', this.create);
  }


}
