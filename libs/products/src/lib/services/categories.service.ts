/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
//import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiUrl + 'categories';
  //apiURLCategories = 'http://localhost:3000/api/v1/categories/';

  constructor(private http: HttpClient) { }

  // ovo je primjer bez backticks-a

  //getCategory(categoryId: string): Observable<Category> {
  //  return this.http.get<Category>('http://localhost:3000/api/v1/categories/' + categoryId)
  //}

  //getCategory(categoryId: string): Observable<Category> {
  //  return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
 // }
 getCategory(categoryId: string): Observable<Category> {
  return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories)
  }

  createCategory(category: Category): Observable<Category> {
return this.http.post<Category>(this.apiURLCategories, category);
  }

  //updateCategory(category: Category): Observable<Category> {
  //  return this.http.put<Category>(this.apiURLCategories + category.id, category);
  //    }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
      }
  //deleteCategory(categoryId : string): Observable<Record<string, unknown>> {
  //  return this.http.delete<Record<string, unknown>>(`http://localhost:3000/api/v1/categories/${categoryId}`)
  //}
  deleteCategory(categoryId : string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`)
  }
}
