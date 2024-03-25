import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTextInputComponent } from '../shared/forms/form-text-input/form-text-input.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FaIconComponent,
    ReactiveFormsModule,
    FormTextInputComponent,
  ],
  declarations: [ProductsComponent, ProductFormComponent, ProductListComponent],
})
export class ProductsModule {}
