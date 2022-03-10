// import { Injectable } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { fetch } from '@nrwl/angular';

// import * as UsersActions from './users.actions';
// import * as UsersFeature from './users.reducer';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersFeature from './users.reducer';
import * as UsersActions from './users.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';
@Injectable()
export class UsersEffects {

    buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localstorageService.isValidToken()) {
          const userId = this.localstorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUserSessionFailed()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        } else {
          return of(UsersActions.buildUserSessionFailed());
        }
      })
    )
  );
    constructor(private readonly actions$: Actions,private localstorageService: LocalstorageService,private usersService: UsersService) {}
}





  // init$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UsersActions.init),
    //         fetch({
    //             run: (action) => {
    //                 // Your custom service 'load' logic goes here. For now just return a success action...
    //                 return UsersActions.loadUsersSuccess({ users: [] });
    //             },
    //             onError: (action, error) => {
    //                 console.error('Error', error);
    //                 return UsersActions.loadUsersFailure({ error });
    //             }
    //         })
    //     )
    // );
