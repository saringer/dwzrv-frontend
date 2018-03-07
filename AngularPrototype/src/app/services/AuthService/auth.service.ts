import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {

  admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  //admin = false;

  constructor() {}

  adminVariableAsObservable() {
    return this.admin.asObservable();
  }

  isLoggedIn():boolean {
      return this.admin.getValue();
  }

  login() {
    this.admin.next(true);
  }
  logout() {
    this.admin.next(false);
  }

}
