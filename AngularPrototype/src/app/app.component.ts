import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./services/AuthService/auth.service";
import {MatDialog} from "@angular/material";
import {PasswordDialogComponent} from "./pages/admin/dialogs/password-dialog/password-dialog.component";
import {Observable} from "rxjs/Observable";
import {SearchService} from "./services/SearchService/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  @ViewChild('filterCoursing') filterCoursing: ElementRef;


  constructor(private searchService: SearchService,private router: Router, public authService: AuthService, public dialog: MatDialog) {}

  onKey(event: any) { // without type info
    this.searchService.changeFilterString(event.target.value);
  }


  onAdminLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/coursing']);

}

  onAdminLoginClick() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    //this.authenticate();
  }

  authenticate() {
    this.authService.login();
   // this.isAdmin = true;
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


