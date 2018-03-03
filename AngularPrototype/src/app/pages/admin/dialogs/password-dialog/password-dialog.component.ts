import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/AuthService/auth.service";
import {CanActivate} from "@angular/router";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService,public dialogRef: MatDialogRef<PasswordDialogComponent>) { }

  ngOnInit() {
  }

  isAdmin =false;

  authenticate() {
    this.authService.login();
    this.isAdmin = true;
  }
  isLoggedIn() {
    this.authService.isLoggedIn();
  }

  login() {
    this.authenticate();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {


  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isLoggedIn();
  }

}
