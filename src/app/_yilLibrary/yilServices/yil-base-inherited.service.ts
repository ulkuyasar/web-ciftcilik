import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBaseCRUD } from './iBaseCRUD';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { idname } from 'src/app/_entities/entities';
import { DataResult, Result, DataListResult } from 'src/app/_entities/entitiesForResults';

@Injectable({
  providedIn: 'root'
})
export abstract class YilBaseInheritedService<T>  implements IBaseCRUD<T>{

   public abstract apiControllerName(): string; 
   public url: string;               
   protected environmentUrlService : EnvironmentUrlService;
   protected authenticationService : AuthenticationService;
   protected http:HttpClient;

   constructor(http_: HttpClient,  environmentURLService_: EnvironmentUrlService,  authenticationService_: AuthenticationService) {
    
        this.http = http_;
        this.environmentUrlService = environmentURLService_;
        this.authenticationService = authenticationService_;
        try{
            let tryingValue = this.apiControllerName();
            this.url = this.environmentUrlService.getURL()+ this.apiControllerName();        
        }catch(e){}
  }

  getall(): Observable<DataListResult<T>> {
    return this.http.get<DataListResult<T>>(this.url+"/getall");
  }
  getById(id: number): Observable<DataResult<T>> {
    return this.http.get<DataResult<T>>(this.url + '/getbyid?id=' + id);  
  }

  getlistbyotherobject(foreignId: number): Observable<DataListResult<T>> {  
      var result = this.http.get<DataListResult<T>>(this.url+'/getlistbyotherobject?otherId='+foreignId);
      return result;
    }


  add(entity: T): Observable<DataResult<T>> {
    this.updateDefaultValues(entity);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.post<DataResult<T>>(this.url + '/Add/',  
    entity, httpOptions); 
  }
  update(entity: T): Observable<DataResult<T>> {
    this.updateDefaultValues(entity);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.put<DataResult<T>>(this.url + '/Update/',  
    entity, httpOptions);  
  }
 
  delete(entity: T): Observable<Result> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Result>(this.url + '/Delete/',  
    entity, httpOptions); 
  }

  private updateDefaultValues(entity)
  {
    entity.createdDate = new Date();
		entity.updatedDate = null;
		entity.createdUser = "ULKUYASY";
		entity.updatedUser = null;
		entity.whichPageId = 0;
		entity.recordStatus = false;
  }
  
}


