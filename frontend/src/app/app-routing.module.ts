import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSportComponent } from './add-sport/add-sport.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
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
