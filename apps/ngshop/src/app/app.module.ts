/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { UiModule } from '@divstd/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProductsModule } from '../../../../libs/products/src/lib/products.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@divstd/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@divstd/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule, StripeService } from 'ngx-stripe';


const routes: Routes = [{
  path:'',
  component: HomePageComponent
}];

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
     BrowserModule,
     NgxStripeModule.forRoot('pk_test_51KbNDYAlGrZl3DrSPFuFicwcJNUszu80UqvyNThlrZnZmkFuQrZpAE6rRdkp6ERgC0Vcg3khstvOrm3WLxAH0QcP00QS0tNgPY'),
     RouterModule.forRoot(routes),
     HttpClientModule,
     StoreModule.forRoot({}),
     EffectsModule.forRoot([]),
     AccordionModule,
     ToastModule,
     BrowserAnimationsModule,
     ProductsModule,
     UiModule,
     OrdersModule,
     UsersModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
