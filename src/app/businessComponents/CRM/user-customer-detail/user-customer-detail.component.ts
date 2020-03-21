import { Component, ViewChild, OnInit } from '@angular/core';
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxExpanderComponent } from 'jqwidgets-ng/jqxexpander';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxdatetimeinput';
import { Router } from '@angular/router';
import { UserForRegisterDto, UserDetail, idname, CurrentUser } from 'src/app/_entities/entities';
import { AuthenticationService } from 'src/app/_helpers/authentication.service';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { UserdetailService } from 'src/app/services/userdetail.service';

@Component({
  selector: 'app-user-customer-detail',
  templateUrl: './user-customer-detail.component.html',
  styleUrls: ['./user-customer-detail.component.css']
})
export class UserCustomerDetailComponent implements OnInit {

  idName : any;

  @ViewChild('CustomerDetail', { static: false }) CustomerDetail: jqxExpanderComponent;
  @ViewChild('PrefixName', { static: false }) PrefixName: jqxInputComponent;
  @ViewChild('Name', { static: false }) Name: jqxInputComponent;
  @ViewChild('SurName', { static: false }) SurName: jqxInputComponent;
  @ViewChild('TCKN', { static: false }) TCKN: jqxInputComponent;
  @ViewChild('VKN', { static: false }) VKN: jqxInputComponent;
  @ViewChild('birthday', { static: false }) birthday; jqxDateTimeInputComponent;
  @ViewChild('validatorReference', { static: false }) myValidator: jqxValidatorComponent;
  @ViewChild('gender', { static: false }) gender: jqxDropDownListComponent; 
  genders: string[] = ["male", "female"];
  currentUser : CurrentUser;
  // userdetail :  UserDetail;


  constructor(private userdetailService: UserdetailService,
              private authService: AuthenticationService,
              private notificationService:NotificationService) { }

  ngOnInit() {
     this.currentUser = this.authService.getUserInfo;
     this.userdetailService.getlistbyotherobject(this.currentUser.id).subscribe(res => {
         this.idName = res.data[0];
         this.getObjectToComponent(this.idName);
     });

  }

  setComponentToObject() :UserDetail{
   
    this.idName.prefixName = this.PrefixName.val();
    this.idName.Name = this.Name.val();
    this.idName.SurName = this.SurName.val();
    this.idName.tckn = this.TCKN.val();
    this.idName.vkn = this.VKN.val();
    this.idName.birthday =  this.birthday.getDate();
    this.idName.gender = this.gender.getSelectedIndex();
    return this.idName;
  }
  
  getObjectToComponent(idName :any) :void{
    //  this.idName = new UserDetail();
    //  this.idName.id = idName.id;

     this.PrefixName.val(idName.prefixName);
     this.Name.val(idName.name);
     this.SurName.val(idName.surName);
     this.TCKN.val(idName.tckn);
     this.VKN.val(idName.vkn);
     this.birthday.setDate(idName.birthday);
     this.gender.selectIndex(idName.gender);
  }

  rules: any[] = [
    {
        input: ".Name", message: "Name is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
            return this.Name.val() != "" && this.Name.val() != "Name";
        }
    },
    {
        input: ".SurName", message: "SurName is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
            return this.SurName.val() != "" && this.SurName.val() != "SurName";
        }
    },
    { input: ".TCKN", message: "TCKN is required!", action: 'keyup, blur', rule: 'required' },
    {
        input: ".gender", message: "Gender is required!", action: 'blur', rule: (input: any, commit: any): boolean => {
            let index = this.gender.getSelectedIndex();
            return index != -1;
        }
    }
];

kaydetClicked(): void {
  this.myValidator.validate(document.getElementById('form'));
};

validationSuccess(event: any): void {
  this.userdetailService.update(this.setComponentToObject()).subscribe(res => {
      if (res.success) {
       this.getObjectToComponent(res.data);
       this.notificationService.MesajVerSuccess("Hesap güncellendi...");  
      }
    })
};



}
