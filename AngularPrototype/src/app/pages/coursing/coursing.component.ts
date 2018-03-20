import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import {Club} from "../../data-models/club";
import {ClubService} from "../../services/ClubService/club.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Rx";
import {Coursing} from "../../data-models/coursing";
import {CoursingService} from "../../services/CoursingService/coursing.service";
import {Coursingresult} from "../../data-models/coursingresult";
import {ClubDataSource} from "../admin/club-crud-table/club-crud-table.component";
import {SearchService} from "../../services/SearchService/search.service";


@Component({
  selector: 'app-coursing',
  templateUrl: './coursing.component.html',
  styleUrls: ['./coursing.component.css']
})
export class CoursingComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorCoursing') paginatorCoursing: MatPaginator;


  displayedColumns = ['position', 'total', 'name', 'besitzer', 'gesamtteilnahme', 'inwertung'];
  dataSourceCoursing: CoursingDataSource | null;
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';



  constructor(private searchService: SearchService, private coursingService: CoursingService, elementRef: ElementRef) {

  }

  ngOnInit() {
    this.paginatorCoursing._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorCoursing._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorCoursing._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataCoursing();
  }

  hover(element) {
    //this.whippetImg = 'assets/img/whippet.png';
  }

  unhover(element) {
   // this.whippetImg = 'assets/img/whippet_grau.png';
  }

  public loadDataCoursing() {

    this.dataSourceCoursing = new CoursingDataSource(this.coursingService, this.paginatorCoursing, this.sort);
    if (!this.dataSourceCoursing) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceCoursing.filter = message);
    }

  }

  onTabSwitch(event) {
    if (event.index === 0) {
      this.coursingService.getAllCoursings('all', 'all');
    }
    else if (event.index === 1) {
      this.coursingService.getAllCoursings('international', 'Rüde');
    }
    else if (event.index === 2) {
      this.coursingService.getAllCoursings('international', 'Hündin');
    }
    else if (event.index === 3) {
      this.coursingService.getAllCoursings('national', 'all');
    }
  }

}


export class CoursingDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterCoursing: string) {
    this._filterChange.next(filterCoursing);
  }

  filteredData: Coursingresult[] = [];
  renderedData: Coursingresult[] = [];

  constructor(private coursingService: CoursingService,
              public _paginatorCoursing: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorCoursing.pageIndex = 0);

  }

  connect(): Observable<Coursingresult[]> {
    const displayDataChanges = [
      this.coursingService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorCoursing.page
    ];

    this.coursingService.getAllCoursings('all', 'all');
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.coursingService.data.slice().filter((coursingResult: Coursingresult) => {
        const searchStr = (coursingResult.dogname + coursingResult.ownername + coursingResult.totalParticipations + coursingResult.totalratings).toLowerCase();
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
  sortData(data: Coursingresult[]): Coursingresult[] {
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

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  itemsPerPageLabel = 'Rows per page';
}
