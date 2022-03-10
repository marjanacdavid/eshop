/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
declare const require: any;


//import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
  //  countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

   getCountries(): { id: string; name: string }[] {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));// bez ovoga ne radi
     return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
       return {
         id: entry[0],
         name: entry[1]
       };
     });
   }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }


initAppSession() {
  this.usersFacade.buildUserSession();
}

observeCurrentUser() {
  return this.usersFacade.currentUser$;
}

isCurrentUserAuth() {
  return this.usersFacade.isAuthenticated$;
}

 // eslint-disable-next-line @typescript-eslint/no-var-requires
 //countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
 //this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map((entry)=>{
 // return {
 //   id: entry[0],
 //   name: entry[1]
 // };
 //})
}
