import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {
  MatMenuTrigger, MatPaginator, MatPaginatorModule, MatSort, MatSortModule,
  MatTableDataSource
} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DogDialogComponent} from "./dialogs/dog-dialog/dog-dialog.component";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {DataSource} from "@angular/cdk/collections";
import {Http} from "@angular/http";
import {CollectionViewer} from "@angular/cdk/typings/collections";
import {DogService} from "../../services/DogService/dog.service";
import {Dogpass} from "../../data-models/dogpass";

import {Observable} from 'rxjs/Rx'
import {OwnerDialogComponent} from "./dialogs/owner-dialog/owner-dialog.component";
import {TournamentDialogComponent} from "./dialogs/tournament-dialog/tournament-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Breeder} from "../../data-models/breeder";
import {BreederDialogComponent} from "./dialogs/breeder-dialog/breeder-dialog.component";
import {ClubDialogComponent} from "./dialogs/club-dialog/club-dialog.component";
import {Club} from "../../data-models/club";
import {Dogowner} from "../../data-models/dogowner";
import {BreederService} from "../../services/BreederService/breeder.service";
import {ClubService} from "../../services/ClubService/club.service";
import {TournamentService} from "../../services/TournamentService/tournament.service";
import {OwnerService} from "../../services/OwnerService/owner.service";
import {Judge} from "../../data-models/judge";
import {JudgeService} from "../../services/JudgeService/judge.service";
import {JudgeDialogComponent} from "./dialogs/judge-dialog/judge-dialog.component";
import {TournamentDog} from "../../data-models/tournamentdog";
import {TournamentDogService} from "../../services/TournamentDogService/tournamentdog.service";
import {Tournament} from "../../data-models/tournament";

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





















