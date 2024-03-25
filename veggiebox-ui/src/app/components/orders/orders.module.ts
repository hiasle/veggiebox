import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

@NgModule({
  imports: [CommonModule, OrdersRoutingModule],
  declarations: [OrdersComponent, OrdersListComponent],
})
export class OrdersModule {}
