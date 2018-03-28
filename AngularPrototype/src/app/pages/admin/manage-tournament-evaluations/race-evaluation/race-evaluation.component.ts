import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TournamentDogService} from "../../../../services/TournamentDogService/tournamentdog.service";
import {DataSource} from "@angular/cdk/collections";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {Observable} from "rxjs/Rx";
import {SearchService} from "../../../../services/SearchService/search.service";
import {Tournament} from "../../../../data-models/tournament";
import {Race} from "../../../../data-models/race";
import {RaceService} from "../../../../services/TournamentDogService/RaceService";

@Component({
  selector: 'app-race-evaluation',
  templateUrl: './race-evaluation.component.html',
  styleUrls: ['./race-evaluation.component.css']
})
export class RaceEvaluationComponent implements OnInit {

  @ViewChild('paginatorTournamentDog') paginatorTournamentDog: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tournaments: Observable<Tournament[]>;
  displayedColumnsTournamentDog = ['dogname', 'race'];
  dataSourceTournamentDog: TournamentDogDataSource | null;
  firstFormGroup: FormGroup;
  @Input() selected_awarding: any;

  constructor(private searchService: SearchService,
              public dialog: MatDialog,
              private tournamentDogService: TournamentDogService,
              private raceService: RaceService,
              private _formBuilder: FormBuilder,
              private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.paginatorTournamentDog._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorTournamentDog._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorTournamentDog._intl.previousPageLabel = 'Vorherige Seite';
    this.tournaments = this.tournamentService.getTournaments();

    this.raceService.getAllRacesByTournamentId(this.selected_awarding.id)


    this.loadDataTournamentDog();


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);


  editField(field: string, editValue: string, el: any) {
    console.log(JSON.stringify(this.dataSourceTournamentDog.renderedData));

    let idx = this.dataSourceTournamentDog.renderedData.findIndex(ele => el.dogname == ele.dogname);
    this.dataSourceTournamentDog.renderedData[idx][field] = editValue;
    //console.log(this.dataSourceTournamentDog.renderedData);
    //this.selected_awarding.tournament_dog = this.dataSourceTournamentDog.renderedData;
    // this.tournamentService.updateTournament(this.selected_awarding);
    // this.tournamentDogService.addTournamentDog(new TournamentDog(e.dragData,this.selected,null, this.selected.tournamenttype,e.dragData.name));
    this.tournamentDogService.addTournamentDogRace(this.dataSourceTournamentDog.renderedData[idx]);
    //console.log(JSON.stringify(this.dataSourceTournamentDog.renderedData[idx]));


  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableTournamentDog() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceTournamentDog._paginatorTournamentDog.hasNextPage()) {
      this.dataSourceTournamentDog._paginatorTournamentDog.nextPage();
      this.dataSourceTournamentDog._paginatorTournamentDog.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceTournamentDog._paginatorTournamentDog.hasPreviousPage()) {
      this.dataSourceTournamentDog._paginatorTournamentDog.previousPage();
      this.dataSourceTournamentDog._paginatorTournamentDog.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceTournamentDog.filter = '';
      this.searchService.currentMessage.subscribe(message => this.dataSourceTournamentDog.filter = message);
    }
  }


  public loadDataTournamentDog() {
    this.dataSourceTournamentDog = new TournamentDogDataSource(this.raceService, this.paginatorTournamentDog, this.sort);
    if (!this.dataSourceTournamentDog) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceTournamentDog.filter = message);
    }
  }

}

export class TournamentDogDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterTournamentDog: string) {
    this._filterChange.next(filterTournamentDog);
  }

  filteredData: Race[] = [];
  renderedData: Race[] = [];

  constructor(private raceService: RaceService,
              public _paginatorTournamentDog: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournamentDog.pageIndex = 0);

  }

  connect(): Observable<Race[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.raceService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournamentDog.page
    ];

    //this.tournamentDogService.getAllTournamentDog();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.raceService.data.slice().filter((race: Race) => {
        const searchStr = (race.raceTime + race.racePlacement + race.dogname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorTournamentDog.pageIndex * this._paginatorTournamentDog.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorTournamentDog.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Race[]): Race[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.raceTime, b.raceTime];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
