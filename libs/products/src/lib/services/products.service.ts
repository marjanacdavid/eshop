/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
//import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiUrl + 'products';
  //apiURLCategories = 'http://localhost:3000/api/v1/categories/';

  constructor(private http: HttpClient) { }

  // ovo je primjer bez backticks-a

  //getProduct(ProductId: string): Observable<Product> {
  //  return this.http.get<Product>('http://localhost:3000/api/v1/categories/' + ProductId)
  //}

   //getProduct(ProductId: string): Observable<Product> {
    //  return this.http.get<Product>(`http://localhost:3000/api/v1/categories/${ProductId}`);
    // }
 getProducts(categoriesFilter?: string[]): Observable<Product[]> {  //ako posaljemo categoriesFilter on ce vratiti,ako ne vratice sve jer je categoriesFilter? opcionalan
  let params = new HttpParams();
   if (categoriesFilter) {
  params = params.append('categories', categoriesFilter.join(','));
  //console.log(params);
  }
  return this.http.get<Product[]>(this.apiURLProducts, { params: params });
   }
// ovo je radilo dok nismo ukljucili na jednoj stranici dva view-a
//  getProducts(): Observable<Product[]> {
//    return this.http.get<Product[]>(this.apiURLProducts)
//  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

 createProduct(productData: FormData): Observable<Product> {
 return this.http.post<Product>(this.apiURLProducts, productData);
   }

                                        //updateProduct(Product: Product): Observable<Product> {
                                        //  return this.http.put<Product>(this.apiURLCategories + Product.id, Product);
                                        //    }
  updateProduct(product: FormData, productid : string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, product);
      }
                                      //deleteProduct(ProductId : string): Observable<Record<string, unknown>> {
                                      //  return this.http.delete<Record<string, unknown>>(`http://localhost:3000/api/v1/categories/${ProductId}`)
                                      //}
  deleteProduct(productId : string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`)
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  productsCount(): Observable<any> {
    return this.http
    .get<number>(`${this.apiURLProducts}/get/count`)
    .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
  }

}
