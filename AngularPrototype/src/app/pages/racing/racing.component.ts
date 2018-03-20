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
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';

  hover(element) {
   // this.whippetImg = 'assets/img/whippet.png';
  }
  unhover(element) {
  //  this.whippetImg = 'assets/img/whippet_grau.png';
  }

  onTabSwitch(event) {

  }
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
];
