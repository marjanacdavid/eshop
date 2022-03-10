/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {

  cartCount : any = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
this.cartService.cart$.subscribe(cart => {  //observable of cartCount(realtime shows update of courth length)
  this.cartCount = cart?.items?.length ?? 0; // when this cart.items.length is undefined return 0
})
    //this.cartCount = this.cartService.getCart().items?.length;


  }

}
