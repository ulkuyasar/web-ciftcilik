import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, Injector, ApplicationRef } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



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
import { jqxTabsModule } from 'jqwidgets-ng/jqxtabs';
import { jqxComboBoxModule }   from 'jqwidgets-ng/jqxcombobox';

import { ComboBoxModule } from 'smart-webcomponents-angular/combobox';
import { ButtonModule } from 'smart-webcomponents-angular/button';
import { ListBoxModule } from 'smart-webcomponents-angular/listbox';
import { GridModule } from 'smart-webcomponents-angular/grid';
import { NumericTextBoxModule } from 'smart-webcomponents-angular/numerictextbox';
import { InputModule } from 'smart-webcomponents-angular/input';
import { CalendarModule } from 'smart-webcomponents-angular/calendar';
import { DropDownListModule } from 'smart-webcomponents-angular/dropdownlist';
import { TabsModule } from 'smart-webcomponents-angular/tabs';
import { TextBoxModule } from 'smart-webcomponents-angular/textbox';
import { RadioButtonModule } from 'smart-webcomponents-angular/radiobutton';
import { MaskedTextBoxModule } from 'smart-webcomponents-angular/maskedtextbox';
import { PasswordTextBoxModule } from 'smart-webcomponents-angular/passwordtextbox';



import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from './_helpers/message.service';
import { EnvironmentUrlService } from './_helpers/environment-url.service';
import { AuthenticationService } from './_helpers/authentication.service';


import { YilmenuComponent } from './_menu/yilmenu/yilmenu.component';
import { YilBaseMasterCRUDComponent } from './_yilLibrary/yilCompomenents/yil-base-master-crud/yil-base-master-crud.component';
import { MasterCityComponent } from './businessComponents/definitions/master-city/master-city.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLoginPageComponent } from './businessComponents/CRM/user-login-page/user-login-page.component';
import { AuthInterceptor } from './_helpers/auth-interceptor.service';
import { UserSignupComponent } from './businessComponents/CRM/user-signup/user-signup.component';
import { UserProfileComponent } from './businessComponents/CRM/user-profile/user-profile.component';
import { UserCustomerDetailComponent } from './businessComponents/CRM/user-customer-detail/user-customer-detail.component';
import { ButtonComponentComponent } from './_yilLibrary/yilCompomenents/yilButtons/button-component/button-component.component';
import { ButtonComponent } from './_yilLibrary/yilCompomenents/yilButtons/button/button.component';
import { SaveButtonComponent } from './_yilLibrary/yilCompomenents/yilButtons/save-button/save-button.component';
import { UserCustomerTelComponent } from './businessComponents/CRM/user-customer-tel/user-customer-tel.component';
import { UserCustomerAdresComponent } from './businessComponents/CRM/user-customer-adres/user-customer-adres.component';
import { YilBaseMasterListComponent } from './_yilLibrary/yilCompomenents/yil-base-master-list/yil-base-master-list.component';
import { YilBaseJustListFromDsComponent } from './_yilLibrary/yilCompomenents/yil-base-just-list-from-ds/yil-base-just-list-from-ds.component';
import { CurrencyRateComponent } from './businessComponents/Finance/currency-rate/currency-rate.component';
import { YilComboboxComponent } from './_yilLibrary/yilCompomenents/yil-combobox/yil-combobox.component';


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    YilmenuComponent,
    YilBaseMasterCRUDComponent,
    MasterCityComponent,
    UserLoginPageComponent,
    UserSignupComponent,
    UserProfileComponent,
    UserCustomerDetailComponent,
    ButtonComponentComponent,
    ButtonComponent,
    SaveButtonComponent,
    UserCustomerTelComponent,
    UserCustomerAdresComponent,
    YilBaseMasterListComponent,
    YilBaseJustListFromDsComponent,
    CurrencyRateComponent,
    YilComboboxComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule, jqxGridModule, jqxButtonModule, 
    jqxNumberInputModule, jqxInputModule, jqxWindowModule,
    jqxDropDownListModule, jqxPanelModule,jqxMenuModule,jqxPasswordInputModule,
    jqxExpanderModule, jqxValidatorModule,  jqxDateTimeInputModule ,
    jqxTabsModule,jqxComboBoxModule,

    ComboBoxModule,ButtonModule, ListBoxModule,GridModule,
    NumericTextBoxModule,
    InputModule,
    CalendarModule,
    DropDownListModule,
    TabsModule,
    TextBoxModule,
    RadioButtonModule,
    MaskedTextBoxModule,
    PasswordTextBoxModule,


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
