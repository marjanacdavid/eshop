import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@divstd/products';
import {MessageService} from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  deleteProduct(productId : string){
 //show dialog
 this.confirmationService.confirm({
  message: 'Do you want to delete this product?',
  header: 'Delete Product',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {


    this.productsService.deleteProduct(productId)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(() =>{
      this._getProducts();
      this.messageService.add({severity:'success', summary:'Success', detail:'Product is deleted!'});
    },
    ()=> {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not deleted!'});
      }

    );

  }//,
  //reject: () => {}
});
}
updateProduct(productId : string){
this.router.navigateByUrl(`products/form/${productId}`);
}


_getProducts(){
  this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
    this.products = products;

   })
 }
}
