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
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 2, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 1, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81},
  {position: 66, name: 'Fast Company\'s Boys Talk', besitzer: 'Behrendt/Sicking', rennengesamt: 5, rennengewertet: 5, punkte: 81}
];
