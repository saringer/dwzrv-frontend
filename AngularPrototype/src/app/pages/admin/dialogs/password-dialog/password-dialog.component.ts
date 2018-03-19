import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../../services/AuthService/auth.service";
import {CanActivate, Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  @ViewChild('user') user:any;
  @ViewChild('password') password:any;
  form: FormGroup;
  

  constructor(private router: Router, private authService: AuthService, public dialogRef: MatDialogRef<PasswordDialogComponent>, fb: FormBuilder) {

    this.form = fb.group({
      password: ['', Validators.required]})


  }
  onSubmit() {

  }

  ngOnInit() {
  }


  authenticate() {
    if ((this.user.nativeElement.value === 'dwzrv') && (this.password.nativeElement.value === 'wertungen')) {
      this.authService.login();
      this.router.navigate(['/admin']);  }
    }


  isLoggedIn() {
    this.authService.isLoggedIn();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {


  constructor(private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isLoggedIn();
  }

}

export class PasswordValidation {
  authService2: AuthService;

  constructor(private authService: AuthService) {
  }

  static ValidPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    if(password != 'admin') {
      console.log('false');
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      console.log('true');
      return null
    }
  }
}
