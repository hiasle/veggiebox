import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductDto } from '@openapi/generated';
import { ProductsService } from '../../services/products.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import UnitEnum = ProductDto.UnitEnum;
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductFormComponent {
  form!: FormGroup;
  submitted = false;

  @Input() set product(product: ProductDto) {
    this.create = product == null;
    this.initializeForm(product);
  }

  create: boolean = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
  ) {}

  units(): Array<UnitEnum> {
    return ['kilogramm', 'liter', 'flasche', 'kiste'];
  }

  async save(): Promise<void> {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }

    if (this.create) {
      await lastValueFrom(
        this.productService.addProduct({
          ...this.form.value,
        }),
      );
    } else {
      await lastValueFrom(
        this.productService.editProduct({
          ...this.form.value,
        }),
      );
    }
    this.submitted = true;
    this.reset();
    this.router.navigate(['produkte']);
  }

  reset(): void {
    this.submitted = false;
    this.form.reset();
    this.form.patchValue({
      ...this.form.value,
      uuid: uuidv4(),
    });
  }

  private initializeForm(product: ProductDto) {
    this.form = this.fb.group({
      id: new FormControl(product?.id ?? null),
      uuid: new FormControl(uuidv4()),
      name: new FormControl(product?.name ?? null, [Validators.required]),
      description: product?.description ?? null,
      unit: product?.unit ?? null,
      price: new FormControl(product?.price ?? null, [Validators.required]),
    });
    console.log('Form initialized with value: ', this.form.value);
    console.log('Form initialized with create: ', this.create);
  }
}
