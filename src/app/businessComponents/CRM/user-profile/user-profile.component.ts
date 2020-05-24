import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { UserCustomerTelComponent } from '../user-customer-tel/user-customer-tel.component';
import { MasterCityComponent } from '../../definitions/master-city/master-city.component';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { UserCustomerAdresComponent } from '../user-customer-adres/user-customer-adres.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements AfterViewInit {

  @ViewChild('customerTelComponent', { static: false }) customerTelComponent : UserCustomerTelComponent;
  // @ViewChild('customerAdresComponent', { static: false }) customerAdresComponent : UserCustomerAdresComponent;
  
  
  
  // @ViewChild('cityComponent', { static: false }) cityComponent: MasterCityComponent;
  currentUser: Object = {};
  localStorageUser : any;

  constructor(
    public authService: AuthenticationService,
    private actRoute: ActivatedRoute
  ) 
  { 
    this.localStorageUser = authService.getUserInfo;
    
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
  }
  ngAfterViewInit(): void {

  //  this.customerTelComponent.onYilInitilize();
  }

  myTabsOnSelected(event: any): void {

    switch(event.args.item) { 
      case 1: {        
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.customerTelComponent.onYilInitilize(); 
        }, 1000);       
         break; 
      } 
      case 2: { 
        setTimeout(()=>{    //<<<---    using ()=> syntax
         // this.customerAdresComponent.onYilInitilize(); 
        }, 2000);   
      } 
      case 3: { 
        //customer tarla; 
        break; 
     } 
      default: { 
         //musteri detay; 
         break; 
      } 
    alert(event);

    };
  }

  ngOnInit() {

  }

  getWidth() : any {
		if (document.body.offsetWidth < 500) {
			return '90%';
		}
		
		return 595;
	}


}
