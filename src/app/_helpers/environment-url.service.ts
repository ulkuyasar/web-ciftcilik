import { Injectable , isDevMode } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  constructor() { }

   getURL()
   {
    // if(isDevMode()) {
    //  return "https://localhost:5001/api/";
    // }
    // else{
        return "https://yilciftcilikwebapi.herokuapp.com/api/";
   // }


   }
}
