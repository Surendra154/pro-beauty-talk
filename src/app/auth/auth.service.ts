import { Injectable } from '@angular/core';
import { AuthProcessService, AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { Observable, Subject } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  static providers: any;
  static theme;
  authChange = new Subject<boolean>();
  user;
  user$: Observable<User>;

  public isAuth;
  constructor(
    private ngxAuth: AuthProcessService,
    private afAuth: AngularFireAuth
    ) {
      AuthService.providers = AuthProvider;
      AuthService.theme = Theme;
      this.isAuth = false;
    }

  initAuthListener() {

    this.ngxAuth.user$.subscribe(user => {
      if (user) {
        console.log(user);
        this.user = user;

        if (!user.emailVerified) {
          this.isAuth = false;
          this.authChange.next(false);
        } else {
          this.isAuth = true;
          this.authChange.next(true);
        }
        console.log('isauth: ' + this.isAuth);
      } else {
        console.log('random stuff');
        this.authChange.next(false);
        this.isAuth = false;
      }
    });

  }

  signOut() {
    this.ngxAuth.signOut();
  }

}
