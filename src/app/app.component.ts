import { Component } from '@angular/core';
import {smartWindow} from '@smarthtmlelements/smart-elements/source/modules/smart.window.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './_helpers/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-ciftcilik';
  returnUrl: string;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService:AuthenticationService
  ){
  }

  Logout($event)
  {
    this.authenticationService.doLogout();
  }

  closeModelInfo($event)
  {
    // const smartWindow = <smartWindow>document.getElementById("modelInfo");

    // smartWindow.close();
  }

}


