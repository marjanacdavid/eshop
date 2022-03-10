/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@divstd/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();
  orders: Order[] = [];
  orderStatus: { [key: string]: any } = ORDER_STATUS ;

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getOrders() {
    this.ordersService.getOrders()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId: any) {
    //showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
           () => {
             this._getOrders();
             this.messageService.add({
               severity: 'success',
               summary: 'Success',
               detail: 'Order is deleted!'
             });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
       );
      }
    });
  }
}

