import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoursingComponent} from './pages/coursing/coursing.component';
import {RacingComponent} from './pages/racing/racing.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatDatepickerModule, MatNativeDateModule, MatPaginatorIntl, MatSelectModule, MatSortModule,
  NativeDateAdapter
} from "@angular/material";
import {MatStepperModule} from '@angular/material/stepper';
import { NgDragDropModule } from 'ng-drag-drop';

[CdkTableModule]
import {FlexLayoutModule} from "@angular/flex-layout";
//import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material";
import {AdminComponent} from './pages/admin/admin.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { DogDialogComponent } from './pages/admin/dialogs/dog-dialog/dog-dialog.component';
import { ExhibitionComponent } from './pages/exhibition/exhibition.component';
import {DogService} from "./services/DogService/dog.service";
import { OwnerDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-dialog.component';
import {AuthService} from "./services/AuthService/auth.service";
import {MatTabsModule} from '@angular/material/tabs';
import {DropdownModule} from 'primeng/primeng';
import { TournamentDialogComponent } from './pages/admin/dialogs/tournament-dialog/tournament-dialog.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import { BreederDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-dialog.component';
import { ClubDialogComponent } from './pages/admin/dialogs/club-dialog/club-dialog.component';
import {BreederService} from "./services/BreederService/breeder.service";
import {ClubService} from "./services/ClubService/club.service";
import {OwnerService} from "./services/OwnerService/owner.service";
import {TournamentService} from "./services/TournamentService/tournament.service";
import { JudgeDialogComponent } from './pages/admin/dialogs/judge-dialog/judge-dialog.component';
import {JudgeService} from "./services/JudgeService/judge.service";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TournamentDogService} from "./services/TournamentDogService/tournamentdog.service";
import {
  CanActivateViaAuthGuard,
  PasswordDialogComponent
} from './pages/admin/dialogs/password-dialog/password-dialog.component';
import { ClubCrudTableComponent } from './pages/admin/club-crud-table/club-crud-table.component';
import { BreederCrudTableComponent } from './pages/admin/breeder-crud-table/breeder-crud-table.component';
import { OwnerCrudTableComponent } from './pages/admin/owner-crud-table/owner-crud-table.component';
import { JudgeCrudTableComponent } from './pages/admin/judge-crud-table/judge-crud-table.component';
import { DogCrudTableComponent } from './pages/admin/dog-crud-table/dog-crud-table.component';
import { TournamentCrudTableComponent } from './pages/admin/tournament-crud-table/tournament-crud-table.component';
import { ManageTournamentsComponent } from './pages/admin/manage-tournaments/manage-tournaments.component';
import { ManageTournamentEvaluationsComponent } from './pages/admin/manage-tournament-evaluations/manage-tournament-evaluations.component';
import { BreederEditDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-edit-dialog/breeder-edit-dialog.component';
import { BreederDeleteDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-delete-dialog/breeder-delete-dialog.component';
import { ClubEditDialogComponent } from './pages/admin/dialogs/club-dialog/club-edit-dialog/club-edit-dialog.component';
import { ClubDeleteDialogComponent } from './pages/admin/dialogs/club-dialog/club-delete-dialog/club-delete-dialog.component';
import { OwnerEditDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-edit-dialog/owner-edit-dialog.component';
import { OwnerDeleteDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-delete-dialog/owner-delete-dialog.component';
import {CoursingService} from "./services/CoursingService/coursing.service";
import {SearchService} from "./services/SearchService/search.service";
import { JudgeDeleteDialogComponent } from './pages/admin/dialogs/judge-dialog/judge-delete-dialog/judge-delete-dialog.component';
import {JudgeEditComponent} from "./pages/admin/dialogs/judge-dialog/judge-edit-dialog/judge-edit.component";
import { DogEditDialogComponent } from './pages/admin/dialogs/dog-dialog/dog-edit-dialog/dog-edit-dialog.component';
import { DogDeleteDialogComponent } from './pages/admin/dialogs/dog-dialog/dog-delete-dialog/dog-delete-dialog.component';
import { TournamentEditDialogComponent } from './pages/admin/dialogs/tournament-dialog/tournament-edit-dialog/tournament-edit-dialog.component';
import { TournamentDeleteDialogComponent } from './pages/admin/dialogs/tournament-dialog/tournament-delete-dialog/tournament-delete-dialog.component';
import { Pipe, PipeTransform } from '@angular/core';
import {CustomDogFilter} from "./pages/admin/manage-tournaments/filter/customDogFilter";
import {CustomJudgeFilter} from "./pages/admin/manage-tournaments/filter/customJudgeFilter";
import { SetUpCoursingComponent } from './pages/admin/manage-tournaments/set-up-coursing/set-up-coursing.component';
import { SetUpRaceComponent } from './pages/admin/manage-tournaments/set-up-race/set-up-race.component';
import { RaceEvaluationComponent } from './pages/admin/manage-tournament-evaluations/race-evaluation/race-evaluation.component';
import { CoursingEvaluationComponent } from './pages/admin/manage-tournament-evaluations/coursing-evaluation/coursing-evaluation.component';
import {RaceService} from "./services/TournamentDogService/RaceService";
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TournamentAdministrationComponent } from './pages/admin/tournament-crud-table/tournament-administration/tournament-administration.component';
import { SetUpJudgeComponent } from './pages/admin/manage-tournaments/set-up-judge/set-up-judge.component';
import { CoursingEvaluationTableComponent } from './pages/admin/manage-tournament-evaluations/coursing-evaluation/coursing-evaluation-table/coursing-evaluation-table.component';
import {ApiService} from "./services/DynamicApiService/api.service";
import { CoursingDetailDialogComponent } from './pages/coursing/dialogs/coursing-detail-dialog/coursing-detail-dialog.component';
import { CoursingDetailsTableComponent } from './pages/coursing/coursing-details-table/coursing-details-table.component';
import {CoursingDetailService} from "./services/CoursingService/coursing.detail.service";
import {RaceRankingService} from "./services/RaceRankingService/race-ranking.service";
import { RaceDetailDialogComponent } from './pages/racing/dialogs/race-detail-dialog/race-detail-dialog.component';
import {RaceDetailService} from "./services/RaceRankingService/race.detail.service";
import {RaceDetailsTableComponent} from "./pages/racing/race-details-table/race-details-table.component";

const appRoutes: Routes = [
  {path: 'coursing', component: CoursingComponent},
  {path: 'racing', component: RacingComponent},
  {path: 'admin', component: AdminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'exhibition', component: ExhibitionComponent},
  {path: '', redirectTo: 'coursing', pathMatch: 'full'}

];
//{ path: 'hero/:id',      component: HeroDetailComponent },
/*{
    remove your node-modules directory,
    remove the @angular/flex-layout entry in your package.json
    then run terminal npm i; npm i @angular/flex-layout
*/


@NgModule({
  declarations: [
    AppComponent,
    CoursingComponent,
    RacingComponent,
    AdminComponent,
    DogDialogComponent,
    ExhibitionComponent,
    OwnerDialogComponent,
    TournamentDialogComponent,
    BreederDialogComponent,
    ClubDialogComponent,
    JudgeDialogComponent,
    PasswordDialogComponent,
    ClubCrudTableComponent,
    BreederCrudTableComponent,
    OwnerCrudTableComponent,
    JudgeCrudTableComponent,
    DogCrudTableComponent,
    TournamentCrudTableComponent,
    ManageTournamentsComponent,
    ManageTournamentEvaluationsComponent,
    BreederEditDialogComponent,
    BreederDeleteDialogComponent,
    ClubEditDialogComponent,
    ClubDeleteDialogComponent,
    OwnerEditDialogComponent,
    OwnerDeleteDialogComponent,
    JudgeEditComponent,
    JudgeDeleteDialogComponent,
    DogEditDialogComponent,
    DogDeleteDialogComponent,
    TournamentEditDialogComponent,
    TournamentDeleteDialogComponent,
    CustomDogFilter,
    CustomJudgeFilter,
    SetUpCoursingComponent,
    SetUpRaceComponent,
    RaceEvaluationComponent,
    CoursingEvaluationComponent,
    TournamentAdministrationComponent,
    SetUpJudgeComponent,
    CoursingEvaluationTableComponent,
    CoursingDetailDialogComponent,
    CoursingDetailsTableComponent,
    RaceDetailDialogComponent,
    RaceDetailsTableComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    //NgbModule.forRoot(),
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule


  ],
  entryComponents: [ RaceDetailDialogComponent, CoursingDetailDialogComponent ,TournamentDeleteDialogComponent, TournamentEditDialogComponent, DogDeleteDialogComponent, DogEditDialogComponent, JudgeDeleteDialogComponent, JudgeEditComponent, OwnerDeleteDialogComponent, OwnerEditDialogComponent, ClubDeleteDialogComponent, ClubEditDialogComponent, BreederDeleteDialogComponent,BreederEditDialogComponent, DogDialogComponent,PasswordDialogComponent, OwnerDialogComponent, TournamentDialogComponent, BreederDialogComponent, ClubDialogComponent, JudgeDialogComponent ],
  providers: [RaceDetailService, RaceRankingService, CoursingDetailService ,ApiService ,RaceService, NativeDateAdapter, SearchService, CoursingService, TournamentDogService, DogService, CanActivateViaAuthGuard, AuthService, JudgeService, BreederService, ClubService, OwnerService, TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

@Injectable()
export class MatPaginatorIntlGerman extends MatPaginatorIntl {
  itemsPerPageLabel = 'Pro Seite: ';
  nextPageLabel = 'Nächste Seite';
  previousPageLabel = 'Vorherige Seite';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' von ' + length;
  }
}
