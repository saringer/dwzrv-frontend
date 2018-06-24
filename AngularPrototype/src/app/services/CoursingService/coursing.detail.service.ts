import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Club} from "../../data-models/club";
import {AppSettings} from "../../appsettings";
import {Coursingdetail} from "../../data-models/coursingdetail";

@Injectable()
export class CoursingDetailService {




  dataChange: BehaviorSubject<Coursingdetail[]> = new BehaviorSubject<Coursingdetail[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Coursingdetail[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllCoursingDetailsForDog(dog_id: number, coursing_class: string, year: string): void {
    this.http.get<Coursingdetail[]>(AppSettings.coursingDetailsUrl + dog_id + '/' + coursing_class + '/' +  year ).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }




}
