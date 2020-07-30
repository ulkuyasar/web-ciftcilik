import { Injectable , isDevMode } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  constructor() { }

   getURL()
   {
    // if(isDevMode()) {
    //     return "https://localhost:5001/api/";
    // }
    // else{
        return "https://yilciftcilikwebapi.herokuapp.com/api/";
   // }
    //if (environment.production) {
     
   
    //  return "https://appservice34tombalaclub.azurewebsites.net/api/";    //prod ortami
    // }else{
          
          //     return "https://localhost:5001/api/"; //local     //UserTels/getall
     //return "https://yilciftcilikwebapi.herokuapp.com/api/";  // production
    //}

   }
}
