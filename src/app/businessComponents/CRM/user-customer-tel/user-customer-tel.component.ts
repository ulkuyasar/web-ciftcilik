import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { NotificationService } from 'src/app/_helpers/notification.service';
import { YilBaseMasterCRUDComponent } from 'src/app/_yilLibrary/yilCompomenents/yil-base-master-crud/yil-base-master-crud.component';
import { UserTelService } from 'src/app/services/user-tel.service';
import { UserTel } from 'src/app/_entities/entitiesforCRM';
import { Guid } from "guid-typescript";


@Component({
  selector: 'app-user-customer-tel',
  templateUrl: './user-customer-tel.component.html',
  styleUrls: ['./user-customer-tel.component.css'],
  providers: [UserTelService]
})
export class UserCustomerTelComponent implements AfterViewInit //,OnInit,
{
  @ViewChild('baseTel', { static: false }) baseTel: YilBaseMasterCRUDComponent;
  @ViewChild('myWindowUserCustomerTel', { static: false }) myWindowUserCustomerTel: jqxWindowComponent;
  @ViewChild('id', { static: false }) id: jqxNumberInputComponent;
  @ViewChild('prefixTel', { static: false }) prefixTel: jqxInputComponent;
  @ViewChild('tel', { static: false }) tel: jqxInputComponent;

  gridColumns: any[] = [];
  _userTelService : UserTelService;
  entityVal : UserTel;
  _yilAutomaticfillValue:boolean=false;
  _id :string = "";

    constructor(protected userTelService:UserTelService, 
                protected notificationService:NotificationService) {    
    this.entityVal = new UserTel();
    this._userTelService = userTelService;
    this.gridColumns =
    [
      { freeze: true, text: 'ID', datafield: 'id',width: 80,cellsalign:'right' }, 
      { freeze: false, text: 'PrefixTel', datafield: 'prefixTel', width: 200,cellsalign:'right' }, 
      { freeze: false, text: 'Tel', datafield: 'tel', width: 250,cellsalign:'right' }
    ];
   }
  ngAfterViewInit(): void {

  }

  ngOnInit() { 
  }

  public onYilInitilize(){
    debugger;
    this.baseTel.onYilInitilize();
  }


  EventSetValueToModalWindowFormSubclass(dataRecord : any) 
  {
      this.id.decimal(dataRecord.id);
      this.prefixTel.val(dataRecord.prefixTel);
      this.tel.val(dataRecord.tel);
  }

  EventClearValueToModalWindowFormSubclass() 
  {
      this.id.decimal(-1);
      this.prefixTel.val("");
      this.tel.val("");
  }

  EventSetValueToEntityFromModalWindowFormSubclass(entity : any) 
  {
      entity.id = this.id.val();
      entity.prefixTel= this.prefixTel.val();
      entity.tel= this.tel.val();
  }

  EventGetIdValueFormSubclass(id : any) 
  {
    if (this._id =="")
      this._id =  Guid.create().toString();
    
    id =  this._id;
  }
 
}