import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {AppSettings} from "../../appsettings";
import {Judge} from "../../data-models/judge";


@Injectable()
export class DogService {



  dataChange: BehaviorSubject<Dogpass[]> = new BehaviorSubject<Dogpass[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Dogpass[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  getAllDogs(): void {
    this.http.get<Dogpass[]>(AppSettings.dogsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  getDogById(dog_id: number) {
    return this.http.get<Dogpass>(AppSettings.getDogUrl + dog_id);
  }

  getDogsAsArray() {
    return this.http.get<Dogpass[]>(AppSettings.dogsUrl);
  }


  // ADD, POST METHOD
  addDog (dog: Dogpass): void {
    const req = this.http.post(AppSettings.saveDogpassUrl, dog);
    req.subscribe(dog => this.dialogData = dog);
  }

  updateDog(dog: Dogpass): void {
    console.log(dog);
    this.http.put(AppSettings.updateDogUrl + dog.id, dog).subscribe(data => {
        this.dialogData = dog;
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteDog(id: number): void {
    this.http.delete(AppSettings.deleteDogUrl + id).subscribe(data => {

        //  this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}


