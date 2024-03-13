import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
