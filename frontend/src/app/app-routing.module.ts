import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAthleteToDisciplinesComponent } from './add-athlete-to-disciplines/add-athlete-to-disciplines.component';
import { AddAthleteToTeamComponent } from './add-athlete-to-team/add-athlete-to-team.component';
import { AddAthleteComponent } from './add-athlete/add-athlete.component';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { AddSportDisciplineComponent } from './add-sport-discipline/add-sport-discipline.component';
import { AddSportComponent } from './add-sport/add-sport.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormCompetitionTableComponent } from './form-competition-table/form-competition-table.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegistrationComponent } from './registration/registration.component';
import { TakmicenjeRasporedComponent } from './takmicenje-raspored/takmicenje-raspored.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';
import { UnregisterUserComponent } from './unregister-user/unregister-user.component';
import { UserConfirmationTableComponent } from './user-confirmation-table/user-confirmation-table.component';

const routes: Routes = [
  {path:"", component: UnregisterUserComponent},
  {path:"addAthletesToTeamFromFile", component: FileUploadComponent},
  {path:"addAthleteToTeam", component: AddAthleteToTeamComponent},
  {path:"addTeam", component: AddTeamComponent},
  {path:"unosRezultata", component: UnosRezultataComponent},
  {path:"takmicenjeRaspored", component: TakmicenjeRasporedComponent},
  {path:"userConfirmation", component: UserConfirmationTableComponent},
  {path:"formCompetition", component: FormCompetitionTableComponent},
  {path:"addAthleteToDisciplines", component: AddAthleteToDisciplinesComponent},
  {path:"addAthleteOnCompetition", component: AddAthleteComponent},
  {path:"addCompetition", component: AddCompetitionComponent},
  {path:"addSportDiscipline", component: AddSportDisciplineComponent},
  {path:"addSport", component: AddSportComponent},
  {path:"registration", component: RegistrationComponent},
  {path:"organizator", component: OrganizatorComponent},
  {path:"delegat", component: OrganizatorComponent},
  {path:"vodjaDelegacije", component: OrganizatorComponent},
  {path:"login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

