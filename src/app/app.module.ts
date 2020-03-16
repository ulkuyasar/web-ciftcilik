import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, Injector, ApplicationRef } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import '@smarthtmlelements/smart-elements/source/smart.core.js';


import { jqxCheckBoxModule } from 'jqwidgets-ng/jqxcheckbox';
import { jqxMenuModule } from 'jqwidgets-ng/jqxmenu';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import { jqxPasswordInputModule } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxExpanderModule } from 'jqwidgets-ng/jqxexpander';
import { jqxValidatorModule } from 'jqwidgets-ng/jqxvalidator';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxdatetimeinput';


import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from './_helpers/message.service';
import { EnvironmentUrlService } from './_helpers/environment-url.service';
import { AuthenticationService } from './_helpers/authentication.service';


import { YilmenuComponent } from './_menu/yilmenu/yilmenu.component';
import { YilBaseMasterCRUDComponent } from './_yilLibrary/yilCompomenents/yil-base-master-crud/yil-base-master-crud.component';
import { MasterCityComponent } from './businessComponents/master-city/master-city.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginPageComponent } from './businessComponents/user-login-page/user-login-page.component';
import { AuthInterceptor } from './_helpers/auth-interceptor.service';
import { UserSignupComponent } from './businessComponents/user-signup/user-signup.component';
import { UserProfileComponent } from './businessComponents/user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    YilmenuComponent,
    YilBaseMasterCRUDComponent,
    MasterCityComponent,
    UserLoginPageComponent,
    UserSignupComponent,
    UserProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule, jqxGridModule, jqxButtonModule, 
    jqxNumberInputModule, jqxInputModule, jqxWindowModule,
    jqxDropDownListModule, jqxPanelModule,jqxMenuModule,jqxPasswordInputModule,
    jqxExpanderModule, jqxValidatorModule,  jqxDateTimeInputModule   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MessageService,
    EnvironmentUrlService,
    HttpClient,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
