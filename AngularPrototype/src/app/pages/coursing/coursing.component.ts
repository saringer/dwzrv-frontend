import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-coursing',
  templateUrl: './coursing.component.html',
  styleUrls: ['./coursing.component.css']
})
export class CoursingComponent {

  displayedColumns = ['total', 'position', 'name', 'besitzer', 'gesamtteilnahme','inwertung'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

}

export interface Element {
  total: string;
  position: number;
  name: string;
  besitzer: string;
  gesamtteilnahme: number;
  inwertung: number;
}

const ELEMENT_DATA: Element[] = [
  {total: '100%', position: 1, name: 'Hund1', besitzer: 'Lehmann', gesamtteilnahme: 2, inwertung: 2},
];

