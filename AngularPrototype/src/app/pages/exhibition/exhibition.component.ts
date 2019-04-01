import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {DataService} from "../../services/DataService/dataservice";

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.css']
})
export class ExhibitionComponent implements OnInit {

  constructor(private dataService: DataService) {
    var year = new Date().getFullYear();
    var range = [];

    for (var i = 0; ((year) - i) != 2010 || i > 100; i++) {
      this.years.push(
        // String(year - i)
        //parseInt(String(year + i).slice(2, 4));
        String((year) - i)
        // ""
      );
    }

  }

  ngOnInit() {
  }

  displayedColumns = ['position', 'name', 'punkte', 'bis','bob','konkurrenz','anzahl'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  whippetImg = 'assets/img/whippet_grau.png';
  whippetImgColored = 'assets/img/whippet.png';
  years: String[] = [];
  selectedYear: string = this.dataService.selectedYear;

  onYearChange(event) {
    this.dataService.selectedYear = this.selectedYear;
  }

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
