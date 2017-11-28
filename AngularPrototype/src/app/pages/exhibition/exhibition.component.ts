import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.css']
})
export class ExhibitionComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  displayedColumns = ['position', 'name', 'punkte', 'bis','bob','konkurrenz','anzahl'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);


}

export interface Element {
  position: number;
  name: string;
  punkte: number;
  bis: number;
  bob: number;
  konkurrenz: number;
  anzahl: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hund1', punkte: 8, bis: 2, bob: 2, konkurrenz: 3, anzahl: 9},
];
