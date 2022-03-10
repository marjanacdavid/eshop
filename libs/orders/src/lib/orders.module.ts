import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@divstd/users';

export const ordersRoutes: Routes = [
  {
    path:'cart',
    component:  CartPageComponent
  },
  {
    path:'checkout',
    canActivate: [AuthGuard],
    component:  CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ordersRoutes), FormsModule, ReactiveFormsModule, BadgeModule, InputTextModule, InputMaskModule, DropdownModule, ButtonModule, InputNumberModule ],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      ThankYouComponent
    ]
})
export class OrdersModule {
//when thw ordersmodule is called than we initialize cart
  //we need to call it one time first time when we going to use
  //and we need to ensure that is called
  //and automatically will be called cart service
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
