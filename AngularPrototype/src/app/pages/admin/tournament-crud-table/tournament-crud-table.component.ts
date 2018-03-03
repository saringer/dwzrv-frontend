import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {Tournament} from "../../../data-models/tournament";
import {TournamentDialogComponent} from "../dialogs/tournament-dialog/tournament-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tournament-crud-table',
  templateUrl: './tournament-crud-table.component.html',
  styleUrls: ['./tournament-crud-table.component.css']
})
export class TournamentCrudTableComponent implements OnInit {

  @ViewChild('paginatorTournament') paginatorTournament: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterTournament') filterTournament: ElementRef;

  displayedColumsTournament = ['title', 'club','tournamenttype', 'date', 'action'];
  dataSourceTournament: TournamentDataSource | null;


  constructor(public dialog: MatDialog, private http: HttpClient,private tournamentService: TournamentService) { }

  ngOnInit() {
    this.loadDataTournaments();

  }

  onCreateTournamentClick(tournament: Tournament) {
    const dialogRef = this.dialog.open(TournamentDialogComponent, {
      data: {tournament: tournament}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.tournamentService.dataChange.value.push(this.tournamentService.getDialogData());
        this.refreshTableTournament();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableTournament() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceTournament._paginatorTournament.hasNextPage()) {
      this.dataSourceTournament._paginatorTournament.nextPage();
      this.dataSourceTournament._paginatorTournament.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceTournament._paginatorTournament.hasPreviousPage()) {
      this.dataSourceTournament._paginatorTournament.previousPage();
      this.dataSourceTournament._paginatorTournament.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceTournament.filter = '';
      this.dataSourceTournament.filter = this.filterTournament.nativeElement.value;
    }
  }

  public loadDataTournaments() {
    this.dataSourceTournament = new TournamentDataSource(this.tournamentService, this.paginatorTournament, this.sort);
    Observable.fromEvent(this.filterTournament.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceTournament) {
          return;
        }
        this.dataSourceTournament.filter = this.filterTournament.nativeElement.value;
      });
  }
}

export class TournamentDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterTournament: string) {
    this._filterChange.next(filterTournament);
  }

  filteredData: Tournament[] = [];
  renderedData: Tournament[] = [];

  constructor(private tournamentService: TournamentService,
              public _paginatorTournament: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournament.pageIndex = 0);

  }

  connect(): Observable<Tournament[]> {
    const displayDataChanges = [
      this.tournamentService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournament.page
    ];

    this.tournamentService.getAllTournaments();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.tournamentService.data.slice().filter((tournament: Tournament) => {
        const searchStr = (tournament.title + tournament.date).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorTournament.pageIndex * this._paginatorTournament.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorTournament.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Tournament[]): Tournament[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.title, b.title];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
