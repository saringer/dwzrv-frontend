import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.css']
})
export class RacingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  displayedColumns = ['position', 'name', 'besitzer', 'rennengesamt', 'rennengewertet', 'punkte'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
}

export interface Element {
  position: number;
  name: string;
  besitzer: string;
  rennengesamt: number;
  rennengewertet: number;
  punkte: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hund1', besitzer: 'Lehmann', rennengesamt: 3, rennengewertet: 3, punkte: 20},
];
