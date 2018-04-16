import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.css']
})
export class RacingComponent implements OnInit {

  constructor() {
    var year = new Date().getFullYear();
    var range = [];

    for (var i = 0; i < 7; i++) {
      this.years.push(
        // String(year - i)
        //parseInt(String(year + i).slice(2, 4));
        String((year-1) - i)
        // ""
      );
    }
  }

  ngOnInit() {
  }

  onYearChange(event) {

  }


  displayedColumns = ['position', 'name', 'besitzer', 'rennengesamt', 'rennengewertet', 'punkte'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';
  years: String[] = [];
  selected: string = String(new Date().getFullYear()-1);

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
