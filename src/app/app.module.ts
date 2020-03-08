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



import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from './_helpers/message.service';
import { EnvironmentUrlService } from './_helpers/environment-url.service';
import { AuthenticationService } from './_helpers/authentication.service';


import { YilmenuComponent } from './_menu/yilmenu/yilmenu.component';


@NgModule({
  declarations: [
    AppComponent,
    YilmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    jqxMenuModule, 
    jqxCheckBoxModule,
    jqxGridModule, jqxButtonModule, 
    jqxNumberInputModule, jqxInputModule, jqxWindowModule,
    jqxDropDownListModule, jqxPanelModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MessageService,
    EnvironmentUrlService,
    HttpClient,
    AuthenticationService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
