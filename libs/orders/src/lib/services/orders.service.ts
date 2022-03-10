/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';


@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  [x: string]: any;

  apiURLOrders = environment.apiUrl + 'orders';
  apiURLProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient) {}  //(, private stripeService: StripeService)  javi error dependency injection DI

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  //  ordersCount(): Observable<number> {
  //    return this.http.get<number>(`${this.apiURLOrders}/get/count`).pipe(map((objectValue: any) => objectValue.orderCount));
  //  }

   getOrdersCount(): Observable<number> {
     return this.http
       .get<number>(`${this.apiURLOrders}/get/count`)
       .pipe(map((objectValue: any) => objectValue.orderCount));
   }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  // totalSales(): Observable<any> {
  //   return this.http.get('http://localhost:3000/orders/get/totalsales');
  // }

  getProduct(productId: any): Observable<any> {  // string
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }

  createCheckoutSession(orderItem: OrderItem[]): any{
      return this.http.post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItem).pipe(
        switchMap((session: { id: string }) => {
          return this.stripeService.redirectToCheckout({ sessionId: session.id });
        })
        );
    }
 // createCheckoutSession(orderItem: OrderItem[]): Observable<any> {  // or we can  Observable<{id : string}> - return type id type of string
 //   return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItem);
 // }
 // or we can use like this
 // createCheckoutSession(orderItem: OrderItem[]): Observable<{ id: string }> {
 //   return this.http.post<{ id: string }>(`${this.apiURLOrders}/create-checkout-session`, orderItem);
  //}
cacheOrderData(order: Order) {
  localStorage.setItem('orderData', JSON.stringify(order))
}

getCachedOrderData(): Order {
  return JSON.parse(localStorage.getItem('orderData')!);
}

removeCachedOrderData() {
  localStorage.removeItem('orderData');
}

  }
