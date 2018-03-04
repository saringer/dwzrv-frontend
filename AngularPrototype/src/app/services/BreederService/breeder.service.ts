import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";

@Injectable()
export class BreederService {




  dataChange: BehaviorSubject<Breeder[]> = new BehaviorSubject<Breeder[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {

  }

  get data(): Breeder[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }



  getAllBreeder(): void {
    this.http.get<Breeder[]>(AppSettings.breedersUrl).subscribe(data => {
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



  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(AppSettings.breedersUrl);
  }


  /**
   * Add Methods
   */

  addBreeder (breeder: Breeder): void {

    const req = this.http.post(AppSettings.saveBreederUrl, breeder);
    req.subscribe(breeder => this.dialogData = breeder);
   // this.dialogData = breeder;
  }


  updateBreeder(breeder: Breeder): void {
    this.http.put(AppSettings.updateBreederUrl + breeder.id, breeder).subscribe(data => {
        this.dialogData = breeder;
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteBreeder(id: number): void {
    this.http.delete(AppSettings.deleteBreederUrl + id).subscribe(data => {

      //  this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

}



