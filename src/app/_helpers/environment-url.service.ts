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
          
        return "https://localhost:5001/api/"; //local     //UserTels/getall
        //    return "https://yilciftcilikwebapi.herokuapp.com/api/";  // production
    //}

   }
}
