import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@divstd/ui';
import { ProductPageComponent } from './pages/product-page/product-page.component';


const productRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
   {
     path: 'category/:categoryid',
     component: ProductsListComponent
   },
   {
     path: 'products/:productid',
     component: ProductPageComponent
   }
]
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(productRoutes),
      FormsModule,
      UiModule,
      ButtonModule,
      CheckboxModule,
      RatingModule,
      InputNumberModule
    ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductPageComponent
    ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent]
})
export class ProductsModule {}
