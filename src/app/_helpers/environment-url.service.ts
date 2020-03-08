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
          return "http://localhost:5000/api/";
    //}

   }
}
