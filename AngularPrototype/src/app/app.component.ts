import { Component } from '@angular/core';
import {SearchService} from "./forms/dog-form/shared.services";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app';


}
