import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsSharedModule } from '@shared/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FaIconComponent,
    ReactiveFormsModule,
    FormsSharedModule,
  ],
  declarations: [ProductsComponent, ProductFormComponent, ProductListComponent],
})
export class ProductsModule {}
