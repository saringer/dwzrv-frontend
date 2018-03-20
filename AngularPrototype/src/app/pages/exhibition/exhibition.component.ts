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
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';

  hover(element) {
   // this.whippetImg = 'assets/img/whippet.png';
  }
  unhover(element) {
   // this.whippetImg = 'assets/img/whippet_grau.png';
  }

  onTabSwitch(event) {

  }

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

];
