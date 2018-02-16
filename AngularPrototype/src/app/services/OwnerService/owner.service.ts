import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Dogowner} from "../../data-models/dogowner";

@Injectable()
export class OwnerService {

  private saveOwnerUrl = 'http://localhost:8080/save/owner';  // URL to web api
  private ownersUrl = 'http://localhost:8080/get/owners';


  dataChange: BehaviorSubject<Dogowner[]> = new BehaviorSubject<Dogowner[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Dogowner[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllOwners(): void {
    this.http.get<Dogowner[]>(this.ownersUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  /**
   * Get Methods
   *
   */



  getOwners(): Observable<Dogowner[]> {
    return this.http.get<Dogowner[]>(this.ownersUrl);
  }


  /**
   * Add Methods
   */

  addOwner (dogowner: Dogowner): void {
    const req = this.http.post(this.saveOwnerUrl, dogowner);
    req.subscribe(dogowner => this.dialogData = dogowner);
  }

}
