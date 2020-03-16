import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../_entities/entities';
import { YilIdNameInheritedService } from '../_yilLibrary/yilServices/yil-id-name-inherited.service';
import { EnvironmentUrlService } from '../_helpers/environment-url.service';
import { AuthenticationService } from '../_helpers/authentication.service';
@Injectable(
   {
   providedIn: 'root'
}
)
export class  CityService extends YilIdNameInheritedService<City> {

  constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
    super(http_,  environmentURLService_,  authenticationService_);
    let tryingValue = this.apiControllerName();
    this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
  }


  public apiControllerName(): string {
    return "Citys";
 } 

 get(): Observable<City[]> {
  return this.http.get<City[]>(this.url+'/getlistbyotherobject?otherId='+this.authenticationService.currentUser);  
}

}


