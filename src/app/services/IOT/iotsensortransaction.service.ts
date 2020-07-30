import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataListResult, DataResult } from 'src/app/_entities/entitiesForResults';
import { SensorTransactionDTO } from 'src/app/_entityDTOs/entityIOTTransactionDTO';
import { YilIdNameInheritedService } from 'src/app/_yilLibrary/yilServices/yil-id-name-inherited.service';
import { Transaction } from 'src/app/_entities/IOT/entitiesforIOT';

@Injectable({
  providedIn: 'root'
})

export class  IotsensortransactionService extends YilIdNameInheritedService<Transaction>{


  constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {   
    super(http_,  environmentURLService_,  authenticationService_);
    let tryingValue = this.apiControllerName();
    this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
  }

  public apiControllerName(): string {
       return 'Transactions';
  }

  get(): Observable<DataListResult<SensorTransactionDTO>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
     return this.http.get<DataListResult<SensorTransactionDTO>>
     (this.url + '/getlistbyotherobject?userID=' + this.authenticationService.currentlyUserId());
  }

  getByTarlaId(tarlaId:number): Observable<DataResult<SensorTransactionDTO>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
    return this.http.get<DataResult<SensorTransactionDTO>>
    (this.url + '/getByTarlaId?userID=' + this.authenticationService.currentlyUserId()+'&&tarlaId='+tarlaId);
  }

  getlistbyOtherobjectAndSensorType(tarlaId: number,sensorType:number): Observable<DataListResult<Transaction>> {  
    var result = this.http.get<DataListResult<Transaction>>(this.url+'/getlistbyOtherobjectAndSensorType?otherId='+tarlaId +'&&sensorType='+sensorType);
    return result;
  }

  getByTarlaIdAndSensorTypeAndDate(tarlaId:number,sensorType:number ,year:number, month:number, day:number ): Observable<DataResult<Transaction>>   {  // bu userın tum tarlalarının hava durum raporları gelecek
    return this.http.get<DataResult<Transaction>>
    (this.url + '/getByTarlaIdAndSensorTypeAndDate?userID=' + this.authenticationService.currentlyUserId()+'&&tarlaId='+tarlaId+'&&sensorType='+sensorType+'&&year='+year+'&&month='+month+'&&day='+day);
  }
  
 }
