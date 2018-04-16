

import {Component, Input, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ApiService} from "../../../../../services/DynamicApiService/api.service";

@Component({
  selector: 'app-coursing-evaluation-table',
  templateUrl: './coursing-evaluation-table.component.html',
  styleUrls: ['./coursing-evaluation-table.component.css']
})
export class CoursingEvaluationTableComponent implements OnInit {
  @Input() path: string;
  displayedColumnsTournamentDog = ['dogname', 'coursing'];
  dataSourceTournamentDog: TournamentDogDataSource | null;
  dataSubject = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.dataSourceTournamentDog =  new TournamentDogDataSource(this.dataSubject);
    this.apiService.getData(this.path).subscribe({
      next: value => this.dataSubject.next([value])
    });
  }
}
export class TournamentDogDataSource extends DataSource<any[]> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super ();
  }
  connect (): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect (): void {}
}
