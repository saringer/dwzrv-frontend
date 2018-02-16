import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Breeder} from "../../data-models/breeder";
import {Club} from "../../data-models/club";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";
import {Tournament} from "../../data-models/tournament";

@Injectable()
export class DogService {
  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';

  private saveDogpassUrl = 'http://localhost:8080/save/dog';  // URL to web api


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
    this.http.get<Dogpass[]>(this.dogsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }



  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }


  // ADD, POST METHOD
  addDog (dog: Dogpass): void {
    const req = this.http.post(this.saveDogpassUrl, dog);
    req.subscribe(dog => this.dialogData = dog);
  }

  // DELETE METHOD
  deleteItem(id: number): void {
   /* this.httpClient.delete(this.API_URL + id).subscribe(data => {
        console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );*/
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


