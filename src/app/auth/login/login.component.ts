import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { WelcomeComponent } from 'src/app/welcome/welcome.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  providers;
  theme;
  isAuth = false;
  authSubscribe: Subscription;
  afAuthSubscribe: Subscription;
  checkForVerifiedInterval;

  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
    ) {
    this.providers = AuthService.providers;
    this.theme = AuthService.theme;
   }

  ngOnInit() {
    // for navigation after loading
    this.afAuthSubscribe = this.afAuth.authState.subscribe(user => {
      if (user && user.emailVerified) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    // during initial phase
    this.authSubscribe = this.auth.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onSignUpSuccess(event: any) {
    console.log(event);
    this.checkForVerifiedInterval = setInterval(() => {
      this.afAuth.auth
        .currentUser
        .reload()
        .then(ok => {
          if (this.afAuth.auth.currentUser.emailVerified) {
            this.openSnackBar();
            clearInterval(this.checkForVerifiedInterval);
            this.auth.authChange.next(true);
            this.router.navigate(['/']);
          }
        });
    }, 1000);
  }
  openSnackBar() {
    this.snackBar.open('Logged in successfully', 'OK');
  }

  ngAfterViewInit() {
    (document.querySelector('ngx-auth-firebaseui-providers') as HTMLElement).style.padding = '10px';
  }
  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
    this.afAuthSubscribe.unsubscribe();
  }
}
