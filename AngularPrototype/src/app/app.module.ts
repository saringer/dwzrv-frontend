import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent, CanActivateViaAuthGuard} from './app.component';
import {DogFormComponent} from './forms/dog-form/dog-form.component';
import {FormsModule} from "@angular/forms";
import {CompetitionService} from "./forms/dog-form/shared.services";
import {CoursingComponent} from './pages/coursing/coursing.component';
import {RacingComponent} from './pages/racing/racing.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from "@angular/material";
import {MatStepperModule} from '@angular/material/stepper';

[CdkTableModule]
import {FlexLayoutModule} from "@angular/flex-layout";
//import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material";
import {AdminComponent} from './pages/admin/admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { DogDialogComponent } from './pages/admin/dog-dialog/dog-dialog.component';
import { ExhibitionComponent } from './pages/exhibition/exhibition.component';
import { OwnerFormComponent } from './forms/owner-form/owner-form.component';
import {DogService} from "./services/dog.service";
import { OwnerDialogComponent } from './pages/admin/owner-dialog/owner-dialog.component';
import {AuthService} from "./services/auth.service";
import {MatTabsModule} from '@angular/material/tabs';

const appRoutes: Routes = [
  {path: 'coursing', component: CoursingComponent},
  {path: 'racing', component: RacingComponent},
  {path: 'admin', component: AdminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'exhibition', component: ExhibitionComponent},
  {path: '', redirectTo: 'racing', pathMatch: 'full'}

];
//{ path: 'hero/:id',      component: HeroDetailComponent },
/*{
  path: 'heroes',
  component: HeroListComponent,
  data: { title: 'Heroes List' }
},
{ path: '',
  redirectTo: '/heroes',
  pathMatch: 'full'
},
{ path: '**', component: PageNotFoundComponent }*/


@NgModule({
  declarations: [
    AppComponent,
    DogFormComponent,
    OwnerFormComponent,
    CoursingComponent,
    RacingComponent,
    AdminComponent,
    DogDialogComponent,
    ExhibitionComponent,
    OwnerDialogComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
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
    MatTabsModule

  ],
  entryComponents: [ DogDialogComponent, OwnerDialogComponent ],
  providers: [CompetitionService, DogService, CanActivateViaAuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
