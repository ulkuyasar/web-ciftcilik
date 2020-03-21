import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

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

  ngOnInit() {
  }

  getWidth() : any {
		if (document.body.offsetWidth < 500) {
			return '90%';
		}
		
		return 595;
	}


}
