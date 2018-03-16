import {Component, OnInit} from '@angular/core';



// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  ngOnInit() {
  }

  constructor() {

  }

  onTabSwitch(event) {
    //this.onLoadClick();

  }


}





















