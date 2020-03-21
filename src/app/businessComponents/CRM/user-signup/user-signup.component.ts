import { Component, ViewChild, OnInit } from '@angular/core';
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxExpanderComponent } from 'jqwidgets-ng/jqxexpander';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxdatetimeinput';
import { Router } from '@angular/router';
import { UserForRegisterDto } from 'src/app/_entities/entities';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { NotificationService } from 'src/app/_helpers/notification.service';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  @ViewChild('createAccount', { static: false }) createAccount: jqxExpanderComponent;
  @ViewChild('firstName', { static: false }) firstName: jqxInputComponent;
  @ViewChild('lastName', { static: false }) lastName: jqxInputComponent;
  @ViewChild('email', { static: false }) email: jqxInputComponent;
  @ViewChild('password', { static: false }) password: jqxPasswordInputComponent;
  @ViewChild('passwordConfirm', { static: false }) passwordConfirm: jqxPasswordInputComponent;
  @ViewChild('validatorReference', { static: false }) myValidator: jqxValidatorComponent;
  // @ViewChild('gender', { static: false }) gender: jqxDropDownListComponent;
  // @ViewChild('birthday', { static: false }) birthday; jqxDateTimeInputComponent;
  //genders: string[] = ["male", "female"];

  constructor(
    public authService: AuthenticationService,
    public router: Router ,
    private notificationService:NotificationService
  ) { }

  ngOnInit() {
  }

  userForRegisterDto : UserForRegisterDto;

  setValues() :UserForRegisterDto{
    this.userForRegisterDto = new UserForRegisterDto();
    this.userForRegisterDto.email = this.email.val();
    this.userForRegisterDto.firstName = this.firstName.val();
    this.userForRegisterDto.lastName = this.lastName.val();
    this.userForRegisterDto.password = this.password.val();
    // this.userForRegisterDto.gender = this.gender.getSelectedIndex();
    // this.userForRegisterDto.birthday =  this.birthday.getDate();
    return this.userForRegisterDto;
  }
  resetValues() :void{
  
     this.email.val("");
     this.firstName.val("");
     this.lastName.val("");
     this.password.val("");
   //  this.gender.selectedIndex(-1);
    // this.birthday.reset();
  }


  // registerUser() {
   
  //   this.authService.signUp(this.setValues()).subscribe((res) => {
  //     if (res.result) {
  //       // this.signupForm.reset()
  //       this.router.navigate(['log-in']);
  //     }
  //   })
  // }


  rules: any[] = [
      {
          input: ".firstName", message: "First name is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
              return this.firstName.val() != "" && this.firstName.val() != "First";
          }
      },
      {
          input: ".lastName", message: "Last name is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
              return this.lastName.val() != "" && this.lastName.val() != "Last";
          }
      },
      { input: ".email", message: "Email is required!", action: 'keyup, blur', rule: 'required' },
      { input: ".password", message: "Password is required!", action: 'keyup, blur', rule: 'required' },
      { input: ".passwordConfirm", message: "Password is required!", action: 'keyup, blur', rule: 'required' },
      {
          input: ".passwordConfirm", message: "Passwords should match!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
              let firstPassword = this.password.val();
              let secondPassword = this.passwordConfirm.val();
              return firstPassword == secondPassword;
          }
      }
      //,
      // {
      //     input: ".gender", message: "Gender is required!", action: 'blur', rule: (input: any, commit: any): boolean => {
      //         let index = this.gender.getSelectedIndex();
      //         return index != -1;
      //     }
      // }
  ];
  buttonClicked(): void {
      this.myValidator.validate(document.getElementById('form'));
  };

  validationSuccess(event: any): void {
      this.authService.signUp(this.setValues()).subscribe((res) => {
        if (res.success) {
          this.resetValues();
          this.createAccount.setContent('<span style="margin: 10px;">Account created.</span>');
          this.notificationService.MesajVerSuccess("Account created...");  
          this.router.navigate(['log-in']);
        }
      })
  };

}
