import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCityComponent } from './businessComponents/master-city/master-city.component';

const routes: Routes = [
  {path:'MasterCityComponent',component:MasterCityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
