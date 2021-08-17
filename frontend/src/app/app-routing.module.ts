import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizatorComponent } from './organizator/organizator.component';

const routes: Routes = [
  {path:"organizator", component: OrganizatorComponent},
  {path:"delegat", component: OrganizatorComponent},
  {path:"vodjaDelegacije", component: OrganizatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
