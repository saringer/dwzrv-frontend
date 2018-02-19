import {Component, Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {CanActivate} from "@angular/router";
import {AuthService} from "./services/AuthService/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'app';
  isAdmin =false;

  authenticate() {
    this.authService.login();
    this.isAdmin = true;
  }
  isLoggedIn() {
    this.authService.isLoggedIn();
  }


}
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {


  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isLoggedIn();
  }
}

