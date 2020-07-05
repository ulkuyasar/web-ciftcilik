import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { UserForLoginDto } from 'src/app/_entities/entitiesforCRM';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})
export class UserLoginPageComponent implements OnInit {

    model:any = {username:"",password:""};
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
  //  private notificationService:NotificationService;

    @ViewChild('email', { static: false }) email: jqxInputComponent;
    @ViewChild('password', { static: false }) password: jqxPasswordInputComponent;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService : NotificationService
  ) { 
   // this.notificationService = new NotificationService;   
  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  userForLoginDto : UserForLoginDto;

  setValues() :UserForLoginDto{
    this.userForLoginDto = new UserForLoginDto();
    this.userForLoginDto.email = this.email.val();
    this.userForLoginDto.password = this.password.val();
    return this.userForLoginDto;
  }

  onRegister(){
    this.returnUrl = '/sign-up';
    this.router.navigate([this.returnUrl]);
  }

  onSubmit() {  

        this.submitted = true;
        // stop here if form is invalid
        if (this.email.val() == "" || this.password.val() == "")  {
            return;
        }

         this.authenticationService.signIn(this.setValues()).subscribe(
                 data => {
                     this.notificationService.MesajVerSuccess("Hoşgeldiniz...");                  
        //             this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/GamePageComponent';
        //             this.router.navigate([this.returnUrl]);
                 },
                 error => {
                     this.error = error;
                     this.loading = false;
                     this.email.val("");
                     this.password.val("");
                     this.notificationService.MesajVerError("Giriş bilgileriniz yanlış. Lütfen bilgilerinizi tekrar giriniz");
         });
   }

}
