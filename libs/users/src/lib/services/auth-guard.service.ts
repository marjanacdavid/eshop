import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageToken: LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

const token = this.localStorageToken.getToken();

  if(token) {
   // console.log(token);
    //const tokenDecode = atob(token.split('.')[1]);
    //console.log(tokenDecode);
    //to use parts of a tokedecode and manipulate us json.parse of it
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
   // if(tokenDecode.isAdmin){
   //   return true
    //}
    if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
  }
    this.router.navigate(['/login']);
    return false;
  }
  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
