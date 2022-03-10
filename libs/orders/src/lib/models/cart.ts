/* eslint-disable @typescript-eslint/no-explicit-any */
export class Cart {
   items? : CartItem[];
  // cart?: CartItem;
 }

 export class CartItem {
   productId? : string;
   quantity? : number;
 }
 export class CartItemDetailed {
  product?: any;
  quantity?: number;
}
