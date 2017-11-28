import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompetitionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:8080/dogs';

  constructor(private http: Http) {
  }

  fetchData() {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}

export class SearchService {

}
