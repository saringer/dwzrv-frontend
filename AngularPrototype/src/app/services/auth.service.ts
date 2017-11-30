import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  admin = false;

  constructor() { }

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
