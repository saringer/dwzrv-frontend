import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Dogowner} from "../../data-models/dogowner";
import {AppSettings} from "../../appsettings";

@Injectable()
export class OwnerService {




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
    this.http.get<Dogowner[]>(AppSettings.ownersUrl).subscribe(data => {
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
    return this.http.get<Dogowner[]>(AppSettings.ownersUrl);
  }


  /**
   * Add Methods
   */

  addOwner (dogowner: Dogowner): void {
    const req = this.http.post(AppSettings.saveOwnerUrl, dogowner);
    req.subscribe(dogowner => this.dialogData = dogowner);
  }

  updateOwner(dogowner: Dogowner): void {
    this.http.put(AppSettings.updateOwnerUrl + dogowner.id, dogowner).subscribe(data => {
        this.dialogData = dogowner;
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteOwner(id: number): void {
    this.http.delete(AppSettings.deleteOwnerUrl + id).subscribe(data => {

        //  this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

}
