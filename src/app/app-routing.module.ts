import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {ProductPageComponent} from './shared/product-page/product-page.component';
import {CartPageComponent} from './shared/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'product/:id',
        component: ProductPageComponent
      },
      {
        path: 'cart',
        component: CartPageComponent
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
