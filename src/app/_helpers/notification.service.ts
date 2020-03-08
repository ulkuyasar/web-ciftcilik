import { Injectable } from '@angular/core';
import {smartToast} from '@smarthtmlelements/smart-elements/source/modules/smart.toast.js';
import {smartWindow} from '@smarthtmlelements/smart-elements/source/modules/smart.window.js';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  mesajVer(toast:smartToast,msg: String){
    toast.attributes["value"].textContent= msg;
    toast.open();
  }

  MesajVerError(msg : String)
  {
    const alert = <smartToast>document.getElementById("alertError");
    this.mesajVer(alert,msg);
  }

  MesajVerWarning(msg : String)
  {
    const alert = <smartToast>document.getElementById("alertWarning");
    this.mesajVer(alert,msg);
  }

  MesajVerInfo(msg : String)
  {
    const alert = <smartToast>document.getElementById("alertInfo");
    this.mesajVer(alert,msg);
  }

  MesajVerSuccess(msg : String)
  {
    const alert = <smartToast>document.getElementById("alertSuccess");
    this.mesajVer(alert,msg);
  }

  MesajVerMail(msg : String)
  {
    const alert = <smartToast>document.getElementById("alertMail");
    this.mesajVer(alert,msg);
  }

  MesajVerWithModalYapi(msg : string)
  {
    const smartWindow = <smartWindow>document.getElementById("modelInfo");
    smartWindow.label = "Bilgilendirme";
    smartWindow.open();
    const divTxt = document.getElementById("txtModelInfoBilgi");
    divTxt.innerHTML = msg;
    
    
  }

}
