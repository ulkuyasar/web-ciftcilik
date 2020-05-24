import { Injectable } from '@angular/core';
// import {smartToast} from '@smarthtmlelements/smart-elements/source/modules/smart.toast.js';
// import {smartWindow} from '@smarthtmlelements/smart-elements/source/modules/smart.window.js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  // mesajVer(toast:smartToast,msg: String){
  //   toast.attributes["value"].textContent= msg;
  //   toast.open();
  // }

  MesajVerError(msg : any)
  {
    this.toastr.info(msg, "Hatalı İşlem");
    // const alert = <smartToast>document.getElementById("alertError");
    // this.mesajVer(alert,msg);
  }

  MesajVerWarning(msg : any)
  {
    this.toastr.info(msg, "Uyarı İşlemi");
    // const alert = <smartToast>document.getElementById("alertWarning");
    // this.mesajVer(alert,msg);
  }

  MesajVerInfo(msg : any)
  {
    this.toastr.info(msg, "Bilgi İşlemi");
    // const alert = <smartToast>document.getElementById("alertInfo");
    // this.mesajVer(alert,msg);
  }

  MesajVerSuccess(msg : any)
  {
    this.toastr.success(msg, "Başarılı İşlem");
    // const alert = <smartToast>document.getElementById("alertSuccess");
    // this.mesajVer(alert,msg);
  }

  // MesajVerMail(msg : String)
  // {
  //   this.toastr.(msg, "Uyarı İşlemi");
  //   // const alert = <smartToast>document.getElementById("alertMail");
  //   // this.mesajVer(alert,msg);
  // }

  // MesajVerWithModalYapi(msg : string)
  // {
  //   const smartWindow = <smartWindow>document.getElementById("modelInfo");
  //   smartWindow.label = "Bilgilendirme";
  //   smartWindow.open();
  //   const divTxt = document.getElementById("txtModelInfoBilgi");
  //   divTxt.innerHTML = msg;
    
    
  // }

}
