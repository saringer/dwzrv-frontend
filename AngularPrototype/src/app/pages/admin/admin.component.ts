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

  years: String[] = [];
  selectedYear: string = String(new Date().getFullYear() - 1);
  yearSelectionDisabled: boolean = true;

  ngOnInit() {
  }

  constructor() {

    var year = new Date().getFullYear();
    var range = [];

    for (var i = 0; i < 7; i++) {
      this.years.push(
        // String(year - i)
        //parseInt(String(year + i).slice(2, 4));
        String((year - 1) - i)
        // ""
      );
    }

  }

  onTabSwitch(event) {
    /*if (event.index === 3) {
      this.yearSelectionDisabled = false;
    }
    else {
      this.yearSelectionDisabled = true;

    }*/

  }

  onYearChange(event) {
    /*if (this.tabIndex === 0) {
      this.coursingService.getAllCoursings('international', 'Rüde', this.selected);
    }*/
  }


}





















