import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatMenuTrigger, MatTableDataSource} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DogDialogComponent} from "./dog-dialog/dog-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ngOnInit() {
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  displayedColumns = ['dog', 'owner', 'id'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(key) {
    let dialogRef = this.dialog.open(DogDialogComponent);
  }

}


export interface Element {
  id: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},

];
