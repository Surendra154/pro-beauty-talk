import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth;
  authSubscribe: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.authSubscribe = this.auth.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  // onLoginclick() {
  //   this.auth.initAuthListener();
  // }
  onSideNavToggle() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.auth.signOut();
  }

  ngOnDestroy(): void {
    this.authSubscribe.unsubscribe();
  }

}
