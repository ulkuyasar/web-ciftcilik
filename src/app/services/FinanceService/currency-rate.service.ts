import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rate } from 'src/app/_entities/finance/entitiesforFinance';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { DataListResult } from 'src/app/_entities/entitiesForResults';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService extends YilIdNameInheritedService<Rate> {

  constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
    super(http_,  environmentURLService_,  authenticationService_);
    let tryingValue = this.apiControllerName();
    this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
  }


  public apiControllerName(): string {
    return "Rates";
 } 

 getCurrencyRateByCode(code: string): Observable<DataListResult<Rate>> {  
  return this.http.get<DataListResult<Rate>>(this.url + '/getlistbyotherobject?Code=' + code);  
} 

}