import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCityComponent } from './businessComponents/definitions/master-city/master-city.component';
import { UserLoginPageComponent } from './businessComponents/CRM/user-login-page/user-login-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserSignupComponent } from './businessComponents/CRM/user-signup/user-signup.component';
import { UserProfileComponent } from './businessComponents/CRM/user-profile/user-profile.component';
import { CurrencyRateComponent } from './businessComponents/Finance/currency-rate/currency-rate.component';
import { WheatherShowComponent } from './businessComponents/definitions/wheather-show/wheather-show.component';


const routes: Routes = [

  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: UserLoginPageComponent },
  { path: 'sign-up', component: UserSignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path:'MasterCityComponent',component:MasterCityComponent},
  {path:'WheatherShowComponent',component:WheatherShowComponent},
  {path:'CurrencyRateComponent',component:CurrencyRateComponent}

  
 // {path:'UserLoginPageComponent',component:UserLoginPageComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
