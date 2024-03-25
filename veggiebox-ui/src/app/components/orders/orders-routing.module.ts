import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: 'list', component: OrdersListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
