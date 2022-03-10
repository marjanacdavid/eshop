/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[]  = [];
  isCategoryPage!: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.route.params.subscribe((params) => {
       params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();  // (?) if there is this variable (categoryid) then do -> this._getProducts([params.categoryid]), otherwise (:) get all products,without filters-> this._getProducts()
       params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);   // show or hide if it is (isCategoryPage) or not
     });
    this._getCategories();
    //this._getProducts();  // ovo ukidamo zbog -> this.route.params.subscribe((params) => {
  }

  private _getProducts(categoriesFilter? : string[] | undefined) {
    this.prodService.getProducts(categoriesFilter).subscribe(resProducts =>{
      this.products = resProducts;
    })
  }
  private _getCategories() {
    this.catService.getCategories().subscribe(resCats => {
      this.categories = resCats;
    })
  }
  categoryFilter() {
    //console.log(this.categories);
    const selectedCategories: any = this.categories
     .filter((category) => category.checked)//pomocu (filter) metoda vracamo samo koji su cekirani u selectedCategories
     .map((category) => category.id); //pomocu (map) metoda posto filter vraca array,(map) ide kroz svaki category i vraca njegov id. return only (=> category.id); i to ce vracati u varijablu tj. const selectedCategories
   // console.log(selectedCategories);

  this._getProducts(selectedCategories); //sa ovim stavljanjem (selectedCategories) u _getProducts(categoriesFilter? : string[]) funkciju
  //koja poziva backend i vraca (resProducts) i stavlja u varijablu this.products koja je array,i sa (onChanges)="categoryFilter()" u html
  //prikazujemo products array sa čekiranim selectedCategories
  }

}


