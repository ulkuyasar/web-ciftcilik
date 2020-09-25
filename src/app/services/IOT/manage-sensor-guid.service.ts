import { Injectable } from '@angular/core';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { ManageSensorGuid } from 'src/app/_entityDTOs/entityIOTTransactionDTO';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { HttpClient } from '@angular/common/http';
import { DataListResult } from 'src/app/_entities/entitiesForResults';
import { Observable } from 'rxjs';


@Injectable( 
  {
    providedIn: 'root'
  } 
)
  export class ManageSensorGuidService extends YilIdNameInheritedService<ManageSensorGuid>  
  {
    constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
        super(http_,  environmentURLService_,  authenticationService_);
        let tryingValue = this.apiControllerName();
        this.url = this.environmentUrlService.getURL()+ this.apiControllerName();
    }
    public apiControllerName(): string {
      return "Boards";
    }

    getlistbyUserIdAndTarlaId( userId : number,  tarlaId :number): Observable<DataListResult<ManageSensorGuid>> {  
      var result = this.http.get<DataListResult<ManageSensorGuid>>(this.url+'/getlistbyUserIdAndTarlaId?userId='+userId+'&tarlaId='+tarlaId);
      return result;
    }

    getlistbyUserId( userId : number): Observable<DataListResult<ManageSensorGuid>> {  
      var result = this.http.get<DataListResult<ManageSensorGuid>>(this.url+'/getlistbyUserIdAndTarlaId?userId='+userId+'&tarlaId='+0);
      return result;
    }

    getLoraGatewayList(): Observable<DataListResult<ManageSensorGuid>> {  
      var result = this.http.get<DataListResult<ManageSensorGuid>>(this.url+'/getLoraGatewayList');
      return result;
    }
}

