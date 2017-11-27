import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {DogFormComponent} from './pages/dog-form/dog-form.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SearchService} from "./pages/dog-form/search.service";
import {CoursingComponent} from './pages/coursing/coursing.component';
import {RacingComponent} from './pages/racing/racing.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";

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

const appRoutes: Routes = [
  {path: 'coursing', component: CoursingComponent},
  {path: 'racing', component: RacingComponent},
  {path: 'admin', component: AdminComponent},
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
    CoursingComponent,
    RacingComponent,
    AdminComponent,
    DogDialogComponent,
    ExhibitionComponent
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
    MatIconModule

  ],
  entryComponents: [ DogDialogComponent ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
