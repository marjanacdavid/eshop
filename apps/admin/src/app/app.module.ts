/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, JwtInterceptor, UsersModule } from '@divstd/users';

import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';

import { CategoriesService } from '@divstd/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersService } from '@divstd/users';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersService } from '@divstd/orders';
import { AppRoutinModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';


const UX_MODULE = [FieldsetModule, InputMaskModule, TagModule, EditorModule,InputSwitchModule,InputTextareaModule,DropdownModule,InputNumberModule,ColorPickerModule,ConfirmDialogModule,ToastModule,CardModule,ToolbarModule,ButtonModule,TableModule,StyleClassModule,InputTextModule];



@NgModule({
    declarations: [AppComponent, ShellComponent, DashboardComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UsersFormComponent, OrdersListComponent, OrdersDetailComponent],
    imports: [
      BrowserModule,
      //NgxStripeModule.forRoot('pk_test_51KbNDYAlGrZl3DrSPFuFicwcJNUszu80UqvyNThlrZnZmkFuQrZpAE6rRdkp6ERgC0Vcg3khstvOrm3WLxAH0QcP00QS0tNgPY'),
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      AppRoutinModule,
      UsersModule,
      ...UX_MODULE
    ],                                                   //, { initialNavigation: 'enabledBlocking' }
    providers: [CategoriesService, MessageService, ConfirmationService, UsersService, OrdersService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
