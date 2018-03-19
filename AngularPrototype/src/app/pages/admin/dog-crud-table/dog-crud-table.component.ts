import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {DogService} from "../../../services/DogService/dog.service";
import {Dogpass} from "../../../data-models/dogpass";
import {DogDialogComponent} from "../dialogs/dog-dialog/dog-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {JudgeDeleteDialogComponent} from "../dialogs/judge-dialog/judge-delete-dialog/judge-delete-dialog.component";
import {JudgeEditComponent} from "../dialogs/judge-dialog/judge-edit-dialog/judge-edit.component";
import {DogEditDialogComponent} from "../dialogs/dog-dialog/dog-edit-dialog/dog-edit-dialog.component";
import {DogDeleteDialogComponent} from "../dialogs/dog-dialog/dog-delete-dialog/dog-delete-dialog.component";
import {Breeder} from "../../../data-models/breeder";
import {Dogowner} from "../../../data-models/dogowner";

@Component({
  selector: 'app-dog-crud-table',
  templateUrl: './dog-crud-table.component.html',
  styleUrls: ['./dog-crud-table.component.css']
})
export class DogCrudTableComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  displayedColumns = ['name', 'race', 'sex', 'action'];
  dataSource: UserDataSource | null;
  id: number;


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService) { }

  ngOnInit() {
    this.loadData();

  }

  onCreateDogClick(dog: Dogpass) {
    const dialogRef = this.dialog.open(DogDialogComponent, {
      data: {dog: dog}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.dogService.dataChange.value.push(this.dogService.getDialogData());
        this.refreshTableDogpass();
      }
    });
  }

  startEdit(id: number, name: string, race: string, sex: string, passport_no: string, chip_no: string, coat_colour: string, breeder: Breeder, owner: Dogowner, date_of_birth: Date) {
    this.id = id;
    const dialogRef = this.dialog.open(DogEditDialogComponent, {
      data: {id: id, name: name, race : race, sex: sex, passport_no: passport_no, chip_no: chip_no, coat_colour: coat_colour, breeder: breeder, owner: owner, date_of_birth: date_of_birth}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.dogService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.dogService.dataChange.value[foundIndex] = this.dogService.getDialogData();
        // And lastly refresh table
        this.refreshTableDogpass();
      }
    });
  }

  deleteItem(id: number, name: string) {
    this.id = id;
    const dialogRef = this.dialog.open(DogDeleteDialogComponent, {
      data: {id: id, name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dogService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.dogService.dataChange.value.splice(foundIndex, 1);
        this.refreshTableDogpass();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableDogpass() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.dataSource = new UserDataSource(this.dogService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}


export class UserDataSource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Dogpass[] = [];
  renderedData: Dogpass[] = [];

  constructor(private dogService: DogService,
              public _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Dogpass[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.dogService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.dogService.getAllDogs();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.dogService.data.slice().filter((dog: Dogpass) => {
        const searchStr = (dog.name + dog.race + dog.sex).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;

    });

  }


  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Dogpass[]): Dogpass[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
