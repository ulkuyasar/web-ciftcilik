import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  constructor() { }

   getURL()
   {
    //if (environment.production) {
     
   
    //  return "https://appservice34tombalaclub.azurewebsites.net/api/";    //prod ortami
    // }else{
          
        //  return "http://localhost/WebApi/api/"; //local     //UserTels/getall
          return "http://51.116.179.82/api/";  // production
    //}

   }
}
