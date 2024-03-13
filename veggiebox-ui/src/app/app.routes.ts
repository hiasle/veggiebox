import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'produkte',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'einkaeufe',
    loadChildren: () =>
      import('./components/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'kaeufer',
    loadChildren: () =>
      import('./components/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
