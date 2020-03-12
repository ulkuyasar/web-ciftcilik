import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBaseCRUD } from './iBaseCRUD';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { EnvironmentUrlService } from 'src/app/_helpers/environment-url.service';
import { idname } from 'src/app/_entities/entities';

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


  getall(): Observable<T[]> {
    return this.http.get<T[]>(this.url+"/getall");
  }
  getById(id: number): Observable<T> {
    return this.http.get<T>(this.url + '/getbyid?id=' + id);  
  }
  add(entity: T): Observable<any> {
    this.updateDefaultValues(entity);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.post<T>(this.url + '/Add/',  
    entity, httpOptions); 
  }
  update(entity: T): Observable<T> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.put<T>(this.url + '/Update/',  
    entity, httpOptions);  
  }
 
  delete(entity: T): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<T>(this.url + '/Delete/',  
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


