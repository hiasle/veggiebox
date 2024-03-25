import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { of } from 'rxjs';
import { CustomersService } from './services/customers.service';

export const customerResolver = (route: ActivatedRouteSnapshot) => {
  console.log('CustomerResolver called');
  const customerId = route.paramMap.get('customerId');
  if (customerId != null) {
    console.log('Customer edit: ', customerId);
    return inject(CustomersService).getCustomer(+customerId);
  } else {
    return of(undefined);
  }
};

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: 'list', component: CustomerListComponent },
      {
        path: 'detail/:customerId', // child route path
        component: CustomerFormComponent, // child route component that the router renders
        resolve: {
          customer: customerResolver,
        },
      },
      {
        path: 'detail', // child route path
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
