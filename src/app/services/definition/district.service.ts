
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { District } from 'src/app/_entities/entitiesforDefinitions';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';

@Injectable(
  {
  providedIn: 'root'
}
)
export class  DistrictService extends YilIdNameInheritedService<District> {

 constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
   super(http_,  environmentURLService_,  authenticationService_);
   let tryingValue = this.apiControllerName();
   this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
 }


 public apiControllerName(): string {
   return "Districts";
} 


}

