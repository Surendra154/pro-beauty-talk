import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  providers;
  usertest;
  constructor(private auth: AuthService, private router: Router) {
    this.providers = AuthService.providers;
  }

  ngOnInit() {
  }

  async onSignUpSuccess(event: any) {
    // this.usertest =  await this.auth.user.subscribe(
    //   user => {
    //     console.log(user);
    //   }
    // );
    // console.log(this.auth.auth.user);
    // console.log(this.auth.auth.user$);
    console.log(event);
    this.router.navigate(['/']);
  }

}
