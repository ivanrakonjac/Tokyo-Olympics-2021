import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';

const routes: Routes = [
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
