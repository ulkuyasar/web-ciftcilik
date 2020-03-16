import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCityComponent } from './businessComponents/master-city/master-city.component';
import { UserLoginPageComponent } from './businessComponents/user-login-page/user-login-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserSignupComponent } from './businessComponents/user-signup/user-signup.component';
import { UserProfileComponent } from './businessComponents/user-profile/user-profile.component';

const routes: Routes = [

  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: UserLoginPageComponent },
  { path: 'sign-up', component: UserSignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },

  {path:'MasterCityComponent',component:MasterCityComponent},
 // {path:'UserLoginPageComponent',component:UserLoginPageComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
