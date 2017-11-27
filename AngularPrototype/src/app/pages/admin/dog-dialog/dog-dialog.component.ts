import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['./dog-dialog.component.css']
})
export class DogDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DogDialogComponent>) { }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  displayedColumns = ['dog', 'owner', 'id'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

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
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}

];
