import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {Tournament} from "../../../data-models/tournament";
import {TournamentDialogComponent} from "../dialogs/tournament-dialog/tournament-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {HttpClient} from "@angular/common/http";
import {OwnerEditDialogComponent} from "../dialogs/owner-dialog/owner-edit-dialog/owner-edit-dialog.component";
import {OwnerDeleteDialogComponent} from "../dialogs/owner-dialog/owner-delete-dialog/owner-delete-dialog.component";
import {TournamentEditDialogComponent} from "../dialogs/tournament-dialog/tournament-edit-dialog/tournament-edit-dialog.component";
import {TournamentDeleteDialogComponent} from "../dialogs/tournament-dialog/tournament-delete-dialog/tournament-delete-dialog.component";
import {Club} from "../../../data-models/club";
import {SearchService} from "../../../services/SearchService/search.service";

@Component({
  selector: 'app-tournament-crud-table',
  templateUrl: './tournament-crud-table.component.html',
  styleUrls: ['./tournament-crud-table.component.css']
})
export class TournamentCrudTableComponent implements OnInit {


  showDetailView: boolean = false;
  @ViewChild('paginatorTournament') paginatorTournament: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumsTournament = ['title', 'date', 'club','tournamenttype', 'double_weighted', 'action'];
  dataSourceTournament: TournamentDataSource;
  id: number;
  selectedTournament: any;

  get self(): TournamentCrudTableComponent {
    return this;
  }

  constructor(private searchService: SearchService, public dialog: MatDialog, private http: HttpClient,private tournamentService: TournamentService) { }

  ngOnInit() {
    this.paginatorTournament._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorTournament._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorTournament._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataTournaments();

  }

  openDetailView(element) {
    this.selectedTournament = element;
    this.showDetailView = true;
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



  startEdit(id: number, title: string, tournamenttype: string, club: Club, date: Date, double_weighted: boolean) {
    this.id = id;
    const dialogRef = this.dialog.open(TournamentEditDialogComponent, {
      data: {id: id, title: title, tournamenttype: tournamenttype,  club: Club, date: Date, double_weighted: double_weighted}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.tournamentService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.tournamentService.dataChange.value[foundIndex] = this.tournamentService.getDialogData();
        // And lastly refresh table
        this.refreshTableTournament();
      }
    });
  }

  deleteItem(id: number, title: string) {
    this.id = id;
    const dialogRef = this.dialog.open(TournamentDeleteDialogComponent, {
      data: {id: id, title: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.tournamentService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.tournamentService.dataChange.value.splice(foundIndex, 1);
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
      this.searchService.currentMessage.subscribe(message => this.dataSourceTournament.filter = message);
    }
  }

  public loadDataTournaments() {
    this.dataSourceTournament = new TournamentDataSource(this.tournamentService, this.paginatorTournament, this.sort);
    if (!this.dataSourceTournament) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceTournament.filter = message);
    }
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
        const searchStr = (tournament.title + tournament.club.clubname + tournament.tournamenttype + tournament.date).toLowerCase();
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
      let propertyA: boolean | number | string = '';
      let propertyB: boolean | number | string = '';

      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title.toLowerCase(), b.title.toLowerCase()];
          break;
        case 'club':
          [propertyA, propertyB] = [a.club.clubname.toLowerCase(), b.club.clubname.toLowerCase()];
          break;
        case 'tournamenttype':
          [propertyA, propertyB] = [a.tournamenttype.toLowerCase(), b.tournamenttype.toLowerCase()];
          break;
        case 'double_weighted':
          [propertyA, propertyB] = [a.double_weighted, b.double_weighted];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date.toString(), b.date.toString()];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
