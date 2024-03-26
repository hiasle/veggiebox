import { Component } from '@angular/core';
import { CustomersService } from '../../../customers/services/customers.service';
import { map, Observable } from 'rxjs';
import { CustomerDto, ProductDto } from '@openapi/generated';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { OrdersService } from '../../services/orders.service';

export type SelectItem = { label: string };
export type CustomerSelectItem = CustomerDto & SelectItem;
export type ProductSelectItem = ProductDto & SelectItem;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  form!: FormGroup;

  submitted = false;
  customers$: Observable<CustomerSelectItem[]>;
  products$: Observable<ProductSelectItem[]>;

  constructor(
    private customerService: CustomersService,
    private productService: ProductsService,
    public orderService: OrdersService,
    private fb: FormBuilder,
  ) {
    this.customers$ = customerService.getCustomers().pipe(
      map((customers) => {
        return customers.map((customer) => {
          return { ...customer, label: this.fullname(customer) };
        });
      }),
    );
    this.products$ = productService.getProducts().pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product, label: this.productLabel(product) };
        });
      }),
    );
    this.initializeForm();
  }

  fullname(customer: CustomerDto): string {
    return `${customer.firstname} ${customer.lastname}`;
  }

  productLabel(product: ProductDto): string {
    return `${product.name} [${product.unit}]`;
  }

  async saveOrder(): Promise<void> {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }
    console.log('Form submitted: ', this.form.value);
    await this.orderService.addOrder({
      customer: {
        id: this.form.value.customerId,
      },
      details: [
        {
          id: this.form.value.productId,
          quantity: this.form.value.productAmount,
        },
      ],
    });
  }

  addProduct() {
    const productForm = this.fb.group({
      productId: new FormControl<number | null>(null, Validators.required),
      productAmount: new FormControl<number | null>(null, Validators.required),
    });
    this.products.push(productForm);
  }

  deleteProduct(index: number) {
    this.products.removeAt(index);
  }

  get products() {
    return this.form.controls['products'] as FormArray<FormGroup>;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      customerId: new FormControl<number | null>(null, [Validators.required]),
      products: this.fb.array([]),
    });
    this.addProduct();
  }
}
