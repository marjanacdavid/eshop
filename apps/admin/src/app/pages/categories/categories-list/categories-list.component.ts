
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@divstd/products';
import {MessageService} from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {

categories: Category[] = [];
//categories: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  deleteCategory(categoryId : string){
    //show dialog
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        this.categoriesService.deleteCategory(categoryId).subscribe(() =>{
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is deleted!'});
        },
        ()=> {
          this.messageService.add({severity:'error', summary:'Error', detail:'Category is not deleted!'});
          }

        );

      }//,
      //reject: () => {}
  });
}
updateCategory(categoryId : string){
this.router.navigateByUrl(`categories/form/${categoryId}`);
}


_getCategories(){
  this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
    this.categories = cats;

});
}

}
