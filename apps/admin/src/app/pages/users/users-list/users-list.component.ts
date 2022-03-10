/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@divstd/users';
import { ConfirmationService,MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 declare const require: any;


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
endsubs$ : Subject<any> = new Subject();
  users : any;
  user: any;
  constructor(
    private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this._getUsers();

  }

  ngOnDestroy(): void {
    console.log('categories is destroyed');
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  // updateUser(userId : any){
    // return this.userService.getUser(userId).subscribe(user => {
    //   this.user = user;
    // })
  //}
  updateUser(userId : string){
    this.router.navigateByUrl(`users/form/${userId}`);
    }
    deleteUser(userId: string) {
      this.confirmationService.confirm({
        message: 'Do you want to Delete this User?',
        header: 'Delete User',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(userId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getUsers();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is deleted!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User is not deleted!'
              });
            }
          );
        }
      });
    }




  _getUsers(){
    this.userService.getUsers()
    .pipe(takeUntil(this.endsubs$))
    .subscribe(users => {
      this.users = users;

  });
  }

  //getCountryName(countryKey: string): any {
  //  if (countryKey){ return this.userService.getCountry(countryKey); }
  //}
  getCountryName(countryCode: string){
      countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
         const countryName = countriesLib.getName(countryCode, "en", {select: "official"});
             return countryName;
              }
}
