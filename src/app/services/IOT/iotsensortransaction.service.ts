import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataListResult } from 'src/app/_entities/entitiesForResults';
import { SensorTransactionDTO } from 'src/app/_entityDTOs/entityIOTTransactionDTO';

@Injectable({
  providedIn: 'root'
})

export class  IotsensortransactionService {

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
       return 'Transactions';
  }

  get(): Observable<DataListResult<SensorTransactionDTO>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
     return this.http.get<DataListResult<SensorTransactionDTO>>
     (this.url + '/getlistbyotherobject?userID=' + this.authenticationService.currentlyUserId());
  }

  getWithTarlaId(tarlaId:number): Observable<DataListResult<SensorTransactionDTO>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
    return this.http.get<DataListResult<SensorTransactionDTO>>
    (this.url + '/getWithTarlaId?userID=' + this.authenticationService.currentlyUserId()+'&&tarlaId='+tarlaId);
  }
  
 }
