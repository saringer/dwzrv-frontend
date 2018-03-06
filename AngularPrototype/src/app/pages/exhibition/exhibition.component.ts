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
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 1, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},
  {position: 55, name: 'Harley vom Kleinen Berg', punkte: 147, bis: 0, bob: 2, konkurrenz: 88, anzahl: 20},


];
