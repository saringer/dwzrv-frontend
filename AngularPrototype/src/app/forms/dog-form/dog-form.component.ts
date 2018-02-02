import { Component, OnInit } from '@angular/core';
import {Dogpass} from '../../data-models/dogpass'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectItem} from 'primeng/primeng'
import {Dogowner} from "../../data-models/dogowner";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {DogService} from "../../services/DogService/dog.service";


@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.css'],

})
export class DogFormComponent implements OnInit {

  constructor(private http: HttpClient, private dogService: DogService) {

    this.getOwners();
    this.getBreeders();
  }

  owners: any;
  breeders: any;

  private getOwnersUrl = 'http://localhost:8080/get/owners';
  private getBreedersUrl = 'http://localhost:8080/get/breeders';


  getBreeders() {
    this.http.get<Breeder[]>(this.getBreedersUrl).subscribe(breeders => this.breeders = breeders);
  }
  getOwners() {
     this.http.get<Dogowner[]>(this.getOwnersUrl).subscribe(owners => this.owners = owners);
  }

  sex = ['male', 'female'];

  model = new Dogpass(0,'', '', '', '', null, '', new Breeder(1,'', '', '', '', '', '', ''), new Date(2017, 11, 1),new Dogowner(1,'Harry', 'Schmitt', '', 'Chuck Overstreet', 'red', '', new Date(2017, 11, 1)));

  submitted = false;
  items: Array<string>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }





  onSubmit() {
    const req = this.http.post(this.saveDogpassUrl, this.model);
    this.dogService.addDog(this.model);
    req.subscribe();

  }

  /* GET heroes whose name contains search term */
  /*searchHeroes(term: string): Observable<Dogpass[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Dogpass[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Dogpass[]>('searchHeroes', []))
    );
  }*/

  /** PUT: update the hero on the server */
  /*updateDogpass (dogpass: Dogpass): Observable<any> {
    return this.http.put(this.saveDogpassUrl, dogpass, this.httpOptions).pipe(
      tap(_ => console.log("something")),
      catchError(null)
    );
  }*/



  private saveDogpassUrl = 'http://localhost:8080/save/dog';  // URL to web api

  private searchDogpassUrl = 'http://localhost:8080/search';  // URL to web api



  ngOnInit() {
  }

}
