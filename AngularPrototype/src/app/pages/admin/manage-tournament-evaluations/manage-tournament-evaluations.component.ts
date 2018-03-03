import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Rx";
import {TournamentDogService} from "../../../services/TournamentDogService/tournamentdog.service";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TournamentDog} from "../../../data-models/tournamentdog";
import {Tournament} from "../../../data-models/tournament";
import {TournamentService} from "../../../services/TournamentService/tournament.service";

@Component({
  selector: 'app-manage-tournament-evaluations',
  templateUrl: './manage-tournament-evaluations.component.html',
  styleUrls: ['./manage-tournament-evaluations.component.css']
})
export class ManageTournamentEvaluationsComponent implements OnInit {

  @ViewChild('paginatorTournamentDog') paginatorTournamentDog: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterTournamentDog') filterTournamentDog: ElementRef;

  tournaments: Observable<Tournament[]>;
  displayedColumnsTournamentDog = ['dogname', 'coursing'];
  dataSourceTournamentDog: TournamentDogDataSource | null;
  firstFormGroup: FormGroup;
  selected_awarding: any;

  constructor(public dialog: MatDialog,
              private tournamentDogService: TournamentDogService,
              private _formBuilder: FormBuilder,
              private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.tournaments = this.tournamentService.getTournaments();
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
    this.tournamentDogService.addTournamentDog(this.dataSourceTournamentDog.renderedData[idx]);
    //console.log(JSON.stringify(this.dataSourceTournamentDog.renderedData[idx]));


  }

  stepperSelectionChangeDogJudgement(event) {
    //this.tournamentDogService.getAllTournamentDogForTournament(this.selected_awarding.id);
    if (this.selected_awarding.tournamenttype == 'Coursing') {
      this.displayedColumnsTournamentDog = ['dogname', 'coursing'];
    }
    if (this.selected_awarding.tournamenttype == 'Ausstellung') {
      this.displayedColumnsTournamentDog = ['dogname', 'exhibition'];
    }
    if (this.selected_awarding.tournamenttype == 'Rennen') {
      this.displayedColumnsTournamentDog = ['dogname', 'race'];
    }


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
      this.dataSourceTournamentDog.filter = this.filterTournamentDog.nativeElement.value;
    }
  }


  public loadDataTournamentDog() {
    this.dataSourceTournamentDog = new TournamentDogDataSource(this.tournamentDogService, this.paginatorTournamentDog, this.sort);
    Observable.fromEvent(this.filterTournamentDog.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceTournamentDog) {
          return;
        }
        this.dataSourceTournamentDog.filter = this.filterTournamentDog.nativeElement.value;
      });
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

  filteredData: TournamentDog[] = [];
  renderedData: TournamentDog[] = [];

  constructor(private tournamentDogService: TournamentDogService,
              public _paginatorTournamentDog: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournamentDog.pageIndex = 0);

  }

  connect(): Observable<TournamentDog[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.tournamentDogService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournamentDog.page
    ];

    this.tournamentDogService.getAllTournamentDog();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.tournamentDogService.data.slice().filter((tournamentDog: TournamentDog) => {
        const searchStr = (tournamentDog.dogname + tournamentDog.coursingrating1).toLowerCase();
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
  sortData(data: TournamentDog[]): TournamentDog[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.dogname, b.dogname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
