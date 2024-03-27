import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { Router } from '@angular/router';

export type SelectItem = { label: string };
export type CustomerSelectItem = CustomerDto & SelectItem;
export type ProductSelectItem = ProductDto & SelectItem;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrderFormComponent {
  form!: FormGroup;

  submitted = false;
  customers$: Observable<CustomerSelectItem[]>;
  products$: Observable<ProductSelectItem[]>;
  sum$!: Observable<number | null>;

  constructor(
    private customerService: CustomersService,
    private productService: ProductsService,
    public orderService: OrdersService,
    private fb: FormBuilder,
    private router: Router,
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
    const order = {
      customer: {
        id: this.form.value.customerId,
      },
      details: this.products.value.map((p) => {
        return {
          name: p.product.name,
          quantity: p.productAmount,
          price: this.calcPrice(p?.product?.price, p?.productAmount),
        };
      }),
    };
    await this.orderService.addOrder(order);
    this.router.navigate(['verkaeufe']);
  }

  cancel() {
    this.submitted = false;
    this.initializeForm();
  }

  addProduct() {
    const productForm = this.fb.group({
      product: new FormControl<ProductDto | null>(null, Validators.required),
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

  priceProduct(index: number) {
    const prod = this.products.at(index).value;
    return this.calcPrice(prod?.product?.price, prod?.productAmount);
  }

  private calcPrice(productPrice: number | null, prodcutAmount: number | null) {
    const price = productPrice ?? 0;
    const amount = prodcutAmount ?? 0;
    return price * +amount;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      customerId: new FormControl<number | null>(null, [Validators.required]),
      products: this.fb.array([]),
    });
    this.addProduct();
    this.sum$ = this.products.valueChanges.pipe(
      map((products) => {
        let sum = 0;
        products.forEach((product) => {
          if (product.product?.price != null && product.productAmount != null) {
            sum += product.product.price * product.productAmount;
          }
        });
        return sum;
      }),
    );
  }
}
