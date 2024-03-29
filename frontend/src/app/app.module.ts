import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganizatorComponent } from './organizator/organizator.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UnregisterUserComponent } from './unregister-user/unregister-user.component';
import { RegistrationComponent } from './registration/registration.component';
import {MatSelectModule} from '@angular/material/select';
import { AddSportComponent } from './add-sport/add-sport.component';
import { AddSportDisciplineComponent } from './add-sport-discipline/add-sport-discipline.component';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { AddAthleteComponent } from './add-athlete/add-athlete.component';
import { AddAthleteToDisciplinesComponent } from './add-athlete-to-disciplines/add-athlete-to-disciplines.component';
import { FormCompetitionTableComponent } from './form-competition-table/form-competition-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserConfirmationTableComponent } from './user-confirmation-table/user-confirmation-table.component';
import { TakmicenjeRasporedComponent } from './takmicenje-raspored/takmicenje-raspored.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddAthleteToTeamComponent } from './add-athlete-to-team/add-athlete-to-team.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { AthletesTableComponent } from './athletes-table/athletes-table.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecordsTableComponent } from './records-table/records-table.component';
import { GetAthletesComponent } from './get-athletes/get-athletes.component';
import { GetAthletesTableComponent } from './get-athletes-table/get-athletes-table.component'; 

@NgModule({
  declarations: [
    AppComponent,
    OrganizatorComponent,
    MainNavComponent,
    LoginComponent,
    UnregisterUserComponent,
    RegistrationComponent,
    AddSportComponent,
    AddSportDisciplineComponent,
    AddCompetitionComponent,
    AddAthleteComponent,
    AddAthleteToDisciplinesComponent,
    FormCompetitionTableComponent,
    UserConfirmationTableComponent,
    TakmicenjeRasporedComponent,
    UnosRezultataComponent,
    AddTeamComponent,
    AddAthleteToTeamComponent,
    FileUploadComponent,
    CountryTableComponent,
    AthletesTableComponent,
    ChangePasswordComponent,
    RecordsTableComponent,
    GetAthletesComponent,
    GetAthletesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
