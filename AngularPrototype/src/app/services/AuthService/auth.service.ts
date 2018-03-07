import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {

  //admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  admin: boolean = false;

  constructor() {}

  adminVariableAsObservable() {
    //return this.admin.asObservable();
  }

  isLoggedIn():boolean {
      return this.admin;
  }

  login() {
    this.admin = true;
  }
  logout() {
    this.admin = false;
  }

}
