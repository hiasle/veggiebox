import { inject, NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  provideRouter,
  withComponentInputBinding,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { of } from 'rxjs';
import { ProductsService } from './services/products.service';
import { ProductListComponent } from './components/product-list/product-list.component';

// resolve product route
export const productResolver = (route: ActivatedRouteSnapshot) => {
  const productId = route.paramMap.get('productId');
  if (!productId) {
    return of(undefined);
  } else {
    return inject(ProductsService).getProduct(+productId);
  }
};

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'detail/:productId',
        component: ProductFormComponent,
        resolve: {
          product: productResolver,
        },
      },
      {
        path: 'detail',
        component: ProductFormComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
