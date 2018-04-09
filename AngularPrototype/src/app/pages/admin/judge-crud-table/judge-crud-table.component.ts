import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {JudgeService} from "../../../services/JudgeService/judge.service";
import {Judge} from "../../../data-models/judge";
import {JudgeDialogComponent} from "../dialogs/judge-dialog/judge-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {JudgeEditComponent} from "../dialogs/judge-dialog/judge-edit-dialog/judge-edit.component";
import {JudgeDeleteDialogComponent} from "../dialogs/judge-dialog/judge-delete-dialog/judge-delete-dialog.component";
import {SearchService} from "../../../services/SearchService/search.service";

@Component({
  selector: 'app-judge-crud-table',
  templateUrl: './judge-crud-table.component.html',
  styleUrls: ['./judge-crud-table.component.css']
})
export class JudgeCrudTableComponent implements OnInit {

  @ViewChild('paginatorJudge') paginatorJudge: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsJudge = ['firstname', 'lastname', 'nationality', 'action'];
  dataSourceJudge: JudgeDataSource | null;
  id: number;



  constructor(private searchService: SearchService, public dialog: MatDialog, private http: HttpClient,private judgeService: JudgeService) { }

  ngOnInit() {
    this.paginatorJudge._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorJudge._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorJudge._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataJudge();
    }

  onCreateJudgeClick(judge: Judge) {
    const dialogRef = this.dialog.open(JudgeDialogComponent, {
      data: {judge: judge}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.judgeService.dataChange.value.push(this.judgeService.getDialogData());
        this.refreshTableJudge();
      }
    });
  }

  startEdit(id: number, firstname: string, lastname: string, nationality: string) {
    this.id = id;
    const dialogRef = this.dialog.open(JudgeEditComponent, {
      data: {id: id, firstname: firstname,  lastname: lastname, nationality: nationality}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.judgeService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.judgeService.dataChange.value[foundIndex] = this.judgeService.getDialogData();
        // And lastly refresh table
        this.refreshTableJudge();
      }
    });
  }

  deleteItem(id: number, firstname: string, lastname: string) {
    this.id = id;
    const dialogRef = this.dialog.open(JudgeDeleteDialogComponent, {
      data: {id: id, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.judgeService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.judgeService.dataChange.value.splice(foundIndex, 1);
        this.refreshTableJudge();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableJudge() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceJudge._paginatorJudge.hasNextPage()) {
      this.dataSourceJudge._paginatorJudge.nextPage();
      this.dataSourceJudge._paginatorJudge.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceJudge._paginatorJudge.hasPreviousPage()) {
      this.dataSourceJudge._paginatorJudge.previousPage();
      this.dataSourceJudge._paginatorJudge.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceJudge.filter = '';
      this.searchService.currentMessage.subscribe(message => this.dataSourceJudge.filter = message);
    }
  }

  public loadDataJudge() {
    this.dataSourceJudge = new JudgeDataSource(this.judgeService, this.paginatorJudge, this.sort);
    if (!this.dataSourceJudge) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceJudge.filter = message);
    }
  }

}

export class JudgeDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterJudge: string) {
    this._filterChange.next(filterJudge);
  }

  filteredData: Judge[] = [];
  renderedData: Judge[] = [];

  constructor(private judgeService: JudgeService,
              public _paginatorJudge: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorJudge.pageIndex = 0);

  }

  connect(): Observable<Judge[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.judgeService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorJudge.page
    ];

    this.judgeService.getAllJudges();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.judgeService.data.slice().filter((judge: Judge) => {
        const searchStr = (judge.firstname + judge.lastname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorJudge.pageIndex * this._paginatorJudge.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorJudge.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Judge[]): Judge[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'firstname':
          [propertyA, propertyB] = [a.firstname.toLowerCase(), b.firstname.toLowerCase()];
          break;
        case 'lastname':
          [propertyA, propertyB] = [a.lastname.toLowerCase(), b.lastname.toLowerCase()];
          break;
        case 'nationality':
          [propertyA, propertyB] = [a.nationality.toLowerCase(), b.nationality.toLowerCase()];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
