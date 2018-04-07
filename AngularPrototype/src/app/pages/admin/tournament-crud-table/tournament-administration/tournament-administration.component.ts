import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {TournamentCrudTableComponent} from "../tournament-crud-table.component";

@Component({
  selector: 'app-tournament-administration',
  templateUrl: './tournament-administration.component.html',
  styleUrls: ['./tournament-administration.component.css']
})
export class TournamentAdministrationComponent implements OnInit {

  @Input() selectedTournament: any;
  @Input() showDetailView: boolean;
  private _parent: TournamentCrudTableComponent ;
  @Input() set parent(value: TournamentCrudTableComponent ) {
    this._parent = value;
  }

  get parent(): TournamentCrudTableComponent {
    return this._parent;
  }

  back() {
    console.log("aha")
    this.parent.showDetailView = false;
    //this.showDetailView = new boolean(false);
  }

  constructor() { }

  ngOnInit() {
  }

  datetostring(milliseconds: number): String {
    return new Date(milliseconds).toLocaleDateString();
  }

  onTabSwitch(event) {

  }

}
