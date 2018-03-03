import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-coursing',
  templateUrl: './coursing.component.html',
  styleUrls: ['./coursing.component.css']
})
export class CoursingComponent {

  displayedColumns = ['position','total', 'name', 'besitzer', 'gesamtteilnahme','inwertung'];
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
  {total: '94,22%', position: 1, name: 'Storktown\'s Lucky Lad', besitzer: 'Steenbergen', gesamtteilnahme: 9, inwertung: 5},
];

