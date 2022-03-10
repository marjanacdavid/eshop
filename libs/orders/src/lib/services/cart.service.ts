/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart : Cart = this.getCart();
    if(!cart) {
       const initialCart = {
         items: []
       };
      const initialcartJson = JSON.stringify(initialCart); // prebaciti u string iz [{}]
      localStorage.setItem(CART_KEY, initialcartJson)  //local storage = : key=cart,value=initialCart
    }

  }

  emptyCart() {
     const intialCart = {
       items: []
     };
     const intialCartJson = JSON.stringify(intialCart);
     localStorage.setItem(CART_KEY, intialCartJson);
     this.cart$.next(intialCart);
  }

getCart() {
  const cartJsonString : string  = localStorage.getItem(CART_KEY)!;
  const cart: Cart = JSON.parse(cartJsonString);
  return cart;
}


   deleteCartItem(productId: string) {
     const cart = this.getCart();
     const newCart = cart.items?.filter((item) => item.productId !== productId);

     cart.items = newCart;

     const cartJsonString = JSON.stringify(cart);
     localStorage.setItem(CART_KEY, cartJsonString);

     this.cart$.next(cart);
   }



  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart?.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {

      cart.items?.map((item) : any => {

          if (item.productId === cartItem.productId) {

            if (updateCartItem) {

              item.quantity = cartItem.quantity;
            } else {
              item.quantity = item.quantity! + cartItem.quantity!;

            }

            return item;

          }
        });
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }
}
