/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@divstd/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import { ORDER_STATUS } from '../order.constants';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();
  order?: Order | null | undefined | any;;
  orderStatuses: { id: any; name: any; }[] = [];
  selectedStatus: any;
  //order: Order | null | undefined | any;
  //orderStatuses: { [key: string]: any } = [];
  //selectedStatus: any;

  //order?: Order;
  //orderStatuses: { id: string; name:  string; }[] = [];
  //selectedStatus: any;
  //key: string | any | undefined ;


  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  // private _mapOrderStatus() {
  //    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
  //      return {
  //        id: key,
  //        name: this.orderStst[key].label
  //      };
  //    });
  // }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {

      return {
        id: key,
        name:  ORDER_STATUS[key].label

      };

    });

  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe((order) => {
          this.order = order;
          //console.log(this.order);
          this.selectedStatus = order.status;

        });
      }
    });
  }

  onStatusChange(event: any) {
     this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
       () => {
         this.messageService.add({
           severity: 'success',
           summary: 'Success',
           detail: 'Order is updated!'
         });
       },
       () => {
         this.messageService.add({
           severity: 'error',
           summary: 'Error',
           detail: 'Order is not updated!'
         });
       }
     );
   }
  }
  //  onStatusChange(event: any) {
  //   //console.log(event);
  //    this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
  //      (order) => {
  //        console.log(order);
  //        this.messageService.add({
  //          severity: 'success',
  //          summary: 'Success',
  //          detail: 'Order is updated!'
  //        });
  //      },
  //      (error) => {
  //        this.messageService.add({
  //          severity: 'error',
  //          summary: 'Error',
  //          detail: 'Order is not updated!'
  //        });
  //      }
  //    );
  //  }



