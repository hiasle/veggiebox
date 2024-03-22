import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: 'list', component: CustomerListComponent },
      {
        path: 'create', // child route path
        component: CustomerFormComponent, // child route component that the router renders
      },
      {
        path: 'detail/:id', // child route path
        component: CustomerFormComponent, // child route component that the router renders
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
