/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@divstd/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(private prodService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
 this.route.params.subscribe((params) => {      //na klik nam dolazi productid i onda ActivatedRoute subscribe i u response params uzimamo vrednost productid iz backend kroz funkciju _getProduct,i pozivamo funkciju _getProduct sa productid, params.productid
       if (params.productid) {
         this._getProduct(params.productid);
       }
    });


  }

  private _getProduct(id: string) {
    this.prodService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct => {
      this.product = resProduct;
    })
  }


  ngOnDestroy(): void {
this.endSubs$.next();
this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem : CartItem = {
      productId : this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }
}
