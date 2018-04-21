import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Rx";
import {SearchService} from "../../services/SearchService/search.service";
import {Raceresult} from "../../data-models/raceresult";
import {RaceRankingService} from "../../services/RaceRankingService/race-ranking.service";
import {RaceDetailDialogComponent} from "./dialogs/race-detail-dialog/race-detail-dialog.component";

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.css']
})
export class RacingComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorRace') paginatorRace: MatPaginator;




  displayedColumns = ['position', 'punkte', 'name', 'besitzer', 'gesamtteilnahme', 'inwertung'];
  dataSourceRace: RaceDataSource | null;
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';
  years: String[] = [];
  selected: string = String(new Date().getFullYear()-1);
  tabIndex: number = 0;
  selectedYear: string = String(new Date().getFullYear()-1);
  selected_race_class: string = 'a';




  constructor(private dialog: MatDialog, private searchService: SearchService, private raceRankingService: RaceRankingService) {
    var year = new Date().getFullYear();
    var range = [];

    for (var i = 0; i < 7; i++) {
      this.years.push(
        // String(year - i)
        //parseInt(String(year + i).slice(2, 4));
        String((year-1) - i)
        // ""
      );
    }
  }

  ngOnInit() {
    this.paginatorRace._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorRace._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorRace._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataRace();
  }

  onYearChange(event) {

    if (this.tabIndex === 0) {
      this.raceRankingService.getAllRaces('a', 'Rüde', this.selectedYear);
    }
    else if (this.tabIndex === 1) {
      this.raceRankingService.getAllRaces('a', 'Hündin', this.selectedYear);
    }
    else if (this.tabIndex === 2) {
      this.raceRankingService.getAllRaces('elementary', 'Rüde', this.selectedYear);
    }
    else if (this.tabIndex === 3) {
      this.raceRankingService.getAllRaces('elementary', 'Hündin', this.selectedYear);
    }
    else if (this.tabIndex === 4) {
      this.raceRankingService.getAllRaces('national', 'Rüde', this.selectedYear);
    }
    else if (this.tabIndex === 5) {
      this.raceRankingService.getAllRaces('national', 'Hündin', this.selectedYear);
    }
    else if (this.tabIndex === 6) {
      this.raceRankingService.getAllRaces('senior', 'Rüde', this.selectedYear);
    }
    else if (this.tabIndex === 7) {
      this.raceRankingService.getAllRaces('senior', 'Hündin', this.selectedYear);
    }


  }

  public loadDataRace() {

    this.dataSourceRace = new RaceDataSource(this.raceRankingService, this.paginatorRace, this.sort);
    if (!this.dataSourceRace) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceRace.filter = message);
    }

  }

  openRaceDetailView(element, selected_race_class, year) {
    this.dialog.open(RaceDetailDialogComponent, {
      data:{element, selected_race_class, year}});

  }


  hover(element) {
   // this.whippetImg = 'assets/img/whippet.png';
  }
  unhover(element) {
  //  this.whippetImg = 'assets/img/whippet_grau.png';
  }

  onTabSwitch(event) {

    if (event.index === 0) {
      this.tabIndex = event.index;
      this.selected_race_class = 'a';
      this.raceRankingService.getAllRaces('a', 'Rüde', this.selectedYear);
    }
    else if (event.index === 1) {
      this.tabIndex = event.index;
      this.selected_race_class = 'a';
      this.raceRankingService.getAllRaces('a', 'Hündin', this.selectedYear);
    }
    else if (event.index === 2) {
      this.tabIndex = event.index;
      this.selected_race_class = 'elementary';
      this.raceRankingService.getAllRaces('elementary', 'Rüde', this.selectedYear);
    }
    else if (event.index === 3) {
      this.tabIndex = event.index;
      this.selected_race_class = 'elementary';
      this.raceRankingService.getAllRaces('elementary', 'Hündin', this.selectedYear);
    }
    else if (event.index === 4) {
      this.tabIndex = event.index;
      this.selected_race_class = 'national';
      this.raceRankingService.getAllRaces('national', 'Rüde', this.selectedYear);
    }
    else if (event.index === 5) {
      this.tabIndex = event.index;
      this.selected_race_class = 'national';
      this.raceRankingService.getAllRaces('national', 'Hündin', this.selectedYear);
    }
    else if (event.index === 6) {
      this.tabIndex = event.index;
      this.selected_race_class = 'senior';
      this.raceRankingService.getAllRaces('senior', 'Rüde', this.selectedYear);
    }
    else if (event.index === 7) {
      this.tabIndex = event.index;
      this.selected_race_class = 'senior';
      this.raceRankingService.getAllRaces('senior', 'Hündin', this.selectedYear);
    }

  }
}



export class RaceDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterCoursing: string) {
    this._filterChange.next(filterCoursing);
  }

  filteredData: Raceresult[] = [];
  renderedData: Raceresult[] = [];

  constructor(private raceRankingService: RaceRankingService,
              public _paginatorCoursing: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorCoursing.pageIndex = 0);

  }

  connect(): Observable<Raceresult[]> {
    const displayDataChanges = [
      this.raceRankingService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorCoursing.page
    ];
    var year = new Date().getFullYear();
    this.raceRankingService.getAllRaces('a', 'Rüde', String(year-1));
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.raceRankingService.data.slice().filter((raceResult: Raceresult) => {
        const searchStr = (raceResult.dogname + raceResult.ownername + raceResult.totalParticipations + raceResult.totalPoints + raceResult.ranking).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorCoursing.pageIndex * this._paginatorCoursing.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorCoursing.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Raceresult[]): Raceresult[] {
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



