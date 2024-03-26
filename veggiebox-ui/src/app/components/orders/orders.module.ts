import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FormsSharedModule } from '@shared/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsSharedModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [OrdersComponent, OrdersListComponent, OrderFormComponent],
})
export class OrdersModule {}
