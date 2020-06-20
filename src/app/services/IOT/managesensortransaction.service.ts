import { Injectable } from '@angular/core';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ManageSensorTransaction } from 'src/app/_entities/IOT/entitiesforIOT';

@Injectable(
  {
     providedIn: 'root'
  }
)
export class  ManagesensortransactionService extends YilIdNameInheritedService<ManageSensorTransaction> {

  constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
    super(http_,  environmentURLService_,  authenticationService_);
    let tryingValue = this.apiControllerName();
    this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
  }
  
  public apiControllerName(): string {
    return "ManageSensorTransactions";
 } 
  
 }