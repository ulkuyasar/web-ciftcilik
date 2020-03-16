import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: Object = {};

  constructor(
    public authService: AuthenticationService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
  }
  ngOnInit() {
  }

}
