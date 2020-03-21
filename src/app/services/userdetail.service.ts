import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YilIdNameInheritedService } from '../_yilLibrary/yilServices/yil-id-name-inherited.service';
import { EnvironmentUrlService } from '../_helpers/environment-url.service';
import { AuthenticationService } from '../_helpers/authentication.service';
import { UserDetail } from '../_entities/entitiesforCRM';

@Injectable(
   {
   providedIn: 'root'
}
)
export class  UserdetailService extends YilIdNameInheritedService<UserDetail> {

  constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
    super(http_,  environmentURLService_,  authenticationService_);
    let tryingValue = this.apiControllerName();
    this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
  }


  public apiControllerName(): string {
    return "UserDetails";
 } 


}



