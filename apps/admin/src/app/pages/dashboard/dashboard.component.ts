import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@divstd/orders';
import { ProductsService } from '@divstd/products';
import { UsersService } from '@divstd/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statistics : any = [];
  //totalProducts: any = [];
  //totalOrders: any| number = [];
//totalSales: any;

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    ////window.alert("we use cookies,if you want to continue to page click OK!");
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {

      this.statistics = values;

    });
  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  //  private _totalOrders(){
  //    this.ordersService.ordersCount().subscribe(res=>{
  //      this.totalOrders= res;
  //      console.log(this.totalOrders);
  //    })
  //  }


  //  private _totalSales(){
  //    this.ordersService.totalSales().subscribe(res=>{
  //      this.totalSales= res.totalSales
  //    })
  //  }

  // private _totalUsers(){
  //   this.userService.usersCount().subscribe(res=>{
  //     this.totalUsers= res.userCount
  //   })
  // }

  //  private _totalProducts(){
  //    this.productService.productsCount().subscribe(res=>{
  //      this.totalProducts = res.productCount
  //    })
  //  }
}

