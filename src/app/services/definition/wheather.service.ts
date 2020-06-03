import { Injectable } from '@angular/core';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WheatherHeaderAndDetailDTO } from 'src/app/_entityDTOs/entityDefinitionDTOs';
import { DataListResult } from 'src/app/_entities/entitiesForResults';

@Injectable({
  providedIn: 'root'
})

export class  WheatherService {

  url = '';
  environmentURLService: EnvironmentUrlService;
  authenticationService: AuthenticationService;
  http: HttpClient;
  constructor(http_: HttpClient,  environmentURLService: EnvironmentUrlService,  authenticationService: AuthenticationService) {
    this.http = http_;
    this.environmentURLService = environmentURLService;
    this.authenticationService = authenticationService;
    this.url = this.environmentURLService.getURL() + this.apiControllerName();
  }

  public apiControllerName(): string {
       return 'Wheathers';
  }
  get(): Observable<DataListResult<WheatherHeaderAndDetailDTO>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
     return this.http.get<DataListResult<WheatherHeaderAndDetailDTO>>
     (this.url + '/getlistbyotherobject?userID=' + this.authenticationService.currentlyUserId());
  }
 }
