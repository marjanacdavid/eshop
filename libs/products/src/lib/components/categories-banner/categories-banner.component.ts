/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService
    .getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.categories = categories;
    });
  }
  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
