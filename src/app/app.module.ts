import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductPageComponent} from './shared/product-page/product-page.component';
import {CartPageComponent} from './shared/cart-page/cart-page.component';
import {AdminLayoutComponent} from './admin/shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './admin/login-page/login-page.component';
import {AddPageComponent} from './admin/add-page/add-page.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {EditPageComponent} from './admin/edit-page/edit-page.component';
import {OrdersPageComponent} from './admin/orders-page/orders-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AuthInterseptor} from './shared/auth.interseptor';
import { ProductComponent } from './product/product.component';
import {AdminModule} from './admin/admin.module';
import { SortingPipe } from './shared/sorting.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardComponent,
    EditPageComponent,
    OrdersPageComponent,
    ProductComponent,
    SortingPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
