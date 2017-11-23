import { Component, OnInit } from '@angular/core';
import {Dogpass} from '../dogpass'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.css'],

})
export class DogFormComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.toString();
      });

  }
  //constructor(public searchService: SearchService) {}


  clickMessage = '';
  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';
  results: Object;
  searchTerm$ = new Subject<string>();

  onClickMe() {
  }

  sex = ['male', 'female'];

  model = new Dogpass(0,'', 'MyDog', '', 'Chuck Overstreet', 12, 'red', '', new Date(2013, 11, 1));

  submitted = false;
  items: Array<string>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  onSubmit() {
   // const req = this.http.post(this.saveDogpassUrl, this.model);
    //this.clickMessage = "submit sent";
    //req.subscribe();
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

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term)
      .map(res => res.toString());
  }



  private saveDogpassUrl = 'http://localhost:8080/save';  // URL to web api


  ngOnInit() {
  }

}
